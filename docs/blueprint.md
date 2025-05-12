# **App Name**: DataXer

## Core Features:

- MSSQL Configuration: Configure MSSQL connection settings: Database name, schema name, table name, host URL, authentication details.
- BigQuery Configuration: Configure BigQuery connection settings: Project ID, Dataset ID, Table ID, authentication details
- Transfer Direction Setup: Define the transfer direction: MSSQL to BigQuery or BigQuery to MSSQL. This option could be set either automatically through an 'AI tool' or manually. AI tool shall try to set the optimal direction.
- Data Transfer: Initiate the data transfer process based on the configurations. Provide feedback on transfer status, any errors, or other significant events.
- Transfer History: Display a log of completed data transfers, including source, destination, and success/failure status.

## Style Guidelines:

- Primary color: Dark blue (#1A237E) to convey a sense of data security and stability.
- Secondary color: Light grey (#F5F5F5) to maintain a clean layout for data readability.
- Accent: Teal (#00ACC1) for interactive elements like buttons and data status indicators.
- Clear and concise typography for forms, configurations, and historical records.
- Use database and cloud-related icons.
- Left-aligned, single-column forms for clear readability.
- Progress animations when executing the transfer jobs.