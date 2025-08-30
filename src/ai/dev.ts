import { config } from 'dotenv';
config();

import '@/ai/flows/generate-crop-insights.ts';
import '@/ai/flows/summarize-crop-health.ts';
import '@/ai/flows/get-weather-flow.ts';
