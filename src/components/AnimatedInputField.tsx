import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';

interface AnimatedInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: React.ReactNode;
  suffix?: string;
  containerStyle?: ViewStyle;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad' | 'number-pad' | 'email-address' | 'phone-pad';
  editable?: boolean;
  error?: string;
}

const AnimatedInputField: React.FC<AnimatedInputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  suffix = '',
  containerStyle,
  keyboardType = 'numeric',
  editable = true,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withSpring(1, {
      damping: 8,
      mass: 1,
      stiffness: 100,
    });
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withSpring(0, {
      damping: 8,
      mass: 1,
      stiffness: 100,
    });
  };

  const animatedBorderStyle = useAnimatedStyle(() => {
    if (error) {
      return {
        borderColor: '#D64545',
        borderWidth: 1.5,
        shadowOpacity: 0,
      };
    }

    const borderColor = interpolateColor(
      focusAnim.value,
      [0, 1],
      ['#E8E7F5', '#5548EF'],
      'RGB'
    );

    const borderWidth = focusAnim.value === 0 ? 1 : 2;
    const shadowOpacity = focusAnim.value;

    return {
      borderColor,
      borderWidth,
      shadowOpacity: shadowOpacity as any,
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    if (error) {
      return {
        color: '#D64545',
      };
    }

    const scale = interpolateColor(
      focusAnim.value,
      [0, 1],
      ['#7E7D94', '#5548EF'],
      'RGB'
    );

    return {
      color: scale,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scale = focusAnim.value === 0 ? 1 : 1.1;
    const opacity = focusAnim.value === 0 ? 0.5 : 1;

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.Text style={[styles.label, animatedLabelStyle]}>
        {label}
      </Animated.Text>

      <Animated.View
        style={[
          styles.inputWrapper,
          animatedBorderStyle,
          {
            shadowColor: '#5548EF',
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 12,
          },
        ]}>
        {icon && (
          <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
            {icon}
          </Animated.View>
        )}

        <TextInput
          style={[
            styles.input,
            icon ? styles.inputWithIcon : {},
          ]}
          placeholder={placeholder}
          placeholderTextColor="#D5D3E7"
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType={keyboardType}
          editable={editable}
          selectionColor="#5548EF"
        />

        {suffix && (
          <Text style={styles.suffix}>{suffix}</Text>
        )}
      </Animated.View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E8E7F5',
  },
  iconContainer: {
    marginRight: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#29293D',
    fontWeight: '600',
    paddingVertical: 0,
  },
  inputWithIcon: {
    marginLeft: 4,
  },
  suffix: {
    fontSize: 13,
    color: '#7E7D94',
    fontWeight: '600',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 11,
    color: '#D64545',
    marginTop: 6,
    marginLeft: 2,
    fontWeight: '500',
  },
});

export default AnimatedInputField;
