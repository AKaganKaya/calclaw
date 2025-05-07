// Faiz oranı için tip
export interface RateItem {
  startDate: string;
  rate: string;
}

// Faiz detayları için tip
export interface InterestDetail {
  periodStart: string;
  periodEnd: string;
  diffDays: number;
  rate: number;
  interest: string;
}

// Yeni: faiz türüne göre dosya seçer
async function fetchRates(type: 'avans' | 'yasal'): Promise<RateItem[]> {
  const fileName = type === 'avans' ? 'avans-faiz.json' : 'yasal-faiz.json';
  const response = await fetch(`/${fileName}`);
  if (!response.ok) {
    throw new Error(`Error fetching ${fileName}`);
  }
  return await response.json();
}

function parseDateTR(dateStr: string | Date): Date | null {
  if (dateStr instanceof Date) {
    return dateStr;
  }
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return new Date(dateStr);
  }
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
  principal: number,
  type: 'avans' | 'yasal'
): Promise<{ totalInterest: string; interestDetails: InterestDetail[] }> {
  const rates = await fetchRates(type);
  console.log(`Çekilen ${type} oranları:`, rates);

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
    const rawRate = (rates[i] as any).rate ?? (rates[i] as any).avansRate;
    const rate = parseFloat(rawRate);
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
