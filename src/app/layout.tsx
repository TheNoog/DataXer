
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { Toaster } from "@/components/ui/toaster";
import { APP_NAME } from '@/config/appConfig';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Seamlessly transfer data between MSSQL and BigQuery.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} antialiased font-sans flex flex-col min-h-screen`}>
        <AppHeader />
        <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <AppFooter />
        <Toaster />
      </body>
    </html>
  );
}

