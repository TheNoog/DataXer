"use client";

import * as React from "react";
import type { TransferStatus, TransferDirection } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play, Loader2, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface DataTransferControlsProps {
  onStartTransfer: () => void;
  status: TransferStatus;
  progress: number;
  error?: string;
  isReadyToTransfer: boolean;
  direction: TransferDirection;
}

export function DataTransferControls({
  onStartTransfer,
  status,
  progress,
  error,
  isReadyToTransfer,
  direction
}: DataTransferControlsProps) {
  const getStatusMessage = () => {
    switch (status) {
      case 'idle':
        return 'Ready to start transfer.';
      case 'pending':
        return 'Preparing transfer...';
      case 'transferring':
        return 'Transferring data...';
      case 'success':
        return 'Transfer completed successfully!';
      case 'error':
        return `Transfer failed: ${error || 'Unknown error'}`;
      default:
        return '';
    }
  };

  const StatusIcon = () => {
    switch(status) {
      case 'pending':
      case 'transferring':
        return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-6 w-6 text-primary" />
          Data Transfer
        </CardTitle>
        <CardDescription>Initiate and monitor the data transfer process.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button
          onClick={onStartTransfer}
          disabled={status === 'pending' || status === 'transferring' || !isReadyToTransfer}
          className="w-full text-lg py-6"
          size="lg"
        >
          {status === 'pending' || status === 'transferring' ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Play className="mr-2 h-5 w-5" />
          )}
          {status === 'pending' || status === 'transferring' ? 'Transferring...' : 'Start Transfer'}
        </Button>

        {!isReadyToTransfer && status === 'idle' && (
           <Alert variant="default" className="border-primary/50 text-primary">
            <AlertTriangle className="h-4 w-4 !text-primary" />
            <AlertTitle>Configuration Incomplete</AlertTitle>
            <AlertDescription>
              Please configure MSSQL, BigQuery, and select a transfer direction before starting.
            </AlertDescription>
          </Alert>
        )}

        {(status !== 'idle' || error) && (
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 font-medium">
                <StatusIcon />
                <span>{getStatusMessage().split(':')[0]}</span>
              </div>
              {status === 'transferring' && <span>{Math.round(progress)}%</span>}
            </div>
            
            {status === 'transferring' && (
              <Progress value={progress} className="w-full h-3 [&>div]:bg-accent" />
            )}
            {status === 'success' && (
                <Alert variant="default" className="bg-green-50 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4 !text-green-500" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{getStatusMessage()}</AlertDescription>
                </Alert>
            )}
            {status === 'error' && error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
