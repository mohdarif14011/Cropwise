import { getCropById } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HistoricalDataChart from '@/components/crop-details/historical-data-chart';
import CropDetailsClient from '@/components/crop-details/crop-details-client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CropDetailPage({ params }: { params: { id: string } }) {
  const crop = getCropById(params.id);

  if (!crop) {
    notFound();
  }

  return (
    <div>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-start justify-between space-y-2">
          <div className='flex items-center gap-2'>
            <Button asChild variant="ghost" size="icon">
                <Link href="/">
                    <ArrowLeft />
                </Link>
            </Button>
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                {crop.name}
                </h1>
                <p className="text-muted-foreground">{crop.variety}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="relative aspect-video w-full rounded-md overflow-hidden">
                  <Image
                    src={crop.imageUrl}
                    alt={crop.name}
                    fill
                    className="object-cover"
                    data-ai-hint={`${crop.name.toLowerCase()} crop`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="font-headline">Historical Data</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <HistoricalDataChart data={crop.historicalData} />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
             <CropDetailsClient initialInsights={crop.insights} />
          </div>
        </div>
      </div>
    </div>
  );
}
