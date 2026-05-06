import React, { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { tasbeehPhrases, predefinedRanges } from '../data/tasbeehData';
import RangeSelector from '../componenets/RangeSelector';
import CounterDisplay from '../componenets/CounterDisplay';

type TasbeehScreenProps = {
  onBackToHome: () => void;
};

const TasbeehScreen = ({ onBackToHome }: TasbeehScreenProps) => {
  const [selectedPhrase, setSelectedPhrase] = useState(tasbeehPhrases[0]); // Default first phrase
  const [selectedRange, setSelectedRange] = useState(predefinedRanges[0].value); // Default 33
  const [counter, setCounter] = useState(0);
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [customRange, setCustomRange] = useState('33');

  // Helper functions
  const getActiveRange = () => (isCustomRange ? parseInt(customRange) || 33 : selectedRange);

  const incrementCounter = () => {
    const range = getActiveRange();
    setCounter((currentCounter) => (currentCounter < range ? currentCounter + 1 : currentCounter));
  };

  const resetCounter = () => {
    setCounter(0);
  };

  const decreaseRange = () => {
    setCustomRange((currentRange) => {
      const nextRange = Math.max((parseInt(currentRange) || 33) - 1, 1);
      return String(nextRange);
    });
  };

  const increaseRange = () => {
    setCustomRange((currentRange) => {
      const nextRange = Math.max(parseInt(currentRange) || 33, 1) + 1;
      return String(nextRange);
    });
  };

  const getProgressPercentage = () => {
    const range = getActiveRange();
    return (counter / range) * 100;
  };

  const heroStats = [
    { id: 'phrase', label: 'Dhikr', value: selectedPhrase.name },
    { id: 'target', label: 'Target', value: String(getActiveRange()) },
    { id: 'progress', label: 'Progress', value: `${Math.round(getProgressPercentage())}%` },
  ] as const;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      
      <View style={styles.mainContainer}>
        <View style={styles.heroCard}>
          <View style={styles.heroAccent} />
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.headerTitle}>Tasbeeh Counter</Text>
              <Text style={styles.headerSubtitle}>Pick a dhikr, set a target, and tap to count.</Text>
            </View>
            <Pressable onPress={onBackToHome} style={styles.backPill}>
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
          </View>

          <View style={styles.heroStatsRow}>
            {heroStats.map((item) => (
              <View key={item.id} style={styles.heroStatCard}>
                <Text style={styles.heroStatLabel}>{item.label}</Text>
                <Text style={styles.heroStatValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.phraseCard}>
          <Text style={styles.phraseLabel}>Choose Tasbeeh</Text>
          <View style={styles.phraseContainer}>
            {tasbeehPhrases.map((phrase) => {
              const isSelected = selectedPhrase.id === phrase.id;

              return (
                <Pressable
                  key={phrase.id}
                  style={[
                    styles.phraseButton,
                    isSelected ? styles.phraseButtonActive : styles.phraseButtonInactive,
                  ]}
                  onPress={() => {
                    setSelectedPhrase(phrase);
                    setCounter(0);
                  }}>
                  <Text style={isSelected ? styles.phraseButtonTextActive : styles.phraseButtonText}>
                    {phrase.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Main content will go here */}
        <RangeSelector
          selectedRange={selectedRange}
          onRangeSelect={setSelectedRange}
          isCustomRange={isCustomRange}
          onToggleCustom={setIsCustomRange}
          customRange={customRange}
          onCustomRangeChange={setCustomRange}
          onDecreaseRange={decreaseRange}
          onIncreaseRange={increaseRange}
        />

        {/* Counter section will be added next */}
        <CounterDisplay
          phrase={selectedPhrase}
          counter={counter}
          targetRange={getActiveRange()}
          progressPercentage={getProgressPercentage()}
          onIncrement={incrementCounter}
          onReset={resetCounter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEBFA',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  heroCard: {
    marginBottom: 22,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 18,
    overflow: 'hidden',
  },
  heroAccent: {
    position: 'absolute',
    right: -24,
    top: -24,
    height: 120,
    width: 120,
    borderRadius: 999,
    backgroundColor: '#F4F1FF',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#29293D',
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#7E7D94',
  },
  backPill: {
    borderRadius: 999,
    backgroundColor: '#F5F4FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5548EF',
  },
  heroStatsRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  heroStatCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#F8F8FC',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  heroStatLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#8D8CA3',
  },
  heroStatValue: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '800',
    color: '#29293D',
  },
  phraseCard: {
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  phraseLabel: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#7E7D94',
  },
  phraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  phraseButton: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  phraseButtonActive: {
    backgroundColor: '#5548EF',
  },
  phraseButtonInactive: {
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
  },
  phraseButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#29293D',
  },
  phraseButtonTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TasbeehScreen;
