import { useMemo } from "react";
import { Card } from "@/components/ui/card";

export default function Forum() {
  const posts = useMemo(() => [
    { id: 1, title: "Welcome to the forum", body: "Introduce yourself", author: "Admin", time: "2d" },
    { id: 2, title: "Jobs: Frontend", body: "Company X hiring", author: "John", time: "1d" },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Forum</h2>
        <div>
          <button className="rounded-md bg-primary px-3 py-2 text-white">New Post</button>
        </div>
      </div>

      <div className="grid gap-4">
        {posts.map((p) => (
          <Card key={p.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{p.title}</h3>
                  <div className="text-xs text-muted-foreground">{p.time}</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                <div className="mt-3 text-xs text-muted-foreground">By {p.author}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 text-sm text-muted-foreground">Chat UI coming soon (one-to-one & group chat).</Card>
    </div>
  );
}
