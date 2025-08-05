
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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

interface RequestHelpFormProps {
  onClose: () => void;
  onSubmit: (form: any) => void;
}

export default function RequestHelpForm({ onClose, onSubmit }: RequestHelpFormProps) {
  const [form, setForm] = useState({
    category: '',
    urgency: '',
    title: '',
    desc: '',
    contact: '',
    address: '',
  });
  const [descCount, setDescCount] = useState(0);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
    if (key === 'desc') setDescCount(value.length);
  };
  const handleCategory = (key: string) => setForm({ ...form, category: key });
  const handleUrgency = (key: string) => setForm({ ...form, urgency: key });
  const isValid = form.category && form.urgency && form.title && form.desc.length >= 10 && form.contact;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <View style={styles.modalHeader}>
          <View>
            <Text style={styles.modalTitle}>Minta Bantuan</Text>
            <Text style={styles.modalSubtitle}>Jelaskan bantuan yang Anda butuhkan</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={{ fontSize: 22, color: '#fff' }}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ maxHeight: 400 }}>
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
          <Text style={styles.label}>2. Tingkat Urgensi *</Text>
          {urgencies.map(u => (
            <TouchableOpacity
              key={u.key}
              style={[styles.urgencyBtn, { backgroundColor: u.color }, form.urgency === u.key && { borderColor: u.text, borderWidth: 2 }]}
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
          <Text style={styles.label}>3. Judul Bantuan *</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Butuh makanan untuk keluarga"
            value={form.title}
            onChangeText={v => handleChange('title', v)}
          />
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
          <Text style={styles.label}>5. Kontak yang Bisa Dihubungi *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nomor HP atau cara menghubungi"
            value={form.contact}
            onChangeText={v => handleChange('contact', v)}
          />
          <Text style={styles.label}>6. Lokasi (Opsional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Alamat atau lokasi spesifik"
            value={form.address}
            onChangeText={v => handleChange('address', v)}
          />
          <TouchableOpacity
            style={[styles.modalBtn, !isValid && { backgroundColor: '#d1d5db' }]}
            onPress={() => onSubmit(form)}
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
  );
}

const styles = StyleSheet.create({
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
