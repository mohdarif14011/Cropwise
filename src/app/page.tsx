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
  MessageSquare,
  User,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const commodities = [
  { name: 'Rice', image: 'https://picsum.photos/100/100?random=1' },
  { name: 'Corn', image: 'https://picsum.photos/100/100?random=2' },
  { name: 'Grapes', image: 'https://picsum.photos/100/100?random=3' },
  { name: 'Potato', image: 'https://picsum.photos/100/100?random=4' },
  { name: 'Olive', image: 'https://picsum.photos/100/100?random=5' },
  { name: 'Tomato', image: 'https://picsum.photos/100/100?random=6' },
];

export default function MobileHomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body flex flex-col">
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Hello, Farmers</h1>
            <div className="flex items-center text-sm opacity-80">
              <span>Sunday, 01 Dec 2024</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30">
            <RefreshCw className="h-5 w-5" />
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
        <Card className="shadow-lg rounded-2xl -mt-16 z-10 relative">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Chianti Hills</span>
              </div>
              <div className="flex items-center">
                <Cloud className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-4xl font-bold">+16°C</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-sm my-4">
              <div className="flex flex-col items-center">
                <Thermometer className="h-5 w-5 text-red-500 mb-1" />
                <span className="font-semibold">+22°C</span>
                <span className="text-muted-foreground text-xs">Soil temp</span>
              </div>
              <div className="flex flex-col items-center">
                <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                <span className="font-semibold">59%</span>
                <span className="text-muted-foreground text-xs">Humidity</span>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="h-5 w-5 text-gray-500 mb-1" />
                <span className="font-semibold">6 m/s</span>
                <span className="text-muted-foreground text-xs">Wind</span>
              </div>
              <div className="flex flex-col items-center">
                <CloudRain className="h-5 w-5 text-gray-400 mb-1" />
                <span className="font-semibold">0 mm</span>
                <span className="text-muted-foreground text-xs">Precipition</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">5:25 am</span>
              <div className="w-full h-px bg-gray-200 border-dashed mx-4"></div>
              <span className="text-muted-foreground">8:04 pm</span>
            </div>
             <div className="text-xs text-center text-muted-foreground mt-1">
                <span>Sunrise & Sunset</span>
            </div>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-xl font-bold mb-3">Commodities and Food</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
            {commodities.map((item) => (
              <div key={item.name} className="flex-shrink-0 text-center">
                <div className="w-16 h-16 rounded-xl bg-card shadow-md p-1">
                    <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="object-cover rounded-lg w-full h-full"
                    data-ai-hint={`${item.name.toLowerCase()} commodity`}
                    />
                </div>
                <span className="text-sm mt-2 block">{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">My Fields</h2>
          <Card className="overflow-hidden rounded-2xl shadow-lg">
            <div className="relative h-48 w-full">
              <Image
                src="https://picsum.photos/600/300"
                alt="My Field"
                fill
                className="object-cover"
                data-ai-hint="field aerial view"
              />
            </div>
          </Card>
        </section>
      </main>

      <footer className="sticky bottom-0 px-6 pb-4 z-20">
        <div className="flex justify-around items-center bg-gray-900 text-white h-16 rounded-full shadow-lg">
          <Link href="#" className="p-3 text-primary">
            <Home className="h-6 w-6" />
          </Link>
          <Link href="#" className="p-3">
            <Cloud className="h-6 w-6" />
          </Link>
          <Link href="#" className="p-3">
            <MessageSquare className="h-6 w-6" />
          </Link>
          <Link href="#" className="p-3">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
