
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

interface OfferHelpFormProps {
  onClose: () => void;
  onSubmit: (form: any) => void;
}

export default function OfferHelpForm({ onClose, onSubmit }: OfferHelpFormProps) {
  const [offerForm, setOfferForm] = useState({
    category: '',
    title: '',
    desc: '',
    contact: '',
    address: '',
  });
  const [offerDescCount, setOfferDescCount] = useState(0);

  const handleOfferChange = (key: string, value: string) => {
    setOfferForm({ ...offerForm, [key]: value });
    if (key === 'desc') setOfferDescCount(value.length);
  };
  const handleOfferCategory = (key: string) => setOfferForm({ ...offerForm, category: key });
  const isOfferValid = offerForm.category && offerForm.title && offerForm.desc.length >= 10 && offerForm.contact;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <View style={styles.modalHeader}>
          <View>
            <Text style={styles.modalTitle}>Tawarkan Bantuan</Text>
            <Text style={styles.modalSubtitle}>Jelaskan bantuan yang Anda tawarkan</Text>
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
                style={[styles.categoryBtn, offerForm.category === cat.key && styles.categoryBtnActive]}
                onPress={() => handleOfferCategory(cat.key)}>
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>2. Judul Bantuan *</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Menyediakan makanan siap saji"
            value={offerForm.title}
            onChangeText={v => handleOfferChange('title', v)}
          />
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
          <Text style={styles.label}>4. Kontak yang Bisa Dihubungi *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nomor HP atau cara menghubungi"
            value={offerForm.contact}
            onChangeText={v => handleOfferChange('contact', v)}
          />
          <Text style={styles.label}>5. Lokasi (Opsional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Alamat atau lokasi spesifik"
            value={offerForm.address}
            onChangeText={v => handleOfferChange('address', v)}
          />
          <TouchableOpacity
            style={[styles.modalBtn, !isOfferValid && { backgroundColor: '#d1d5db' }]}
            onPress={() => onSubmit(offerForm)}
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
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 14 },
  modalBtn: { flex: 1, backgroundColor: '#2563EB', padding: 12, borderRadius: 8, alignItems: 'center' },
});
