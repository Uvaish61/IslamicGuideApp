import React from 'react';
import { Text, View } from 'react-native';
import styles from './quoteStyles';

type Quote = {
  id: number;
  text: string;
  source: string;
};

type Props = {
  quote: Quote;
};

const QuoteCard = ({ quote }: Props) => {
  return (
    <View style={styles.quoteCard}>
      <Text style={styles.quoteText}>"{quote.text}"</Text>
      <Text style={styles.quoteSource}>— {quote.source}</Text>
    </View>
  );
};

export default QuoteCard;
