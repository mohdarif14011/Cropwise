
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Video, VideoOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function ScanQrPage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API is not supported in this browser.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support camera access.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
        // Stop camera stream when component unmounts
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-4">
      <header className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-bold">Scan QR Code</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            </div>
          </CardContent>
        </Card>

        {hasCameraPermission === false && (
            <Alert variant="destructive" className="mt-4">
                <VideoOff className="h-4 w-4" />
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                Please allow camera access to use this feature. You might need to change permissions in your browser or system settings.
                </AlertDescription>
            </Alert>
        )}

         <p className="text-muted-foreground text-center mt-4 text-sm">
            Point your camera at the QR code on the field machine.
         </p>

      </main>
    </div>
  );
}
