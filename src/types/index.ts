
export interface MssqlConfig {
  dbName: string;
  schemaName: string;
  tableName: string;
  hostUrl: string;
  username?: string;
  password?: string;
}

export interface BigQueryConfig {
  projectId: string;
  datasetId: string;
  tableId: string;
  authJson?: string;
}

export type TransferDirection = 'mssqlToBq' | 'bqToMssql' | '';

export type TransferStatus = 'idle' | 'pending' | 'transferring' | 'success' | 'error';

export interface TransferHistoryItem {
  id: string;
  source: string;
  destination: string;
  timestamp: Date;
  status: 'success' | 'failure';
  error?: string;
  direction: TransferDirection;
}
