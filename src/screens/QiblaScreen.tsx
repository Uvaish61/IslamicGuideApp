import React, { useState, useEffect } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ChevronLeft, MapPin, Navigation, RefreshCw } from 'lucide-react-native';
import { getCardinalDirection, getDetailedDirection, calculateQiblaBearing } from '../utils/qiblaCalculations';
import Compass from '../componenets/Compass';

type QiblaScreenProps = {
  onBackToHome: () => void;
};

const QiblaScreen = ({ onBackToHome }: QiblaScreenProps) => {
  // State for Qibla bearing and compass
  const [qiblaBearing, setQiblaBearing] = useState<number>(0); // Qibla direction (0-360)
  const [deviceHeading, setDeviceHeading] = useState<number>(0); // Device compass heading
  const [relativeQiblaAngle, setRelativeQiblaAngle] = useState<number>(0); // Angle to rotate
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isCompassAvailable, setIsCompassAvailable] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  // Mecca coordinates (Kaaba)
  const MECCA_LAT = 21.4225;
  const MECCA_LNG = 39.8262;

  // Calculate relative angle for compass rotation
  useEffect(() => {
    const angle = qiblaBearing - deviceHeading;
    setRelativeQiblaAngle(angle);
  }, [qiblaBearing, deviceHeading]);

  // Initialize with mock location (default to user's approximate location)
  useEffect(() => {
    // Set mock location (can be replaced with real geolocation)
    const mockLocation = { latitude: 24.8607, longitude: 67.0011 }; // Karachi, Pakistan
    setUserLocation(mockLocation);
    setLocationPermission(true);
    setIsCompassAvailable(true);
    
    // Calculate initial Qibla bearing
    const bearing = calculateQiblaBearing(
      mockLocation.latitude,
      mockLocation.longitude,
      MECCA_LAT,
      MECCA_LNG
    );
    setQiblaBearing(bearing);
    
    // Simulate device heading changes
    const interval = setInterval(() => {
      setDeviceHeading((prev) => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle request location permission
  const handleRequestLocation = () => {
    // Mock function - in production, use react-native-geolocation-service
    const randomLat = 24 + Math.random() * 10;
    const randomLng = 67 + Math.random() * 10;
    setUserLocation({ latitude: randomLat, longitude: randomLng });
    setLocationPermission(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onBackToHome}>
            <ChevronLeft size={24} color="#29293D" />
          </Pressable>
          <View style={styles.headerCenter}>
            <Navigation size={20} color="#3D3AE0" />
            <Text style={styles.headerTitle}>Qibla</Text>
          </View>
          <Pressable onPress={() => setDeviceHeading((prev) => (prev + 5) % 360)}>
            <RefreshCw size={24} color="#5548EF" />
          </Pressable>
        </View>

        {/* Direction Display */}
        <View style={styles.directionsContainer}>
          {/* Cardinal Direction Box */}
          <View style={styles.cardinalBox}>
            <Text style={styles.cardinalLabel}>Direction</Text>
            <Text style={styles.cardinalValue}>
              {getCardinalDirection(qiblaBearing)}
            </Text>
          </View>

          {/* Compass Component */}
          <Compass rotation={deviceHeading} relativeQiblaAngle={relativeQiblaAngle} />

          {/* Degree Display Card */}
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

          {/* Detailed Instruction */}
          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>
              {getDetailedDirection(qiblaBearing)}
            </Text>
            <Text style={styles.instructionSubText}>Towards the Holy Kaaba</Text>
          </View>

          {/* Location Info */}
          {userLocation ? (
            <View style={styles.locationInfo}>
              <MapPin size={16} color="#5548EF" />
              <Text style={styles.locationText}>
                {userLocation.latitude.toFixed(2)}°, {userLocation.longitude.toFixed(2)}°
              </Text>
            </View>
          ) : (
            <Pressable
              style={styles.enableButton}
              onPress={handleRequestLocation}>
              <Text style={styles.enableButtonText}>Enable Location</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  container: {
    flex: 1,
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
  directionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    backgroundColor: '#E7E7F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5548EF',
  },
  enableButton: {
    borderRadius: 8,
    backgroundColor: '#5548EF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  enableButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default QiblaScreen;
