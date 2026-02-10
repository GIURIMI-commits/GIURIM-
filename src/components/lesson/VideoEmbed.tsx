import { Youtube, ExternalLink } from 'lucide-react';

interface VideoEmbedProps {
    url: string;
    title: string;
    source?: string;
    note?: string;
}

export function VideoEmbed({ url, title, source, note }: VideoEmbedProps) {
    // Extract video ID from YouTube URL
    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYoutubeId(url);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

    if (!embedUrl) {
        return (
            <div className="my-8 p-4 border border-error/20 bg-error/5 rounded-lg text-error text-sm">
                Video URL non valido: {url}
            </div>
        );
    }

    return (
        <figure className="my-10 space-y-3">
            <div className="relative w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 aspect-video shadow-sm">
                <iframe
                    src={embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                />
            </div>

            <figcaption className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="space-y-1">
                    <div className="font-medium text-neutral-900 dark:text-neutral-200 flex items-center gap-2">
                        <Youtube className="w-4 h-4 text-red-600" />
                        {title}
                    </div>
                    {source && (
                        <div className="text-xs opacity-80">
                            Fonte: {source}
                        </div>
                    )}
                    {note && (
                        <div className="text-xs italic mt-1 text-neutral-500 dark:text-neutral-500">
                            💡 {note}
                        </div>
                    )}
                </div>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors whitespace-nowrap"
                >
                    Apri su YouTube <ExternalLink className="w-3 h-3" />
                </a>
            </figcaption>
        </figure>
    );
}
