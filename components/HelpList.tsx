
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type HelpRequest = {
  id: number;
  title: string;
  status: string;
  statusColor: string;
  family: string;
  people: string;
  address: string;
  desc: string;
  type: string;
  priority: string;
  distance: string;
  time: string;
  likes: number;
  activity: string;
  activityColor: string;
  contact?: string;
};

interface HelpListProps {
  requests: HelpRequest[];
}

export default function HelpList({ requests }: HelpListProps) {
  return (
    <View style={styles.helpList}>
      {requests.map(item => (
        <View key={item.id} style={styles.helpCard}>
          <View style={styles.helpCardRow}>
            <View style={styles.helpIcon} />
            <View style={{ flex: 1 }}>
              <View style={styles.helpCardHeader}>
                <Text style={styles.helpCardTitle}>{item.title}</Text>
                <Text style={[styles.helpStatus, { backgroundColor: item.statusColor }]}>{item.status}</Text>
              </View>
              <Text style={styles.helpCardDesc}>{item.desc}</Text>
              <View style={styles.helpDetailsBox}>
                <View style={styles.helpDetailCol}><Text style={styles.helpDetailLabel}>Jenis Bantuan:</Text><Text style={styles.helpDetailValue}>{item.type}</Text></View>
                <View style={styles.helpDetailCol}><Text style={styles.helpDetailLabel}>Prioritas:</Text><Text style={styles.helpDetailValue}>{item.priority}</Text></View>
                <View style={styles.helpDetailCol}><Text style={styles.helpDetailLabel}>Jarak:</Text><Text style={styles.helpDetailValue}>{item.distance}</Text></View>
                <View style={styles.helpDetailCol}><Text style={styles.helpDetailLabel}>Waktu:</Text><Text style={styles.helpDetailValue}>{item.time}</Text></View>
              </View>
              <View style={styles.helpCardFooter}>
                <TouchableOpacity><Text style={styles.helpFooterBtn}>Detail</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.helpFooterBtn}>Bantu</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  helpList: { paddingHorizontal: 6 },
  helpCard: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  helpCardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  helpIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FECACA', marginRight: 10 },
  helpCardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  helpCardTitle: { fontWeight: 'bold', fontSize: 16, color: '#1f2937' },
  helpStatus: { color: '#fff', fontSize: 11, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, fontWeight: 'bold' },
  helpCardDesc: { fontSize: 13, color: '#374151', marginBottom: 8 },
  helpDetailsBox: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  helpDetailCol: { flex: 1 },
  helpDetailLabel: { color: '#6b7280', fontSize: 11 },
  helpDetailValue: { color: '#1f2937', fontSize: 12, fontWeight: 'bold' },
  helpCardFooter: { flexDirection: 'row', gap: 10 },
  helpFooterBtn: { color: '#2563EB', fontWeight: 'bold', fontSize: 13, backgroundColor: '#F3F4F6', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
});
