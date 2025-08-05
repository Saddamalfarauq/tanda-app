
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HelpHeaderProps {
  helpStats: { label: string; value: number; color: string }[];
}

export default function HelpHeader({ helpStats }: HelpHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.headerBox}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/')}>
          <Text style={{ color: '#fff', fontSize: 20 }}>{'<'}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Koordinasi Bantuan</Text>
          <Text style={styles.headerSubtitle}>Berikan atau minta bantuan dari komunitas</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={{ color: '#fff', fontSize: 20 }}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statsBox}>
        {helpStats.map(stat => (
          <View key={stat.label} style={styles.statCol}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: { backgroundColor: '#2563EB', padding: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backBtn: { backgroundColor: '#2563EB', padding: 8, borderRadius: 100, marginRight: 10 },
  addBtn: { backgroundColor: '#2563EB', padding: 8, borderRadius: 100, marginLeft: 10 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#BFDBFE', fontSize: 14 },
  statsBox: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: 10 },
  statCol: { alignItems: 'center', flex: 1 },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#BFDBFE', fontSize: 12 },
});
