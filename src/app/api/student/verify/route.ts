import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // refresh session to get latest data if needed, but primarily we check the DB
        // This endpoint can be used to re-trigger a check if the user believes they should be verified
        // or if they just verified their email and the trigger hasn't fired/propagated yet (unlikely but possible race condition in UI)

        const email = user.email;
        if (!email) return NextResponse.json({ error: "No email found" }, { status: 400 });

        const domain = email.split('@')[1];

        // 1. Check if domain is allowed (handle subdomains)
        // Heuristic: check if exact match OR if the root domain (last 2 parts) matches.
        // This covers "studenti.unibo.it" -> "unibo.it"
        const parts = domain.split('.');
        const rootDomain = parts.slice(-2).join('.');

        const { data: matches } = await supabase
            .from('institution_domains')
            .select('*')
            .in('domain', [domain, rootDomain])
            .eq('status', 'active');

        const domainRecord = matches && matches.length > 0 ? matches[0] : null;

        const isAllowed = !!domainRecord;

        // 2. Update profile if needed (manual sync)
        // The trigger should handle this, but explicit is good too.
        const updates: any = {
            email: email,
            email_domain: domain,
        };

        if (isAllowed && user.email_confirmed_at) {
            updates.student_status = 'verified';
            updates.student_verified_at = new Date().toISOString();
            updates.role = 'student';

            // Add entitlement
            await supabase
                .from('entitlements')
                .upsert({
                    user_id: user.id,
                    scope: 'all_courses',
                    source: 'student_verification'
                }, { onConflict: 'user_id, scope, source' });
        } else if (!isAllowed) {
            // If not allowed, we don't overwrite 'verified' if it was manually set by admin,
            // but for a normal user we might want to ensure it's 'none' or 'pending'
            // Let's rely on the trigger for the 'none' state usually.
            // But if they are requesting a check, and it's not allowed, we can log a request?
        }

        const { error: updateError } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id);

        if (updateError) throw updateError;

        // 3. If not allowed, create a verification request if one doesn't exist
        if (!isAllowed) {
            await supabase
                .from('institution_verification_requests')
                .upsert({
                    user_id: user.id,
                    email_domain: domain,
                    status: 'pending'
                }, { onConflict: 'user_id, email_domain', ignoreDuplicates: true }); // simplified handling
        }

        return NextResponse.json({
            success: true,
            isAllowed,
            domain,
            status: isAllowed ? 'verified' : 'pending_domain'
        });

    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
