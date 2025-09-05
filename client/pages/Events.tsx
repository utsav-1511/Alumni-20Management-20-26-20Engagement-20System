import { useMemo } from "react";
import EventCard from "@/components/dashboard/EventCard";
import { EventItem } from "@/components/dashboard/EventCard";
import { Card } from "@/components/ui/card";

export default function Events() {
  const events = useMemo<EventItem[]>(
    () => [
      {
        id: "e1",
        title: "Annual Alumni Meetup",
        date: "Sat, Oct 12 • 5:00 PM",
        location: "Main Auditorium",
        cover:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "e2",
        title: "Tech Talk: AI in 2025",
        date: "Fri, Nov 08 • 4:00 PM",
        location: "Auditorium B",
        cover:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Events</h2>
        <div className="flex items-center gap-2">
          <button className="rounded-md bg-primary px-3 py-2 text-white">
            Create Event
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>

      <Card className="mt-4 p-4 text-sm text-muted-foreground">
        Manage events from the admin panel. (create, edit, delete)
      </Card>
    </div>
  );
}
