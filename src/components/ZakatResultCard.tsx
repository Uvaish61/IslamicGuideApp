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
import { Pressable, View } from 'react-native';
import { ShieldCheck, CircleAlert, TrendingUp, Landmark, Bookmark, Share2 } from 'lucide-react-native';
import { ZakatCalculation } from '../types/zakatTypes';
import { formatZakatCalculation } from '../utils/zakatCalculations';
import ZakatBreakdownSummary from './ZakatBreakdownSummary';
import colors from '../theme/colors';

interface ZakatResultCardProps {
  result: ZakatCalculation | null;
  onSavePress?: () => void;
  onSharePress?: () => void;
  isSaved?: boolean;
  isSaving?: boolean;
  containerStyle?: ViewStyle;
}

const ZakatResultCard: React.FC<ZakatResultCardProps> = ({
  result,
  onSavePress,
  onSharePress,
  isSaved = false,
  isSaving = false,
  containerStyle,
}) => {
  const cardShadow = {
    shadowColor: colors.primary,
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

  const {
    formattedTotalAssets,
    formattedNisab,
    formattedZakat,
    statusLabel,
    calculatedAt,
    eligibilityNote,
  } = formatZakatCalculation(result);
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
              {statusLabel}
            </Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.primaryStatCard}>
        <Text style={styles.primaryStatLabel}>Zakat Payable</Text>
        <Text style={[styles.primaryStatValue, isEligible ? styles.primaryStatValueActive : styles.primaryStatValueMuted]}>
          {formattedZakat}
        </Text>
        <Text style={styles.primaryStatHint}>
          {eligibilityNote}
        </Text>
      </View>

      <View style={styles.breakdownGrid}>
        <View style={styles.breakdownItem}>
          <View style={styles.breakdownIcon}>
            <Landmark size={16} color="#5548EF" strokeWidth={2} />
          </View>
          <Text style={styles.breakdownLabel}>Total Assets</Text>
          <Text style={styles.breakdownValue}>{formattedTotalAssets}</Text>
        </View>

        <View style={styles.breakdownItem}>
          <View style={styles.breakdownIconTeal}>
            <ShieldCheck size={16} color="#2F7E77" strokeWidth={2} />
          </View>
          <Text style={styles.breakdownLabel}>Nisab</Text>
          <Text style={styles.breakdownValue}>{formattedNisab}</Text>
        </View>
      </View>

      <ZakatBreakdownSummary
        breakdown={result.breakdown}
        containerStyle={styles.breakdownSummaryCard}
      />

      {(onSavePress || onSharePress) ? (
        <View style={styles.actionRow}>
          {onSavePress ? (
            <Pressable
              onPress={onSavePress}
              disabled={isSaving || isSaved}
              style={[
                styles.actionButton,
                isSaved ? styles.saveButtonSaved : styles.saveButtonIdle,
                isSaving && styles.saveButtonDisabled,
              ]}>
              <Bookmark size={16} color={isSaved ? '#2F7E77' : '#FFFFFF'} strokeWidth={2.2} />
              <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextSaved]}>
                {isSaving ? 'Saving...' : isSaved ? 'Saved to History' : 'Save Result'}
              </Text>
            </Pressable>
          ) : null}

          {onSharePress ? (
            <Pressable
              onPress={onSharePress}
              style={[styles.actionButton, styles.shareButton]}>
              <Share2 size={16} color="#FFFFFF" strokeWidth={2.2} />
              <Text style={styles.shareButtonText}>Share Result</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <View style={styles.footerNote}>
        <Text style={styles.footerNoteText}>
          Calculated in INR. Updated {calculatedAt}.
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
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
    color: colors.textSecondary,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    color: colors.textPrimary,
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
    backgroundColor: colors.successSoft,
  },
  badgeNeutral: {
    backgroundColor: colors.warningSoft,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextSuccess: {
    color: colors.secondary,
  },
  badgeTextNeutral: {
    color: '#9C6D00',
  },
  primaryStatCard: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  primaryStatLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  primaryStatValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  primaryStatValueActive: {
    color: colors.secondary,
  },
  primaryStatValueMuted: {
    color: colors.primary,
  },
  primaryStatHint: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  breakdownGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  breakdownItem: {
    flex: 1,
    backgroundColor: colors.surfaceTertiary,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  breakdownIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  breakdownIconTeal: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: colors.secondarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  breakdownLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  breakdownSummaryCard: {
    marginBottom: 14,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  actionButton: {
    minHeight: 50,
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  saveButton: {
    minHeight: 50,
    borderRadius: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  saveButtonIdle: {
    backgroundColor: colors.primary,
  },
  saveButtonSaved: {
    backgroundColor: colors.successSoft,
  },
  saveButtonDisabled: {
    opacity: 0.78,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.surface,
    letterSpacing: 0.2,
  },
  saveButtonTextSaved: {
    color: colors.secondary,
  },
  shareButton: {
    backgroundColor: colors.secondary,
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  footerNote: {
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  footerNoteText: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

export default ZakatResultCard;
