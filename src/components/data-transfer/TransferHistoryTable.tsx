"use client";

import type { TransferHistoryItem } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, CheckCircle2, XCircle, ArrowRight, Database, Cloud } from "lucide-react";
import { format } from 'date-fns';

interface TransferHistoryTableProps {
  history: TransferHistoryItem[];
}

export function TransferHistoryTable({ history }: TransferHistoryTableProps) {
  const formatDatasource = (name: string, type: 'mssql' | 'bq') => {
    const Icon = type === 'mssql' ? Database : Cloud;
    return <span className="flex items-center gap-1"><Icon className="h-3.5 w-3.5 text-muted-foreground" /> {name}</span>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          Transfer History
        </CardTitle>
        <CardDescription>A log of completed data transfers.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border">
          <Table>
            {history.length === 0 && <TableCaption>No transfers recorded yet.</TableCaption>}
            <TableHeader className="sticky top-0 bg-background z-[1]">
              <TableRow>
                <TableHead className="w-[250px]">Timestamp</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="w-[30px]"> </TableHead>
                <TableHead>Destination</TableHead>
                <TableHead className="text-right w-[120px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {format(item.timestamp, "MMM d, yyyy, HH:mm:ss")}
                  </TableCell>
                  <TableCell>{formatDatasource(item.source, item.direction === 'mssqlToBq' ? 'mssql' : 'bq')}</TableCell>
                  <TableCell><ArrowRight className="h-4 w-4 text-muted-foreground"/></TableCell>
                  <TableCell>{formatDatasource(item.destination, item.direction === 'mssqlToBq' ? 'bq' : 'mssql')}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={item.status === "success" ? "default" : "destructive"}
                      className={item.status === "success" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {item.status === "success" ? (
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                      ) : (
                        <XCircle className="mr-1 h-3.5 w-3.5" />
                      )}
                      {item.status === "success" ? "Success" : "Failed"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
         {history.length > 0 && history.some(h => h.status === 'failure') && (
          <p className="text-xs text-muted-foreground mt-2">
            For failed transfers, check console logs for more details (simulated).
          </p>
        )}
      </CardContent>
    </Card>
  );
}
