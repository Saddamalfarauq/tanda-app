
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HelpFilterProps {
  filter: string;
  onPressFilter: (filter: string) => void;
}

export default function HelpFilter({ filter, onPressFilter }: HelpFilterProps) {
  return (
    <View style={styles.filterRow}>
      <TouchableOpacity style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]} onPress={() => onPressFilter('all')}>
        <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>Semua</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.filterBtn, filter === 'urgent' && styles.filterBtnActive]} onPress={() => onPressFilter('urgent')}>
        <Text style={[styles.filterText, filter === 'urgent' && styles.filterTextActive]}>Urgent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.filterBtn, filter === 'nearby' && styles.filterBtnActive]} onPress={() => onPressFilter('nearby')}>
        <Text style={[styles.filterText, filter === 'nearby' && styles.filterTextActive]}>Terdekat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 10, paddingHorizontal: 6 },
  filterBtn: { backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  filterBtnActive: { backgroundColor: '#2563EB' },
  filterText: { color: '#2563EB', fontSize: 13 },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
});
