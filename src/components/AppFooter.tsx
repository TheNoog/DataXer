import { APP_NAME } from '@/config/appConfig';

export function AppFooter() {
  return (
    <footer className="py-4 px-6 border-t mt-auto">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}
