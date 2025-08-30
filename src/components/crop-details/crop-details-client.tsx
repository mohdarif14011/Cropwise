'use client';

import { useState, useEffect } from 'react';
import type { Insight } from '@/lib/types';
import InsightsSection from './insights-section';
import UpdateDataForm from './update-data-form';

interface CropDetailsClientProps {
  initialInsights: Insight;
}

export default function CropDetailsClient({ initialInsights }: CropDetailsClientProps) {
  const [insights, setInsights] = useState<Insight>(initialInsights);

  const handleNewInsights = (newInsights: Insight | null) => {
    if (newInsights) {
      setInsights(newInsights);
    }
  };

  return (
    <div className="space-y-4">
      <UpdateDataForm onNewInsights={handleNewInsights} />
      <InsightsSection insights={insights} />
    </div>
  );
}
