import { AssetInput, ZakatCalculation, ZakatBreakdown, NisabThreshold } from '../types/zakatTypes';

// INR prices (as of current rates - user can update these)
const GOLD_PRICE_PER_GRAM_INR = 6500; // Approximate market rate
const SILVER_PRICE_PER_GRAM_INR = 75; // Approximate market rate

// Nisab thresholds
const NISAB_GOLD_GRAMS = 87.48; // Approximately 87.48 grams of gold
const NISAB_SILVER_GRAMS = 612.36; // Approximately 612.36 grams of silver

// Zakat percentage
const ZAKAT_PERCENTAGE = 0.025; // 2.5%

/**
 * Calculate current Nisab threshold in INR
 */
export const calculateNisabThreshold = (): NisabThreshold => {
  const goldValue = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM_INR;
  const silverValue = NISAB_SILVER_GRAMS * SILVER_PRICE_PER_GRAM_INR;
  
  // Nisab is the minimum of gold or silver value (whichever is lower)
  const minimumNisab = Math.min(goldValue, silverValue);

  return {
    gold: {
      grams: NISAB_GOLD_GRAMS,
      pricePerGram: GOLD_PRICE_PER_GRAM_INR,
      totalValue: goldValue,
    },
    silver: {
      grams: NISAB_SILVER_GRAMS,
      pricePerGram: SILVER_PRICE_PER_GRAM_INR,
      totalValue: silverValue,
    },
    minimumNisab,
  };
};

/**
 * Calculate total assets value from inputs
 */
export const calculateTotalAssets = (assets: AssetInput): number => {
  const cashTotal = assets.cash;
  const bankTotal = assets.bankBalance;
  const goldTotal = assets.goldGrams * GOLD_PRICE_PER_GRAM_INR;
  const silverTotal = assets.silverGrams * SILVER_PRICE_PER_GRAM_INR;
  const otherTotal = assets.otherAssets;

  return cashTotal + bankTotal + goldTotal + silverTotal + otherTotal;
};

/**
 * Check if total assets meet Nisab threshold
 */
export const isNisabMet = (totalAssets: number): boolean => {
  const nisab = calculateNisabThreshold();
  return totalAssets >= nisab.minimumNisab;
};

/**
 * Calculate Zakat breakdown for each asset type
 */
export const calculateZakatBreakdown = (assets: AssetInput): ZakatBreakdown => {
  const cashZakat = assets.cash * ZAKAT_PERCENTAGE;
  const bankZakat = assets.bankBalance * ZAKAT_PERCENTAGE;
  const goldZakat = (assets.goldGrams * GOLD_PRICE_PER_GRAM_INR) * ZAKAT_PERCENTAGE;
  const silverZakat = (assets.silverGrams * SILVER_PRICE_PER_GRAM_INR) * ZAKAT_PERCENTAGE;
  const otherZakat = assets.otherAssets * ZAKAT_PERCENTAGE;

  return {
    cashZakat: Math.round(cashZakat * 100) / 100,
    bankZakat: Math.round(bankZakat * 100) / 100,
    goldZakat: Math.round(goldZakat * 100) / 100,
    silverZakat: Math.round(silverZakat * 100) / 100,
    otherZakat: Math.round(otherZakat * 100) / 100,
  };
};

/**
 * Calculate total Zakat amount
 */
export const calculateTotalZakat = (breakdown: ZakatBreakdown): number => {
  return (
    breakdown.cashZakat +
    breakdown.bankZakat +
    breakdown.goldZakat +
    breakdown.silverZakat +
    breakdown.otherZakat
  );
};

/**
 * Main calculation function - returns complete Zakat calculation
 */
export const calculateZakat = (assets: AssetInput): ZakatCalculation => {
  const totalAssets = calculateTotalAssets(assets);
  const nisabThreshold = calculateNisabThreshold();
  const nisabMet = isNisabMet(totalAssets);
  const breakdown = calculateZakatBreakdown(assets);
  const zakatAmount = nisabMet ? calculateTotalZakat(breakdown) : 0;

  return {
    totalAssets: Math.round(totalAssets * 100) / 100,
    nisabAmount: Math.round(nisabThreshold.minimumNisab * 100) / 100,
    isNisabMet: nisabMet,
    zakatAmount: Math.round(zakatAmount * 100) / 100,
    breakdown,
    currency: 'INR',
    calculatedAt: new Date(),
  };
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return `₹ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Get asset types with values
 */
export const getAssetTypesWithValues = (assets: AssetInput) => {
  return [
    { name: 'Cash', value: assets.cash, percentage: 0 },
    { name: 'Bank Balance', value: assets.bankBalance, percentage: 0 },
    { name: 'Gold', value: assets.goldGrams * GOLD_PRICE_PER_GRAM_INR, percentage: 0 },
    { name: 'Silver', value: assets.silverGrams * SILVER_PRICE_PER_GRAM_INR, percentage: 0 },
    { name: 'Other Assets', value: assets.otherAssets, percentage: 0 },
  ].map((asset) => ({
    ...asset,
    percentage: assets ? ((asset.value / calculateTotalAssets(assets)) * 100) : 0,
  }));
};
