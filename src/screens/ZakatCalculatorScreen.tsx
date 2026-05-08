import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  FadeIn,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ArrowLeft, Calculator, Info } from 'lucide-react-native';
import AssetInputFields from '../components/AssetInputFields';
import ZakatResultCard from '../components/ZakatResultCard';
import { AssetInput } from '../types/zakatTypes';
import { calculateZakat } from '../utils/zakatCalculations';

type ZakatCalculatorScreenProps = {
  onGoBack: () => void;
};

const ZakatCalculatorScreen = ({ onGoBack }: ZakatCalculatorScreenProps) => {
  const defaultAssets = useMemo<AssetInput>(() => ({
    cash: 0,
    bankBalance: 0,
    goldGrams: 0,
    silverGrams: 0,
    otherAssets: 0,
  }), []);

  const [assets, setAssets] = useState<AssetInput>(defaultAssets);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof AssetInput, string>>>({});
  const [calculationCount, setCalculationCount] = useState(0);

  const previewResult = useMemo(() => calculateZakat(assets), [assets]);
  const hasValidationErrors = Object.values(validationErrors).some(Boolean);
  const calculateButtonScale = useSharedValue(1);

  const cardShadow = {
    shadowColor: '#5548EF',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  } as const;

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: calculateButtonScale.value }],
  }));

  const handleCalculatePress = () => {
    if (hasValidationErrors) {
      return;
    }

    setCalculationCount((previous) => previous + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      
      <View style={styles.bgBubble1} />
      <View style={styles.bgBubble2} />
      
      <Animated.View
        entering={SlideInDown.springify().damping(12)}
        style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={onGoBack}>
          <ArrowLeft size={24} color="#29293D" strokeWidth={2} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Zakat Calculator</Text>
          <Text style={styles.headerSubtitle}>Calculate your yearly obligation</Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </Animated.View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          <Animated.View
            entering={FadeIn.delay(100).springify()}
            style={[styles.infoCard, cardShadow]}>
            <View style={styles.infoIconBox}>
              <Info size={20} color="#5548EF" strokeWidth={2} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>How Zakat works</Text>
              <Text style={styles.infoText}>
                Zakat (2.5%) is payable on your wealth if it exceeds the Nisab threshold. Include all assets: cash, savings, gold, silver, and investments.
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.delay(200).springify()}
            style={styles.formSection}>
            <Text style={styles.sectionTitle}>Your Assets</Text>
            <Text style={styles.sectionDescription}>
              Enter the current value of your assets in INR
            </Text>

            {hasValidationErrors ? (
              <Animated.View entering={FadeIn.delay(50).springify()} style={styles.validationBanner}>
                <Text style={styles.validationBannerText}>
                  Please fix the highlighted fields before calculating your Zakat.
                </Text>
              </Animated.View>
            ) : null}
            
            <View style={[styles.formCard, cardShadow]}>
              <AssetInputFields
                assets={assets}
                onAssetsChange={setAssets}
                validationErrors={validationErrors}
                onFieldValidation={(field, error) =>
                  setValidationErrors((previous) => ({
                    ...previous,
                    [field]: error,
                  }))
                }
              />
            </View>

            <Animated.View style={[styles.calculateButtonWrap, buttonAnimatedStyle]}>
              <Pressable
                onPress={handleCalculatePress}
                onPressIn={() => {
                  calculateButtonScale.value = withSpring(0.97, {
                    damping: 12,
                    stiffness: 180,
                  });
                }}
                onPressOut={() => {
                  calculateButtonScale.value = withSpring(1, {
                    damping: 12,
                    stiffness: 180,
                  });
                }}
                style={[styles.calculateButton, cardShadow, hasValidationErrors && styles.calculateButtonDisabled]}>
                <Calculator size={18} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.calculateButtonText}>Calculate Zakat</Text>
              </Pressable>
            </Animated.View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.delay(300).springify()}
            style={styles.formulaSection}>
            <ZakatResultCard key={`zakat-result-${calculationCount}`} result={previewResult} />
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  bgBubble1: {
    position: 'absolute',
    left: -56,
    top: 80,
    height: 144,
    width: 144,
    borderRadius: 999,
    backgroundColor: '#F4F1FF',
    opacity: 0.5,
    zIndex: 1,
  },
  bgBubble2: {
    position: 'absolute',
    right: -40,
    top: 250,
    height: 100,
    width: 100,
    borderRadius: 999,
    backgroundColor: '#EEF8F7',
    opacity: 0.4,
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(85, 72, 239, 0.08)',
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#29293D',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#7E7D94',
    marginTop: 2,
    fontWeight: '500',
  },
  headerPlaceholder: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F4F1FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#5548EF',
  },
  infoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(85, 72, 239, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#29293D',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#7E7D94',
    lineHeight: 18,
    fontWeight: '500',
  },
  formSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#29293D',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#7E7D94',
    marginBottom: 12,
    fontWeight: '500',
  },
  validationBanner: {
    backgroundColor: '#FFF4E8',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#D68C1B',
  },
  validationBannerText: {
    fontSize: 11,
    lineHeight: 16,
    color: '#9C6D00',
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EFFF',
  },
  calculateButtonWrap: {
    marginTop: 14,
  },
  calculateButton: {
    backgroundColor: '#5548EF',
    borderRadius: 16,
    minHeight: 52,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  calculateButtonDisabled: {
    opacity: 0.72,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  formulaSection: {
    marginBottom: 24,
  },
});

export default ZakatCalculatorScreen;
