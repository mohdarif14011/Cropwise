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
  environmentalData: z
    .string()
    .describe('The environmental data including humidity, temperature, etc.'),
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

  Based on the provided crop photo and environmental data, provide specific recommendations for irrigation, fertilization, and pest control.

  Crop Photo: {{media url=cropPhotoDataUri}}
  Environmental Data: {{{environmentalData}}}

  Consider the following factors when generating your recommendations:
  - Crop health and appearance from the photo
  - Environmental conditions (humidity, temperature, etc.)
  - Best practices for the specific crop type (if identifiable from the photo)

  Format your recommendations clearly and concisely.
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
