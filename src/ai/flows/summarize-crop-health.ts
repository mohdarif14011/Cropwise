// SummarizeCropHealth.ts
'use server';

/**
 * @fileOverview Summarizes the health of a crop based on uploaded data and historical trends.
 *
 * - summarizeCropHealth - A function that summarizes the health of a crop.
 * - SummarizeCropHealthInput - The input type for the summarizeCropHealth function.
 * - SummarizeCropHealthOutput - The return type for the summarizeCropHealth function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCropHealthInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  uploadedData: z.string().describe('The latest uploaded data for the crop, including image and environmental data.'),
  historicalTrends: z.string().describe('A summary of the historical trends for this crop.'),
});
export type SummarizeCropHealthInput = z.infer<typeof SummarizeCropHealthInputSchema>;

const SummarizeCropHealthOutputSchema = z.object({
  summary: z.string().describe('A summarized overview of the crop\'s health.'),
  recommendations: z.string().describe('Actionable recommendations for the farmer.'),
});
export type SummarizeCropHealthOutput = z.infer<typeof SummarizeCropHealthOutputSchema>;

export async function summarizeCropHealth(input: SummarizeCropHealthInput): Promise<SummarizeCropHealthOutput> {
  return summarizeCropHealthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCropHealthPrompt',
  input: {schema: SummarizeCropHealthInputSchema},
  output: {schema: SummarizeCropHealthOutputSchema},
  prompt: `You are an AI assistant helping farmers understand the health of their crops.

  Based on the latest uploaded data and historical trends, provide a summarized overview of the crop's health and actionable recommendations.

  Crop Name: {{{cropName}}}
  Uploaded Data: {{{uploadedData}}}
  Historical Trends: {{{historicalTrends}}}

  Summary:
  Recommendations: `,
});

const summarizeCropHealthFlow = ai.defineFlow(
  {
    name: 'summarizeCropHealthFlow',
    inputSchema: SummarizeCropHealthInputSchema,
    outputSchema: SummarizeCropHealthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
