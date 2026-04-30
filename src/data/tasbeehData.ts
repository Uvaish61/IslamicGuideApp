export type TasbeehPhrase = {
  id: number;
  name: string;
  text: string;
  urdu: string;
  meaning: string;
  color: string;
};

export type PredefinedRange = {
  id: number;
  value: number;
  label: string;
  description: string;
};

export const tasbeehPhrases: TasbeehPhrase[] = [
  {
    id: 1,
    name: 'Subhanallah',
    text: 'سبحان الله',
    urdu: 'Subhan Allah',
    meaning: 'Glory be to Allah',
    color: '#5548EF',
  },
  {
    id: 2,
    name: 'Alhamdulillah',
    text: 'الحمد لله',
    urdu: 'Alhamdulillah',
    meaning: 'Praise be to Allah',
    color: '#FF6B6B',
  },
  {
    id: 3,
    name: 'Allahu Akbar',
    text: 'الله أكبر',
    urdu: 'Allah Akbar',
    meaning: 'Allah is the Greatest',
    color: '#4ECDC4',
  },
  {
    id: 4,
    name: 'La ilaha illallah',
    text: 'لا إله إلا الله',
    urdu: 'La ilaha illallah',
    meaning: 'There is no god but Allah',
    color: '#FFD93D',
  },
];

export const predefinedRanges: PredefinedRange[] = [
  {
    id: 1,
    value: 33,
    label: '33x',
    description: 'Traditional (33 times)',
  },
  {
    id: 2,
    value: 99,
    label: '99x',
    description: '99 Beautiful Names',
  },
  {
    id: 3,
    value: 100,
    label: '100x',
    description: 'Complete (100 times)',
  },
  {
    id: 4,
    value: 1000,
    label: '1000x',
    description: 'Extended (1000 times)',
  },
];
