export type Insight = {
  irrigationRecommendation: string;
  fertilizationRecommendation: string;
  pestControlRecommendation: string;
  ploughingRecommendation: string;
};

export type HistoricalDataPoint = {
  date: string;
  temperature: number;
  humidity: number;
  health: number; // 0-100 scale
};

export type SensorValue = {
  current: number;
  min: number;
  max: number;
};

export type SensorData = {
  soilMoisture: SensorValue; // percentage
  soilTemperature: SensorValue; // Celsius
  phLevel: SensorValue;
  electricalConductivity: SensorValue; // mS/cm
  nitrogen: SensorValue; // ppm
  phosphorus: SensorValue; // ppm
  potassium: SensorValue; // ppm
  urea: SensorValue; // ppm
  nitrate: SensorValue; // ppm
  ammonium: SensorValue; // ppm
  tds: SensorValue; // ppm
  co2: SensorValue; // ppm
  soilCompaction: SensorValue; // kPa
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
