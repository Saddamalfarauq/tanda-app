// File: app/(tabs)/help.tsx

import { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet } from 'react-native';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { COLLECTIONS } from '@/firebase/broadcastSchema';

import HelpActions from '@/components/HelpActions';
import HelpFilter from '@/components/HelpFilter';
import HelpHeader from '@/components/HelpHeader';
import HelpList, { HelpRequest } from '@/components/HelpList';
import OfferHelpForm from '@/components/OfferHelpForm';
import RequestHelpForm from '@/components/RequestHelpForm';

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
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);

  useEffect(() => {
    const broadcastsCol = collection(db, COLLECTIONS.BROADCASTS);
    const unsubscribe = onSnapshot(broadcastsCol, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as HelpRequest));
      setHelpRequests(requests);
    });

    return () => unsubscribe();
  }, []);

  const helpStats = [
    { label: 'Butuh Bantuan', value: helpRequests.filter(req => req.status === 'Menunggu').length, color: '#3B82F6' },
    { label: 'Siap Membantu', value: helpRequests.filter(req => req.status === 'Terjawab').length, color: '#22C55E' },
    { label: 'Selesai Hari Ini', value: helpRequests.filter(req => req.activity === 'Selesai').length, color: '#F59E42' },
  ];

  const handleRequestSubmit = async (form: any) => {
    try {
      await addDoc(collection(db, COLLECTIONS.BROADCASTS), {
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
        time: new Date().toISOString(),
        likes: 0,
        activity: 'Baru',
        activityColor: '#FECACA',
        contact: form.contact,
        createdAt: new Date(),
      });
      setShowRequestForm(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleOfferSubmit = async (form: any) => {
    try {
      await addDoc(collection(db, COLLECTIONS.BROADCASTS), {
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
        time: new Date().toISOString(),
        likes: 0,
        activity: 'Baru',
        activityColor: '#BBF7D0',
        contact: form.contact,
        createdAt: new Date(),
      });
      setShowOfferForm(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
        <HelpHeader helpStats={helpStats} />
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
