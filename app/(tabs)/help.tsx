// File: app/(tabs)/help.tsx

import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type HelpRequest = {
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

const helpStats = [
  { label: 'Butuh Bantuan', value: 7, color: '#3B82F6' },
  { label: 'Siap Membantu', value: 23, color: '#22C55E' },
  { label: 'Selesai Hari Ini', value: 15, color: '#F59E42' },
];

const helpRequestsData = [
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

const categories = [
  { key: 'makanan', label: 'Makanan', icon: '🍽' },
  { key: 'transportasi', label: 'Transportasi', icon: '🚗' },
  { key: 'tempat', label: 'Tempat Tinggal', icon: '🏠' },
  { key: 'medis', label: 'Medis', icon: '🏥' },
  { key: 'keuangan', label: 'Keuangan', icon: '💰' },
  { key: 'barang', label: 'Barang', icon: '📦' },
  { key: 'tenaga', label: 'Tenaga Kerja', icon: '💪' },
  { key: 'lainnya', label: 'Lainnya', icon: '❓' },
];
const urgencies = [
  { key: 'rendah', label: 'Rendah - Tidak Mendesak', desc: 'Bisa ditangani dalam beberapa hari', color: '#bbf7d0', text: '#22c55e', icon: '🟢' },
  { key: 'sedang', label: 'Sedang - Perlu Segera', desc: 'Dibutuhkan dalam 1-2 hari', color: '#fef08a', text: '#eab308', icon: '🟡' },
  { key: 'tinggi', label: 'Tinggi - Sangat Mendesak', desc: 'Butuh bantuan sekarang juga', color: '#fecaca', text: '#ef4444', icon: '🔴' },
];

export default function HelpScreen() {
  const router = useRouter();
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>(helpRequestsData);
  const [filter, setFilter] = useState<string>('all');
  // State untuk form minta bantuan
  const [form, setForm] = useState({
    category: '',
    urgency: '',
    title: '',
    desc: '',
    contact: '',
    address: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [descCount, setDescCount] = useState(0);
  // State untuk form tawarkan bantuan
  const [offerForm, setOfferForm] = useState({
    category: '',
    title: '',
    desc: '',
    contact: '',
    address: '',
  });
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerDescCount, setOfferDescCount] = useState(0);

  // Handler untuk minta bantuan
  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    if (key === 'desc') setDescCount(value.length);
  };
  const handleCategory = (key: string) => setForm({ ...form, category: key });
  const handleUrgency = (key: string) => setForm({ ...form, urgency: key });
  const isValid = form.category && form.urgency && form.title && form.desc.length >= 10 && form.contact;

  // Handler untuk tawarkan bantuan
  const handleOfferChange = (key: string, value: string) => {
    setOfferForm({ ...offerForm, [key]: value });
    if (key === 'desc') setOfferDescCount(value.length);
  };
  const handleOfferCategory = (key: string) => setOfferForm({ ...offerForm, category: key });
  const isOfferValid = offerForm.category && offerForm.title && offerForm.desc.length >= 10 && offerForm.contact;

  const handleSubmit = () => {
    // Tambahkan data baru ke daftar bantuan
    const newId = helpRequests.length ? helpRequests[helpRequests.length - 1].id + 1 : 1;
    setHelpRequests([
      ...helpRequests,
      {
        id: newId,
        title: form.title,
        status: 'Menunggu',
        statusColor: '#2563EB',
        family: '',
        people: '',
        address: form.address,
        desc: form.desc,
        type: categories.find(c => c.key === form.category)?.label || form.category,
        priority: urgencies.find(u => u.key === form.urgency)?.label?.includes('Tinggi') ? 'Tinggi' : (urgencies.find(u => u.key === form.urgency)?.label?.includes('Sedang') ? 'Sedang' : 'Rendah'),
        distance: '0 km',
        time: 'Baru saja',
        likes: 0,
        activity: 'Baru',
        activityColor: '#FECACA',
        contact: form.contact,
      } as HelpRequest
    ]);
    setShowForm(false);
    setForm({ category: '', urgency: '', title: '', desc: '', contact: '', address: '' });
    setDescCount(0);
  };
  const handleOfferSubmit = () => {
    // Tambahkan data baru ke daftar bantuan
    const newId = helpRequests.length ? helpRequests[helpRequests.length - 1].id + 1 : 1;
    setHelpRequests([
      ...helpRequests,
      {
        id: newId,
        title: offerForm.title,
        status: 'Menunggu',
        statusColor: '#22C55E',
        family: '',
        people: '',
        address: offerForm.address,
        desc: offerForm.desc,
        type: categories.find(c => c.key === offerForm.category)?.label || offerForm.category,
        priority: 'Rendah',
        distance: '0 km',
        time: 'Baru saja',
        likes: 0,
        activity: 'Baru',
        activityColor: '#BBF7D0',
        contact: offerForm.contact,
      } as HelpRequest
    ]);
    setShowOfferForm(false);
    setOfferForm({ category: '', title: '', desc: '', contact: '', address: '' });
    setOfferDescCount(0);
  };

  // Fungsi filter bantuan
  const getFilteredRequests = () => {
    if (filter === 'urgent') {
      return helpRequests.filter(item => item.priority === 'Tinggi');
    }
    if (filter === 'nearby') {
      // Ambil yang jarak <= 1 km
      return helpRequests.filter(item => {
        const num = parseFloat((item.distance || '').replace(' km', ''));
        return !isNaN(num) && num <= 1;
      });
    }
    return helpRequests;
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
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

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.requestBtn} onPress={() => setShowForm(true)}>
            <Text style={styles.actionIcon}>🆘</Text>
            <Text style={styles.actionLabel}>Minta Bantuan</Text>
            <Text style={styles.actionDesc}>Saya butuh bantuan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerBtn} onPress={() => setShowOfferForm(true)}>
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
          {getFilteredRequests().map(item => (
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

      {/* Modal Form Minta Bantuan */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Minta Bantuan</Text>
                <Text style={styles.modalSubtitle}>Jelaskan bantuan yang Anda butuhkan</Text>
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setShowForm(false)}>
                <Text style={{ fontSize: 22, color: '#fff' }}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 400 }}>
              {/* Category Selection */}
              <Text style={styles.label}>1. Kategori Bantuan *</Text>
              <View style={styles.categoryGrid}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat.key}
                    style={[styles.categoryBtn, form.category === cat.key && styles.categoryBtnActive]}
                    onPress={() => handleCategory(cat.key)}>
                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                    <Text style={styles.categoryLabel}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Urgency Selection */}
              <Text style={styles.label}>2. Tingkat Urgensi *</Text>
              {urgencies.map(u => (
                <TouchableOpacity
                  key={u.key}
                  style={[styles.urgencyBtn, { backgroundColor: u.color }, form.urgency === u.key && { borderColor: u.text, borderWidth: 2 }]
                  }
                  onPress={() => handleUrgency(u.key)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.urgencyIcon}>{u.icon}</Text>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={[styles.urgencyLabel, { color: u.text }]}>{u.label}</Text>
                      <Text style={styles.urgencyDesc}>{u.desc}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              {/* Title */}
              <Text style={styles.label}>3. Judul Bantuan *</Text>
              <TextInput
                style={styles.input}
                placeholder="Contoh: Butuh makanan untuk keluarga"
                value={form.title}
                onChangeText={v => handleChange('title', v)}
              />
              {/* Description */}
              <Text style={styles.label}>4. Deskripsi Detail *</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Jelaskan bantuan yang dibutuhkan secara detail..."
                value={form.desc}
                onChangeText={v => handleChange('desc', v)}
                multiline
                maxLength={300}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Minimal 10 karakter</Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>{descCount}/300</Text>
              </View>
              {/* Contact Info */}
              <Text style={styles.label}>5. Kontak yang Bisa Dihubungi *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nomor HP atau cara menghubungi"
                value={form.contact}
                onChangeText={v => handleChange('contact', v)}
              />
              {/* Location */}
              <Text style={styles.label}>6. Lokasi (Opsional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Alamat atau lokasi spesifik"
                value={form.address}
                onChangeText={v => handleChange('address', v)}
              />
              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.modalBtn, !isValid && { backgroundColor: '#d1d5db' }]}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18, marginRight: 8, color: '#fff' }}>➤</Text>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Kirim Permintaan</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal Form Tawarkan Bantuan */}
      <Modal visible={showOfferForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Tawarkan Bantuan</Text>
                <Text style={styles.modalSubtitle}>Jelaskan bantuan yang Anda tawarkan</Text>
              </View>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setShowOfferForm(false)}>
                <Text style={{ fontSize: 22, color: '#fff' }}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 400 }}>
              {/* Category Selection */}
              <Text style={styles.label}>1. Kategori Bantuan *</Text>
              <View style={styles.categoryGrid}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat.key}
                    style={[styles.categoryBtn, offerForm.category === cat.key && styles.categoryBtnActive]}
                    onPress={() => handleOfferCategory(cat.key)}>
                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                    <Text style={styles.categoryLabel}>{cat.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Title */}
              <Text style={styles.label}>2. Judul Bantuan *</Text>
              <TextInput
                style={styles.input}
                placeholder="Contoh: Menyediakan makanan siap saji"
                value={offerForm.title}
                onChangeText={v => handleOfferChange('title', v)}
              />
              {/* Description */}
              <Text style={styles.label}>3. Deskripsi Detail *</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Jelaskan bantuan yang Anda tawarkan secara detail..."
                value={offerForm.desc}
                onChangeText={v => handleOfferChange('desc', v)}
                multiline
                maxLength={300}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Minimal 10 karakter</Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>{offerDescCount}/300</Text>
              </View>
              {/* Contact Info */}
              <Text style={styles.label}>4. Kontak yang Bisa Dihubungi *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nomor HP atau cara menghubungi"
                value={offerForm.contact}
                onChangeText={v => handleOfferChange('contact', v)}
              />
              {/* Location */}
              <Text style={styles.label}>5. Lokasi (Opsional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Alamat atau lokasi spesifik"
                value={offerForm.address}
                onChangeText={v => handleOfferChange('address', v)}
              />
              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.modalBtn, !isOfferValid && { backgroundColor: '#d1d5db' }]}
                onPress={handleOfferSubmit}
                disabled={!isOfferValid}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18, marginRight: 8, color: '#fff' }}>➤</Text>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Kirim Tawaran</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '90%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2563EB', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  modalSubtitle: { fontSize: 13, color: '#BFDBFE' },
  closeBtn: { backgroundColor: '#2563EB', padding: 6, borderRadius: 100 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#1f2937', marginBottom: 6, marginTop: 16 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  categoryBtn: { backgroundColor: '#f3f4f6', borderRadius: 14, padding: 12, alignItems: 'center', width: '23%', margin: '1%', borderWidth: 2, borderColor: 'transparent' },
  categoryBtnActive: { borderColor: '#2563EB', backgroundColor: '#DBEAFE' },
  categoryIcon: { fontSize: 24, marginBottom: 2 },
  categoryLabel: { fontSize: 13, color: '#1f2937' },
  urgencyBtn: { borderRadius: 14, padding: 12, marginBottom: 8 },
  urgencyIcon: { fontSize: 22, marginRight: 8 },
  urgencyLabel: { fontSize: 14, fontWeight: 'bold' },
  urgencyDesc: { fontSize: 12, color: '#6b7280' },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 14 },
  modalBtn: { flex: 1, backgroundColor: '#2563EB', padding: 12, borderRadius: 8, alignItems: 'center' },
});