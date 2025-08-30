import { getCropById } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HistoricalDataChart from '@/components/crop-details/historical-data-chart';
import InsightsSection from '@/components/crop-details/insights-section';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SensorDataSection from '@/components/crop-details/sensor-data-section';

export default function CropDetailPage({ params }: { params: { id: string } }) {
  const crop = getCropById(params.id);

  if (!crop) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
       <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b">
         <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon">
                <Link href="/">
                    <ArrowLeft />
                </Link>
            </Button>
            <div>
                <h1 className="text-xl font-bold tracking-tight">
                {crop.name}
                </h1>
                <p className="text-sm text-muted-foreground">{crop.variety}</p>
            </div>
          </div>
       </header>

      <main className="flex-1 p-4 space-y-6">
        <Card className="rounded-2xl overflow-hidden shadow-lg">
          <CardContent className="p-0">
            <div className="relative aspect-video w-full">
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

        <InsightsSection insights={crop.insights} />

        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>Historical Data</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <HistoricalDataChart data={crop.historicalData} />
          </CardContent>
        </Card>

        <SensorDataSection data={crop.sensorData} />

      </main>
    </div>
  );
}
