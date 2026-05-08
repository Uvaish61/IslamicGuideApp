import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';
import { ShieldCheck, CircleAlert, TrendingUp, Landmark } from 'lucide-react-native';
import { ZakatCalculation } from '../types/zakatTypes';
import { formatCurrency } from '../utils/zakatCalculations';

interface ZakatResultCardProps {
  result: ZakatCalculation | null;
  containerStyle?: ViewStyle;
}

const ZakatResultCard: React.FC<ZakatResultCardProps> = ({
  result,
  containerStyle,
}) => {
  const cardShadow = {
    shadowColor: '#5548EF',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  } as const;

  if (!result) {
    return (
      <Animated.View
        entering={FadeInUp.springify()}
        style={[styles.container, containerStyle, cardShadow]}>
        <View style={styles.emptyIconWrap}>
          <TrendingUp size={22} color="#5548EF" strokeWidth={2} />
        </View>
        <Text style={styles.emptyTitle}>Your Zakat result will appear here</Text>
        <Text style={styles.emptyText}>
          Enter your assets and calculate to see a clean breakdown of your total wealth, Nisab status, and Zakat amount.
        </Text>
      </Animated.View>
    );
  }

  const totalAssetsFormatted = formatCurrency(result.totalAssets);
  const nisabFormatted = formatCurrency(result.nisabAmount);
  const zakatFormatted = formatCurrency(result.zakatAmount);
  const isEligible = result.isNisabMet;

  return (
    <Animated.View
      entering={FadeInUp.springify()}
      style={[styles.container, containerStyle, cardShadow]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.label}>Calculation Result</Text>
          <Text style={styles.title}>Zakat Summary</Text>
        </View>
        <Animated.View entering={ZoomIn.delay(120).springify()} style={styles.badgeWrap}>
          <View style={[styles.badge, isEligible ? styles.badgeSuccess : styles.badgeNeutral]}>
            {isEligible ? (
              <ShieldCheck size={14} color="#2F7E77" strokeWidth={2.2} />
            ) : (
              <CircleAlert size={14} color="#9C6D00" strokeWidth={2.2} />
            )}
            <Text style={[styles.badgeText, isEligible ? styles.badgeTextSuccess : styles.badgeTextNeutral]}>
              {isEligible ? 'Nisab Met' : 'Below Nisab'}
            </Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.primaryStatCard}>
        <Text style={styles.primaryStatLabel}>Zakat Payable</Text>
        <Text style={[styles.primaryStatValue, isEligible ? styles.primaryStatValueActive : styles.primaryStatValueMuted]}>
          {zakatFormatted}
        </Text>
        <Text style={styles.primaryStatHint}>
          {isEligible
            ? 'You are required to pay 2.5% on your eligible wealth.'
            : 'Your total wealth is currently below the Nisab threshold.'}
        </Text>
      </View>

      <View style={styles.breakdownGrid}>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownIcon}>
            <Landmark size={16} color="#5548EF" strokeWidth={2} />
          </View>
          <Text style={styles.breakdownLabel}>Total Assets</Text>
          <Text style={styles.breakdownValue}>{totalAssetsFormatted}</Text>
        </View>

        <View style={styles.breakdownItem}>
          <View style={styles.breakdownIconTeal}>
            <ShieldCheck size={16} color="#2F7E77" strokeWidth={2} />
          </View>
          <Text style={styles.breakdownLabel}>Nisab</Text>
          <Text style={styles.breakdownValue}>{nisabFormatted}</Text>
        </View>
      </View>

      <View style={styles.footerNote}>
        <Text style={styles.footerNoteText}>
          Calculated in INR. You can refine the asset inputs next to get a precise result.
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F0EFFF',
  },
  emptyIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F4F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#29293D',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#7E7D94',
    fontWeight: '500',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#7E7D94',
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    color: '#29293D',
    fontWeight: '800',
  },
  badgeWrap: {
    marginLeft: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 6,
  },
  badgeSuccess: {
    backgroundColor: '#EAF6F4',
  },
  badgeNeutral: {
    backgroundColor: '#FFF4E8',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextSuccess: {
    color: '#2F7E77',
  },
  badgeTextNeutral: {
    color: '#9C6D00',
  },
  primaryStatCard: {
    backgroundColor: '#F8F8FC',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  primaryStatLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7E7D94',
    marginBottom: 8,
  },
  primaryStatValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  primaryStatValueActive: {
    color: '#2F7E77',
  },
  primaryStatValueMuted: {
    color: '#5548EF',
  },
  primaryStatHint: {
    fontSize: 12,
    lineHeight: 18,
    color: '#7E7D94',
    fontWeight: '500',
  },
  breakdownGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  breakdownItem: {
    flex: 1,
    backgroundColor: '#FCFBFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0EFFF',
  },
  breakdownIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#F4F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  breakdownIconTeal: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#EEF8F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  breakdownLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7E7D94',
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#29293D',
  },
  footerNote: {
    backgroundColor: '#F4F1FF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  footerNoteText: {
    fontSize: 11,
    lineHeight: 16,
    color: '#7E7D94',
    fontWeight: '500',
  },
});

export default ZakatResultCard;
