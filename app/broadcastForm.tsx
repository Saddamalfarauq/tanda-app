import { LinearGradient } from 'expo-linear-gradient';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Building2,
  Calendar,
  Clock,
  CloudSunRain,
  Droplets, Flame,
  Handshake,
  HeartPulse,
  HelpCircle,
  Info,
  MapPin,
  PartyPopper,
  Users
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const options = {
  headerShown: false,
};

const BROADCAST_TYPES = [
  { label: 'Darurat', icon: <AlertTriangle color="#b91c1c" size={28} />, value: 'darurat', color: '#b91c1c', bg: '#fee2e2', desc: 'Situasi berbahaya' },
  { label: 'Peringatan', icon: <AlertTriangle color="#b45309" size={28} />, value: 'peringatan', color: '#b45309', bg: '#fef9c3', desc: 'Waspada situasi' },
  { label: 'Informasi', icon: <Info color="#2563eb" size={28} />, value: 'informasi', color: '#2563eb', bg: '#dbeafe', desc: 'Info umum' },
  { label: 'Kegiatan', icon: <Calendar color="#047857" size={28} />, value: 'kegiatan', color: '#047857', bg: '#dcfce7', desc: 'Acara komunitas' },
];

const CATEGORIES = [
  { label: 'Cuaca & Iklim', value: 'cuaca', icon: <CloudSunRain color="#0ea5e9" size={20} /> },
  { label: 'Banjir', value: 'banjir', icon: <Droplets color="#2563eb" size={20} /> },
  { label: 'Kebakaran', value: 'kebakaran', icon: <Flame color="#ef4444" size={20} /> },
  { label: 'Kecelakaan', value: 'kecelakaan', icon: <AlertTriangle color="#f59e42" size={20} /> },
  { label: 'Keamanan & Kriminal', value: 'kriminal', icon: <AlertTriangle color="#b91c1c" size={20} /> },
  { label: 'Infrastruktur', value: 'infrastruktur', icon: <Building2 color="#b91c1c" size={20} /> },
  { label: 'Kesehatan', value: 'kesehatan', icon: <HeartPulse color="#16a34a" size={20} /> },
  { label: 'Gotong Royong', value: 'gotong-royong', icon: <Handshake color="#047857" size={20} /> },
  { label: 'Rapat/Pertemuan', value: 'rapat', icon: <Users color="#6366f1" size={20} /> },
  { label: 'Kegiatan Sosial', value: 'sosial', icon: <PartyPopper color="#f59e42" size={20} /> },
  { label: 'Edukasi', value: 'edukasi', icon: <BookOpen color="#2563eb" size={20} /> },
  { label: 'Lainnya', value: 'lainnya', icon: <HelpCircle color="#bdbdbd" size={20} /> },
];

const TARGETS = [
  { key: 'rt', label: 'RT Saya (RT 05)', sub: '~50 warga' },
  { key: 'rw', label: 'RW Saya (RW 12)', sub: '~200 warga' },
  { key: 'radius', label: 'Radius 2 km', sub: '~500 warga terdekat' },
];

const PRIORITIES = [
  { key: 'rendah', color: '#22c55e', icon: <Info color="#22c55e" size={20} />, label: 'Rendah - Informasi Biasa', desc: 'Tidak mendesak, bisa dibaca nanti' },
  { key: 'sedang', color: '#eab308', icon: <AlertTriangle color="#eab308" size={20} />, label: 'Sedang - Perlu Perhatian', desc: 'Penting untuk diketahui segera' },
  { key: 'tinggi', color: '#ef4444', icon: <AlertTriangle color="#ef4444" size={20} />, label: 'Tinggi - Sangat Penting', desc: 'Darurat, harus dibaca sekarang' },
];

export default function BroadcastForm({ navigation }: any) {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [target, setTarget] = useState('');
  const [priority, setPriority] = useState('');
  const [sound, setSound] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="light-content" backgroundColor="#fbbf24" />
      <LinearGradient
        colors={['#F59E1B', '#FF512F']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <ArrowLeft color="#fff" size={22} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Buat Broadcast Baru</Text>
            <Text style={styles.headerSubtitle}>Bagikan informasi penting ke komunitas</Text>
          </View>
        </View>

      </LinearGradient>
      <ScrollView style={{ flex: 1 }}>
        {/* FORM */}
        <View style={styles.formContent}>
          {/* 1. Jenis Broadcast */}
          <Text style={styles.sectionLabel}>1. Jenis Broadcast *</Text>
          <View style={styles.grid2}>
            {BROADCAST_TYPES.map((t) => (
              <TouchableOpacity
                key={t.value}
                style={[
                  styles.typeBtn,
                  {
                    backgroundColor: t.bg,
                    borderColor: type === t.value ? t.color : 'transparent',
                  },
                ]}
                onPress={() => setType(t.value)}
                activeOpacity={0.85}
              >
                {t.icon}
                <Text style={{ color: t.color, fontWeight: '700', fontSize: 13, marginTop: 3 }}>{t.label}</Text>
                <Text style={{ color: t.color, fontSize: 11, marginTop: 2, opacity: 0.7 }}>{t.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 2. Kategori */}
          <Text style={styles.sectionLabel}>2. Kategori *</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => {
              if (Platform.OS !== 'web') {
                // Modal picker bisa diganti untuk produksi
                const options = CATEGORIES.map(c => c.label).join('\n');
                const val = prompt('Pilih kategori broadcast:\n' + options);
                if (val) setCategory(val);
              }
            }}
            activeOpacity={Platform.OS !== 'web' ? 0.7 : 1}
          >
            <View style={styles.inputCategory}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                {(CATEGORIES.find(c => c.label === category) || CATEGORIES[0]).icon}
                <Text style={{ fontSize: 14, color: category ? '#1e293b' : '#bfbfbf' }}>
                  {category || 'Pilih kategori broadcast...'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* 3. Judul Broadcast */}
          <Text style={styles.sectionLabel}>3. Judul Broadcast *</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={title}
              maxLength={60}
              placeholder="Contoh: Peringatan Banjir di Jl. Sudirman"
              placeholderTextColor="#bfbfbf"
              onChangeText={setTitle}
            />
            <Text style={styles.inputInfo}>{title.length}/60</Text>
          </View>

          {/* 4. Isi Pesan */}
          <Text style={styles.sectionLabel}>4. Isi Pesan *</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              multiline
              value={message}
              maxLength={400}
              placeholder="Tulis pesan broadcast Anda di sini. Jelaskan situasi, lokasi, dan tindakan yang perlu diambil..."
              placeholderTextColor="#bfbfbf"
              onChangeText={text => { setMessage(text); setCharCount(text.length); }}
            />
            <View style={styles.inputInfoRow}>
              <Text style={styles.inputInfo}>Minimal 20 karakter</Text>
              <Text style={styles.inputInfo}>{charCount}/400</Text>
            </View>
          </View>

          {/* 5. Lokasi Spesifik */}
          <Text style={styles.sectionLabel}>5. Lokasi Spesifik (Opsional)</Text>
          <View style={styles.locationBox}>
            <MapPin color="#2563eb" size={17} style={{ marginRight: 6 }} />
            <Text style={styles.locationText}>GPS Saat Ini</Text>
            <TouchableOpacity style={styles.locationBtn}>
              <Text style={styles.locationBtnText}>Gunakan</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputWrapper, { marginTop: 9 }]}>
            <TextInput
              style={styles.input}
              value={location}
              placeholder="Tulis alamat/lokasi manual (opsional)"
              placeholderTextColor="#bfbfbf"
              onChangeText={setLocation}
            />
          </View>

          {/* 6. Target Penerima */}
          <Text style={styles.sectionLabel}>6. Target Penerima *</Text>
          {TARGETS.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.radioBtn,
                target === opt.key && { borderColor: '#eab308', borderWidth: 2 }
              ]}
              onPress={() => setTarget(opt.key)}
            >
              <View style={[
                styles.radioCircle,
                target === opt.key && { borderColor: '#eab308', backgroundColor: '#fde047' }
              ]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.radioText}>{opt.label}</Text>
                <Text style={styles.radioSub}>{opt.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* 7. Tingkat Prioritas */}
          <Text style={styles.sectionLabel}>7. Tingkat Prioritas *</Text>
          {PRIORITIES.map(item => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.priorityBtn,
                { borderColor: item.color, backgroundColor: priority === item.key ? item.color + '15' : '#fff' },
                priority === item.key && { borderWidth: 2 }
              ]}
              onPress={() => setPriority(item.key)}
            >
              <View style={{ marginRight: 8 }}>{item.icon}</View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.priorityText, { color: item.color }]}>{item.label}</Text>
                <Text style={styles.priorityDesc}>{item.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* 8. Opsi Tambahan */}
          <Text style={styles.sectionLabel}>8. Opsi Tambahan</Text>
          <View style={styles.switchRow}>
            <Switch value={sound} onValueChange={setSound} />
            <View>
              <Text style={styles.switchLabel}>Kirim dengan suara notifikasi</Text>
              <Text style={styles.switchHint}>Penerima akan mendengar bunyi khusus</Text>
            </View>
          </View>
          <View style={styles.switchRow}>
            <Switch value={confirmation} onValueChange={setConfirmation} />
            <View>
              <Text style={styles.switchLabel}>Minta konfirmasi baca</Text>
              <Text style={styles.switchHint}>Lihat siapa saja yang sudah membaca</Text>
            </View>
          </View>
          <View style={styles.switchRow}>
            <Switch value={schedule} onValueChange={setSchedule} />
            <View>
              <Text style={styles.switchLabel}>Jadwalkan pengiriman</Text>
              <Text style={styles.switchHint}>Kirim pada waktu tertentu</Text>
            </View>
          </View>
          {schedule && (
            <View style={styles.scheduleBox}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Tanggal</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={date}
                  onChangeText={setDate}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.inputLabel}>Waktu</Text>
                <TextInput
                  style={styles.input}
                  placeholder="HH:mm"
                  value={time}
                  onChangeText={setTime}
                />
              </View>
            </View>
          )}

          {/* 9. Preview */}
          <Text style={styles.sectionLabel}>9. Preview Broadcast</Text>
          <View style={styles.previewBox}>
            <Text style={styles.previewTitle}>{title || 'Judul Broadcast'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <View style={styles.previewTypeBadge}>
                <Text style={styles.previewTypeText}>{type ? BROADCAST_TYPES.find(x => x.value === type)?.label?.toUpperCase() : 'INFO'}</Text>
              </View>
              <View style={styles.previewUserAvatar}><Text style={styles.previewUserAvatarText}>AS</Text></View>
              <View>
                <Text style={styles.previewUserName}>Ahmad Santoso</Text>
                <Text style={styles.previewUserRole}>Koordinator RT 05</Text>
              </View>
            </View>
            <Text style={styles.previewMessage}>
              {message || 'Isi pesan broadcast akan muncul di sini...'}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MapPin color="#64748b" size={12} style={{ marginRight: 4 }} />
                <Text style={styles.previewInfo}>{location || 'Lokasi akan muncul di sini'}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock color="#64748b" size={12} style={{ marginRight: 4 }} />
                <Text style={styles.previewInfo}>Baru saja</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => { /* Handle submit broadcast */ }}
          disabled={!type || !category || !title || message.length < 20 || !target || !priority}
        >
          <LinearGradient
            colors={['#fbbf24', '#f59e0b', '#b45309']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitGradient}
          >
            <Text style={styles.submitText}>Kirim Broadcast</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.footNote}>Broadcast akan dikirim ke <Text style={{ color: '#f59e0b', fontWeight: 'bold' }}>0</Text> penerima</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerGradient: { 
    paddingBottom: 22, 
    paddingTop: 34, 
    paddingHorizontal: 22, 
    borderBottomLeftRadius: 22, 
    borderBottomRightRadius: 22 
  },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 14 
  },
  headerBack: { 
    marginRight: 13, 
    padding: 8, 
    borderRadius: 99, 
    backgroundColor: 'rgba(255,255,255,0.13)' 
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 21, 
    fontWeight: 'bold', 
    marginBottom: 1 
  },
  headerSubtitle: { 
    color: '#fff7ce', 
    fontSize: 13, 
    marginTop: 1 
  },
  summaryBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between'
  },
  summaryCol: {
    alignItems: 'center',
    flex: 1
  },
  summaryValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2
  },
  summaryLabel: {
    color: '#fff7ce',
    fontSize: 11,
    textAlign: 'center'
  },
  formContent: { 
    paddingHorizontal: 22, 
    paddingVertical: 22 
  },
  sectionLabel: { fontWeight: 'bold', color: '#1e293b', fontSize: 14, marginBottom: 7 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginBottom: 18 },
  typeBtn: { flex: 1, margin: 4, alignItems: 'center', paddingVertical: 13, borderRadius: 15, borderWidth: 2, minWidth: 130 },
  inputWrapper: { marginBottom: 15 },
  input: { backgroundColor: '#fff', borderRadius: 13, borderColor: '#e5e7eb', borderWidth: 1, paddingHorizontal: 15, paddingVertical: 13, fontSize: 14, color: '#1e293b' },
  inputCategory: { backgroundColor: '#fff', borderRadius: 13, borderWidth: 1, borderColor: '#e5e7eb', paddingVertical: 13, paddingHorizontal: 15 },
  inputInfo: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  inputInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  locationBox: { backgroundColor: '#e0f2fe', borderRadius: 9, flexDirection: 'row', alignItems: 'center', paddingVertical: 9, paddingHorizontal: 13, borderWidth: 1, borderColor: '#bae6fd', marginBottom: 2 },
  locationText: { color: '#2563eb', fontSize: 13, fontWeight: '500', flex: 1 },
  locationBtn: { backgroundColor: '#dbeafe', borderRadius: 99, paddingHorizontal: 13, paddingVertical: 5 },
  locationBtnText: { color: '#2563eb', fontWeight: 'bold', fontSize: 13 },
  radioBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', padding: 12, marginBottom: 8 },
  radioCircle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#d4d4d4', marginRight: 10, backgroundColor: '#fff' },
  radioText: { fontSize: 15, fontWeight: '600', color: '#292524' },
  radioSub: { fontSize: 12, color: '#6b7280', marginTop: 1 },
  priorityBtn: { borderRadius: 16, padding: 14, borderWidth: 2, borderColor: 'transparent', marginBottom: 10, marginTop: 2, flexDirection: 'row', alignItems: 'center' },
  priorityText: { fontWeight: 'bold', fontSize: 14 },
  priorityDesc: { fontSize: 12, opacity: 0.75, marginTop: 2 },
  switchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, marginTop: 2 },
  switchLabel: { fontSize: 14, fontWeight: '600', color: '#292524', marginLeft: 8 },
  switchHint: { fontSize: 12, color: '#6b7280', marginLeft: 8, marginTop: 1 },
  scheduleBox: { flexDirection: 'row', marginTop: 8, gap: 8 },
  inputLabel: { fontSize: 12, color: '#57534e', marginBottom: 2, fontWeight: '600' },
  previewBox: { backgroundColor: '#f8fafc', borderRadius: 13, padding: 15, marginVertical: 18, borderWidth: 1, borderColor: '#e5e7eb' },
  previewTitle: { fontWeight: 'bold', fontSize: 15, color: '#1e293b', marginBottom: 3 },
  previewTypeBadge: { backgroundColor: '#dbeafe', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 1, marginRight: 7 },
  previewTypeText: { color: '#2563eb', fontSize: 12, fontWeight: 'bold' },
  previewUserAvatar: { width: 28, height: 28, borderRadius: 99, backgroundColor: '#fef9c3', alignItems: 'center', justifyContent: 'center', marginHorizontal: 7 },
  previewUserAvatarText: { color: '#eab308', fontWeight: 'bold', fontSize: 14 },
  previewUserName: { fontSize: 13, fontWeight: 'bold', color: '#334155' },
  previewUserRole: { fontSize: 11, color: '#64748b' },
  previewMessage: { marginVertical: 6, color: '#52525b', fontSize: 13 },
  previewInfo: { fontSize: 11, color: '#64748b' },
  submitBtn: { marginHorizontal: 22, marginTop: 16, borderRadius: 15, overflow: 'hidden', marginBottom: 14 },
  submitGradient: { paddingVertical: 16, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  footNote: { fontSize: 12, color: '#bdbdbd', textAlign: 'center', marginTop: 7, marginBottom: 24 },
});