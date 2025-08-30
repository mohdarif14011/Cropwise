'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getNewInsights, type FormState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Bot, UploadCloud } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import type { Insight } from '@/lib/types';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Bot className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Get New Insights'
      )}
    </Button>
  );
}

interface UpdateDataFormProps {
    onNewInsights: (insights: Insight | null) => void;
}

export default function UpdateDataForm({ onNewInsights }: UpdateDataFormProps) {
  const initialState: FormState = { message: '', insights: null, fieldErrors: {} };
  const [state, formAction] = useFormState(getNewInsights, initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        setPreviewUrl(null);
    }
  };

  useEffect(() => {
    if (state.message === "Insights generated successfully.") {
        onNewInsights(state.insights);
        // Reset form visually
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.form?.reset();
        }
    }
  }, [state, onNewInsights]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Update Data</CardTitle>
        <CardDescription>Upload a new photo and current environmental data to get the latest AI insights.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cropPhoto">Crop Photo</Label>
            <div className="relative flex justify-center items-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors" onClick={() => fileInputRef.current?.click()}>
              {previewUrl ? (
                <Image src={previewUrl} alt="Crop preview" fill className="object-contain rounded-md p-1" />
              ) : (
                <div className="text-center text-muted-foreground">
                    <UploadCloud className="mx-auto h-8 w-8"/>
                    <p className="text-xs">Click to upload</p>
                </div>
              )}
            </div>
            <Input id="cropPhoto" name="cropPhoto" type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
            {state.fieldErrors?.cropPhoto && <p className="text-sm font-medium text-destructive">{state.fieldErrors.cropPhoto[0]}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input id="temperature" name="temperature" type="number" step="0.1" placeholder="e.g. 25.5" />
              {state.fieldErrors?.temperature && <p className="text-sm font-medium text-destructive">{state.fieldErrors.temperature[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="humidity">Humidity (%)</Label>
              <Input id="humidity" name="humidity" type="number" step="1" placeholder="e.g. 60" />
              {state.fieldErrors?.humidity && <p className="text-sm font-medium text-destructive">{state.fieldErrors.humidity[0]}</p>}
            </div>
          </div>
          
          <SubmitButton />

          {state.message && state.message !== "Insights generated successfully." && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

        </form>
      </CardContent>
    </Card>
  );
}
