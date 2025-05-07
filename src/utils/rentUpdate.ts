// src/utils/rentUpdate.ts

export interface InflationData {
  [key: string]: number; // Örneğin: { "2024-05": 15.3 }
}

export interface RentUpdate {
  date: string;
  rate: number;
  rent: number;
}

export async function fetchInflationData(): Promise<InflationData> {
  const response = await fetch('/inflationData.json'); // public klasöründen fetch
  if (!response.ok) {
    throw new Error('Error fetching inflationData.json');
  }
  return await response.json();
}

export async function calculateRentUpdates(
  startDate: Date,
  startRent: number,
  now: Date = new Date()
): Promise<RentUpdate[]> {
  const inflationData = await fetchInflationData();
  let rent = startRent;
  const updates: RentUpdate[] = [];

  // ✅ İlk güncelleme tarihi: Başlangıçtan 1 yıl sonrası
  let current = new Date(startDate);
  current.setFullYear(current.getFullYear() + 1);
  current.setDate(1); // Ayın 1’i olsun

  while (current <= now) {
    const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
    if (inflationData[key]) {
      const rate = inflationData[key];
      rent = rent * (1 + rate / 100);
      updates.push({ date: key, rate, rent: Math.round(rent) });
    }
    current.setFullYear(current.getFullYear() + 1);
  }

  return updates;
}
