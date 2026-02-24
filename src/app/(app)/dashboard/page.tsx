import { getCurriculum } from '@/lib/content/loader';
import { DashboardView } from '@/components/dashboard/DashboardView';

export default async function DashboardPage() {
    const curriculum = await getCurriculum();

    return <DashboardView curriculum={curriculum} />;
}
