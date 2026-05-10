import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './quoteStyles';
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

export default QuoteActions;
