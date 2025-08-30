'use server';

/**
 * @fileOverview An AI agent that provides insights and recommendations for crop management based on uploaded data.
 *
 * - generateCropInsights - A function that handles the crop insights generation process.
 * - GenerateCropInsightsInput - The input type for the generateCropInsights function.
 * - GenerateCropInsightsOutput - The return type for the generateCropInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCropInsightsInputSchema = z.object({
  cropPhotoDataUri: z
    .string()
    .describe(
      "A photo of the crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  temperature: z.number().describe('The current temperature in Celsius.'),
  humidity: z.number().describe('The current humidity percentage.'),
  ph: z.number().describe('The pH level of the soil.'),
  soilMoisture: z.number().describe('The soil moisture percentage.'),
  co2: z.number().describe('The CO2 level in ppm.'),
  nitrogen: z.number().describe('The Nitrogen (N) level in the soil.'),
  phosphorus: z.number().describe('The Phosphorus (P) level in the soil.'),
  potassium: z.number().describe('The Potassium (K) level in the soil.'),
});
export type GenerateCropInsightsInput = z.infer<typeof GenerateCropInsightsInputSchema>;

const GenerateCropInsightsOutputSchema = z.object({
  irrigationRecommendation: z
    .string()
    .describe('The recommendation for irrigation.'),
  fertilizationRecommendation: z
    .string()
    .describe('The recommendation for fertilization, including NPK levels.'),
  pestControlRecommendation: z
    .string()
    .describe('The recommendation for pest control.'),
});
export type GenerateCropInsightsOutput = z.infer<typeof GenerateCropInsightsOutputSchema>;

export async function generateCropInsights(
  input: GenerateCropInsightsInput
): Promise<GenerateCropInsightsOutput> {
  return generateCropInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCropInsightsPrompt',
  input: {schema: GenerateCropInsightsInputSchema},
  output: {schema: GenerateCropInsightsOutputSchema},
  prompt: `You are an expert agronomist providing insights and recommendations for crop management.

  Based on the provided crop photo and detailed sensor data, provide specific recommendations for irrigation, fertilization, and pest control.

  Crop Photo: {{media url=cropPhotoDataUri}}
  
  Sensor Data:
  - Temperature: {{{temperature}}}°C
  - Humidity: {{{humidity}}}%
  - Soil pH: {{{ph}}}
  - Soil Moisture: {{{soilMoisture}}}%
  - CO2 Level: {{{co2}}} ppm
  - Nitrogen (N): {{{nitrogen}}}
  - Phosphorus (P): {{{phosphorus}}}
  - Potassium (K): {{{potassium}}}

  Consider the following factors when generating your recommendations:
  - Crop health and appearance from the photo.
  - The detailed environmental and soil conditions from the sensor data.
  - Best practices for the specific crop type (if identifiable from the photo).

  Format your recommendations to be clear, concise, and actionable for a farmer.
  `,
});

const generateCropInsightsFlow = ai.defineFlow(
  {
    name: 'generateCropInsightsFlow',
    inputSchema: GenerateCropInsightsInputSchema,
    outputSchema: GenerateCropInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
