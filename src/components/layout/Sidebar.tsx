import { getCurriculum } from '@/lib/content/loader';
import { SidebarNav } from './SidebarNav';

export async function Sidebar() {
    // Fetch the full curriculum tree (Areas -> Modules -> Lessons)
    const curriculum = await getCurriculum();

    return <SidebarNav curriculum={curriculum} />;
}
