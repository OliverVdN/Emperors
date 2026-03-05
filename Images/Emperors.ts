export interface Era {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  description: string;
}

export interface Emperor {
  id: string;
  name: string;
  description: string;
  age: number;
  isActive: boolean;
  birthDate: string;
  imageUrl: string;
  status: string;
  titles: string[];
  era: Era;
}