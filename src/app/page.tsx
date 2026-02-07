import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Scale, BookOpen, ShieldCheck, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-neutral-900 text-white py-24 px-4 overflow-hidden relative">
          <div className="container mx-auto relative z-10 text-center max-w-4xl">
            <Badge className="mb-6 bg-neutral-800 text-neutral-300 hover:bg-neutral-800 border-neutral-700">
              🎓 L'Academy di educazione legale N.1 in Italia
            </Badge>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight">
              Il diritto italiano,<br />
              <span className="text-neutral-400">finalmente chiaro.</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Non è un manuale. Non è consulenza.<br />
              È la rampa di lancio per capire le regole del gioco in Italia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registrazione">
                <Button size="lg" className="text-lg px-8 py-6 rounded-full w-full sm:w-auto">
                  Inizia Gratis
                </Button>
              </Link>
              <Link href="/chi-siamo">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-black">
                  Scopri il progetto
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative background elements could go here */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-neutral-50 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-serif font-bold mb-4">Perché GUIRIMÌ?</h2>
              <p className="text-neutral-600 text-lg">
                Basta "legalese" incomprensibile. Traduciamo la complessità in percorsi accessibili.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={BookOpen}
                title="Percorsi Guidati"
                desc="Dal liceale all'aspirante avvocato: scegli il tuo profilo e segui le lezioni giuste per te."
              />
              <FeatureCard
                icon={ShieldCheck}
                title="Contenuti Verificati"
                desc="Ogni lezione è scritta e revisionata da professionisti. Niente fake news, solo fonti ufficiali."
              />
              <FeatureCard
                icon={Users}
                title="Per Tutti"
                desc="Accessibile, gratuito e open source. Perché conoscere i propri diritti è... un diritto."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-neutral-900" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-neutral-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${className}`}>
      {children}
    </span>
  )
}
