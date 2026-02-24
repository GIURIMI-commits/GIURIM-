import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set({
                            name,
                            value,
                            ...options,
                        })
                    );
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    // 1. Definiamo in modo esplicito le route pubbliche e di auth
    const isAuthRoute = path.startsWith('/login') || path.startsWith('/registrazione');

    // Le API pubbliche (es: auth callback, webhooks) o statiche
    const isPublicApiRoute = path.startsWith('/api/auth');

    // Le pagine pubbliche vere e proprie
    const isPublicPageRoute =
        path === '/' ||
        path === '/chi-siamo' ||
        path === '/privacy' ||
        path === '/privacy/cookie-preferences' ||
        path === '/terms' ||
        path === '/status' ||
        path === '/studenti' ||
        path === '/fonti' ||
        path.startsWith('/mappa') ||
        path.startsWith('/glossario') ||
        path.startsWith('/corte') && !path.startsWith('/corte/nuovo');

    // 2. Auth Routes redirect logic
    if (isAuthRoute && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 3. API Protection: Qualsiasi API non esplicitamente pubblica richiede autenticazione
    if (path.startsWith('/api/') && !isPublicApiRoute && !user) {
        return NextResponse.json(
            { error: 'Unauthorized. Please provide a valid session.' },
            { status: 401 }
        );
    }

    // 4. Page Protection: Se la pagina NON è pubblica e l'utente NON è loggato -> login
    // Permettiamo temporaneamente i percorsi dinamici di /learn come semi-pubblici (freemium)?
    // Nella tua app /learn è protetto (tranne mappa). Se /learn/[area] è pubblico rimuovilo dalle protette.
    // Presumiamo che /learn sia protetto dalle lezioni a pagamento come in piattaforma standard:
    const isProtectedRoute =
        path.startsWith('/dashboard') ||
        path.startsWith('/profilo') ||
        path.startsWith('/admin') ||
        path.startsWith('/learn') || // Metti in commento se /learn è 100% gratuito per i non-loggati
        path.startsWith('/corte/nuovo');

    if (isProtectedRoute && !user) {
        // Puoi aggiungere un redirect parameter per riportarlo alla pagina giusta dopo il login
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('next', path);
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
