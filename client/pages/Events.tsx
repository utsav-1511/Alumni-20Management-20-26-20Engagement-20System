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
        location: "New Delhi",
        cover:
          "https://plus.unsplash.com/premium_photo-1673240845240-2fce9077a6e9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "e2",
        title: "Tech Talk: LLM",
        date: "Fri, Nov 08 • 4:00 PM",
        location: "Mumbai",
        cover:
          "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "e3",
        title: "Tech Talk: AI in 2025",
        date: "Fri, Nov 08 • 4:00 PM",
        location: "Noida",
        cover:
          "https://images.unsplash.com/photo-1649257680750-c0654b665c6f?q=80&w=1299&auto=format&fit=crop",
      },
      {
        id: "e4",
        title: "Tech Talk: Web Technology",
        date: "Fri, Nov 08 • 4:00 PM",
        location: "Jaipur",
        cover:
          "https://images.unsplash.com/photo-1695395550316-8995ae9d35ff?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "e5",
        title: "Tech Talk: BlockChain",
        date: "Fri, Nov 08 • 4:00 PM",
        location: "Mumbai",
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
