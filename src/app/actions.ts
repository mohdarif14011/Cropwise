'use server';

import { generateCropInsights } from "@/ai/flows/generate-crop-insights";
import { z } from "zod";
import type { Insight } from "@/lib/types";

export interface FormState {
    message: string;
    insights: Insight | null;
    fieldErrors: Record<string, string[] | undefined>;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
  temperature: z.coerce.number({invalid_type_error: "Please enter a valid number."}).min(-50).max(100),
  humidity: z.coerce.number({invalid_type_error: "Please enter a valid number."}).min(0).max(100),
  cropPhoto: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Crop photo is required.")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

async function fileToDataUri(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${file.type};base64,${base64}`;
}


export async function getNewInsights(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

    const validatedFields = schema.safeParse({
        temperature: formData.get('temperature'),
        humidity: formData.get('humidity'),
        cropPhoto: formData.get('cropPhoto'),
    });

    if (!validatedFields.success) {
        return {
            message: "Validation failed.",
            insights: null,
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    const { temperature, humidity, cropPhoto } = validatedFields.data;

    try {
        const cropPhotoDataUri = await fileToDataUri(cropPhoto);
        const environmentalData = `Temperature: ${temperature}°C, Humidity: ${humidity}%`;
        
        const insights = await generateCropInsights({
            cropPhotoDataUri,
            environmentalData,
        });

        return {
            message: "Insights generated successfully.",
            insights,
            fieldErrors: {},
        };

    } catch (error) {
        console.error("Error generating insights:", error);
        return {
            message: "An unexpected error occurred. Please try again.",
            insights: null,
            fieldErrors: {},
        };
    }
}
