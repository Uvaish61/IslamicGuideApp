import React, { useState, useEffect } from 'react';
import { Pressable, StatusBar, Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, Navigation } from 'lucide-react-native';

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

  return (
    <SafeAreaView className="flex-1 bg-[#ECEBFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <Pressable onPress={onBackToHome}>
            <ChevronLeft size={24} color="#29293D" />
          </Pressable>
          <Text className="text-2xl font-bold text-[#29293D]">Qibla Finder</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QiblaScreen;
