// src/utils/avans_faiz.ts

// Faiz oranı için tip
export interface AvansRate {
  startDate: string;
  avansRate: string;
}

// Faiz detayları için tip
export interface InterestDetail {
  periodStart: string;
  periodEnd: string;
  diffDays: number;
  rate: number;
  interest: string;
}

// Read data from the local file
export async function fetchAvansRates(): Promise<AvansRate[]> {
  const response = await fetch('/avans-faiz.json'); // Fetch from public directory
  if (!response.ok) {
    throw new Error('Error fetching avans-faiz.json');
  }
  return await response.json();
}

function parseDateTR(dateStr: string | Date): Date | null {
  // Check if the date is already a Date object
  if (dateStr instanceof Date) {
    return dateStr;
  }

  // Check if the date is in YYYY-MM-DD format (e.g., "2020-03-25")
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return new Date(dateStr);
  }

  // Check if the date is in DD.MM.YYYY format (e.g., "25.03.2020")
  if (typeof dateStr === 'string' && dateStr.includes('.')) {
    const [day, month, year] = dateStr.split('.');
    if (!day || !month || !year) {
      console.error('Invalid date format:', dateStr);
      return null;
    }
    return new Date(`${year}-${month}-${day}`);
  }

  console.error('Invalid date format:', dateStr);
  return null;
}

export async function calculateInterest(
  startDateStr: string,
  endDateStr: string,
  principal: number
): Promise<{ totalInterest: string; interestDetails: InterestDetail[] }> {
  const rates = await fetchAvansRates();
  console.log('Çekilen faiz oranları:', rates);

  const startDate = parseDateTR(startDateStr);
  const endDate = parseDateTR(endDateStr);
  if (!startDate || !endDate) {
    throw new Error('Geçersiz tarih formatı');
  }

  let current = new Date(startDate);
  let totalInterest = 0;

  const interestDetails: InterestDetail[] = [];

  for (let i = 0; i < rates.length; i++) {
    const rateStart = parseDateTR(rates[i].startDate);
    const nextRateStart =
      i + 1 < rates.length ? parseDateTR(rates[i + 1].startDate) : endDate;

    if (!rateStart || !nextRateStart) continue;

    const periodStart = current > rateStart ? current : rateStart;
    const periodEnd = nextRateStart < endDate ? nextRateStart : endDate;

    if (periodStart >= periodEnd) continue;

    const diffDays = Math.ceil(
      (periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    const rate = parseFloat(rates[i].avansRate);
    if (isNaN(rate)) {
      console.warn(`Geçersiz faiz oranı bulundu, atlanıyor: `, rates[i]);
      continue;
    }

    const interest = principal * (rate / 100) * (diffDays / 365);
    totalInterest += interest;

    interestDetails.push({
      periodStart: periodStart.toLocaleDateString('tr-TR'),
      periodEnd: periodEnd.toLocaleDateString('tr-TR'),
      diffDays,
      rate,
      interest: interest.toFixed(2),
    });
  }

  return { totalInterest: totalInterest.toFixed(2), interestDetails };
}