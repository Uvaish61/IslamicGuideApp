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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ECEBFA" />
      
      <View style={styles.mainContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Tasbeeh Counter</Text>
            <Text style={styles.headerSubtitle}>Pick a dhikr, set a target, and tap to count.</Text>
          </View>
          <Pressable onPress={onBackToHome}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
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
  header: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#29293D',
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#7E7D94',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5548EF',
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
