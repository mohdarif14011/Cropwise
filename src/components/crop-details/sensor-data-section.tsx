import type { SensorData, SensorValue } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SensorDataSectionProps {
  data: SensorData;
}

const getStatusColor = (current: number, min: number, max: number): string => {
  if (current < min || current > max) {
    return 'bg-destructive'; // Red for out of range
  }

  const range = max - min;
  const lowerYellowBound = min + range * 0.25;
  const upperYellowBound = max - range * 0.25;

  if (current >= lowerYellowBound && current <= upperYellowBound) {
    return 'bg-green-500'; // Green for optimal range
  }

  return 'bg-yellow-500'; // Yellow for acceptable range
};

const DataRow = ({ label, value, unit }: { label: string; value: SensorValue; unit?: string }) => {
    const progressValue = ((value.current - value.min) / (value.max - value.min)) * 100;

    return (
        <div className="py-3 space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{value.current} {unit}</span>
                    <span className="text-xs text-muted-foreground">({value.min}-{value.max} {unit})</span>
                </div>
            </div>
            <Progress value={progressValue} indicatorClassName={getStatusColor(value.current, value.min, value.max)}/>
        </div>
    )
};

const NPKRow = ({ n, p, k }: { n: SensorValue; p: SensorValue; k: SensorValue }) => {
    return (
        <div className="py-3 space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">NPK Ratio</span>
                 <div className="flex items-center gap-2">
                    <span className="font-semibold">{`${n.current}-${p.current}-${k.current}`}</span>
                    <span className="text-xs text-muted-foreground">(ppm)</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <p className="text-xs text-center text-muted-foreground">N ({n.min}-{n.max})</p>
                    <Progress value={((n.current - n.min) / (n.max - n.min)) * 100} indicatorClassName={getStatusColor(n.current, n.min, n.max)} />
                </div>
                <div>
                    <p className="text-xs text-center text-muted-foreground">P ({p.min}-{p.max})</p>
                    <Progress value={((p.current - p.min) / (p.max - p.min)) * 100} indicatorClassName={getStatusColor(p.current, p.min, p.max)} />
                </div>
                 <div>
                    <p className="text-xs text-center text-muted-foreground">K ({k.min}-{k.max})</p>
                    <Progress value={((k.current - k.min) / (k.max - k.min)) * 100} indicatorClassName={getStatusColor(k.current, k.min, k.max)} />
                </div>
            </div>
        </div>
    )
}

export default function SensorDataSection({ data }: SensorDataSectionProps) {
  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle>Live Sensor Data</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-border">
            <DataRow label="Soil Moisture" value={data.soilMoisture} unit="%" />
            <DataRow label="Soil Temperature" value={data.soilTemperature} unit="°C" />
            <DataRow label="pH Level" value={data.phLevel} />
            <DataRow label="Electrical Conductivity" value={data.electricalConductivity} unit="mS/cm" />
            <NPKRow n={data.nitrogen} p={data.phosphorus} k={data.potassium} />
            <DataRow label="Urea" value={data.urea} unit="ppm" />
            <DataRow label="Nitrate" value={data.nitrate} unit="ppm" />
            <DataRow label="Ammonium" value={data.ammonium} unit="ppm" />
            <DataRow label="TDS (Salinity)" value={data.tds} unit="ppm" />
            <DataRow label="CO₂ (Soil Respiration)" value={data.co2} unit="ppm" />
            <DataRow label="Soil Compaction" value={data.soilCompaction} unit="kPa" />
      </CardContent>
    </Card>
  );
}
