import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ChevronLeft, MapPin, Navigation, RefreshCw } from 'lucide-react-native';
import {
  getCardinalDirection,
  getDetailedDirection,
  calculateQiblaBearing,
} from '../utils/qiblaCalculations';
import Compass from '../componenets/Compass';
import { majorCities, prayerInfo } from '../data/qiblaData';

type QiblaScreenProps = {
  onBackToHome: () => void;
};

const QiblaScreen = ({ onBackToHome }: QiblaScreenProps) => {
  const [selectedCity, setSelectedCity] = useState(majorCities[0]);
  const [qiblaBearing, setQiblaBearing] = useState<number>(0);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [relativeQiblaAngle, setRelativeQiblaAngle] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isCompassAvailable, setIsCompassAvailable] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  // Mecca coordinates (Kaaba)
  const MECCA_LAT = 21.4225;
  const MECCA_LNG = 39.8262;

  const directionConfidence = locationPermission
    ? Math.max(55, 100 - Math.round(Math.min(Math.abs(relativeQiblaAngle), 180) / 2))
    : 0;
  const confidenceLabel = directionConfidence >= 80 ? 'Strong' : directionConfidence >= 65 ? 'Stable' : 'Needs calibration';

  // Calculate relative angle for compass rotation
  useEffect(() => {
    const angle = ((qiblaBearing - deviceHeading) % 360 + 360) % 360;
    setRelativeQiblaAngle(angle);
  }, [qiblaBearing, deviceHeading]);

  // Initialize with mock location (default to user's approximate location)
  useEffect(() => {
    const defaultCity = majorCities[0];
    setSelectedCity(defaultCity);
    setUserLocation({ latitude: defaultCity.latitude, longitude: defaultCity.longitude });
    setLocationPermission(true);
    setIsCompassAvailable(true);

    const bearing = calculateQiblaBearing(defaultCity.latitude, defaultCity.longitude, MECCA_LAT, MECCA_LNG);
    setQiblaBearing(bearing);
    
    // Simulate device heading changes
    const interval = setInterval(() => {
      setDeviceHeading((prev) => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const syncCity = (city: (typeof majorCities)[number]) => {
    setSelectedCity(city);
    setUserLocation({ latitude: city.latitude, longitude: city.longitude });
    setLocationPermission(true);
    setIsCompassAvailable(true);

    const bearing = calculateQiblaBearing(city.latitude, city.longitude, MECCA_LAT, MECCA_LNG);
    setQiblaBearing(bearing);
  };

  const handleRequestLocation = () => {
    const randomCity = majorCities[Math.floor(Math.random() * majorCities.length)];
    syncCity(randomCity);
  };

  const handleRefresh = () => {
    syncCity(selectedCity);
    setDeviceHeading((prev) => (prev + 5) % 360);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={onBackToHome}>
            <ChevronLeft size={24} color="#29293D" />
          </Pressable>
          <View style={styles.headerCenter}>
            <Navigation size={20} color="#3D3AE0" />
            <Text style={styles.headerTitle}>Qibla</Text>
          </View>
          <Pressable onPress={handleRefresh}>
            <RefreshCw size={24} color="#5548EF" />
          </Pressable>
        </View>

        <View style={styles.cityCard}>
          <Text style={styles.cardTitle}>City presets</Text>
          <Text style={styles.cardSubtitle}>Choose a city to recalculate the direction and compare bearings quickly.</Text>
          <View style={styles.cityList}>
            {majorCities.map((city) => {
              const isSelected = selectedCity.id === city.id;

              return (
                <Pressable
                  key={city.id}
                  style={[styles.cityChip, isSelected ? styles.cityChipActive : styles.cityChipInactive]}
                  onPress={() => syncCity(city)}>
                  <Text style={isSelected ? styles.cityNameActive : styles.cityName}>{city.name}</Text>
                  <Text style={isSelected ? styles.cityBearingActive : styles.cityBearing}>
                    {Math.round(city.qiblaBearing)}°
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Direction confidence</Text>
            <Text style={styles.statusValue}>{directionConfidence}%</Text>
            <Text style={styles.statusCaption}>{confidenceLabel}</Text>
          </View>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Compass state</Text>
            <Text style={styles.statusValue}>{isCompassAvailable ? 'Active' : 'Waiting'}</Text>
            <Text style={styles.statusCaption}>{locationPermission ? 'Location fixed' : 'Need location'}</Text>
          </View>
        </View>

        <View style={styles.directionsContainer}>
          <View style={styles.cardinalBox}>
            <Text style={styles.cardinalLabel}>Direction</Text>
            <Text style={styles.cardinalValue}>{getCardinalDirection(qiblaBearing)}</Text>
          </View>

          <Compass rotation={deviceHeading} relativeQiblaAngle={relativeQiblaAngle} />

          <View style={styles.degreeCard}>
            <View style={styles.degreeRow}>
              <View style={styles.degreeFlex}>
                <Text style={styles.degreeLabel}>Qibla Bearing</Text>
                <Text style={styles.degreeBearing}>{Math.round(qiblaBearing)}°</Text>
              </View>
              <View style={styles.degreeFlex}>
                <Text style={styles.degreeLabel}>Your Heading</Text>
                <Text style={styles.degreeHeading}>{Math.round(deviceHeading)}°</Text>
              </View>
            </View>
          </View>

          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>{getDetailedDirection(qiblaBearing)}</Text>
            <Text style={styles.instructionSubText}>Towards the Holy Kaaba</Text>
          </View>

          <View style={styles.locationCard}>
            <Text style={styles.cardTitle}>Current location</Text>
            <Text style={styles.cardSubtitle}>{selectedCity.name}</Text>
            {userLocation ? (
              <View style={styles.locationInfo}>
                <MapPin size={16} color="#5548EF" />
                <Text style={styles.locationText}>
                  {userLocation.latitude.toFixed(2)}°, {userLocation.longitude.toFixed(2)}°
                </Text>
              </View>
            ) : (
              <Pressable style={styles.enableButton} onPress={handleRequestLocation}>
                <Text style={styles.enableButtonText}>Enable Location</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.tipsCard}>
            <Text style={styles.cardTitle}>Calibration tips</Text>
            {prayerInfo.additionalTips.map((tip) => (
              <Text key={tip} style={styles.tipText}>
                • {tip}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#29293D',
  },
  cityCard: {
    marginHorizontal: 24,
    marginBottom: 18,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#29293D',
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#7E7D94',
  },
  cityList: {
    marginTop: 14,
    gap: 10,
  },
  cityChip: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cityChipActive: {
    backgroundColor: '#5548EF',
  },
  cityChipInactive: {
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
  },
  cityName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#29293D',
  },
  cityNameActive: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cityBearing: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#7E7D94',
  },
  cityBearingActive: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.92)',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 18,
  },
  statusCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: '#8D8CA3',
  },
  statusValue: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: '800',
    color: '#29293D',
  },
  statusCaption: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#5548EF',
  },
  directionsContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cardinalBox: {
    marginBottom: 24,
    alignItems: 'center',
  },
  cardinalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7E7D94',
  },
  cardinalValue: {
    marginTop: 8,
    fontSize: 48,
    fontWeight: '800',
    color: '#3D3AE0',
  },
  degreeCard: {
    marginVertical: 24,
    width: '100%',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#3D3AE0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  degreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  degreeFlex: {
    flex: 1,
  },
  degreeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7E7D94',
  },
  degreeBearing: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3D3AE0',
  },
  degreeHeading: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5548EF',
  },
  instructionBox: {
    marginBottom: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#29293D',
  },
  instructionSubText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    color: '#7E7D94',
  },
  locationCard: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
    borderRadius: 999,
    backgroundColor: '#F5F4FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5548EF',
  },
  enableButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#5548EF',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  enableButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tipsCard: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  tipText: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 19,
    color: '#7E7D94',
  },
});

export default QiblaScreen;
