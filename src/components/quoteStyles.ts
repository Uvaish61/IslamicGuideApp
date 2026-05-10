import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
