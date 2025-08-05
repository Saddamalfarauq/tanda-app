import React from 'react';
import { Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface ProfileSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileSheet({ visible, onClose }: ProfileSheetProps) {
  // Dummy state for Switches (implement logic as needed)
  const [emergencyNotif, setEmergencyNotif] = React.useState(true);
  const [broadcastNotif, setBroadcastNotif] = React.useState(true);
  const [helpNotif, setHelpNotif] = React.useState(true);
  const [communityNotif, setCommunityNotif] = React.useState(false);
  const [soundNotif, setSoundNotif] = React.useState(true);
  const [shareLocation, setShareLocation] = React.useState(true);
  const [publicProfile, setPublicProfile] = React.useState(true);
  const [emergencyContact, setEmergencyContact] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoUpdate, setAutoUpdate] = React.useState(true);

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil & Pengaturan</Text>
          <Text style={styles.headerDesc}>Kelola informasi dan preferensi akun Anda</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.profilePicWrap}>
                <Text style={styles.profilePicText}>AS</Text>
                <View style={styles.verifBadge}>
                  <Text style={styles.verifBadgeIcon}>✓</Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.profileName}>Ahmad Santoso</Text>
                <Text style={styles.profileRole}>Koordinator RT 05</Text>
                <Text style={styles.profileJoin}>Bergabung sejak Januari 2023</Text>
                <View style={styles.profileStatusRow}>
                  <View style={styles.statusBadgeTerverifikasi}>
                    <Text style={styles.statusBadgeTextTerverifikasi}>Terverifikasi</Text>
                  </View>
                  <View style={styles.statusBadgeLevel}>
                    <Text style={styles.statusBadgeTextLevel}>Level 5</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>Edit</Text>
              </TouchableOpacity>
            </View>
            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>47</Text>
                <Text style={styles.statLabel}>Laporan</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>23</Text>
                <Text style={styles.statLabel}>Bantuan</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Poin</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>98%</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
            {/* Quick Actions */}
            <View style={styles.quickActionRow}>
              <TouchableOpacity style={styles.quickActionBlue}>
                <Text style={styles.quickActionText}>Laporan Saya</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionGreen}>
                <Text style={styles.quickActionText}>Bantuan Saya</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* INFORMASI PRIBADI */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Informasi Pribadi</Text>
            <Text style={styles.sectionDesc}>Kelola data pribadi dan kontak Anda</Text>
            <TouchableOpacity style={styles.sectionItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Data Pribadi</Text>
                <Text style={styles.sectionItemDesc}>Nama, alamat, nomor telepon</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Kontak Darurat</Text>
                <Text style={styles.sectionItemDesc}>3 kontak tersimpan</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Info Medis</Text>
                <Text style={styles.sectionItemDesc}>Alergi, kondisi khusus</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* PENGATURAN NOTIFIKASI */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Pengaturan Notifikasi</Text>
            <Text style={styles.sectionDesc}>Atur jenis notifikasi yang ingin Anda terima</Text>
            {/* Item Notif */}
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Notifikasi Darurat</Text>
                <Text style={styles.sectionItemDesc}>Peringatan situasi berbahaya</Text>
              </View>
              <Switch value={emergencyNotif} onValueChange={setEmergencyNotif} />
            </View>
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Broadcast Lokal</Text>
                <Text style={styles.sectionItemDesc}>Info dari warga sekitar</Text>
              </View>
              <Switch value={broadcastNotif} onValueChange={setBroadcastNotif} />
            </View>
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Permintaan Bantuan</Text>
                <Text style={styles.sectionItemDesc}>Ada yang butuh bantuan</Text>
              </View>
              <Switch value={helpNotif} onValueChange={setHelpNotif} />
            </View>
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Kegiatan Komunitas</Text>
                <Text style={styles.sectionItemDesc}>Gotong royong, rapat RT/RW</Text>
              </View>
              <Switch value={communityNotif} onValueChange={setCommunityNotif} />
            </View>
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Suara Notifikasi</Text>
                <Text style={styles.sectionItemDesc}>Bunyi saat ada notifikasi</Text>
              </View>
              <Switch value={soundNotif} onValueChange={setSoundNotif} />
            </View>
          </View>

          {/* PRIVASI & KEAMANAN */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Privasi & Keamanan</Text>
            <Text style={styles.sectionDesc}>Kontrol siapa yang bisa melihat informasi Anda</Text>
            <TouchableOpacity style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Ubah Password</Text>
                <Text style={styles.sectionItemDesc}>Terakhir diubah 3 bulan lalu</Text>
              </View>
              <Text style={{ color: '#2563eb', fontWeight: 'bold', fontSize: 14 }}></Text>
            </TouchableOpacity>
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Bagikan Lokasi</Text>
                <Text style={styles.sectionItemDesc}>Otomatis saat laporan darurat</Text>
              </View>
              <Switch value={shareLocation} onValueChange={setShareLocation} />
            </View>
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Profil Publik</Text>
                <Text style={styles.sectionItemDesc}>Tampilkan nama di laporan</Text>
              </View>
              <Switch value={publicProfile} onValueChange={setPublicProfile} />
            </View>
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Kontak Darurat</Text>
                <Text style={styles.sectionItemDesc}>Bisa dihubungi saat emergency</Text>
              </View>
              <Switch value={emergencyContact} onValueChange={setEmergencyContact} />
            </View>
          </View>

          {/* PENGATURAN APLIKASI */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Pengaturan Aplikasi</Text>
            <Text style={styles.sectionDesc}>Preferensi tampilan dan fitur aplikasi</Text>
            <TouchableOpacity style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Bahasa</Text>
                <Text style={styles.sectionItemDesc}>Bahasa Indonesia</Text>
              </View>
              <Text style={{ color: '#2563eb', fontWeight: 'bold', fontSize: 14 }}></Text>
            </TouchableOpacity>
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Mode Gelap</Text>
                <Text style={styles.sectionItemDesc}>Tampilan gelap untuk mata</Text>
              </View>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
            <View style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Auto Update</Text>
                <Text style={styles.sectionItemDesc}>Update otomatis aplikasi</Text>
              </View>
              <Switch value={autoUpdate} onValueChange={setAutoUpdate} />
            </View>
            <TouchableOpacity style={styles.settingSwitchItem}>
              <View>
                <Text style={styles.sectionItemTitle}>Bersihkan Cache</Text>
                <Text style={styles.sectionItemDesc}>Hapus data sementara (24.5 MB)</Text>
              </View>
              <Text style={{ color: '#dc2626', fontWeight: 'bold', fontSize: 14 }}>×</Text>
            </TouchableOpacity>
          </View>

          {/* BANTUAN & TENTANG */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Bantuan & Tentang</Text>
            <Text style={styles.sectionDesc}>Dukungan teknis dan informasi aplikasi</Text>
            <TouchableOpacity style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>Pusat Bantuan</Text>
              <Text style={styles.sectionItemDesc}>FAQ dan panduan penggunaan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>Hubungi Kami</Text>
              <Text style={styles.sectionItemDesc}>Laporkan masalah atau saran</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>Beri Rating</Text>
              <Text style={styles.sectionItemDesc}>Nilai aplikasi di Play Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionItem}>
              <Text style={styles.sectionItemTitle}>Tentang TANDA</Text>
              <Text style={styles.sectionItemDesc}>Versi 2.1.0 • Build 2024.01</Text>
            </TouchableOpacity>
          </View>

          {/* LOGOUT */}
          <TouchableOpacity style={styles.logoutBtn}>
            <Text style={styles.logoutBtnText}>Keluar dari Akun</Text>
          </TouchableOpacity>
          <View style={{ height: 24 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  closeBtn: {
    position: 'absolute',
    right: 18,
    top: 48,
    zIndex: 10,
    width: 32, height: 32, justifyContent: 'center', alignItems: 'center'
  },
  closeText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 2 },
  headerDesc: { color: '#dbeafe', fontSize: 15 },
  scroll: { padding: 24, paddingTop: 16 },
  // Profile Card
  profileCard: {
    backgroundColor: 'white', borderRadius: 18, padding: 18, marginBottom: 24,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, elevation: 2,
    borderWidth: 1, borderColor: '#e5e7eb',
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  profilePicWrap: {
    width: 70, height: 70, backgroundColor: '#2563eb', borderRadius: 35, 
    justifyContent: 'center', alignItems: 'center', marginRight: 15, position: 'relative',
  },
  profilePicText: { color: 'white', fontWeight: 'bold', fontSize: 26 },
  verifBadge: {
    backgroundColor: '#22c55e', borderRadius: 15, width: 24, height: 24,
    position: 'absolute', bottom: -3, right: -3, borderWidth: 2, borderColor: 'white',
    justifyContent: 'center', alignItems: 'center'
  },
  verifBadgeIcon: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  profileName: { fontWeight: 'bold', fontSize: 20, color: '#1e293b' },
  profileRole: { color: '#2563eb', fontSize: 15, marginBottom: 2, fontWeight: 'bold' },
  profileJoin: { color: '#64748b', fontSize: 13, marginBottom: 4 },
  profileStatusRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  statusBadgeTerverifikasi: { backgroundColor: '#bbf7d0', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 2, marginRight: 6 },
  statusBadgeTextTerverifikasi: { color: '#16a34a', fontSize: 12, fontWeight: '600' },
  statusBadgeLevel: { backgroundColor: '#dbeafe', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 2 },
  statusBadgeTextLevel: { color: '#2563eb', fontSize: 12, fontWeight: '600' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 22, color: '#1e293b', fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#6b7280' },
  quickActionRow: { flexDirection: 'row', gap: 8 },
  quickActionBlue: {
    backgroundColor: '#dbeafe', borderRadius: 10, flex: 1, paddingVertical: 10,
    justifyContent: 'center', alignItems: 'center', marginRight: 8,
  },
  quickActionGreen: {
    backgroundColor: '#bbf7d0', borderRadius: 10, flex: 1, paddingVertical: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  quickActionText: { color: '#2563eb', fontWeight: 'bold' },
  // Section
  sectionCard: {
    backgroundColor: 'white', borderRadius: 16, marginBottom: 20, padding: 16,
    borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1,
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 17, color: '#1e293b' },
  sectionDesc: { color: '#64748b', fontSize: 13, marginBottom: 12 },
  sectionItem: {
    borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingVertical: 13,
  },
  sectionItemTitle: { color: '#2563eb', fontWeight: 'bold', fontSize: 15 },
  sectionItemDesc: { color: '#64748b', fontSize: 12 },
  // Switch Settings
  settingSwitchItem: {
    borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingVertical: 13,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  // Logout
  logoutBtn: {
    backgroundColor: '#dc2626', borderRadius: 14, marginTop: 12,
    alignItems: 'center', paddingVertical: 16, marginBottom: 24
  },
  logoutBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
