export interface Place {
  id: string;
  name: string;
  description: string;
  category: 'restaurant' | 'coffee' | 'club';
  latitude: number;
  longitude: number;
  address: string;
  rating: number;
  image: string;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}
