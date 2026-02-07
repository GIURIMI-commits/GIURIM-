import { CreateThreadForm } from "@/components/corte/CreateThreadForm";
import { getRooms } from "@/lib/corte/data";

export default async function CreateThreadPage() {
    // Fetch rooms on server
    const rooms = await getRooms();

    return <CreateThreadForm rooms={rooms} />;
}
