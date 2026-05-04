import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CompassProps = {
  rotation: number;
  relativeQiblaAngle: number;
};

const Compass = ({ rotation, relativeQiblaAngle }: CompassProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle]}>
        <View
          style={[
            styles.arrow,
            { transform: [{ rotate: `${relativeQiblaAngle}deg` }] },
          ]}
        />
        <View style={styles.centerDot} />
      </View>
      <Text style={styles.label}>Qibla: {Math.round(relativeQiblaAngle)}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: '#D0CFFB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8FE',
  },
  arrow: {
    width: 4,
    height: 80,
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
    position: 'absolute',
    top: 20,
  },
  centerDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#3D3AE0' },
  label: { marginTop: 10, color: '#7E7D94' },
});

export default Compass;
