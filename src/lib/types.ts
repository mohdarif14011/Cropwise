export type Insight = {
  irrigationRecommendation: string;
  fertilizationRecommendation: string;
  pestControlRecommendation: string;
};

export type HistoricalDataPoint = {
  date: string;
  temperature: number;
  humidity: number;
  health: number; // 0-100 scale
};

export type Crop = {
  id: string;
  name: string;
  variety: string;
  imageUrl: string;
  lastUpdated: string;
  insights: Insight;
  historicalData: HistoricalDataPoint[];
};
