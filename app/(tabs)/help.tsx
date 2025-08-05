// File: app/(tabs)/help.tsx


import HelpActions from '@/components/HelpActions';
import HelpFilter from '@/components/HelpFilter';
import HelpHeader from '@/components/HelpHeader';
import HelpList, { HelpRequest } from '@/components/HelpList';
import OfferHelpForm from '@/components/OfferHelpForm';
import RequestHelpForm from '@/components/RequestHelpForm';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet } from 'react-native';

const helpRequestsData: HelpRequest[] = [
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
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>(helpRequestsData);
  const [filter, setFilter] = useState<string>('all');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);

  const handleRequestSubmit = (form: any) => {
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
    setShowRequestForm(false);
  };

  const handleOfferSubmit = (form: any) => {
    const newId = helpRequests.length ? helpRequests[helpRequests.length - 1].id + 1 : 1;
    setHelpRequests([
      ...helpRequests,
      {
        id: newId,
        title: form.title,
        status: 'Menunggu',
        statusColor: '#22C55E',
        family: '',
        people: '',
        address: form.address,
        desc: form.desc,
        type: categories.find(c => c.key === form.category)?.label || form.category,
        priority: 'Rendah',
        distance: '0 km',
        time: 'Baru saja',
        likes: 0,
        activity: 'Baru',
        activityColor: '#BBF7D0',
        contact: form.contact,
      } as HelpRequest
    ]);
    setShowOfferForm(false);
  };

  const getFilteredRequests = () => {
    if (filter === 'urgent') {
      return helpRequests.filter(item => item.priority === 'Tinggi');
    }
    if (filter === 'nearby') {
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
        <HelpHeader />
        <HelpActions
          onPressRequest={() => setShowRequestForm(true)}
          onPressOffer={() => setShowOfferForm(true)}
        />
        <HelpFilter filter={filter} onPressFilter={setFilter} />
        <HelpList requests={getFilteredRequests()} />
      </ScrollView>

      <Modal visible={showRequestForm} animationType="slide" transparent>
        <RequestHelpForm
          onClose={() => setShowRequestForm(false)}
          onSubmit={handleRequestSubmit}
        />
      </Modal>

      <Modal visible={showOfferForm} animationType="slide" transparent>
        <OfferHelpForm
          onClose={() => setShowOfferForm(false)}
          onSubmit={handleOfferSubmit}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#F9FAFB', paddingBottom: 20 },
});
