import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function NotFoundPage() {
  return (
    <main className="flex flex-col justify-center items-center h-[50vh]">
      <p className="text-2xl mb-6">Page not found</p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}

export default NotFoundPage;
