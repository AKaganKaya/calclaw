// src/utils/calculations.js

export const explainNetSalaryCalculation = (gross: number) => {
    const sgk = gross * 0.14;
    const unemployment = gross * 0.01;
    const stampTax = gross * 0.00759;
    const taxableIncome = gross - sgk - unemployment;
  
    let incomeTax = 0;
    let incomeExplanation = '';
  
    if (taxableIncome <= 158000) {
      incomeTax = taxableIncome * 0.15;
      incomeExplanation = `%15 gelir vergisi diliminde (${taxableIncome.toFixed(2)} TL üzerinden)`;
    } else if (taxableIncome <= 330000) {
      incomeTax = 158000 * 0.15 + (taxableIncome - 158000) * 0.20;
      incomeExplanation = `İlk 158.000 TL için %15, kalan ${(taxableIncome - 158000).toFixed(2)} TL için %20 gelir vergisi`;
    } else {
      incomeExplanation = `Kademeli vergi dilimleri uygulandı.`;
      incomeTax = 158000 * 0.15 + (330000 - 158000) * 0.20 + (taxableIncome - 330000) * 0.27;
    }
  
    const net = gross - sgk - unemployment - stampTax - incomeTax;
  
    return {
      net,
      explanation: `
  ➤ Brüt Maaş: ${gross.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
  ➤ SGK İşçi Payı (%14): ${sgk.toFixed(2)} TL
  ➤ İşsizlik Sigortası (%1): ${unemployment.toFixed(2)} TL
  ➤ Damga Vergisi (%0.759): ${stampTax.toFixed(2)} TL
  ➤ Gelir Vergisi: ${incomeTax.toFixed(2)} TL (${incomeExplanation})
  ➤ Vergiye Tabi Gelir: ${taxableIncome.toFixed(2)} TL
  `.trim()
    };
  };
  
  export const explainGrossSalaryCalculation = (net: number) => {
    const estimatedGross = net / 0.70;
    return {
      gross: estimatedGross,
      explanation: `
  ➤ Net maaş yaklaşık olarak %30 toplam kesinti varsayımı ile brüt maaşa çevrilmiştir.
  ➤ Bu oran SGK, işsizlik, damga vergisi ve gelir vergisi kesintilerini kapsar.
  ➤ Gerçek brüt maaş, kişisel vergi dilimlerine ve yıl içi gelir değişimine göre farklılık gösterebilir.
  `.trim()
    };
  };
  