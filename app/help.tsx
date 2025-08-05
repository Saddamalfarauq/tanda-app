// File: app/help.tsx

import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const helpStats = [
  { label: 'Butuh Bantuan', value: 7, color: '#3B82F6' },
  { label: 'Siap Membantu', value: 23, color: '#22C55E' },
  { label: 'Selesai Hari Ini', value: 15, color: '#F59E42' },
];

const helpRequests = [
  {
    id: 1,
    title: 'Butuh Makanan untuk Keluarga',
    status: 'Menunggu',
    statusColor: '#2563EB',
    family: 'Keluarga Sari',
    people: '4 orang',
    address: 'Jl. Mawar No. 15',
    desc: 'Kehabisan bahan makanan karena banjir. Butuh beras, mie instan, dan makanan kaleng untuk 4 orang selama 3 hari.',
    type: 'Makanan & Minuman',
    priority: 'Tinggi',
    distance: '0.5 km',
    time: '30 menit lalu',
    likes: 8,
    activity: 'Baru',
    activityColor: '#FECACA',
  },
  {
    id: 2,
    title: 'Bantuan Evakuasi Lansia',
    status: 'Terjawab',
    statusColor: '#22C55E',
    family: 'Pak Budi',
    people: '',
    address: 'Jl. Melati No. 8',
    desc: 'Butuh bantuan untuk evakuasi ibu saya (75 tahun) yang sulit berjalan. Rumah mulai terendam banjir.',
    type: 'Evakuasi',
    priority: 'Tinggi',
    distance: '1.2 km',
    time: '45 menit lalu',
    likes: 0,
    activity: 'Selesai',
    activityColor: '#BBF7D0',
  },
  {
    id: 3,
    title: 'Obat-obatan untuk Diabetes',
    status: 'Menunggu',
    statusColor: '#F59E42',
    family: 'Ibu Ani',
    people: '',
    address: 'Jl. Anggrek No. 22',
    desc: 'Obat diabetes habis dan apotek tutup karena banjir. Butuh insulin dan metformin untuk 3 hari.',
    type: 'Obat-obatan',
    priority: 'Sedang',
    distance: '2.1 km',
    time: '1 jam lalu',
    likes: 0,
    activity: 'Aktif',
    activityColor: '#FDE68A',
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);

  const handleRequestHelp = () => {
    // Logic to handle help request
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Buat Permintaan Bantuan</Text>
            <TextInput
              style={styles.input}
              placeholder="Judul Permintaan"
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Deskripsi Bantuan yang Dibutuhkan"
              multiline={true}
            />
             <TextInput
              style={styles.input}
              placeholder="Jenis Bantuan (e.g., Makanan, Evakuasi)"
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleRequestHelp}
            >
              <Text style={styles.textStyle}>Kirim Permintaan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.headerBox}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/')}> {/* Ganti ke dashboard */}
            <Text style={{ color: '#fff', fontSize: 20 }}>{'<'}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Koordinasi Bantuan</Text>
            <Text style={styles.headerSubtitle}>Berikan atau minta bantuan dari komunitas</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
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

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.requestBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.actionIcon}>🆘</Text>
          <Text style={styles.actionLabel}>Minta Bantuan</Text>
          <Text style={styles.actionDesc}>Saya butuh bantuan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.offerBtn}>
          <Text style={styles.actionIcon}>🤝</Text>
          <Text style={styles.actionLabel}>Tawarkan Bantuan</Text>
          <Text style={styles.actionDesc}>Saya bisa membantu</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]} onPress={() => setFilter('all')}>
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>Semua</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter === 'urgent' && styles.filterBtnActive]} onPress={() => setFilter('urgent')}>
          <Text style={[styles.filterText, filter === 'urgent' && styles.filterTextActive]}>Urgent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter === 'nearby' && styles.filterBtnActive]} onPress={() => setFilter('nearby')}>
          <Text style={[styles.filterText, filter === 'nearby' && styles.filterTextActive]}>Terdekat</Text>
        </TouchableOpacity>
      </View>

      {/* Help Requests */}
      <View style={styles.helpList}>
        {helpRequests.map(item => (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#F9FAFB', paddingBottom: 20 },
  headerBox: { backgroundColor: '#2563EB', padding: 18, borderRadius: 16, marginBottom: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backBtn: { backgroundColor: '#2563EB', padding: 8, borderRadius: 100, marginRight: 10 },
  addBtn: { backgroundColor: '#2563EB', padding: 8, borderRadius: 100, marginLeft: 10 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#BFDBFE', fontSize: 14 },
  statsBox: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: 10 },
  statCol: { alignItems: 'center', flex: 1 },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#BFDBFE', fontSize: 12 },
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 10, paddingHorizontal: 6 },
  requestBtn: { backgroundColor: '#FECACA', flex: 1, borderRadius: 14, padding: 16, alignItems: 'center', marginRight: 6 },
  offerBtn: { backgroundColor: '#BBF7D0', flex: 1, borderRadius: 14, padding: 16, alignItems: 'center', marginLeft: 6 },
  actionIcon: { fontSize: 28, marginBottom: 4 },
  actionLabel: { fontSize: 15, fontWeight: 'bold', color: '#1f2937' },
  actionDesc: { fontSize: 12, color: '#6b7280' },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 10, paddingHorizontal: 6 },
  filterBtn: { backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  filterBtnActive: { backgroundColor: '#2563EB' },
  filterText: { color: '#2563EB', fontSize: 13 },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 5,
    borderColor: '#ddd'
  },
});