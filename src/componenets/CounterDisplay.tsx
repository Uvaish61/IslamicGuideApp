import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TasbeehPhrase } from '../data/tasbeehData';

type CounterDisplayProps = {
  phrase: TasbeehPhrase;
  counter: number;
  targetRange: number;
  progressPercentage: number;
  onIncrement: () => void;
  onReset: () => void;
};

const CounterDisplay = ({
  phrase,
  counter,
  targetRange,
  progressPercentage,
  onIncrement,
  onReset,
}: CounterDisplayProps) => {
  const isCompleted = counter >= targetRange;

  return (
    <View style={styles.container}>
      {/* Phrase Section */}
      <View style={styles.phraseSection}>
        <Text style={styles.phraseText}>{phrase.text}</Text>
        <Text style={styles.phraseName}>{phrase.name}</Text>
        <Text style={styles.phraseMeaning}>{phrase.meaning}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={[styles.progressPercentage, isCompleted && styles.progressPercentageComplete]}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              isCompleted && styles.progressBarComplete,
              { width: `${Math.min(progressPercentage, 100)}%` },
            ]}
          />
        </View>
      </View>

      {/* Counter Display */}
      <View style={styles.counterDisplay}>
        <Text style={styles.counter}>{counter}</Text>
        <Text style={styles.counterLabel}>
          out of <Text style={styles.targetRange}>{targetRange}</Text>
        </Text>
      </View>

      {/* Completion Message */}
      {isCompleted && (
        <View style={styles.completionMessage}>
          <Text style={styles.completionText}>✓ Completed!</Text>
        </View>
      )}

      <Pressable
        style={styles.incrementButton}
        onPress={onIncrement}
        disabled={isCompleted}>
        <Text style={styles.incrementButtonText}>
          {isCompleted ? 'Range Complete' : 'Tap to Count'}
        </Text>
      </Pressable>

      <Pressable style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetButtonText}>Reset Counter</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  phraseSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  phraseText: {
    marginBottom: 8,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#29293D',
  },
  phraseName: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#5548EF',
  },
  phraseMeaning: {
    textAlign: 'center',
    fontSize: 14,
    color: '#7E7D94',
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7E7D94',
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5548EF',
  },
  progressPercentageComplete: {
    color: '#4ECDC4',
  },
  progressBarContainer: {
    height: 12,
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: '#E7E7F0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#5548EF',
  },
  progressBarComplete: {
    backgroundColor: '#4ECDC4',
  },
  counterDisplay: {
    alignItems: 'center',
  },
  counter: {
    fontSize: 56,
    fontWeight: '800',
    color: '#5548EF',
  },
  counterLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#7E7D94',
  },
  targetRange: {
    fontWeight: 'bold',
    color: '#29293D',
  },
  completionMessage: {
    marginTop: 24,
    borderRadius: 8,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  completionText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#2E7D32',
  },
  incrementButton: {
    marginTop: 24,
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingVertical: 16,
  },
  incrementButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resetButton: {
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    paddingVertical: 16,
  },
  resetButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#29293D',
  },
});

export default CounterDisplay;
