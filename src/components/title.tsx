import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';

export default async function Title() {
  return (
    <div>
      <Card>
        <CardHeader className="text-lg font-semibold">Sol Block Explorer</CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 text-sm">
          <p className="flex flex-col gap-1">
            <span className="opacity-70">Check list of blocks and detailed view</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
