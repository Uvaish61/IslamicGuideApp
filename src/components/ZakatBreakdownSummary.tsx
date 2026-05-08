import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  FadeInUp,
} from 'react-native-reanimated';
import { Wallet, Banknote, Gem, Package } from 'lucide-react-native';
import { ZakatBreakdown } from '../types/zakatTypes';
import { formatCurrency } from '../utils/zakatCalculations';

type BreakdownItem = {
  key: keyof ZakatBreakdown;
  label: string;
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  tint: string;
  background: string;
};

interface ZakatBreakdownSummaryProps {
  breakdown: ZakatBreakdown;
  containerStyle?: ViewStyle;
}

const breakdownItems: BreakdownItem[] = [
  {
    key: 'cashZakat',
    label: 'Cash',
    Icon: Wallet,
    tint: '#5548EF',
    background: '#F4F1FF',
  },
  {
    key: 'bankZakat',
    label: 'Bank Balance',
    Icon: Banknote,
    tint: '#2F7E77',
    background: '#EEF8F7',
  },
  {
    key: 'goldZakat',
    label: 'Gold',
    Icon: Gem,
    tint: '#C98A10',
    background: '#FFF6E6',
  },
  {
    key: 'silverZakat',
    label: 'Silver',
    Icon: Package,
    tint: '#7E7D94',
    background: '#F8F8FC',
  },
  {
    key: 'otherZakat',
    label: 'Other Assets',
    Icon: Package,
    tint: '#D64545',
    background: '#FFF0F0',
  },
];

const ZakatBreakdownSummary: React.FC<ZakatBreakdownSummaryProps> = ({
  breakdown,
  containerStyle,
}) => {
  const totalBreakdown = Object.values(breakdown).reduce((sum, value) => sum + value, 0);

  return (
    <Animated.View entering={FadeInUp.springify()} style={[styles.container, containerStyle]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.label}>Breakdown</Text>
          <Text style={styles.title}>How your Zakat is distributed</Text>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.totalBadgeText}>{formatCurrency(totalBreakdown)}</Text>
        </View>
      </View>

      <View style={styles.list}>
        {breakdownItems.map((item, index) => {
          const amount = breakdown[item.key];
          const percentage = totalBreakdown > 0 ? (amount / totalBreakdown) * 100 : 0;

          return (
            <Animated.View
              key={item.key}
              entering={FadeInUp.delay(index * 60).springify()}
              style={styles.row}>
              <View style={styles.rowTop}>
                <View style={[styles.iconWrap, { backgroundColor: item.background }]}>
                  <item.Icon size={16} color={item.tint} strokeWidth={2} />
                </View>
                <View style={styles.rowTextGroup}>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <Text style={styles.rowAmount}>{formatCurrency(amount)}</Text>
                </View>
                <Text style={[styles.rowPercent, { color: item.tint }]}>{percentage.toFixed(0)}%</Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.max(percentage, amount > 0 ? 10 : 0)}%`, backgroundColor: item.tint },
                  ]}
                />
              </View>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.footerNote}>
        <Text style={styles.footerNoteText}>
          This breakdown shows the Zakat portion contributed by each asset class at the standard 2.5% rate.
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
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
    fontSize: 16,
    color: '#29293D',
    fontWeight: '800',
    lineHeight: 22,
  },
  totalBadge: {
    backgroundColor: '#F4F1FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  totalBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#5548EF',
  },
  list: {
    gap: 12,
  },
  row: {
    backgroundColor: '#FCFBFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0EFFF',
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTextGroup: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#29293D',
  },
  rowAmount: {
    fontSize: 11,
    color: '#7E7D94',
    fontWeight: '500',
    marginTop: 2,
  },
  rowPercent: {
    fontSize: 12,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#F0EFFF',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  footerNote: {
    marginTop: 14,
    backgroundColor: '#EEF8F7',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  footerNoteText: {
    fontSize: 11,
    lineHeight: 16,
    color: '#2F7E77',
    fontWeight: '500',
  },
});

export default ZakatBreakdownSummary;
