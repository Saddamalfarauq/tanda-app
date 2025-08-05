
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HelpActionsProps {
  onPressRequest: () => void;
  onPressOffer: () => void;
}

export default function HelpActions({ onPressRequest, onPressOffer }: HelpActionsProps) {
  return (
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.requestBtn} onPress={onPressRequest}>
        <Text style={styles.actionIcon}>🆘</Text>
        <Text style={styles.actionLabel}>Minta Bantuan</Text>
        <Text style={styles.actionDesc}>Saya butuh bantuan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.offerBtn} onPress={onPressOffer}>
        <Text style={styles.actionIcon}>🤝</Text>
        <Text style={styles.actionLabel}>Tawarkan Bantuan</Text>
        <Text style={styles.actionDesc}>Saya bisa membantu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 10, paddingHorizontal: 6 },
  requestBtn: { backgroundColor: '#FECACA', flex: 1, borderRadius: 14, padding: 16, alignItems: 'center', marginRight: 6 },
  offerBtn: { backgroundColor: '#BBF7D0', flex: 1, borderRadius: 14, padding: 16, alignItems: 'center', marginLeft: 6 },
  actionIcon: { fontSize: 28, marginBottom: 4 },
  actionLabel: { fontSize: 15, fontWeight: 'bold', color: '#1f2937' },
  actionDesc: { fontSize: 12, color: '#6b7280' },
});
