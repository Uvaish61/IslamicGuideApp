import React, { useState, useEffect } from 'react';
import { Pressable, StatusBar, Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, Navigation } from 'lucide-react-native';
import { getCardinalDirection, getDetailedDirection } from '../utils/qiblaCalculations';
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

        {/* Direction Display */}
        <View className="flex-1 items-center justify-center px-6">
          {/* Cardinal Direction Box */}
          <View className="mb-6 items-center">
            <Text className="text-sm font-semibold text-[#7E7D94]">Direction</Text>
            <Text className="mt-2 text-5xl font-extrabold text-[#3D3AE0]">
              {getCardinalDirection(qiblaBearing)}
            </Text>
          </View>

          {/* Compass Component */}
          <Compass rotation={deviceHeading} relativeQiblaAngle={relativeQiblaAngle} />

          {/* Degree Display Card */}
          <View className="my-6 w-full rounded-3xl border-2 border-[#3D3AE0] bg-white px-6 py-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-[#7E7D94]">Qibla Bearing</Text>
                <Text className="mt-1 text-3xl font-bold text-[#3D3AE0]">{Math.round(qiblaBearing)}°</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-[#7E7D94]">Your Heading</Text>
                <Text className="mt-1 text-3xl font-bold text-[#5548EF]">{Math.round(deviceHeading)}°</Text>
              </View>
            </View>
          </View>

          {/* Detailed Instruction */}
          <View className="mb-8 rounded-2xl bg-white px-6 py-4">
            <Text className="text-center text-xl font-bold text-[#29293D]">
              {getDetailedDirection(qiblaBearing)}
            </Text>
            <Text className="mt-2 text-center text-sm text-[#7E7D94]">Towards the Holy Kaaba</Text>
          </View>

          {/* Location Info */}
          {userLocation && (
            <View className="flex-row items-center gap-2 rounded-lg bg-[#E7E7F0] px-4 py-2">
              <MapPin size={16} color="#5548EF" />
              <Text className="text-xs font-semibold text-[#5548EF]">
                {userLocation.latitude.toFixed(2)}°, {userLocation.longitude.toFixed(2)}°
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QiblaScreen;
