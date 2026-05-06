import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import {
  Bell,
  BookOpen,
  Heart,
  Landmark,
  MapPin,
  MoonStar,
  ScrollText,
  Settings,
  UserRound,
} from 'lucide-react-native';
import {
  HYDERABAD_TIME_ZONE,
  formatHijriDate,
  formatLocalTime,
  getMinutesInTimeZone,
} from '../utils/homeTime';

type HomeScreenProps = {
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenDailyQuote: () => void;
  onOpenFavorites: () => void;
  onOpenTasbeeh: () => void;
};

const HomeScreen = ({
  onOpenProfile,
  onOpenSettings,
  onOpenDailyQuote,
  onOpenFavorites,
  onOpenTasbeeh,
}: HomeScreenProps) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timerId = setInterval(() => setNow(new Date()), 1000);

    return () => clearInterval(timerId);
  }, []);

  const hijriDate = useMemo(() => formatHijriDate(now, HYDERABAD_TIME_ZONE), [now]);
  const currentTime = useMemo(() => formatLocalTime(now, HYDERABAD_TIME_ZONE), [now]);
  const currentMinutes = useMemo(() => getMinutesInTimeZone(now, HYDERABAD_TIME_ZONE), [now]);

  const cardShadow = {
    shadowColor: '#5548EF',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  } as const;

  const iconProps = {
    size: 18,
    strokeWidth: 1.9,
    color: '#29293D',
  } as const;

  const quickActions = [
    { id: 'quran', label: 'Quran', Icon: BookOpen, tone: '#F4F1FF', onPress: onOpenDailyQuote },
    { id: 'duas', label: 'Duas', Icon: MoonStar, tone: '#FFF4E8', onPress: onOpenTasbeeh },
    { id: 'favorites', label: 'Saved', Icon: Heart, tone: '#FDECEF', onPress: onOpenFavorites },
    { id: 'profile', label: 'Profile', Icon: UserRound, tone: '#E9E7FF', onPress: onOpenProfile },
    { id: 'settings', label: 'Tools', Icon: Settings, tone: '#EAF6F4', onPress: onOpenSettings },
  ] as const;

  const featuredCards = [
    {
      id: 'quran',
      title: 'Quran Companion',
      subtitle: 'Continue reading with a calm focus view.',
      label: 'Read Now',
      Icon: ScrollText,
      tone: '#F4F1FF',
      accent: '#5548EF',
    },
    {
      id: 'umrah',
      title: 'Umrah Guide',
      subtitle: 'A clean journey card for planning essentials.',
      label: 'Explore',
      Icon: Landmark,
      tone: '#F8F8FC',
      accent: '#7E7D94',
    },
    {
      id: 'zakat',
      title: 'Zakat Planner',
      subtitle: 'Organize your yearly giving with clarity.',
      label: 'Calculate',
      Icon: Heart,
      tone: '#EEF8F7',
      accent: '#2F7E77',
    },
  ] as const;

  const prayerTimes = [
    { name: 'Fajr', time: '05:10 AM', minutes: 5 * 60 + 10 },
    { name: 'Dhuhr', time: '12:20 PM', minutes: 12 * 60 + 20 },
    { name: 'Asr', time: '04:05 PM', minutes: 16 * 60 + 5 },
    { name: 'Maghrib', time: '06:15 PM', minutes: 18 * 60 + 15 },
    { name: 'Isha', time: '07:45 PM', minutes: 19 * 60 + 45 },
  ] as const;

  const nextPrayerIndex = prayerTimes.findIndex((item) => item.minutes > currentMinutes);
  const nextPrayer = prayerTimes[nextPrayerIndex >= 0 ? nextPrayerIndex : 0];
  const activePrayer =
    prayerTimes.find((item, index) => {
      const nextItem = prayerTimes[index + 1];
      return currentMinutes >= item.minutes && (!nextItem || currentMinutes < nextItem.minutes);
    }) ?? prayerTimes[0];

  const dashboardStats = [
    { id: 'now', label: 'Now', value: currentTime, hint: hijriDate },
    { id: 'next', label: 'Next', value: nextPrayer.name, hint: nextPrayer.time },
    { id: 'focus', label: 'Focus', value: activePrayer.name, hint: 'Prayer window' },
  ] as const;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />

      <View style={styles.bgBubble1} />
      <View style={styles.bgBubble2} />
      <View style={styles.bgDot1} />
      <View style={styles.bgDot2} />
      <View style={styles.bgBottom} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.headerCard, cardShadow]}>
          <View style={styles.headerBubble1} />
          <View style={styles.headerBubble2} />
          <View style={styles.headerDot} />

          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.locationRow}>
                <MapPin size={14} color="#7E7D94" strokeWidth={1.8} />
                <Text style={styles.locationText}>Hyderabad, India</Text>
              </View>
              <Text style={styles.headerTitle}>Ramadan Kareem</Text>
              <Text style={styles.headerSubtitle}>A calm space for prayer, reflection, and daily guidance.</Text>
            </View>

            <Pressable style={[styles.bellButton, cardShadow]} onPress={onOpenSettings}>
              <Bell {...iconProps} />
            </Pressable>
          </View>

          <View style={styles.tagRow}>
            <View style={styles.tagToday}>
              <Text style={styles.tagText}>Today</Text>
            </View>
            <View style={styles.tagFocus}>
              <Text style={styles.tagText}>Peaceful focus</Text>
            </View>
          </View>
        </View>

        <View style={styles.dashboardStrip}>
          {dashboardStats.map((item) => (
            <View key={item.id} style={[styles.dashboardCard, cardShadow]}>
              <Text style={styles.dashboardLabel}>{item.label}</Text>
              <Text style={styles.dashboardValue}>{item.value}</Text>
              <Text style={styles.dashboardHint}>{item.hint}</Text>
            </View>
          ))}
        </View>

        <View style={styles.prayerCardContainer}>
          <View style={[styles.prayerCard, cardShadow]}>
            <View style={styles.prayerCardRow}>
              <View style={styles.prayerCardLeft}>
                <Text style={styles.prayerLabel}>Today in Hyderabad</Text>
                <Text style={styles.prayerDate}>{hijriDate} Hijri</Text>
                <Text style={styles.prayerTime}>{currentTime}</Text>
                <View style={styles.nextPrayerRow}>
                  <View style={styles.moonIcon}>
                    <Text style={styles.moonText}>◔</Text>
                  </View>
                  <View>
                    <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
                    <Text style={styles.nextPrayerTime}>
                      {nextPrayer.name} at {nextPrayer.time}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.prayerArt}>
                <View style={styles.artCircle} />
                <View style={styles.artCup} />
                <View style={styles.artBase} />
                <View style={styles.artHandle1} />
                <View style={styles.artHandle2} />
                <View style={styles.artLight} />
              </View>
            </View>

            <View style={styles.focusWindow}>
              <View>
                <Text style={styles.focusLabel}>Current prayer window</Text>
                <Text style={styles.focusDescription}>{activePrayer.name} is the active slot</Text>
              </View>
              <View style={styles.viewTimesButton}>
                <Text style={styles.viewTimesText}>View times</Text>
              </View>
            </View>
          </View>

          <View style={styles.quickActionsContainer}>
            <Text style={styles.quickActionsLabel}>Quick actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map(({ id, label, Icon, tone, onPress }) => (
                <Pressable
                  key={id}
                  style={[styles.quickActionCard, { backgroundColor: tone }, cardShadow]}
                  onPress={onPress}>
                  <View style={styles.quickActionIcon}>
                    <Icon {...iconProps} />
                  </View>
                  <Text style={styles.quickActionLabel}>{label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable style={[styles.buttonPrimary, cardShadow]} onPress={onOpenProfile}>
            <Text style={styles.buttonText}>Open Profile</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonSecondary, cardShadow]}
            onPress={onOpenSettings}>
            <Text style={styles.buttonSecondaryText}>Open Settings</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonTertiary, cardShadow]}
            onPress={onOpenDailyQuote}>
            <Text style={styles.buttonTertiaryText}>Daily Quote</Text>
          </Pressable>

          <Pressable style={[styles.buttonAccent, cardShadow]} onPress={onOpenTasbeeh}>
            <Text style={styles.buttonText}>Tasbeeh Counter</Text>
          </Pressable>
        </View>

        <View style={styles.featuredContainer}>
          <Text style={styles.featuredLabel}>Featured</Text>
          <View style={styles.featuredGrid}>
            {featuredCards.map(({ id, title, subtitle, label, Icon, tone, accent }) => (
              <View key={id} style={[styles.featuredCard, { backgroundColor: tone }, cardShadow]}>
                <View style={styles.featuredHeader}>
                  <View style={styles.featuredIcon}>
                    <Icon size={18} strokeWidth={1.9} color={accent} />
                  </View>
                  <View style={styles.featuredDot} />
                </View>
                <Text style={styles.featuredTitle}>{title}</Text>
                <Text style={styles.featuredSubtitle}>{subtitle}</Text>
                <View style={styles.featuredButton}>
                  <Text style={styles.featuredButtonText}>{label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.reflectionCard, cardShadow]}>
          <View style={styles.reflectionBubble} />
          <View style={styles.reflectionDot} />
          <Text style={styles.reflectionLabel}>Reflection</Text>
          <Text style={styles.reflectionText}>Keep your heart steady, and let the day unfold with quiet intention.</Text>
          <Text style={styles.reflectionDescription}>A minimal reminder card that gives the home screen a calmer, more personal feel.</Text>
          <View style={styles.reflectionButton}>
            <View style={styles.reflectionButtonDot} />
            <Text style={styles.reflectionButtonText}>Open today's note</Text>
          </View>
        </View>

        <View style={[styles.prayerTimesCard, cardShadow]}>
          <View style={styles.prayerTimesHeader}>
            <View>
              <Text style={styles.prayerTimesLabel}>Prayer timings</Text>
              <Text style={styles.prayerTimesTitle}>Plan the rest of your day with clarity</Text>
            </View>
            <View style={styles.updatedBadge}>
              <Text style={styles.updatedBadgeText}>Updated today</Text>
            </View>
          </View>

          <View style={styles.prayerTimesGrid}>
            {prayerTimes.map((item) => (
              <View key={item.name} style={styles.prayerTimeItem}>
                <View style={[styles.prayerTimeDot, item.active ? styles.prayerTimeDotActive : styles.prayerTimeDotInactive]} />
                <Text style={[styles.prayerTimeName, item.active ? styles.prayerTimeNameActive : styles.prayerTimeNameInactive]}>
                  {item.name}
                </Text>
                <Text style={[styles.prayerTimeValue, item.active ? styles.prayerTimeValueActive : styles.prayerTimeValueInactive]}>
                  {item.time}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  scrollView: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
  },
  bgBubble1: {
    position: 'absolute',
    left: -56,
    top: 80,
    height: 144,
    width: 144,
    borderRadius: 999,
    backgroundColor: 'rgba(221, 235, 199, 0.5)',
  },
  bgBubble2: {
    position: 'absolute',
    right: -64,
    top: 176,
    height: 176,
    width: 176,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 231, 167, 0.25)',
  },
  bgDot1: {
    position: 'absolute',
    left: 40,
    top: '50%',
    height: 12,
    width: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(141, 196, 122, 0.6)',
  },
  bgDot2: {
    position: 'absolute',
    bottom: 32,
    right: 40,
    height: 96,
    width: 96,
    borderRadius: 999,
    backgroundColor: 'rgba(242, 217, 168, 0.3)',
  },
  bgBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 112,
    backgroundColor: 'rgba(246, 239, 207, 0.6)',
  },
  headerCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 32,
    backgroundColor: '#F8F6E8',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerBubble1: {
    position: 'absolute',
    right: -40,
    top: -40,
    height: 112,
    width: 112,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 231, 167, 0.8)',
  },
  headerBubble2: {
    position: 'absolute',
    bottom: -32,
    right: 32,
    height: 96,
    width: 96,
    borderRadius: 999,
    backgroundColor: '#DDEBC7',
  },
  headerDot: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    height: 12,
    width: 12,
    borderRadius: 999,
    backgroundColor: '#8DC47A',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#7E7D94',
  },
  headerTitle: {
    marginTop: 8,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '800',
    letterSpacing: -0.8,
    color: '#29293D',
  },
  headerSubtitle: {
    marginTop: 12,
    maxWidth: 260,
    fontSize: 14,
    lineHeight: 24,
    color: '#7E7D94',
  },
  bellButton: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  tagRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tagToday: {
    borderRadius: 999,
    backgroundColor: '#EEF4DC',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagFocus: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#6F8B42',
  },
  dashboardStrip: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  dashboardCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  dashboardLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8D8CA3',
  },
  dashboardValue: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '800',
    color: '#29293D',
  },
  dashboardHint: {
    marginTop: 4,
    fontSize: 12,
    color: '#7E7D94',
  },
  prayerCardContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  prayerCard: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  prayerCardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  prayerCardLeft: {
    flex: 1,
    paddingRight: 16,
  },
  prayerLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#5548EF',
  },
  prayerDate: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#29293D',
  },
  prayerTime: {
    marginTop: 8,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '800',
    letterSpacing: -1.2,
    color: '#29293D',
  },
  nextPrayerRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moonIcon: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D7D1FF',
    backgroundColor: '#F7F4FF',
  },
  moonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#5548EF',
  },
  nextPrayerLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#7E7D94',
  },
  nextPrayerTime: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#29293D',
  },
  prayerArt: {
    height: 150,
    width: 132,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 26,
    backgroundColor: '#EFEAFE',
  },
  artCircle: {
    position: 'absolute',
    right: 8,
    top: 12,
    height: 40,
    width: 40,
    borderRadius: 999,
    backgroundColor: '#C9B8FF',
  },
  artCup: {
    position: 'absolute',
    left: 16,
    top: 56,
    height: 64,
    width: 64,
    borderRadius: 16,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderColor: '#D7D1FF',
    backgroundColor: '#F7F4FF',
  },
  artBase: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#DAD3FF',
  },
  artHandle1: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    height: 80,
    width: 4,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    backgroundColor: '#5548EF',
  },
  artHandle2: {
    position: 'absolute',
    bottom: 0,
    right: 24,
    height: 56,
    width: 3,
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    backgroundColor: '#5548EF',
  },
  artLight: {
    position: 'absolute',
    right: 28,
    top: 4,
    height: 16,
    width: 24,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  focusWindow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 22,
    backgroundColor: '#F5F4FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  focusLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: '#5548EF',
  },
  focusDescription: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: '#29293D',
  },
  viewTimesButton: {
    borderRadius: 999,
    backgroundColor: '#5548EF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  viewTimesText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#FFFFFF',
  },
  quickActionsContainer: {
    marginTop: 16,
    width: '100%',
  },
  quickActionsLabel: {
    marginBottom: 12,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: '#5548EF',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    minWidth: 58,
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  quickActionIcon: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  quickActionLabel: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#29293D',
  },
  buttonGroup: {
    marginBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  buttonPrimary: {
    minWidth: '46%',
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonSecondary: {
    minWidth: '46%',
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonSecondaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#29293D',
  },
  buttonTertiary: {
    minWidth: '46%',
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#5548EF',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonTertiaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#5548EF',
  },
  buttonAccent: {
    minWidth: '46%',
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featuredContainer: {
    marginBottom: 16,
  },
  featuredLabel: {
    marginBottom: 12,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: '#5548EF',
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featuredCard: {
    width: '48%',
    overflow: 'hidden',
    borderRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  featuredHeader: {
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  featuredIcon: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  featuredDot: {
    height: 20,
    width: 20,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#29293D',
  },
  featuredSubtitle: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
    color: '#6F6E84',
  },
  featuredButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#29293D',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  featuredButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reflectionCard: {
    marginBottom: 8,
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: '#F8F8FC',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  reflectionBubble: {
    position: 'absolute',
    right: -24,
    top: -24,
    height: 80,
    width: 80,
    borderRadius: 999,
    backgroundColor: '#E9E7FF',
  },
  reflectionDot: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    height: 10,
    width: 10,
    borderRadius: 999,
    backgroundColor: '#5548EF',
  },
  reflectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: '#5548EF',
  },
  reflectionText: {
    marginTop: 12,
    fontSize: 19,
    lineHeight: 32,
    fontWeight: '800',
    letterSpacing: -0.4,
    color: '#29293D',
  },
  reflectionDescription: {
    marginTop: 12,
    maxWidth: 260,
    fontSize: 13,
    lineHeight: 24,
    color: '#7E7D94',
  },
  reflectionButton: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  reflectionButtonDot: {
    height: 8,
    width: 8,
    borderRadius: 999,
    backgroundColor: '#D7A64D',
  },
  reflectionButtonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#29293D',
  },
  prayerTimesCard: {
    marginBottom: 16,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E7F0',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  prayerTimesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prayerTimesLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: '#8C8AA0',
  },
  prayerTimesTitle: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
    color: '#29293D',
  },
  updatedBadge: {
    borderRadius: 999,
    backgroundColor: '#F5F4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  updatedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#5548EF',
  },
  prayerTimesGrid: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderRadius: 22,
    backgroundColor: '#FAFAFD',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  prayerTimeItem: {
    alignItems: 'center',
  },
  prayerTimeDot: {
    height: 10,
    width: 10,
    borderRadius: 999,
  },
  prayerTimeDotActive: {
    backgroundColor: '#F0A11A',
  },
  prayerTimeDotInactive: {
    backgroundColor: '#D7D7E3',
  },
  prayerTimeName: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '700',
  },
  prayerTimeNameActive: {
    color: '#F0A11A',
  },
  prayerTimeNameInactive: {
    color: '#6F6E84',
  },
  prayerTimeValue: {
    marginTop: 4,
    fontSize: 10,
  },
  prayerTimeValueActive: {
    fontWeight: '800',
    color: '#29293D',
  },
  prayerTimeValueInactive: {
    color: '#9A98AF',
  },
});

export default HomeScreen;
