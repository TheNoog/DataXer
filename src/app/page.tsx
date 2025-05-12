"use client";

import * as React from "react";
import type { MssqlConfig, BigQueryConfig, TransferDirection, TransferStatus, TransferHistoryItem } from "@/types";
import { MssqlConfigForm } from "@/components/data-transfer/MssqlConfigForm";
import { BigQueryConfigForm } from "@/components/data-transfer/BigQueryConfigForm";
import { TransferDirectionSetup } from "@/components/data-transfer/TransferDirectionSetup";
import { DataTransferControls } from "@/components/data-transfer/DataTransferControls";
import { TransferHistoryTable } from "@/components/data-transfer/TransferHistoryTable";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const initialMssqlConfig: MssqlConfig = {
  dbName: "",
  schemaName: "",
  tableName: "",
  hostUrl: "",
  username: "",
  password: "",
};

const initialBigQueryConfig: BigQueryConfig = {
  projectId: "",
  datasetId: "",
  tableId: "",
  authJson: "",
};

export default function DataTransferPage() {
  const [mssqlConfig, setMssqlConfig] = React.useState<MssqlConfig>(initialMssqlConfig);
  const [bigQueryConfig, setBigQueryConfig] = React.useState<BigQueryConfig>(initialBigQueryConfig);
  const [transferDirection, setTransferDirection] = React.useState<TransferDirection>('');
  const [transferStatus, setTransferStatus] = React.useState<TransferStatus>('idle');
  const [transferProgress, setTransferProgress] = React.useState<number>(0);
  const [transferError, setTransferError] = React.useState<string | undefined>(undefined);
  const [transferHistory, setTransferHistory] = React.useState<TransferHistoryItem[]>([]);

  const { toast } = useToast();

  const isMssqlConfigured = !!(mssqlConfig.dbName && mssqlConfig.schemaName && mssqlConfig.tableName && mssqlConfig.hostUrl);
  const isBigQueryConfigured = !!(bigQueryConfig.projectId && bigQueryConfig.datasetId && bigQueryConfig.tableId);
  const isDirectionSelected = !!transferDirection;

  const isReadyToTransfer = isMssqlConfigured && isBigQueryConfigured && isDirectionSelected;

  const handleStartTransfer = async () => {
    if (!isReadyToTransfer) {
      toast({
        title: "Configuration Incomplete",
        description: "Please ensure MSSQL, BigQuery, and Transfer Direction are configured.",
        variant: "destructive",
      });
      return;
    }

    setTransferStatus('pending');
    setTransferProgress(0);
    setTransferError(undefined);

    // Simulate preparation phase
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTransferStatus('transferring');

    // Simulate transfer progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setTransferProgress(progress);
      } else {
        clearInterval(interval);
        // Simulate success or failure
        const isSuccess = Math.random() > 0.3; // 70% chance of success
        if (isSuccess) {
          setTransferStatus('success');
          toast({
            title: "Transfer Successful",
            description: "Data has been transferred successfully.",
          });
          addHistoryItem('success');
        } else {
          const errorMsg = "Simulated transfer error: Network issue.";
          setTransferStatus('error');
          setTransferError(errorMsg);
          toast({
            title: "Transfer Failed",
            description: errorMsg,
            variant: "destructive",
          });
          addHistoryItem('failure', errorMsg);
        }
      }
    }, 300);
  };

  const addHistoryItem = (status: 'success' | 'failure', error?: string) => {
    let sourceName = "";
    let destName = "";

    if (transferDirection === 'mssqlToBq') {
      sourceName = `${mssqlConfig.schemaName}.${mssqlConfig.tableName}`;
      destName = `${bigQueryConfig.datasetId}.${bigQueryConfig.tableId}`;
    } else if (transferDirection === 'bqToMssql') {
      sourceName = `${bigQueryConfig.datasetId}.${bigQueryConfig.tableId}`;
      destName = `${mssqlConfig.schemaName}.${mssqlConfig.tableName}`;
    }

    const newItem: TransferHistoryItem = {
      id: new Date().toISOString() + Math.random().toString(36).substring(2,7), // More unique ID
      source: sourceName,
      destination: destName,
      timestamp: new Date(),
      status,
      error,
      direction: transferDirection,
    };
    setTransferHistory(prev => [newItem, ...prev]);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MssqlConfigForm onConfigChange={setMssqlConfig} initialConfig={initialMssqlConfig} />
        <BigQueryConfigForm onConfigChange={setBigQueryConfig} initialConfig={initialBigQueryConfig} />
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <TransferDirectionSetup
            direction={transferDirection}
            onDirectionChange={setTransferDirection}
        />
        <DataTransferControls
            onStartTransfer={handleStartTransfer}
            status={transferStatus}
            progress={transferProgress}
            error={transferError}
            isReadyToTransfer={isReadyToTransfer}
            direction={transferDirection}
        />
      </div>
      
      <Separator />

      <TransferHistoryTable history={transferHistory} />
    </div>
  );
}
