import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Eye } from "lucide-react";

export interface AlumniItem {
  id: string;
  name: string;
  avatar?: string;
  batch: string;
  company: string;
}

export default function AlumniTable({ data }: { data: AlumniItem[] }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">Alumni Directory</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((alum) => (
              <TableRow key={alum.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={alum.avatar} alt={alum.name} />
                      <AvatarFallback>
                        {alum.name
                          .split(" ")
                          .map((x) => x[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {alum.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {alum.company}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{alum.batch}</TableCell>
                <TableCell>{alum.company}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="view profile"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      className="h-8 w-8 bg-accent text-white hover:bg-accent/90"
                      aria-label="message"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
