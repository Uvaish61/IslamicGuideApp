import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TasbeehPhrase } from '../data/tasbeehData';

type SessionSummary = {
  totalTaps: number;
  completedRounds: number;
  lastCompletionTime: string | null;
};

type CounterDisplayProps = {
  phrase: TasbeehPhrase;
  counter: number;
  targetRange: number;
  progressPercentage: number;
  sessionSummary: SessionSummary;
  canUndo: boolean;
  onIncrement: () => void;
  onUndo: () => void;
  onReset: () => void;
};

const CounterDisplay = ({
  phrase,
  counter,
  targetRange,
  progressPercentage,
  sessionSummary,
  canUndo,
  onIncrement,
  onUndo,
  onReset,
}: CounterDisplayProps) => {
  const isCompleted = counter >= targetRange;
  const remainingCount = Math.max(targetRange - counter, 0);

  return (
    <View style={styles.container}>
      <View style={styles.sessionCard}>
        <View style={styles.sessionStat}>
          <Text style={styles.sessionValue}>{sessionSummary.totalTaps}</Text>
          <Text style={styles.sessionLabel}>Taps today</Text>
        </View>
        <View style={styles.sessionStat}>
          <Text style={styles.sessionValue}>{sessionSummary.completedRounds}</Text>
          <Text style={styles.sessionLabel}>Rounds completed</Text>
        </View>
        <View style={styles.sessionStat}>
          <Text style={styles.sessionValue}>{sessionSummary.lastCompletionTime ?? '--'}</Text>
          <Text style={styles.sessionLabel}>Last finish</Text>
        </View>
      </View>

      <View style={styles.phraseSection}>
        <Text style={styles.phraseText}>{phrase.text}</Text>
        <Text style={styles.phraseName}>{phrase.name}</Text>
        <Text style={styles.phraseMeaning}>{phrase.meaning}</Text>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Ring progress</Text>
          <Text style={[styles.progressPercentage, isCompleted && styles.progressPercentageComplete]}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>

        <View style={styles.ringWrap}>
          <View
            style={[
              styles.progressRing,
              isCompleted && styles.progressRingComplete,
              { borderColor: isCompleted ? '#4ECDC4' : '#5548EF' },
            ]}>
            <View style={styles.progressRingInner}>
              <Text style={styles.counter}>{counter}</Text>
              <Text style={styles.counterLabel}>
                out of <Text style={styles.targetRange}>{targetRange}</Text>
              </Text>
              <Text style={styles.remainingText}>{remainingCount} left</Text>
            </View>
          </View>
        </View>
      </View>

      {isCompleted && (
        <View style={styles.completionMessage}>
          <Text style={styles.completionText}>MashaAllah, you completed this set.</Text>
        </View>
      )}

      <View style={styles.actionRow}>
        <Pressable
          style={[styles.ghostButton, !canUndo && styles.ghostButtonDisabled]}
          onPress={onUndo}
          disabled={!canUndo}>
          <Text style={[styles.ghostButtonText, !canUndo && styles.ghostButtonTextDisabled]}>
            Undo Last Tap
          </Text>
        </Pressable>

        <Pressable
          style={[styles.incrementButton, isCompleted && styles.incrementButtonComplete]}
          onPress={onIncrement}
          disabled={isCompleted}>
          <Text style={styles.incrementButtonText}>
            {isCompleted ? 'Range Complete' : 'Tap to Count'}
          </Text>
          {!isCompleted && <Text style={styles.incrementHint}>One tap adds a count</Text>}
        </Pressable>
      </View>

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
  sessionCard: {
    marginBottom: 24,
    flexDirection: 'row',
    gap: 10,
  },
  sessionStat: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#F8F8FC',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sessionValue: {
    minHeight: 24,
    fontSize: 16,
    fontWeight: '800',
    color: '#29293D',
  },
  sessionLabel: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: '#8D8CA3',
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
  ringWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  progressRing: {
    height: 240,
    width: 240,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 14,
    backgroundColor: '#F5F4FF',
  },
  progressRingComplete: {
    backgroundColor: '#ECFAF8',
  },
  progressRingInner: {
    height: 184,
    width: 184,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  counter: {
    fontSize: 60,
    fontWeight: '800',
    color: '#5548EF',
  },
  counterLabel: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#7E7D94',
  },
  targetRange: {
    fontWeight: 'bold',
    color: '#29293D',
  },
  remainingText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: '#5548EF',
  },
  completionMessage: {
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  completionText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#2E7D32',
  },
  actionRow: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 12,
  },
  ghostButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
  },
  ghostButtonDisabled: {
    opacity: 0.45,
  },
  ghostButtonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#29293D',
  },
  ghostButtonTextDisabled: {
    color: '#8D8CA3',
  },
  incrementButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#5548EF',
    paddingVertical: 18,
    shadowColor: '#5548EF',
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  incrementButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  incrementButtonComplete: {
    backgroundColor: '#4ECDC4',
  },
  incrementHint: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  resetButton: {
    marginTop: 12,
    borderRadius: 22,
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
