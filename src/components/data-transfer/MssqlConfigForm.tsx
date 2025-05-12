"use client";

import * as React from "react";
import type { Control } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { MssqlConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Database } from "lucide-react";

const mssqlConfigSchema = z.object({
  dbName: z.string().min(1, "Database name is required"),
  schemaName: z.string().min(1, "Schema name is required"),
  tableName: z.string().min(1, "Table name is required"),
  hostUrl: z.string().min(1, "Host URL is required").url("Invalid URL format"),
  username: z.string().optional(),
  password: z.string().optional(),
});

type MssqlConfigFormData = z.infer<typeof mssqlConfigSchema>;

interface MssqlConfigFormProps {
  onConfigChange: (config: MssqlConfig) => void;
  initialConfig: MssqlConfig;
}

export function MssqlConfigForm({ onConfigChange, initialConfig }: MssqlConfigFormProps) {
  const form = useForm<MssqlConfigFormData>({
    resolver: zodResolver(mssqlConfigSchema),
    defaultValues: initialConfig,
  });

  // Watch for form changes and propagate them
  React.useEffect(() => {
    const subscription = form.watch((values) => {
      // Zod parse to ensure type safety and filter out undefined values from partial form state if any
      const parsedValues = mssqlConfigSchema.safeParse(values);
      if (parsedValues.success) {
        onConfigChange(parsedValues.data);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onConfigChange]);


  // Dummy submit handler, actual submission logic might be handled at a higher level
  const onSubmit = (data: MssqlConfigFormData) => {
    console.log("MSSQL Config Submitted:", data);
    // onConfigChange(data); // Already handled by watch
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          MSSQL Configuration
        </CardTitle>
        <CardDescription>Provide your MSSQL connection details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="hostUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host URL</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., server.database.windows.net" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dbName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., MyDatabase" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schemaName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schema Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., dbo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tableName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Orders" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., adminUser" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password (Optional)</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             {/* <Button type="submit" className="w-full">Save MSSQL Configuration</Button> */}
             {/* Submit button can be omitted if form changes are live-propagated via onConfigChange */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
