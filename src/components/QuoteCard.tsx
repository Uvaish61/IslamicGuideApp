import React from 'react';
import { Text, View } from 'react-native';
import styles from './quoteStyles';

export type Quote = {
  id: number;
  text: string;
  source: string;
};

export type QuoteCardProps = {
  quote: Quote;
};

const QuoteCard = ({ quote }: QuoteCardProps) => {
  return (
    <View style={styles.quoteCard}>
      <Text style={styles.quoteText}>"{quote.text}"</Text>
      <Text style={styles.quoteSource}>— {quote.source}</Text>
    </View>
  );
};

export default QuoteCard;
