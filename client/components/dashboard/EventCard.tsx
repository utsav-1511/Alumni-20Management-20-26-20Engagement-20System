import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

export interface EventItem {
  id: string;
  title: string;
  date: string; // human readable
  location: string;
  cover?: string;
}

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <Card className="overflow-hidden shadow-sm">
      {event.cover && (
        <img
          src={event.cover}
          alt="event cover"
          className="h-28 w-full object-cover"
        />
      )}
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm text-muted-foreground space-y-1">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{event.location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
