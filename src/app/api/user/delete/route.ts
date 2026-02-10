import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
    try {
        const supabase = await createServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Initialize Admin Client (Service Role)
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!serviceRoleKey) {
            console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
            return NextResponse.json(
                { error: 'Server configuration error: cannot process deletion' },
                { status: 500 }
            );
        }

        const adminAuthClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceRoleKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        // Delete User from Auth (Cascade should handle DB data if set up, 
        // but explicit profile deletion is safer if no cascade on auth.users -> public.profiles)

        // 1. Delete from auth.users (This triggers cascade to public.profiles if configured)
        const { error: deleteError } = await adminAuthClient.auth.admin.deleteUser(user.id);

        if (deleteError) {
            console.error('Supabase Admin Delete Error:', deleteError);
            throw deleteError;
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Delete User Logic Error:', error);
        return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
    }
}
