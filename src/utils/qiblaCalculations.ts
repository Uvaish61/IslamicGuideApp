// Qibla bearing calculation utility

export interface Location {
  latitude: number;
  longitude: number;
}

/**
 * Calculate bearing from user location to Mecca
 * Using Haversine formula
 */
export const calculateQiblaBearing = (
  userLat: number,
  userLng: number,
  mecccaLat: number = 21.4225,
  meccaLng: number = 39.8262
): number => {
  // Convert degrees to radians
  const lat1 = (userLat * Math.PI) / 180;
  const lng1 = (userLng * Math.PI) / 180;
  const lat2 = (mecccaLat * Math.PI) / 180;
  const lng2 = (meccaLng * Math.PI) / 180;

  // Calculate difference
  const dLng = lng2 - lng1;

  // Calculate bearing
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  let bearing = Math.atan2(y, x) * (180 / Math.PI);

  // Normalize to 0-360
  bearing = (bearing + 360) % 360;

  return bearing;
};

/**
 * Get cardinal direction string from bearing angle
 */
export const getCardinalDirection = (bearing: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(bearing / 22.5) % 16;
  return directions[index];
};

/**
 * Get detailed direction name
 */
export const getDetailedDirection = (bearing: number): string => {
  if (bearing < 45 || bearing >= 315) return 'Turn North';
  if (bearing < 135) return 'Turn East';
  if (bearing < 225) return 'Turn South';
  return 'Turn West';
};

/**
 * Normalize angle to -180 to 180 range
 */
export const normalizeAngle = (angle: number): number => {
  let normalized = angle % 360;
  if (normalized > 180) {
    normalized -= 360;
  } else if (normalized < -180) {
    normalized += 360;
  }
  return normalized;
};
