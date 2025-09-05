import { useMemo, useState } from "react";
import AlumniTable, { AlumniItem } from "@/components/dashboard/AlumniTable";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Directory() {
  const [query, setQuery] = useState("");
  const data = useMemo<AlumniItem[]>(
    () => [
      { id: "1", name: "David Russom", avatar: "https://i.pravatar.cc/120?img=12", batch: "2016", company: "Bloom" },
      { id: "2", name: "Albert Flores", avatar: "https://i.pravatar.cc/120?img=3", batch: "2018", company: "Hooli" },
      { id: "3", name: "Marvin McKinney", avatar: "https://i.pravatar.cc/120?img=5", batch: "2015", company: "Initech" },
    ],
    [],
  );

  const filtered = data.filter((d) =>
    (d.name + " " + d.company + " " + d.batch).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Alumni Directory</h2>
        <div className="flex items-center gap-2">
          <Input placeholder="Search by name, company, batch..." value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>
      </div>

      <Card>
        <div className="p-4">
          <AlumniTable data={filtered} />
        </div>
      </Card>

    </div>
  );
}
