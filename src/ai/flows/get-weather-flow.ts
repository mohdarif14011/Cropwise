'use server';

/**
 * @fileOverview A flow for fetching weather data.
 *
 * - getWeather - A function that handles fetching weather data.
 * - GetWeatherInput - The input type for the getWeather function.
 * - WeatherData - The return type for the getWeather function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getCurrentWeather, type WeatherData as WeatherDataType } from '@/services/weather';

const GetWeatherInputSchema = z.object({
  location: z.string().describe('The location to fetch weather for.'),
});
export type GetWeatherInput = z.infer<typeof GetWeatherInputSchema>;

const WeatherDataSchema = z.object({
    locationName: z.string(),
    temperature: z.number(),
    conditionIcon: z.string().describe('An icon representing the weather condition (e.g., "Cloud")'),
    soilTemperature: z.number(),
    humidity: z.number(),
    windSpeed: z.number(),
    precipitation: z.number(),
    sunrise: z.string(),
    sunset: z.string(),
});
export type WeatherData = z.infer<typeof WeatherDataSchema>;


export async function getWeather(input: GetWeatherInput): Promise<WeatherData> {
  return getWeatherFlow(input);
}

const getWeatherFlow = ai.defineFlow(
  {
    name: 'getWeatherFlow',
    inputSchema: GetWeatherInputSchema,
    outputSchema: WeatherDataSchema,
  },
  async ({ location }) => {
    // In a real application, this would call an external weather API.
    // For this example, we'll use a mock service.
    const weatherData = await getCurrentWeather(location);
    return weatherData;
  }
);
