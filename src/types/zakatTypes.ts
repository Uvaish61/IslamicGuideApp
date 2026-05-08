// Zakat Calculator Types

export interface AssetInput {
  cash: number;
  bankBalance: number;
  goldGrams: number;
  silverGrams: number;
  otherAssets: number;
}

export interface ZakatCalculation {
  totalAssets: number;
  nisabAmount: number;
  isNisabMet: boolean;
  zakatAmount: number;
  breakdown: ZakatBreakdown;
  currency: string;
  calculatedAt: Date;
}

export interface ZakatBreakdown {
  cashZakat: number;
  bankZakat: number;
  goldZakat: number;
  silverZakat: number;
  otherZakat: number;
}

export interface NisabThreshold {
  gold: {
    grams: number;
    pricePerGram: number;
    totalValue: number;
  };
  silver: {
    grams: number;
    pricePerGram: number;
    totalValue: number;
  };
  minimumNisab: number; // Whichever is lower
}

export interface ZakatResult {
  id: string;
  calculation: ZakatCalculation;
  savedAt: Date;
}
