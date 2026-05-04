import React from 'react';
import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { predefinedRanges } from '../data/tasbeehData';

type RangeSelectorProps = {
  selectedRange: number;
  onRangeSelect: (range: number) => void;
  isCustomRange: boolean;
  onToggleCustom: (isCustom: boolean) => void;
  customRange: string;
  onCustomRangeChange: (value: string) => void;
  onDecreaseRange: () => void;
  onIncreaseRange: () => void;
};

const RangeSelector = ({
  selectedRange,
  onRangeSelect,
  isCustomRange,
  onToggleCustom,
  customRange,
  onCustomRangeChange,
  onDecreaseRange,
  onIncreaseRange,
}: RangeSelectorProps) => {
  return (
    <View style={styles.container}>
      {/* Range Mode Toggle */}
      <View style={styles.modeToggle}>
        <Pressable
          style={[
            styles.modeButton,
            !isCustomRange ? styles.modeButtonActive : styles.modeButtonInactive,
          ]}
          onPress={() => onToggleCustom(false)}>
          <Text style={!isCustomRange ? styles.modeButtonTextActive : styles.modeButtonText}>
            Predefined
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.modeButton,
            isCustomRange ? styles.modeButtonActive : styles.modeButtonInactive,
          ]}
          onPress={() => onToggleCustom(true)}>
          <Text style={isCustomRange ? styles.modeButtonTextActive : styles.modeButtonText}>
            Custom
          </Text>
        </Pressable>
      </View>

      {/* Predefined Range Buttons */}
      {!isCustomRange && (
        <View>
          <Text style={styles.rangeLabel}>Select Range:</Text>
          <View style={styles.rangeButtonContainer}>
            {predefinedRanges.map((range) => (
              <Pressable
                key={range.id}
                style={[
                  styles.rangeButton,
                  selectedRange === range.value ? styles.rangeButtonActive : styles.rangeButtonInactive,
                ]}
                onPress={() => onRangeSelect(range.value)}>
                <Text
                  style={
                    selectedRange === range.value
                      ? styles.rangeButtonTextActive
                      : styles.rangeButtonText
                  }>
                  {range.label}
                </Text>
                <Text
                  style={
                    selectedRange === range.value
                      ? styles.rangeDescriptionActive
                      : styles.rangeDescription
                  }>
                  {range.description}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Custom Range Input */}
      {isCustomRange && (
        <View>
          <Text style={styles.customLabel}>Enter Custom Range:</Text>
          <TextInput
            style={styles.customInput}
            placeholder="Enter number (e.g., 50, 150)"
            placeholderTextColor="#7E7D94"
            keyboardType="number-pad"
            value={customRange}
            onChangeText={onCustomRangeChange}
          />

          <View style={styles.adjustRow}>
            <Pressable style={styles.adjustButton} onPress={onDecreaseRange}>
              <Text style={styles.adjustButtonText}>−</Text>
            </Pressable>

            <View style={styles.adjustLabel}>
              <Text style={styles.adjustLabelText}>Adjust Range</Text>
            </View>

            <Pressable style={styles.adjustButton} onPress={onIncreaseRange}>
              <Text style={styles.adjustButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modeToggle: {
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
  },
  modeButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 8,
  },
  modeButtonActive: {
    backgroundColor: '#5548EF',
  },
  modeButtonInactive: {
    backgroundColor: '#E7E7F0',
  },
  modeButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#29293D',
  },
  modeButtonTextActive: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rangeLabel: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#7E7D94',
  },
  rangeButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rangeButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rangeButtonActive: {
    backgroundColor: '#5548EF',
  },
  rangeButtonInactive: {
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
  },
  rangeButtonText: {
    fontWeight: '600',
    color: '#29293D',
  },
  rangeButtonTextActive: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rangeDescription: {
    fontSize: 12,
    color: '#7E7D94',
  },
  rangeDescriptionActive: {
    fontSize: 12,
    color: '#E0D7FF',
  },
  customLabel: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#7E7D94',
  },
  customInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#29293D',
  },
  adjustRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  adjustButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E7E7F0',
    paddingVertical: 12,
  },
  adjustButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#29293D',
  },
  adjustLabel: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#F5F4FF',
    paddingVertical: 12,
  },
  adjustLabelText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#5548EF',
  },
});

export default RangeSelector;
