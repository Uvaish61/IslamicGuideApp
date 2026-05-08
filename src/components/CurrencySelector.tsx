import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  containerStyle?: ViewStyle;
}

const SUPPORTED_CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  // Future currencies can be added here
  // { code: 'USD', symbol: '$', label: 'US Dollar' },
  // { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
  // { code: 'SAR', symbol: '﷼', label: 'Saudi Riyal' },
] as const;

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency = 'INR',
  onCurrencyChange,
  containerStyle,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandAnim = useSharedValue(0);

  const handlePress = () => {
    const newValue = isExpanded ? 0 : 1;
    expandAnim.value = withSpring(newValue, {
      damping: 8,
      mass: 1,
      stiffness: 100,
    });
    setIsExpanded(!isExpanded);
  };

  const handleCurrencySelect = (currencyCode: string) => {
    onCurrencyChange(currencyCode);
    setIsExpanded(false);
    expandAnim.value = withSpring(0, {
      damping: 8,
      mass: 1,
      stiffness: 100,
    });
  };

  const animatedChevronStyle = useAnimatedStyle(() => {
    const rotation = expandAnim.value * 180;
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const opacity = expandAnim.value;
    return {
      opacity,
    };
  });

  const currentCurrency = SUPPORTED_CURRENCIES.find(
    (c) => c.code === selectedCurrency
  ) || SUPPORTED_CURRENCIES[0];

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        style={[styles.selectorButton, styles.selectorButtonShadow]}
        onPress={handlePress}>
        <View style={styles.selectorContent}>
          <View style={styles.currencyInfo}>
            <Text style={styles.currencySymbol}>{currentCurrency.symbol}</Text>
            <View style={styles.currencyTextGroup}>
              <Text style={styles.currencyCode}>{currentCurrency.code}</Text>
              <Text style={styles.currencyLabel}>{currentCurrency.label}</Text>
            </View>
          </View>
          <Animated.View style={animatedChevronStyle}>
            <ChevronDown size={20} color="#5548EF" strokeWidth={2} />
          </Animated.View>
        </View>
      </Pressable>

      {isExpanded && (
        <>
          <Animated.View
            style={[
              styles.dropdownOverlay,
              animatedBackgroundStyle,
            ]}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={handlePress}
            />
          </Animated.View>

          <Animated.View style={[styles.dropdownMenu, styles.dropdownMenuShadow]}>
            {SUPPORTED_CURRENCIES.map((currency, index) => (
              <Pressable
                key={currency.code}
                style={[
                  styles.currencyOption,
                  index !== SUPPORTED_CURRENCIES.length - 1 && styles.currencyOptionBorder,
                  currency.code === selectedCurrency && styles.currencyOptionActive,
                ]}
                onPress={() => handleCurrencySelect(currency.code)}>
                <View style={styles.optionContent}>
                  <Text
                    style={[
                      styles.optionSymbol,
                      currency.code === selectedCurrency && styles.optionSymbolActive,
                    ]}>
                    {currency.symbol}
                  </Text>
                  <View>
                    <Text
                      style={[
                        styles.optionCode,
                        currency.code === selectedCurrency && styles.optionCodeActive,
                      ]}>
                      {currency.code}
                    </Text>
                    <Text
                      style={[
                        styles.optionLabel,
                        currency.code === selectedCurrency && styles.optionLabelActive,
                      ]}>
                      {currency.label}
                    </Text>
                  </View>
                </View>
                {currency.code === selectedCurrency && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    zIndex: 100,
  },
  selectorButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E8E7F5',
  },
  selectorButtonShadow: {
    shadowColor: '#5548EF',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  selectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5548EF',
    marginRight: 12,
    width: 32,
    textAlign: 'center',
  },
  currencyTextGroup: {
    justifyContent: 'center',
  },
  currencyCode: {
    fontSize: 14,
    fontWeight: '700',
    color: '#29293D',
  },
  currencyLabel: {
    fontSize: 11,
    color: '#7E7D94',
    marginTop: 2,
    fontWeight: '500',
  },
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 98,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 99,
  },
  dropdownMenuShadow: {
    shadowColor: '#5548EF',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  currencyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  currencyOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0EFFF',
  },
  currencyOptionActive: {
    backgroundColor: '#F4F1FF',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionSymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7E7D94',
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  optionSymbolActive: {
    color: '#5548EF',
  },
  optionCode: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7E7D94',
  },
  optionCodeActive: {
    color: '#5548EF',
  },
  optionLabel: {
    fontSize: 11,
    color: '#B5B3CC',
    marginTop: 2,
    fontWeight: '500',
  },
  optionLabelActive: {
    color: '#7E7D94',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#5548EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default CurrencySelector;
