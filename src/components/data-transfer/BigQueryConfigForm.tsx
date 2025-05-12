"use client";

import type { Control } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { BigQueryConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Cloud } from "lucide-react";

const bigQueryConfigSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  datasetId: z.string().min(1, "Dataset ID is required"),
  tableId: z.string().min(1, "Table ID is required"),
  authJson: z.string().optional().refine(val => {
    if (!val) return true; // Optional field
    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  }, { message: "Invalid JSON format for authentication" }),
});

type BigQueryConfigFormData = z.infer<typeof bigQueryConfigSchema>;

interface BigQueryConfigFormProps {
  onConfigChange: (config: BigQueryConfig) => void;
  initialConfig: BigQueryConfig;
}

export function BigQueryConfigForm({ onConfigChange, initialConfig }: BigQueryConfigFormProps) {
  const form = useForm<BigQueryConfigFormData>({
    resolver: zodResolver(bigQueryConfigSchema),
    defaultValues: initialConfig,
  });

  React.useEffect(() => {
    const subscription = form.watch((values) => {
       const parsedValues = bigQueryConfigSchema.safeParse(values);
       if (parsedValues.success) {
        onConfigChange(parsedValues.data);
       }
    });
    return () => subscription.unsubscribe();
  }, [form, onConfigChange]);

  const onSubmit = (data: BigQueryConfigFormData) => {
    console.log("BigQuery Config Submitted:", data);
    // onConfigChange(data); // Already handled by watch
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-6 w-6 text-primary" />
          BigQuery Configuration
        </CardTitle>
        <CardDescription>Provide your BigQuery connection details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., my-gcp-project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="datasetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dataset ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., my_dataset" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tableId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., my_table" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authJson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Account JSON (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your service account key JSON here"
                      className="min-h-[100px] font-mono text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit" className="w-full">Save BigQuery Configuration</Button> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
