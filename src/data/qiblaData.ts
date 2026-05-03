// Qibla Finder Data

// Mecca (Kaaba) coordinates
export const MECCA = {
  name: 'Mecca',
  latitude: 21.4225,
  longitude: 39.8262,
};

// Major cities with their coordinates and Qibla bearings
export const majorCities = [
  {
    id: 1,
    name: 'Karachi, Pakistan',
    latitude: 24.8607,
    longitude: 67.0011,
    qiblaBearing: 291.0,
  },
  {
    id: 2,
    name: 'Istanbul, Turkey',
    latitude: 41.0082,
    longitude: 28.9784,
    qiblaBearing: 169.0,
  },
  {
    id: 3,
    name: 'Cairo, Egypt',
    latitude: 30.0444,
    longitude: 31.2357,
    qiblaBearing: 156.0,
  },
  {
    id: 4,
    name: 'Dubai, UAE',
    latitude: 25.2048,
    longitude: 55.2708,
    qiblaBearing: 302.0,
  },
  {
    id: 5,
    name: 'Jakarta, Indonesia',
    latitude: -6.1275,
    longitude: 106.6885,
    qiblaBearing: 295.0,
  },
  {
    id: 6,
    name: 'London, UK',
    latitude: 51.5074,
    longitude: -0.1278,
    qiblaBearing: 132.0,
  },
  {
    id: 7,
    name: 'New York, USA',
    latitude: 40.7128,
    longitude: -74.006,
    qiblaBearing: 71.0,
  },
  {
    id: 8,
    name: 'Sydney, Australia',
    latitude: -33.8688,
    longitude: 151.2093,
    qiblaBearing: 300.0,
  },
];

// Compass directions with their ranges
export const compassDirections = [
  { name: 'North', abbreviation: 'N', min: 348.75, max: 11.25 },
  { name: 'North-Northeast', abbreviation: 'NNE', min: 11.25, max: 33.75 },
  { name: 'Northeast', abbreviation: 'NE', min: 33.75, max: 56.25 },
  { name: 'East-Northeast', abbreviation: 'ENE', min: 56.25, max: 78.75 },
  { name: 'East', abbreviation: 'E', min: 78.75, max: 101.25 },
  { name: 'East-Southeast', abbreviation: 'ESE', min: 101.25, max: 123.75 },
  { name: 'Southeast', abbreviation: 'SE', min: 123.75, max: 146.25 },
  { name: 'South-Southeast', abbreviation: 'SSE', min: 146.25, max: 168.75 },
  { name: 'South', abbreviation: 'S', min: 168.75, max: 191.25 },
  { name: 'South-Southwest', abbreviation: 'SSW', min: 191.25, max: 213.75 },
  { name: 'Southwest', abbreviation: 'SW', min: 213.75, max: 236.25 },
  { name: 'West-Southwest', abbreviation: 'WSW', min: 236.25, max: 258.75 },
  { name: 'West', abbreviation: 'W', min: 258.75, max: 281.25 },
  { name: 'West-Northwest', abbreviation: 'WNW', min: 281.25, max: 303.75 },
  { name: 'Northwest', abbreviation: 'NW', min: 303.75, max: 326.25 },
  { name: 'North-Northwest', abbreviation: 'NNW', min: 326.25, max: 348.75 },
];

// Prayer times related info (for future integration)
export const prayerInfo = {
  description: 'Islamic prayers are performed facing Mecca',
  importance: 'Facing the Kaaba is a requirement of Islamic prayers',
  additionalTips: [
    'Ensure your device compass is calibrated',
    'Remove from metal surfaces for accuracy',
    'Keep device level for best results',
    'Avoid using near electronic devices',
  ],
};
