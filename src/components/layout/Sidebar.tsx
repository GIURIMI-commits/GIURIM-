import { getCurriculum } from '@/lib/content/loader';
import { SidebarNav } from './SidebarNav';
import { MobileLessonNav } from './MobileLessonNav';

export async function Sidebar() {
    // Fetch the full curriculum tree (Areas -> Modules -> Lessons)
    const curriculum = await getCurriculum();

    return (
        <>
            <MobileLessonNav curriculum={curriculum} />
            <SidebarNav curriculum={curriculum} />
        </>
    );
}
