'use client';
import type { Insight } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Package, Shield, Bell, Tractor } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface InsightsSectionProps {
  insights: Insight;
}

const InsightCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  const { toast } = useToast();

  const handleReminderChange = (checked: boolean) => {
    toast({
      title: `${title} Reminders`,
      description: `Reminders have been turned ${checked ? 'ON' : 'OFF'}.`,
    });
  };

  return (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium font-headline flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{children}</p>
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
          <Switch id={`reminder-${title.toLowerCase()}`} onCheckedChange={handleReminderChange}/>
          <Label htmlFor={`reminder-${title.toLowerCase()}`} className="flex items-center gap-1 text-xs">
            <Bell className="h-3 w-3" />
            Set Reminder
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InsightCard
          icon={<Droplets className="h-5 w-5 text-blue-500" />}
          title="Irrigation"
        >
          {insights.irrigationRecommendation}
        </InsightCard>
        <InsightCard
          icon={<Package className="h-5 w-5 text-yellow-600" />}
          title="Fertilization"
        >
          {insights.fertilizationRecommendation}
        </InsightCard>
        <InsightCard
          icon={<Shield className="h-5 w-5 text-red-500" />}
          title="Pest Control"
        >
          {insights.pestControlRecommendation}
        </InsightCard>
         <InsightCard
          icon={<Tractor className="h-5 w-5 text-green-600" />}
          title="Ploughing"
        >
          {insights.ploughingRecommendation}
        </InsightCard>
      </CardContent>
    </Card>
  );
}
