import {
    AlertTriangle,
    ArrowUpRight,
    Bell,
    CheckCircle,
    CloudLightning,
    Megaphone,
    Users,
    X
} from 'lucide-react-native';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NotificationSheetProps {
  visible: boolean;
  onClose: () => void;
}

const notifIcons = {
  emergency: <AlertTriangle color="#dc2626" size={22} />,
  help: <Bell color="#2563eb" size={22} />,
  weather: <CloudLightning color="#eab308" size={22} />,
  event: <Users color="#22c55e" size={22} />,
  update: <ArrowUpRight color="#a78bfa" size={22} />,
  done: <CheckCircle color="#6b7280" size={22} />,
  broadcast: <Megaphone color="#f59e42" size={22} />,
};

export default function NotificationSheet({ visible, onClose }: NotificationSheetProps) {
  // Dummy data (replace with your state/API)
  const notifications = [
    {
      id: 1, type: 'emergency', title: 'Laporan Darurat', time: '2 menit lalu',
      desc: 'Banjir dilaporkan di Jl. Sudirman. Tim evakuasi sedang menuju lokasi.',
      badge: 'Darurat', badgeColor: '#dc2626', badgeBg: '#fee2e2', location: '500m dari Anda',
      unread: true,
    },
    {
      id: 2, type: 'help', title: 'Permintaan Bantuan', time: '15 menit lalu',
      desc: 'Ibu Sari membutuhkan bantuan evakuasi untuk keluarga (4 orang).',
      badge: 'Bantu', badgeColor: '#2563eb', badgeBg: '#dbeafe', location: 'RT 04',
      unread: true,
    },
    {
      id: 3, type: 'weather', title: 'Peringatan Cuaca', time: '1 jam lalu',
      desc: 'BMKG: Hujan lebat dan angin kencang dalam 2 jam ke depan.',
      badge: 'Cuaca', badgeColor: '#eab308', badgeBg: '#fef9c3', location: 'Jakarta Selatan',
      unread: true,
    },
    {
      id: 4, type: 'event', title: 'Kegiatan Komunitas', time: '2 jam lalu',
      desc: 'Gotong royong pembersihan saluran air besok pagi jam 08:00.',
      badge: 'Ikut', badgeColor: '#22c55e', badgeBg: '#bbf7d0', location: 'Balai RW',
      unread: true,
    },
    {
      id: 5, type: 'update', title: 'Update Sistem', time: '3 jam lalu',
      desc: 'TANDA v2.1.0 tersedia dengan fitur peta real-time yang lebih baik.',
      badge: 'Update', badgeColor: '#a78bfa', badgeBg: '#f3e8ff', location: '',
      unread: true,
    },
    // READ
    {
      id: 6, type: 'done', title: 'Bantuan Selesai', time: '5 jam lalu',
      desc: 'Bantuan evakuasi untuk keluarga Pak Budi telah selesai dilaksanakan.',
      badge: 'Selesai', badgeColor: '#6b7280', badgeBg: '#f3f4f6', location: '',
      unread: false,
    },
    {
      id: 7, type: 'broadcast', title: 'Broadcast Komunitas', time: '1 hari lalu',
      desc: 'Pengumuman: Jadwal pemadaman listrik bergilir hari Minggu.',
      badge: 'Info', badgeColor: '#6b7280', badgeBg: '#f3f4f6', location: '',
      unread: false,
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifikasi</Text>
          <Text style={styles.headerSubtitle}>
            {notifications.filter(n => n.unread).length} notifikasi baru
          </Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X color="#fff" size={28} />
          </TouchableOpacity>
        </View>
        {/* LIST */}
        <ScrollView style={{ flex: 1 }}>
          {notifications.map(notif => (
            <View
              key={notif.id}
              style={[
                styles.notifItem,
                notif.unread && styles.notifUnread,
              ]}
            >
              <View style={[styles.notifIcon, { backgroundColor: notif.badgeBg }]}>
                {notifIcons[notif.type as keyof typeof notifIcons]}
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowSpace}>
                  <Text style={styles.notifTitle}>{notif.title}</Text>
                  <Text style={styles.notifTime}>{notif.time}</Text>
                </View>
                <Text style={styles.notifDesc}>{notif.desc}</Text>
                <View style={styles.rowSpace}>
                  <View style={[
                    styles.badge,
                    { backgroundColor: notif.badgeBg }
                  ]}>
                    <Text style={[
                      styles.badgeText,
                      { color: notif.badgeColor }
                    ]}>{notif.badge}</Text>
                  </View>
                  {notif.location ?
                    <Text style={styles.notifLoc}>{notif.location}</Text> : <View />
                  }
                </View>
              </View>
            </View>
          ))}
          <View style={{ height: 32 }} />
        </ScrollView>
        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerBtnBlue}>
            <Text style={styles.footerBtnText}>Tandai Semua Dibaca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtnGray}>
            <Text style={[styles.footerBtnText, { color: '#374151' }]}>Hapus Semua</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 52, paddingBottom: 24, paddingHorizontal: 24,
    borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
    position: 'relative',
  },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { color: '#dbeafe', fontSize: 15, marginTop: 2 },
  closeBtn: {
    position: 'absolute', right: 18, top: 52, zIndex: 10,
    width: 32, height: 32, justifyContent: 'center', alignItems: 'center'
  },
  notifItem: {
    backgroundColor: 'white', borderRadius: 15, padding: 16, margin: 14,
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    borderWidth: 1, borderColor: '#e5e7eb'
  },
  notifUnread: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4, borderLeftColor: '#2563eb'
  },
  notifIcon: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 2,
  },
  notifTitle: { fontWeight: 'bold', fontSize: 15, color: '#1e293b' },
  notifTime: { color: '#64748b', fontSize: 12 },
  notifDesc: { color: '#374151', fontSize: 14, marginTop: 3, marginBottom: 5 },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 9, minWidth: 40, alignItems: 'center'
  },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  notifLoc: { fontSize: 12, color: '#64748b', marginLeft: 5 },
  footer: {
    flexDirection: 'row', gap: 8, backgroundColor: '#f1f5f9', borderTopWidth: 1, borderTopColor: '#e5e7eb',
    padding: 14, paddingBottom: 30, justifyContent: 'space-between'
  },
  footerBtnBlue: {
    flex: 1, backgroundColor: '#2563eb', borderRadius: 9, marginRight: 8, padding: 13,
    alignItems: 'center'
  },
  footerBtnGray: {
    flex: 1, backgroundColor: '#e5e7eb', borderRadius: 9, padding: 13, alignItems: 'center'
  },
  footerBtnText: { color: 'white', fontWeight: 'bold', fontSize: 15 }
});
