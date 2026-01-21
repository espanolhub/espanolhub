import { Number } from '../types';

export const numbers: Number[] = [
  { number: 0, word: 'cero', pronunciation: 'seh-roh' },
  { number: 1, word: 'uno', pronunciation: 'oo-noh' },
  { number: 2, word: 'dos', pronunciation: 'dohs' },
  { number: 3, word: 'tres', pronunciation: 'trehs' },
  { number: 4, word: 'cuatro', pronunciation: 'kwah-troh' },
  { number: 5, word: 'cinco', pronunciation: 'seen-koh' },
  { number: 6, word: 'seis', pronunciation: 'says' },
  { number: 7, word: 'siete', pronunciation: 'syeh-teh' },
  { number: 8, word: 'ocho', pronunciation: 'oh-choh' },
  { number: 9, word: 'nueve', pronunciation: 'nweh-veh' },
  { number: 10, word: 'diez', pronunciation: 'dyehs' },
  { number: 11, word: 'once', pronunciation: 'ohn-seh' },
  { number: 12, word: 'doce', pronunciation: 'doh-seh' },
  { number: 13, word: 'trece', pronunciation: 'treh-seh' },
  { number: 14, word: 'catorce', pronunciation: 'kah-tor-seh' },
  { number: 15, word: 'quince', pronunciation: 'keen-seh' },
  { number: 16, word: 'dieciséis', pronunciation: 'dyeh-see-says' },
  { number: 17, word: 'diecisiete', pronunciation: 'dyeh-see-syeh-teh' },
  { number: 18, word: 'dieciocho', pronunciation: 'dyeh-see-oh-choh' },
  { number: 19, word: 'diecinueve', pronunciation: 'dyeh-see-nweh-veh' },
  { number: 20, word: 'veinte', pronunciation: 'vayn-teh' },
  { number: 21, word: 'veintiuno', pronunciation: 'vayn-tee-oo-noh' },
  { number: 22, word: 'veintidós', pronunciation: 'vayn-tee-dohs' },
  { number: 30, word: 'treinta', pronunciation: 'trayn-tah' },
  { number: 40, word: 'cuarenta', pronunciation: 'kwah-ren-tah' },
  { number: 50, word: 'cincuenta', pronunciation: 'seen-kwen-tah' },
  { number: 60, word: 'sesenta', pronunciation: 'seh-sen-tah' },
  { number: 70, word: 'setenta', pronunciation: 'seh-ten-tah' },
  { number: 80, word: 'ochenta', pronunciation: 'oh-chen-tah' },
  { number: 90, word: 'noventa', pronunciation: 'noh-ven-tah' },
  { number: 100, word: 'cien', pronunciation: 'syehn' },
  { number: 200, word: 'doscientos', pronunciation: 'dohs-syehn-tohs' },
  { number: 300, word: 'trescientos', pronunciation: 'trehs-syehn-tohs' },
  { number: 400, word: 'cuatrocientos', pronunciation: 'kwah-troh-syehn-tohs' },
  { number: 500, word: 'quinientos', pronunciation: 'kee-nyehn-tohs' },
  { number: 600, word: 'seiscientos', pronunciation: 'says-syehn-tohs' },
  { number: 700, word: 'setecientos', pronunciation: 'seh-teh-syehn-tohs' },
  { number: 800, word: 'ochocientos', pronunciation: 'oh-choh-syehn-tohs' },
  { number: 900, word: 'novecientos', pronunciation: 'noh-veh-syehn-tohs' },
  { number: 1000, word: 'mil', pronunciation: 'meel' },
];

// دالة لتحويل الأرقام إلى نصوص إسبانية
export function numberToWords(n: number): string {
  const found = numbers.find(num => num.number === n);
  if (found) return found.word;
  
  // الأرقام من 21 إلى 99
  if (n > 20 && n < 100) {
    const tens = Math.floor(n / 10) * 10;
    const ones = n % 10;
    if (ones === 0) {
      return numbers.find(num => num.number === tens)?.word || n.toString();
    }
    const tensWord = numbers.find(num => num.number === tens)?.word || '';
    const onesWord = numbers.find(num => num.number === ones)?.word || '';
    if (ones === 1) {
      return `${tensWord} y uno`;
    }
    if (ones === 22) {
      return `${tensWord} y dos`;
    }
    return `${tensWord} y ${onesWord}`;
  }
  
  // الأرقام من 100 إلى 999
  if (n >= 100 && n < 1000) {
    const hundreds = Math.floor(n / 100) * 100;
    const remainder = n % 100;
    
    let hundredsWord = '';
    if (hundreds === 100) {
      hundredsWord = remainder === 0 ? 'cien' : 'ciento';
    } else if (hundreds === 200) {
      hundredsWord = 'doscientos';
    } else if (hundreds === 300) {
      hundredsWord = 'trescientos';
    } else if (hundreds === 400) {
      hundredsWord = 'cuatrocientos';
    } else if (hundreds === 500) {
      hundredsWord = 'quinientos';
    } else if (hundreds === 600) {
      hundredsWord = 'seiscientos';
    } else if (hundreds === 700) {
      hundredsWord = 'setecientos';
    } else if (hundreds === 800) {
      hundredsWord = 'ochocientos';
    } else if (hundreds === 900) {
      hundredsWord = 'novecientos';
    } else {
      const hundredDigit = Math.floor(n / 100);
      if (hundredDigit === 1) {
        hundredsWord = remainder === 0 ? 'cien' : 'ciento';
      } else {
        const baseWord = numbers.find(num => num.number === hundredDigit)?.word || '';
        hundredsWord = baseWord.replace(/o$/, '') + 'cientos';
      }
    }
    
    if (remainder === 0) {
      return hundredsWord;
    }
    
    const remainderWord = numberToWords(remainder);
    return `${hundredsWord} ${remainderWord}`;
  }
  
  // الأرقام من 1000 فما فوق
  if (n >= 1000) {
    const thousands = Math.floor(n / 1000);
    const remainder = n % 1000;
    
    let thousandsWord = '';
    if (thousands === 1) {
      thousandsWord = 'mil';
    } else {
      thousandsWord = numberToWords(thousands) + ' mil';
    }
    
    if (remainder === 0) {
      return thousandsWord;
    }
    
    const remainderWord = numberToWords(remainder);
    return `${thousandsWord} ${remainderWord}`;
  }
  
  return n.toString();
}

// دالة مساعدة للبحث عن رقم بالكلمات الإسبانية
export function findNumberByWord(query: string): number | null {
  const lowerQuery = query.toLowerCase().trim();
  
  // البحث المباشر
  const directMatch = numbers.find(n => 
    n.word.toLowerCase() === lowerQuery ||
    n.pronunciation.toLowerCase() === lowerQuery ||
    n.number.toString() === lowerQuery
  );
  if (directMatch) return directMatch.number;
  
  // البحث عن رقم في النص
  const numMatch = lowerQuery.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0], 10);
    if (!isNaN(num)) {
      const wordForNum = numberToWords(num);
      if (wordForNum.toLowerCase().includes(lowerQuery) || lowerQuery.includes(wordForNum.toLowerCase())) {
        return num;
      }
    }
  }
  
  return null;
}
