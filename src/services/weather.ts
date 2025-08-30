/**
 * @fileOverview A service for fetching weather data.
 */

export interface WeatherData {
    locationName: string;
    temperature: number;
    conditionIcon: string;
    soilTemperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    sunrise: string;
    sunset: string;
}

/**
 * Fetches the current weather for a given location.
 * In a real application, this would call an external weather API.
 * For this example, we return mock data.
 * @param location The location to fetch weather for.
 * @returns A promise that resolves to the weather data.
 */
export async function getCurrentWeather(location: string): Promise<WeatherData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Return mock data
  return {
    locationName: location,
    temperature: 16,
    conditionIcon: 'Cloud',
    soilTemperature: 22,
    humidity: 59,
    windSpeed: 6,
    precipitation: 0,
    sunrise: '5:25 am',
    sunset: '8:04 pm',
  };
}
