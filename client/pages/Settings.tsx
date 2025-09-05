import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("admin@example.com");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Settings</h2>
      <Card className="p-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Notifications</div>
              <div className="text-xs text-muted-foreground">
                Email and in-app notifications
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={(v: any) => setNotifications(v)}
            />
          </div>

          <div className="pt-2">
            <button className="rounded-md bg-primary px-3 py-2 text-white">
              Save Changes
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-4 text-sm text-muted-foreground">
        Admin controls: manage roles and export data.
      </Card>
    </div>
  );
}
