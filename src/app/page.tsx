
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Mic,
  RefreshCw,
  ChevronDown,
  MapPin,
  Cloud,
  Wind,
  Droplets,
  Thermometer,
  CloudRain,
  Home,
  ShoppingBasket,
  Briefcase,
  Newspaper,
  Plus,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AddFieldDialog from '@/components/add-field-dialog';
import { useEffect, useState, useCallback } from 'react';
import { getWeather, type WeatherData } from '@/ai/flows/get-weather-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

interface WeatherCardProps {
    weather: WeatherData | null;
    isLoading: boolean;
}

function WeatherCard({ weather, isLoading }: WeatherCardProps) {

    if (isLoading) {
        return <WeatherCardSkeleton />;
    }

    if (!weather) {
        return null; // Or show an error state
    }

    return (
        <Card className="shadow-lg rounded-2xl -mt-16 z-10 relative">
            <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{weather.locationName}</span>
              </div>
              <div className="flex items-center">
                <Cloud className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-4xl font-bold">+{weather.temperature}°C</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-sm my-4">
              <div className="flex flex-col items-center">
                <Thermometer className="h-5 w-5 text-red-500 mb-1" />
                <span className="font-semibold">+{weather.soilTemperature}°C</span>
                <span className="text-muted-foreground text-xs">Soil temp</span>
              </div>
              <div className="flex flex-col items-center">
                <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                <span className="font-semibold">{weather.humidity}%</span>
                <span className="text-muted-foreground text-xs">Humidity</span>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="h-5 w-5 text-gray-500 mb-1" />
                <span className="font-semibold">{weather.windSpeed} m/s</span>
                <span className="text-muted-foreground text-xs">Wind</span>
              </div>
              <div className="flex flex-col items-center">
                <CloudRain className="h-5 w-5 text-gray-400 mb-1" />
                <span className="font-semibold">{weather.precipitation} mm</span>
                <span className="text-muted-foreground text-xs">Precipition</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{weather.sunrise}</span>
              <div className="w-full h-px bg-gray-200 border-dashed mx-4"></div>
              <span className="text-muted-foreground">{weather.sunset}</span>
            </div>
             <div className="text-xs text-center text-muted-foreground mt-1">
                <span>Sunrise & Sunset</span>
            </div>
          </CardContent>
        </Card>
    );
}

function WeatherCardSkeleton() {
    return (
        <Card className="shadow-lg rounded-2xl -mt-16 z-10 relative">
            <CardContent className="p-4">
                 <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <Skeleton className="h-5 w-24" />
                    </div>
                    <div className="flex items-center">
                        <Cloud className="h-8 w-8 text-blue-400 mr-2" />
                        <Skeleton className="h-10 w-16" />
                    </div>
                 </div>
                 <div className="grid grid-cols-4 gap-2 text-center text-sm my-4">
                    {[...Array(4)].map((_, i) => (
                         <div key={i} className="flex flex-col items-center space-y-1">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                    ))}
                 </div>
                 <div className="flex items-center justify-between text-sm">
                    <Skeleton className="h-4 w-12" />
                    <div className="w-full h-px bg-gray-200 border-dashed mx-4"></div>
                    <Skeleton className="h-4 w-12" />
                </div>
                <div className="text-xs text-center text-muted-foreground mt-1">
                    <Skeleton className="h-3 w-24 mx-auto" />
                </div>
            </CardContent>
        </Card>
    )
}


export default function MobileHomePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeather = useCallback(async () => {
    try {
        setIsLoading(true);
        const weatherData = await getWeather({ location: 'Chianti Hills' });
        setWeather(weatherData);
    } catch (error) {
        console.error("Failed to fetch weather", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const currentDate = format(new Date(), 'EEEE, dd MMM yyyy');

  return (
    <div className="min-h-screen bg-background text-foreground font-body flex flex-col">
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Hello, Farmers</h1>
            <div className="flex items-center text-sm opacity-80">
              <span>{currentDate}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30" onClick={fetchWeather}>
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
          <Input
            placeholder="Search here..."
            className="bg-white/20 border-none rounded-full pl-10 placeholder:text-primary-foreground/60 text-primary-foreground focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-white/50"
          />
          <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/60" />
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <WeatherCard weather={weather} isLoading={isLoading} />

        <section>
          <h2 className="text-xl font-bold mb-3">My Fields</h2>
           <Link href="/crops/tomato-1">
              <Card className="overflow-hidden rounded-2xl shadow-lg">
                <div className="relative h-48 w-full">
                  <Image
                    src="https://picsum.photos/600/300"
                    alt="My Field"
                    fill
                    className="object-cover"
                    data-ai-hint="field aerial view"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white text-lg font-bold">Tuscan Sun Vineyard</h3>
                  </div>
                </div>
              </Card>
           </Link>
        </section>
      </main>

      <div className="sticky bottom-20 right-4 self-end z-20">
         <AddFieldDialog>
            <Button
                size="icon"
                className="rounded-full h-14 w-14 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            >
                <Plus className="h-8 w-8" />
            </Button>
         </AddFieldDialog>
      </div>

      <footer className="sticky bottom-0 px-6 pb-4 z-20">
        <div className="flex justify-around items-center bg-gray-900 text-white h-16 rounded-full shadow-lg">
          <Link href="#" className="p-3 text-primary flex flex-col items-center gap-1">
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="#" className="p-3 flex flex-col items-center gap-1">
            <ShoppingBasket className="h-6 w-6" />
            <span className="text-xs">Products</span>
          </Link>
          <Link href="#" className="p-3 flex flex-col items-center gap-1">
            <Briefcase className="h-6 w-6" />
            <span className="text-xs">Services</span>
          </Link>
          <Link href="#" className="p-3 flex flex-col items-center gap-1">
            <Newspaper className="h-6 w-6" />
            <span className="text-xs">Blogs</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
