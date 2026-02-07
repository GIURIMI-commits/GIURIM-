"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UserProfile } from '@/types/user';

export function useProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setLoading(false);
                return;
            }

            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) setProfile(data as UserProfile);
            setLoading(false);
        }
        fetchProfile();
    }, []);

    return { profile, loading };
}
