// app/help.tsx

import { Entypo, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dummy data (ganti dengan data Firebase jika sudah terkoneksi)
const SUMMARY = [
  { label: 'Butuh Bantuan', value: 7 },
  { label: 'Siap Membantu', value: 23 },
  { label: 'Selesai Hari Ini', value: 15 }
];

const ACTIVE_REQUESTS = [
  {
    id: 'req1', urgent: true, type: 'request', status: 'Menunggu', title: 'Butuh Makanan untuk Keluarga', by: 'Keluarga Sari', people: 4, address: 'Jl. Mawar No. 15'
  }
];

const ACTIVE_RESPONSES = [
  {
    id: 'ans1', answered: true, title: 'Bantuan Evakuasi Lansia', by: 'Pak Budi', address: 'Jl. Melati No. 8',
    desc: 'Butuh bantuan untuk evakuasi ibu saya (75 tahun) yang sulit berjalan. Rumah mulai terendam banjir.',
    response: { by: 'Tim Relawan RT 04', status: 'Sedang dalam perjalanan', eta: '10 menit' },
    dist: '1.2 km', time: '45 menit lalu'
  }
];

const REQUESTS = [
  {
    id: '2', urgent: false, type: 'request', status: 'Menunggu', title: 'Obat-obatan untuk Diabetes', by: 'Ibu Ani', address: 'Jl. Anggrek No. 22',
    desc: 'Obat diabetes habis dan apotek tutup karena banjir. Butuh insulin dan metformin untuk 3 hari.'
  }
];

const RECENT_ACTIVITIES = [
  { id: 'a', icon: 'alert-triangle', color: '#ef4444', text: 'Laporan banjir di Jl. Sudirman', by: 'Ibu Sari', time: '15 menit lalu', label: 'Baru', labelColor: '#fee2e2', labelText: '#ef4444' },
  { id: 'b', icon: 'check-circle', color: '#22c55e', text: 'Bantuan evakuasi berhasil diselesaikan', by: 'Tim Relawan RT 04', time: '1 jam lalu', label: 'Selesai', labelColor: '#dcfce7', labelText: '#22c55e' },
  { id: 'c', icon: 'cloud', color: '#0ea5e9', text: 'Peringatan cuaca ekstrem diterbitkan', by: 'BMKG Jakarta', time: '2 jam lalu', label: 'Aktif', labelColor: '#fef9c3', labelText: '#eab308' },
  { id: 'd', icon: 'star', color: '#a78bfa', text: 'Bantuan makanan untuk 5 keluarga', by: 'Koordinator RT 03', time: '3 jam lalu', label: 'Bantuan', labelColor: '#dbeafe', labelText: '#2563eb' },
  { id: 'e', icon: 'users', color: '#2dd4bf', text: 'Gotong royong pembersihan selesai', by: 'RT 02', time: '3 jam lalu', label: 'Selesai', labelColor: '#dcfce7', labelText: '#22c55e' },
];

export default function HelpScreen() {
  const [activeTab, setActiveTab] = useState('Semua');
  return (
    <ScrollView style={{ backgroundColor: '#f7faff' }}>
      {/* HEADER */}
      <LinearGradient
        colors={['#2980f2', '#1d68c0']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity style={styles.headerBack}>
            <Feather name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Koordinasi{'\n'}
            <Text style={{ fontWeight: 'bold' }}>Bantuan</Text>
          </Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.headerAdd}>
            <Ionicons name="add-circle" size={32} color="#60a5fa" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerDesc}>Berikan atau minta bantuan dari komunitas</Text>
        {/* Summary Row */}
        <View style={styles.summaryRow}>
          {SUMMARY.map(item => (
            <View key={item.label} style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Aksi utama */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#fef2f2' }]}>
          <MaterialIcons name="sos" size={28} color="#e11d48" />
          <Text style={[styles.actionTitle, { color: '#b91c1c' }]}>Minta Bantuan</Text>
          <Text style={[styles.actionSub, { color: '#dc2626' }]}>Saya butuh bantuan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#dcfce7' }]}>
          <FontAwesome5 name="hand-holding-heart" size={26} color="#059669" />
          <Text style={[styles.actionTitle, { color: '#059669' }]}>Tawarkan Bantuan</Text>
          <Text style={[styles.actionSub, { color: '#059669' }]}>Saya bisa membantu</Text>
        </TouchableOpacity>
      </View>

      {/* Permintaan Bantuan Aktif */}
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={styles.sectionTitle}>Permintaan{'\n'}Bantuan Aktif</Text>
        <View style={styles.tabsRow}>
          {['Semua', 'Urgent', 'Terdekat'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* List Card Bantuan Aktif */}
        <View>
          {ACTIVE_REQUESTS.map(req => (
            <View key={req.id} style={styles.cardUrgent}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Feather name="alert-circle" size={20} color="#dc2626" />
                <Text style={styles.cardUrgentTitle}>{req.title}</Text>
                <View style={styles.badgeWaiting}><Text style={styles.badgeWaitingText}>Menunggu</Text></View>
              </View>
              <Text style={styles.cardDesc}><FontAwesome5 name="users" size={13} color="#a3a3a3" />  {req.people} orang • {req.by}</Text>
              <Text style={styles.cardAddr}>{req.address}</Text>
            </View>
          ))}
          {/* Bantuan terjawab */}
          {ACTIVE_RESPONSES.map(ans => (
            <View key={ans.id} style={styles.cardAnswer}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Feather name="check-circle" size={20} color="#22c55e" />
                <Text style={styles.cardAnswerTitle}>{ans.title}</Text>
                <View style={styles.badgeAnswered}><Text style={styles.badgeAnsweredText}>Terjawab</Text></View>
              </View>
              <View style={styles.userRow}>
                <View style={styles.avatar}><Text style={{ color: '#22c55e', fontWeight: 'bold' }}>BD</Text></View>
                <View>
                  <Text style={styles.userName}>{ans.by}</Text>
                  <Text style={styles.userAddr}>{ans.address}</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>{ans.desc}</Text>
              <View style={styles.answeredBox}>
                <Feather name="check-circle" size={17} color="#059669" style={{ marginTop: 2, marginRight: 6 }} />
                <Text style={{ color: '#059669', fontWeight: 'bold', fontSize: 13 }}>Dibantu oleh {ans.response.by}</Text>
                <Text style={{ color: '#059669', marginLeft: 6 }}>{ans.response.status} • ETA: {ans.response.eta}</Text>
              </View>
              <View style={styles.cardMeta}>
                <View style={styles.metaItem}><Entypo name="location-pin" size={14} color="#c026d3" /><Text style={styles.metaText}>{ans.dist} dari Anda</Text></View>
                <View style={styles.metaItem}><MaterialIcons name="access-time" size={13} color="#9ca3af" /><Text style={styles.metaText}>{ans.time}</Text></View>
              </View>
            </View>
          ))}
          {/* Permintaan lain */}
          {REQUESTS.map(req => (
            <View key={req.id} style={styles.cardWaiting}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Feather name="star" size={19} color="#f59e42" />
                <Text style={styles.cardWaitingTitle}>{req.title}</Text>
                <View style={styles.badgeWaiting}><Text style={styles.badgeWaitingText}>Menunggu</Text></View>
              </View>
              <View style={styles.userRow}>
                <View style={styles.avatar}><Text style={{ color: '#f59e42', fontWeight: 'bold' }}>AN</Text></View>
                <View>
                  <Text style={styles.userName}>{req.by}</Text>
                  <Text style={styles.userAddr}>{req.address}</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>{req.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Aktivitas Terbaru */}
      <View style={{ paddingHorizontal: 18, marginTop: 28 }}>
        <Text style={styles.sectionTitle}>Aktivitas Terbaru</Text>
        {RECENT_ACTIVITIES.map(item => (
          <View key={item.id} style={styles.activityCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name={item.icon as any} size={21} color={item.color} style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>{item.text}</Text>
                <Text style={styles.activitySub}>{item.by} • {item.time}</Text>
              </View>
              <View style={[styles.activityBadge, { backgroundColor: item.labelColor }]}>
                <Text style={{ color: item.labelText, fontWeight: 'bold', fontSize: 13 }}>{item.label}</Text>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerGradient: { paddingTop: 38, paddingBottom: 23, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerBack: { backgroundColor: 'rgba(255,255,255,0.10)', padding: 8, borderRadius: 99, marginRight: 10 },
  headerTitle: { color: '#fff', fontSize: 25, fontWeight: '400', flex: 1, marginBottom: 0 },
  headerDesc: { color: '#e0e7ef', marginBottom: 15, marginLeft: 2, fontSize: 14 },
  headerAdd: { marginLeft: 7 },
  summaryRow: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 16, padding: 15, justifyContent: 'space-between', marginTop: 18 },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryValue: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 3 },
  summaryLabel: { color: '#f1f5f9', fontSize: 13, fontWeight: '500' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: -27, marginBottom: 13, paddingHorizontal: 16 },
  actionBtn: { flex: 1, borderRadius: 18, paddingVertical: 24, alignItems: 'center', justifyContent: 'center', marginHorizontal: 3, elevation: 1, shadowOpacity: 0.05 },
  actionTitle: { fontSize: 17, fontWeight: 'bold', marginTop: 7 },
  actionSub: { fontSize: 13, marginTop: 3, opacity: 0.87, fontWeight: '500' },

  sectionTitle: { fontSize: 19, fontWeight: 'bold', color: '#1e293b', marginTop: 11, marginBottom: 11 },
  tabsRow: { flexDirection: 'row', gap: 10, marginBottom: 6 },
  tabBtn: { borderRadius: 11, backgroundColor: '#f3f4f6', paddingVertical: 7, paddingHorizontal: 16, marginRight: 5 },
  tabBtnActive: { backgroundColor: '#1d68c0' },
  tabText: { color: '#334155', fontWeight: '500' },
  tabTextActive: { color: '#fff' },

  // Card request waiting/urgent
  cardUrgent: { backgroundColor: '#fff', borderRadius: 17, padding: 17, marginBottom: 13, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 7, borderWidth: 1, borderColor: '#fee2e2' },
  cardUrgentTitle: { color: '#dc2626', fontWeight: 'bold', fontSize: 16, marginLeft: 7, flex: 1 },
  badgeWaiting: { backgroundColor: '#fde68a', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 3, marginLeft: 8 },
  badgeWaitingText: { color: '#b45309', fontWeight: 'bold', fontSize: 12 },

  cardAnswer: { backgroundColor: '#fff', borderRadius: 17, padding: 17, marginBottom: 13, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 7, borderWidth: 1, borderColor: '#dcfce7' },
  cardAnswerTitle: { color: '#08911b', fontWeight: 'bold', fontSize: 16, marginLeft: 7, flex: 1 },
  badgeAnswered: { backgroundColor: '#dcfce7', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 3, marginLeft: 8 },
  badgeAnsweredText: { color: '#059669', fontWeight: 'bold', fontSize: 12 },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  avatar: { width: 35, height: 35, borderRadius: 99, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center', marginRight: 11, marginTop: 2 },
  userName: { fontWeight: 'bold', color: '#059669', fontSize: 14 },
  userAddr: { fontSize: 12, color: '#71717a' },
  cardDesc: { fontSize: 13, color: '#374151', marginBottom: 7 },
  cardAddr: { color: '#64748b', fontSize: 12, marginTop: 2 },
  answeredBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0fdf4', borderRadius: 11, padding: 7, marginBottom: 5, marginTop: 7 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  metaText: { color: '#a1a1aa', fontSize: 12, marginLeft: 3 },

  cardWaiting: { backgroundColor: '#fff', borderRadius: 17, padding: 17, marginBottom: 13, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 7, borderWidth: 1, borderColor: '#fef9c3' },
  cardWaitingTitle: { color: '#b45309', fontWeight: 'bold', fontSize: 16, marginLeft: 7, flex: 1 },

  // Activity
  activityCard: { backgroundColor: '#fff', borderRadius: 13, padding: 13, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 7, borderWidth: 1, borderColor: '#f1f5f9' },
  activityTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155' },
  activitySub: { color: '#64748b', fontSize: 12, marginTop: 2 },
  activityBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8 }
});
