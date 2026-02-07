import { Badge } from '@/components/ui/Badge';
import { formatDuration, formatDate } from '@/lib/utils';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { LessonMeta } from '@/types/content';

export function LessonHeader({ lesson }: { lesson: LessonMeta }) {
    return (
        <div className="mb-8 border-b pb-8">
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                <span className="uppercase tracking-wider font-semibold">{lesson.area.replace('area-', '').split('-')[1]}</span>
                <span>/</span>
                <span>{lesson.module}</span>
            </div>

            <h1 className="text-4xl font-serif font-bold mb-4 text-neutral-900 dark:text-neutral-50">
                {lesson.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDuration(lesson.duration_minutes)}
                </div>

                {lesson.last_verified && (
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Aggiornato: {formatDate(lesson.last_verified)}
                    </div>
                )}

                {lesson.verified_by && (
                    <Badge variant="secondary" className="gap-1">
                        <CheckCircle className="h-3 w-3 text-success" />
                        Verificato da {lesson.verified_by}
                    </Badge>
                )}
            </div>
        </div>
    );
}
