"use client";

import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import { UserProfile } from '@/types/user';
import { useEffect, useState } from 'react';

const fetchProfile = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) throw error;
    return data as UserProfile;
};

export function useProfile() {
    const { data: profile, error, isLoading } = useSWR('user-profile', fetchProfile, {
        revalidateOnFocus: false, // Don't refetch on window focus to save requests
        shouldRetryOnError: false
    });

    return {
        profile: profile || null,
        loading: isLoading,
        error
    };
}
