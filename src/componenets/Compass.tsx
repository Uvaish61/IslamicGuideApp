import React from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText, G } from 'react-native-svg';

type CompassProps = {
  rotation: number; // Angle to rotate the compass
  relativeQiblaAngle: number; // Relative angle to Qibla
};

const Compass = ({ rotation, relativeQiblaAngle }: CompassProps) => {
  const size = 280;
  const center = size / 2;
  const radius = 120;
  const cardinalRadius = 100;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer Circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius + 10}
          fill="white"
          stroke="#E7E7F0"
          strokeWidth="2"
        />

        {/* Inner Circle */}
        <Circle cx={center} cy={center} r={radius} fill="#F8F8FE" stroke="#D0CFFB" strokeWidth="1.5" />

        {/* Degree markers (every 30 degrees) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const x1 = center + (radius - 15) * Math.sin(angle);
          const y1 = center - (radius - 15) * Math.cos(angle);
          const x2 = center + (radius - 5) * Math.sin(angle);
          const y2 = center - (radius - 5) * Math.cos(angle);

          return (
            <Line
              key={`marker-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#B8B7CC"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Cardinal Directions */}
        {[
          { label: 'N', angle: 0 },
          { label: 'E', angle: 90 },
          { label: 'S', angle: 180 },
          { label: 'W', angle: 270 },
        ].map((dir, i) => {
          const angle = (dir.angle - 90) * (Math.PI / 180);
          const x = center + cardinalRadius * Math.cos(angle);
          const y = center + cardinalRadius * Math.sin(angle);
          return (
            <SvgText
              key={`dir-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="bold"
              fill={dir.label === 'N' ? '#FF6B6B' : '#3D3AE0'}
            >
              {dir.label}
            </SvgText>
          );
        })}

        {/* Qibla Arrow (Red) */}
        <G>
          <Path
            d={`M ${center} ${center - 50} L ${center - 8} ${center - 20} L ${center + 8} ${center - 20} Z`}
            fill="#FF6B6B"
            opacity="0.8"
            style={{
              transform: [{ rotate: `${relativeQiblaAngle}deg` }],
              transformOrigin: `${center}px ${center}px`,
            }}
          />
        </G>

        {/* Center Circle */}
        <Circle cx={center} cy={center} r="8" fill="#3D3AE0" />
      </Svg>

      {/* Degree Display Below Compass */}
      <View style={{ marginTop: 10, alignItems: 'center' }}>
        <SvgText fontSize="12" fill="#7E7D94">
          Qibla: {Math.round(relativeQiblaAngle)}°
        </SvgText>
      </View>
    </View>
  );
};

export default Compass;
