"use client";

import * as React from "react";
import type { TransferDirection } from "@/types";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRightLeft, Sparkles, Database, CloudUpload, CloudDownload } from "lucide-react";

interface TransferDirectionSetupProps {
  direction: TransferDirection;
  onDirectionChange: (direction: TransferDirection) => void;
}

export function TransferDirectionSetup({ direction, onDirectionChange }: TransferDirectionSetupProps) {
  const [suggestedDirection, setSuggestedDirection] = React.useState<TransferDirection | null>(null);
  
  const handleAiSuggest = () => {
    // Simulate AI suggestion
    const randomDirection = Math.random() < 0.5 ? 'mssqlToBq' : 'bqToMssql';
    setSuggestedDirection(randomDirection);
    onDirectionChange(randomDirection);
  };

  React.useEffect(() => {
    // Clear suggestion if manual change happens after AI suggestion
    if (suggestedDirection && direction !== suggestedDirection) {
      setSuggestedDirection(null);
    }
  }, [direction, suggestedDirection]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-primary" />
          Transfer Direction
        </CardTitle>
        <CardDescription>Define the direction of data flow.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={direction}
          onValueChange={(value) => onDirectionChange(value as TransferDirection)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="mssqlToBq" id="mssqlToBq" />
            <Label htmlFor="mssqlToBq" className="flex-1 cursor-pointer flex items-center gap-2 py-1">
              <Database className="h-5 w-5 text-muted-foreground" />
              <span>MSSQL</span>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground mx-1" />
              <CloudUpload className="h-5 w-5 text-muted-foreground" />
              <span>BigQuery</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="bqToMssql" id="bqToMssql" />
            <Label htmlFor="bqToMssql" className="flex-1 cursor-pointer flex items-center gap-2 py-1">
              <CloudDownload className="h-5 w-5 text-muted-foreground" />
              <span>BigQuery</span>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground mx-1" />
              <Database className="h-5 w-5 text-muted-foreground" />
              <span>MSSQL</span>
            </Label>
          </div>
        </RadioGroup>
        
        <Button onClick={handleAiSuggest} variant="outline" className="w-full group">
          <Sparkles className="h-4 w-4 mr-2 group-hover:animate-pulse text-accent" />
          Suggest Direction (AI)
        </Button>
        {suggestedDirection && (
          <p className="text-sm text-muted-foreground text-center">
            AI suggested: {suggestedDirection === 'mssqlToBq' ? 'MSSQL to BigQuery' : 'BigQuery to MSSQL'}.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
