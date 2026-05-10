import React, { useState } from 'react';
import { Pressable, StatusBar, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react-native';
import { dailyQuotes } from '../data/quoteData';
import QuoteCard from '../components/QuoteCard';
import QuoteActions from '../components/QuoteActions';

type DailyQuoteScreenProps = {
  onBackToHome: () => void;
};

const DailyQuoteScreen = ({ onBackToHome }: DailyQuoteScreenProps) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [savedQuoteIds, setSavedQuoteIds] = useState<number[]>([]);
  const quote = dailyQuotes[currentQuoteIndex];
  const isSaved = savedQuoteIds.includes(quote.id);

  const toggleSaveQuote = () => {
    setSavedQuoteIds((prev) =>
      prev.includes(quote.id) ? prev.filter((id) => id !== quote.id) : [...prev, quote.id]
    );
  };

  const onShare = async () => {
    try {
      await Share.share({ message: `${quote.text} — ${quote.source}` });
    } catch (e) {
      // ignore share errors for now
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      <View style={styles.container}>
        <Text style={styles.title}>Daily Quote</Text>

        <QuoteCard quote={quote} />

        <View style={styles.navRow}>
          <Pressable
            style={styles.navButton}
            onPress={() =>
              setCurrentQuoteIndex((prev) => (prev === 0 ? dailyQuotes.length - 1 : prev - 1))
            }>
            <ChevronLeft size={20} color="#3D3AE0" />
          </Pressable>

          <Text style={styles.pageIndicator}>
            {currentQuoteIndex + 1} / {dailyQuotes.length}
          </Text>

          <Pressable
            style={styles.navButton}
            onPress={() =>
              setCurrentQuoteIndex((prev) => (prev === dailyQuotes.length - 1 ? 0 : prev + 1))
            }>
            <ChevronRight size={20} color="#3D3AE0" />
          </Pressable>
        </View>

        <QuoteActions isSaved={isSaved} onToggleSave={toggleSaveQuote} onShare={onShare} />

        <Pressable style={styles.backButton} onPress={onBackToHome}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#29293D',
  },
  quoteCard: {
    marginTop: 40,
    width: '100%',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#3D3AE0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  quoteText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#3D3AE0',
  },
  quoteSource: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#7E7D94',
  },
  navRow: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  navButton: {
    borderRadius: 999,
    backgroundColor: '#E7E7F0',
    padding: 12,
  },
  pageIndicator: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7E7D94',
  },
  saveButton: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7E7D94',
  },
});

export default DailyQuoteScreen;
