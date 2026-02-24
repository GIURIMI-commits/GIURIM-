import { getAreas } from "@/lib/content/loader";
import { books } from "@/content/risorse";
import { RisorseClient } from "@/components/risorse/RisorseClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Risorse e Letture Consigliate | GUIRIMì",
    description: "Libri, manuali e risorse gratuite per lo studio del diritto in base al tuo livello: Principiante, Intermedio, Avanzato."
};

export default async function RisorsePage() {
    // Fetch areas from JSON to map area titles and orders
    const areas = await getAreas();

    return (
        <RisorseClient areas={areas} allBooks={books} />
    );
}
