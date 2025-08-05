import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AlertTriangle, ArrowLeft, Heart, Share2, Star, Users } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BroadcastLokalPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="light-content" backgroundColor="#F29E1B" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 80 }}>

        <LinearGradient
          colors={['#F59E1B', '#FF512F']}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.headerBack} onPress={() => router.back()} activeOpacity={0.8}>
              <ArrowLeft color="#fff" size={22} />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Broadcast Lokal</Text>
              <Text style={styles.headerSubtitle}>Peringatan & info warga sekitar</Text>
            </View>
          </View>

          <View style={styles.summaryBox}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryValue}>12</Text>
              <Text style={styles.summaryLabel}>Peringatan</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryValue}>2.5km</Text>
              <Text style={styles.summaryLabel}>Radius</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryValue}>156</Text>
              <Text style={styles.summaryLabel}>Penerima</Text>
            </View>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryValue}>5m</Text>
              <Text style={styles.summaryLabel}>Update</Text>
            </View>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#ed213a', '#93291e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.alertBoxGradient}
        >
          <View style={styles.alertRow}>
            <View style={styles.alertIcon}>
              <AlertTriangle color="#fff" size={22} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                <Text style={styles.alertTitle}>PERINGATAN PRIORITAS</Text>
                <View style={styles.bmkgBadge}>
                  <Text style={styles.bmkgBadgeText}>BMKG</Text>
                </View>
              </View>
              <Text style={styles.alertDesc}>
                Hujan lebat + angin kencang dalam 1 jam. Waspada banjir dan pohon tumbang!
              </Text>
            </View>
          </View>
          <View style={styles.alertFooter}>
            <Text style={styles.alertFooterText}>📍 Seluruh Jakarta Selatan</Text>
            <Text style={styles.alertFooterText}>⏰ 2 menit lalu</Text>
          </View>
        </LinearGradient>

        <View style={[styles.cardBox, { borderLeftColor: '#dc2626' }]}>
          <View style={styles.cardRow}>
            <View style={[styles.cardIconWrap, { backgroundColor: '#fee2e2' }]}>
              <AlertTriangle color="#dc2626" size={19} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Banjir di Jl. Sudirman</Text>
                <Text style={[styles.cardStatus, { backgroundColor: '#fee2e2', color: '#dc2626' }]}>URGENT</Text>
              </View>
              <View style={styles.cardUserRow}>
                <View style={[styles.userAvatar, { backgroundColor: '#dbeafe' }]}>
                  <Text style={[styles.userAvatarText, { color: '#2563eb' }]}>IS</Text>
                </View>
                <View>
                  <Text style={styles.cardUserName}>Ibu Sari</Text>
                  <Text style={styles.cardUserRole}>Koordinator RT 03</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>
                Air mulai naik setinggi 40cm dan terus bertambah. Arus cukup deras. Sudah ada 5 kendaraan mogok. Warga diminta hindari area ini.
              </Text>
              <View style={styles.cardFooterRow}>
                <Text style={styles.cardFooterText}>📍 0.8 km dari Anda</Text>
                <Text style={styles.cardFooterText}>⏰ 15 menit lalu</Text>
              </View>
              <View style={styles.cardActionsRow}>
                <View style={styles.cardActionsLeft}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Heart size={14} color="#2563eb" />
                    <Text style={styles.actionBtnTextBlue}>24</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Share2 size={14} color="#57534e" />
                    <Text style={styles.actionBtnTextGray}>Bagikan</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.cardConfirmBtn, { backgroundColor: '#fee2e2' }]}>
                  <Text style={{ color: '#dc2626', fontWeight: '600', fontSize: 13 }}>Konfirmasi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.cardBox, { borderLeftColor: '#eab308' }]}>
          <View style={styles.cardRow}>
            <View style={[styles.cardIconWrap, { backgroundColor: '#fef9c3' }]}>
              <Star color="#eab308" size={19} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Pohon Tumbang - Jl. Melati</Text>
                <Text style={[styles.cardStatus, { backgroundColor: '#fef9c3', color: '#eab308' }]}>PERINGATAN</Text>
              </View>
              <View style={styles.cardUserRow}>
                <View style={[styles.userAvatar, { backgroundColor: '#dcfce7' }]}>
                  <Text style={[styles.userAvatarText, { color: '#22c55e' }]}>BD</Text>
                </View>
                <View>
                  <Text style={styles.cardUserName}>Pak Budi</Text>
                  <Text style={styles.cardUserRole}>Ketua RT 02</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>
                Pohon besar tumbang menutupi jalan. Tim sudah dihubungi untuk pembersihan. Sementara gunakan rute alternatif melalui Jl. Mawar.
              </Text>
              <View style={styles.cardFooterRow}>
                <Text style={styles.cardFooterText}>📍 1.5 km dari Anda</Text>
                <Text style={styles.cardFooterText}>⏰ 45 menit lalu</Text>
              </View>
              <View style={styles.cardActionsRow}>
                <View style={styles.cardActionsLeft}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Heart size={14} color="#2563eb" />
                    <Text style={styles.actionBtnTextBlue}>12</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Share2 size={14} color="#57534e" />
                    <Text style={styles.actionBtnTextGray}>Bagikan</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.cardConfirmBtn, { backgroundColor: '#fef9c3' }]}>
                  <Text style={{ color: '#eab308', fontWeight: '600', fontSize: 13 }}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.cardBox, { borderLeftColor: '#2563eb' }]}>
          <View style={styles.cardRow}>
            <View style={[styles.cardIconWrap, { backgroundColor: '#dbeafe' }]}>
              <Users color="#2563eb" size={19} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Gotong Royong Besok Pagi</Text>
                <Text style={[styles.cardStatus, { backgroundColor: '#dbeafe', color: '#2563eb' }]}>INFO</Text>
              </View>
              <View style={styles.cardUserRow}>
                <View style={[styles.userAvatar, { backgroundColor: '#a78bfa' }]}>
                  <Text style={[styles.userAvatarText, { color: '#6d28d9' }]}>RW</Text>
                </View>
                <View>
                  <Text style={styles.cardUserName}>Pak RW</Text>
                  <Text style={styles.cardUserRole}>Ketua RW 12</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>
                Besok pagi jam 08:00 ada gotong royong pembersihan saluran air. Bawa alat seadanya. Kumpul di Balai RW.
              </Text>
              {/* Peserta */}
              <View style={styles.cardPesertaBox}>
                <View style={styles.pesertaInfoRow}>
                  <Text style={styles.pesertaInfoLabel}>Peserta Terdaftar</Text>
                  <Text style={styles.pesertaInfoValue}>23 orang</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.pesertaAvatar, { backgroundColor: '#ef4444' }]} />
                  <View style={[styles.pesertaAvatar, { backgroundColor: '#22c55e', marginLeft: -9 }]} />
                  <View style={[styles.pesertaAvatar, { backgroundColor: '#2563eb', marginLeft: -9 }]} />
                  <View style={[styles.pesertaAvatar, { backgroundColor: '#eab308', marginLeft: -9 }]} />
                  <View style={[styles.pesertaAvatar, { backgroundColor: '#a78bfa', marginLeft: -9, justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>+19</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardFooterRow}>
                <Text style={styles.cardFooterText}>📍 Balai RW 12</Text>
                <Text style={styles.cardFooterText}>⏰ 3 jam lalu</Text>
              </View>
              <View style={styles.cardActionsRow}>
                <View style={styles.cardActionsLeft}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Heart size={14} color="#2563eb" />
                    <Text style={styles.actionBtnTextBlue}>18</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Share2 size={14} color="#57534e" />
                    <Text style={styles.actionBtnTextGray}>Bagikan</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.cardConfirmBtn, { backgroundColor: '#dcfce7' }]}>
                  <Text style={{ color: '#22c55e', fontWeight: '600', fontSize: 13 }}>Ikut</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.createBroadcastBtn}
          onPress={() => router.push('/broadcastForm')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#F59E1B', '#FF512F']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.createBroadcastGradient}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle color="#fff" size={22} style={{ marginRight: 8 }} />
              <Text style={styles.createBroadcastText}>Buat Broadcast Baru</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingBottom: 26,
    paddingTop: 36,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerBack: {
    marginRight: 13,
    padding: 8,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerSubtitle: {
    color: '#fff6cc',
    fontSize: 13,
    marginTop: 1,
  },
  summaryBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.23)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryCol: { flex: 1, alignItems: 'center' },
  summaryValue: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  summaryLabel: { color: '#fff6cc', fontSize: 12, marginTop: 1 },

  alertBoxGradient: {
    marginHorizontal: 18,
    marginTop: 22,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 9,
    elevation: 4, 
  },

  alertRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  alertIcon: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(255,255,255,0.19)',
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15, marginRight: 9 },
  bmkgBadge: {
    backgroundColor: 'rgba(255,255,255,0.29)',
    borderRadius: 13,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
  },
  bmkgBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  alertDesc: { color: '#fff', fontSize: 13, marginTop: 1 },
  alertFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  alertFooterText: { color: '#fff', fontSize: 11, opacity: 0.95 },

  cardBox: {
    marginHorizontal: 18,
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#dc2626',
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start' },
  cardIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  cardTitle: { fontWeight: 'bold', fontSize: 15, color: '#1e293b', flex: 1 },
  cardStatus: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
    overflow: 'hidden',
  },
  cardUserRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  userAvatar: {
    width: 32, height: 32, borderRadius: 99, alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  userAvatarText: { fontWeight: 'bold', fontSize: 13 },
  cardUserName: { fontSize: 12, fontWeight: 'bold', color: '#334155' },
  cardUserRole: { fontSize: 11, color: '#64748b' },
  cardDesc: { fontSize: 13, color: '#52525b', marginTop: 6, marginBottom: 7 },
  cardFooterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  cardFooterText: { fontSize: 11, color: '#64748b' },
  cardActionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardActionsLeft: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 14 },
  actionBtnTextBlue: { color: '#2563eb', fontWeight: 'bold', fontSize: 12, marginLeft: 3 },
  actionBtnTextGray: { color: '#57534e', fontWeight: 'bold', fontSize: 12, marginLeft: 3 },
  cardConfirmBtn: {
    borderRadius: 99,
    paddingVertical: 5,
    paddingHorizontal: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardPesertaBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 7,
    marginVertical: 5,
  },
  pesertaInfoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  pesertaInfoLabel: { fontSize: 11, fontWeight: 'bold', color: '#2563eb' },
  pesertaInfoValue: { fontSize: 11, color: '#2563eb' },
  pesertaAvatar: {
    width: 23,
    height: 23,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  createBroadcastBtn: { marginHorizontal: 18, marginTop: 35, borderRadius: 14, overflow: 'hidden' },
  createBroadcastGradient: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  createBroadcastText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
