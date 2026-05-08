import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  FadeIn,
} from 'react-native-reanimated';
import {
  Wallet,
  Banknote,
  Gem,
  Coins as CoinsIcon,
  Package,
} from 'lucide-react-native';
import AnimatedInputField from './AnimatedInputField';
import { AssetInput } from '../types/zakatTypes';

interface AssetInputFieldsProps {
  assets: AssetInput;
  onAssetsChange: (assets: AssetInput) => void;
  validationErrors?: Partial<Record<keyof AssetInput, string>>;
  onFieldValidation?: (field: keyof AssetInput, error?: string) => void;
  containerStyle?: ViewStyle;
}

const ASSET_FIELDS = [
  {
    key: 'cash',
    label: 'Cash & Savings',
    icon: Wallet,
    placeholder: 'Enter amount',
    hint: 'Physical cash and immediate savings',
  },
  {
    key: 'bankBalance',
    label: 'Bank Balance',
    icon: Banknote,
    placeholder: 'Enter amount',
    hint: 'Total balance across all accounts',
  },
  {
    key: 'goldGrams',
    label: 'Gold (in grams)',
    icon: Gem,
    placeholder: 'Enter weight',
    hint: 'Total gold you own',
    suffix: 'g',
  },
  {
    key: 'silverGrams',
    label: 'Silver (in grams)',
    icon: Gem,
    placeholder: 'Enter weight',
    hint: 'Total silver you own',
    suffix: 'g',
  },
  {
    key: 'otherAssets',
    label: 'Other Investments',
    icon: Package,
    placeholder: 'Enter amount',
    hint: 'Stocks, bonds, business assets, etc.',
  },
] as const;

const AssetInputFields: React.FC<AssetInputFieldsProps> = ({
  assets,
  onAssetsChange,
  validationErrors,
  onFieldValidation,
  containerStyle,
}) => {
  const handleFieldChange = (field: keyof AssetInput, value: string) => {
    const trimmedValue = value.trim();
    const parsedValue = trimmedValue === '' ? 0 : Number(trimmedValue);
    const safeValue = Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : 0;

    let error: string | undefined;

    if (trimmedValue !== '') {
      if (!Number.isFinite(parsedValue) || Number.isNaN(parsedValue)) {
        error = 'Enter a valid number';
      } else if (parsedValue < 0) {
        error = 'Value cannot be negative';
      }
    }

    onFieldValidation?.(field, error);
    onAssetsChange({
      ...assets,
      [field]: safeValue,
    });
  };

  return (
    <Animated.View
      entering={FadeIn.delay(100).springify()}
      style={[styles.container, containerStyle]}>
      <View style={styles.headerSection}>
        <Text style={styles.sectionTitle}>Asset Details</Text>
        <Text style={styles.sectionDescription}>
          Enter all your current assets in INR
        </Text>
      </View>

      <View style={styles.fieldsContainer}>
        {ASSET_FIELDS.map((field, index) => {
          const Icon = field.icon;
          const assetValue = assets[field.key as keyof AssetInput] || 0;
          const displayValue = assetValue === 0 ? '' : assetValue.toString();

          return (
            <Animated.View
              key={field.key}
              entering={FadeIn.delay(150 + index * 50).springify()}>
              <View style={styles.fieldWrapper}>
                <AnimatedInputField
                  label={field.label}
                  placeholder={field.placeholder}
                  value={displayValue}
                  onChangeText={(text) =>
                    handleFieldChange(field.key as keyof AssetInput, text)
                  }
                  icon={<Icon size={18} color="#5548EF" strokeWidth={2} />}
                  suffix={field.suffix}
                  keyboardType="decimal-pad"
                  error={validationErrors?.[field.key as keyof AssetInput]}
                />
                <Text style={styles.fieldHint}>{field.hint}</Text>
              </View>
            </Animated.View>
          );
        })}
      </View>

      <View style={[styles.infoBox, styles.infoBoxShadow]}>
        <View style={styles.infoDot} />
        <Text style={styles.infoText}>
          Include all assets owned by you personally. Zakat is calculated at 2.5% of your total wealth exceeding the Nisab threshold.
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerSection: {
    marginBottom: 20,
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
    fontWeight: '500',
  },
  fieldsContainer: {
    marginBottom: 20,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  fieldHint: {
    fontSize: 11,
    color: '#B5B3CC',
    marginTop: 6,
    marginLeft: 2,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  infoBox: {
    backgroundColor: '#F4F1FF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    borderLeftWidth: 3,
    borderLeftColor: '#5548EF',
  },
  infoBoxShadow: {
    shadowColor: '#5548EF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5548EF',
    marginRight: 10,
    marginTop: 6,
  },
  infoText: {
    fontSize: 11,
    color: '#7E7D94',
    lineHeight: 16,
    fontWeight: '500',
    flex: 1,
  },
});

export default AssetInputFields;
