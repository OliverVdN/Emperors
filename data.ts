import { Emperor, Era } from "./Emperors";

const EMPERORS_URL = "https://raw.githubusercontent.com/OliverVdN/Emperors/refs/heads/main/Emperors.json";
const ERAS_URL = "https://raw.githubusercontent.com/OliverVdN/Emperors/refs/heads/main/Eras.json";

export async function getEmperors(): Promise<Emperor[]> {
  const res = await fetch(EMPERORS_URL);
  const data = await res.json();
  return data as Emperor[];
}

export async function getEras(): Promise<Era[]> {
  const res = await fetch(ERAS_URL);
  const data = await res.json();
  return data as Era[];
}