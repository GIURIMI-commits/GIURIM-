export type RoomCategory = 'materie' | 'studio' | 'community';

export interface Room {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    icon: string;
    category: RoomCategory;
    order: number;
}

export interface Thread {
    id: string;
    room_id: string;
    author_id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;

    // Relations
    author?: {
        display_name: string | null;
    };
    room?: Room;

    // Stats (from view or join)
    stats?: {
        score: number;
        comments_count: number;
        user_vote?: number; // Current user's vote
    };
}

export interface Comment {
    id: string;
    thread_id: string;
    parent_id: string | null;
    author_id: string;
    body: string;
    created_at: string;

    author?: {
        display_name: string | null;
    };

    // Stats
    stats?: {
        score: number;
        user_vote?: number;
    };
}
