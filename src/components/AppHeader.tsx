import { DatabaseZap } from 'lucide-react';
import { APP_NAME } from '@/config/appConfig';

export function AppHeader() {
  return (
    <header className="py-4 px-6 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
      <div className="container mx-auto flex items-center gap-2">
        <DatabaseZap className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary">{APP_NAME}</h1>
      </div>
    </header>
  );
}
