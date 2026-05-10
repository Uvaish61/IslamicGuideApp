import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
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
});

export default QuoteCard;
