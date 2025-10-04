
export interface RouteStop {
  id: string;
  name: string;
  estimatedTime: number; // in minutes from start
}

export interface RouteData {
  id: string;
  name: string;
  type: 'shuttle' | 'trotro';
  fare: number;
  estimatedDuration: number; // total duration in minutes
  stops: RouteStop[];
  operatingHours: string;
  frequency: string; // e.g., "Every 15 minutes"
  color: string;
}

export interface Location {
  id: string;
  name: string;
  category: 'academic' | 'residential' | 'landmark' | 'entrance';
}
