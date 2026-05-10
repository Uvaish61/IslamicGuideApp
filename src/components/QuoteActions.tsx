import React from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { Heart, Share2 } from 'lucide-react-native';

type Props = {
  isSaved: boolean;
  onToggleSave: () => void;
  onShare: () => void;
};

const QuoteActions = ({ isSaved, onToggleSave, onShare }: Props) => {
  return (
    <View style={styles.actionsRow}>
      <Pressable style={[styles.actionButton, isSaved && styles.saved]} onPress={onToggleSave}>
        <Heart size={18} color={isSaved ? '#FF6B6B' : '#FFFFFF'} fill={isSaved ? '#FF6B6B' : 'none'} />
        <Text style={[styles.actionText, isSaved && styles.savedText]}>{isSaved ? 'Saved' : 'Save'}</Text>
      </Pressable>

      <Pressable style={styles.actionButton} onPress={onShare}>
        <Share2 size={18} color="#FFFFFF" />
        <Text style={styles.actionText}>Share</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsRow: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 16,
    backgroundColor: '#5548EF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  saved: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  savedText: {
    color: '#FF6B6B',
  },
});

export default QuoteActions;
