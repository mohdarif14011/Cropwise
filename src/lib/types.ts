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

export type SensorData = {
  soilMoisture: number; // percentage
  soilTemperature: number; // Celsius
  phLevel: number;
  electricalConductivity: number; // mS/cm
  nitrogen: number; // ppm
  phosphorus: number; // ppm
  potassium: number; // ppm
  urea: number; // ppm
  nitrate: number; // ppm
  ammonium: number; // ppm
  tds: number; // ppm
  co2: number; // ppm
  soilCompaction: number; // kPa
};

export type Crop = {
  id: string;
  name: string;
  variety: string;
  imageUrl: string;
  lastUpdated: string;
  insights: Insight;
  historicalData: HistoricalDataPoint[];
  sensorData: SensorData;
};
