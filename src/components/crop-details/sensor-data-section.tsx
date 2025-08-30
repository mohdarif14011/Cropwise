import type { SensorData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SensorDataSectionProps {
  data: SensorData;
}

const DataRow = ({ label, value, unit }: { label: string; value: React.ReactNode; unit?: string }) => (
    <>
        <div className="flex justify-between items-center py-3">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
            {value} {unit}
        </span>
        </div>
        <Separator />
    </>
);

export default function SensorDataSection({ data }: SensorDataSectionProps) {
  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle>Live Sensor Data</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="space-y-1">
            <DataRow label="Soil Moisture" value={data.soilMoisture} unit="%" />
            <DataRow label="Soil Temperature" value={data.soilTemperature} unit="°C" />
            <DataRow label="pH Level" value={data.phLevel} />
            <DataRow label="Electrical Conductivity (EC)" value={data.electricalConductivity} unit="mS/cm" />
            <DataRow label="Nitrogen, Phosphorus, Potassium" value={`${data.nitrogen}-${data.phosphorus}-${data.potassium}`} unit="ppm" />
            <DataRow label="Urea, Nitrate, Ammonium" value={`${data.urea}/${data.nitrate}/${data.ammonium}`} unit="ppm" />
            <DataRow label="TDS (Salinity)" value={data.tds} unit="ppm" />
            <DataRow label="CO₂ (Soil Respiration)" value={data.co2} unit="ppm" />
            <DataRow label="Soil Compaction" value={data.soilCompaction} unit="kPa" />
        </div>
      </CardContent>
    </Card>
  );
}
