import type { Crop } from '@/lib/types';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CropCardProps {
  crop: Crop;
}

export function CropCard({ crop }: CropCardProps) {
  return (
    <Link href={`/crops/${crop.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-40 w-full">
          <Image
            src={crop.imageUrl}
            alt={crop.name}
            fill
            className="object-cover"
            data-ai-hint={`${crop.name.toLowerCase()} crop`}
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline tracking-tight">{crop.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{crop.variety}</p>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
