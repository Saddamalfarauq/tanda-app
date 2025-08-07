import { Picker } from '@react-native-picker/picker';
import type { ImagePickerAsset } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AlertTriangle, Ambulance, ArrowLeft, Flame, Home, Hospital, PersonStanding, ShieldAlert, Users } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ReportScreen() {
  const router = useRouter();

  // STATE
  const [manualLocation, setManualLocation] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [severity, setSeverity] = useState('');
  const [peopleAffected, setPeopleAffected] = useState('');
  const [injured, setInjured] = useState('');
  const [death, setDeath] = useState('');
  const [missing, setMissing] = useState('');
  const [needAmbulance, setNeedAmbulance] = useState(false);
  const [needFire, setNeedFire] = useState(false);
  const [needPolice, setNeedPolice] = useState(false);
  const [needSAR, setNeedSAR] = useState(false);
  const [needMedical, setNeedMedical] = useState(false);
  const [needLogistics, setNeedLogistics] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [reporterRelation, setReporterRelation] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Progress Calculation
  // Pastikan ini hanya ada satu kali:
const requiredFields = [incidentType, severity, peopleAffected, description, reporterName, reporterRelation];
const progress = requiredFields.filter(Boolean).length + (image ? 1 : 0); // Hitung progress
const progressText = `${progress}/8 Selesai`;
const progressPercent = Math.round((progress / 8) * 100);

  // Image Picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7
    });
    if (!result.canceled) setImage(result.assets[0]);
  };

  // Submit Handler (dummy)
  const handleSubmit = async () => {
    if (!incidentType || !severity || !peopleAffected || !description || !reporterName || !reporterRelation) {
      return Alert.alert('Validasi', 'Harap lengkapi semua field wajib.');
    }
    if (description.length < 20) {
      return Alert.alert('Validasi', 'Deskripsi minimal 20 karakter.');
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      Alert.alert('Berhasil', 'Laporan berhasil dikirim.');
      router.push('./');
    }, 1000);
  };

  // Pilihan dengan Icon
  const severityOptions = [
    {
      value: 'rendah',
      Icon: AlertTriangle,
      bg: '#fef9c3', border: '#fde68a', color: '#b45309',
      title: 'Rendah - Tidak Mendesak',
      desc: 'Tidak ada bahaya langsung, bisa ditangani nanti',
    },
    {
      value: 'sedang',
      Icon: ShieldAlert,
      bg: '#ffedd5', border: '#fdba74', color: '#ea580c',
      title: 'Sedang - Perlu Perhatian',
      desc: 'Ada potensi bahaya, perlu tindakan segera',
    },
    {
      value: 'tinggi',
      Icon: Home,
      bg: '#fee2e2', border: '#fecaca', color: '#dc2626',
      title: 'Tinggi - Darurat!',
      desc: 'Bahaya langsung, butuh bantuan sekarang juga',
    },
  ];
  const peopleOptions = [
    { value: '1', Icon: PersonStanding, label: '1 Orang', desc: 'Hanya saya' },
    { value: '2-5', Icon: Users, label: '2-5 Orang', desc: 'Keluarga kecil' },
    { value: '6-20', Icon: Users, label: '6-20 Orang', desc: 'Kelompok/RT' },
    { value: '20+', Icon: Home, label: '20+ Orang', desc: 'Komunitas besar' }
  ];
  const helpOptions = [
    { state: needAmbulance, set: setNeedAmbulance, Icon: Ambulance, label: 'Ambulans' },
    { state: needFire, set: setNeedFire, Icon: Flame, label: 'Pemadam Kebakaran' },
    { state: needPolice, set: setNeedPolice, Icon: ShieldAlert, label: 'Polisi' },
    { state: needSAR, set: setNeedSAR, Icon: Home, label: 'Tim SAR' },
    { state: needMedical, set: setNeedMedical, Icon: Hospital, label: 'Tim Medis' },
    { state: needLogistics, set: setNeedLogistics, Icon: Home, label: 'Logistik' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={['#F59E1B', '#DC2626']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity style={styles.headerBackBtn} onPress={() => router.back()}>
            <ArrowLeft color="#fff" size={22} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Laporkan Kejadian</Text>
            <Text style={styles.headerSubtitle}>Laporkan situasi darurat dengan detail lengkap</Text>
          </View>
        </View>
        {/* Progress */}
        <View style={styles.progressBox}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ color: '#fff', fontSize: 13, fontWeight: '500' }}>Progress Laporan</Text>
            <Text style={{ color: '#fff', fontSize: 13 }}>{progressText}</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />

          </View>
        </View>
      </LinearGradient>

      {/* Lokasi Section */}
      <View style={styles.locationBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <View style={styles.locationIconWrap}></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.locationLabel}>Lokasi Kejadian</Text>
            <Text style={styles.locationDesc}>Jl. Sudirman No. 123, Jakarta Selatan</Text>
            <Text style={styles.locationSub}>GPS: -6.2088, 106.8456 • Akurasi: 5m</Text>
          </View>
          <TouchableOpacity style={styles.locationUpdateBtn}><Text style={styles.locationUpdateBtnText}>Update GPS</Text></TouchableOpacity>
        </View>
        <View>
          <Text style={styles.locationInputLabel}>Atau masukkan alamat manual:</Text>
          <TextInput
            style={styles.inputManual}
            placeholder="Contoh: Jl. Merdeka No. 10, RT 05/RW 12"
            value={manualLocation}
            onChangeText={setManualLocation}
            placeholderTextColor="#64748b"
          />
        </View>
      </View>

      {/* Jenis Kejadian */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionLabel}>1. Jenis Kejadian *</Text>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={incidentType}
            onValueChange={setIncidentType}
            style={styles.picker}
          >
            <Picker.Item label="Pilih jenis kejadian yang terjadi..." value="" />
            <Picker.Item label="Banjir" value="banjir" />
            <Picker.Item label="Kebakaran" value="kebakaran" />
            <Picker.Item label="Tanah Longsor" value="longsor" />
            <Picker.Item label="Gempa Bumi" value="gempa" />
            <Picker.Item label="Angin Kencang/Puting Beliung" value="angin" />
            <Picker.Item label="Kecelakaan Lalu Lintas" value="kecelakaan" />
            <Picker.Item label="Tindak Kriminal" value="kriminal" />
            <Picker.Item label="Darurat Medis" value="medis" />
            <Picker.Item label="Kerusakan Infrastruktur" value="infrastruktur" />
            <Picker.Item label="Lainnya" value="lainnya" />
          </Picker>
        </View>
      </View>

      {/* Tingkat Keparahan */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionLabel}>2. Tingkat Keparahan *</Text>
        <View style={styles.grid1}>
          {severityOptions.map(opt => (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.severityBtn,
                {
                  backgroundColor: severity === opt.value ? opt.bg : '#f8fafc',
                  borderColor: severity === opt.value ? opt.border : 'transparent',
                  shadowOpacity: severity === opt.value ? 0.18 : 0,
                }
              ]}
              onPress={() => setSeverity(opt.value)}
              activeOpacity={0.84}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <opt.Icon color={opt.color} size={27} style={{ marginRight: 13 }} />
                <View>
                  <Text style={{ color: opt.color, fontWeight: 'bold', fontSize: 15 }}>{opt.title}</Text>
                  <Text style={{ fontSize: 12, color: opt.color, opacity: 0.75 }}>{opt.desc}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Jumlah Orang Terdampak */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionLabel}>3. Jumlah Orang Terdampak *</Text>
        <View style={styles.grid2}>
          {peopleOptions.map(opt => (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.peopleBtn,
                peopleAffected === opt.value && { borderColor: '#dc2626', backgroundColor: '#fee2e2' }
              ]}
              onPress={() => setPeopleAffected(opt.value)}
              activeOpacity={0.86}
            >
              <opt.Icon color="#2563eb" size={23} style={{ marginBottom: 3 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#1f2937' }}>{opt.label}</Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>{opt.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Casualty */}
      <View style={styles.casualtyBox}>
        <Text style={styles.sectionLabel}>4. Informasi Korban (Opsional)</Text>
        <View style={styles.casualtyRow}>
          <View style={styles.casualtyCol}>
            <Text style={styles.casualtyLabel}>Luka-luka</Text>
            <TextInput
              style={styles.inputCasualty}
              placeholder="0"
              keyboardType="number-pad"
              value={injured}
              onChangeText={setInjured}
              placeholderTextColor="#64748b"
            />
          </View>
          <View style={styles.casualtyCol}>
            <Text style={styles.casualtyLabel}>Meninggal</Text>
            <TextInput
              style={styles.inputCasualty}
              placeholder="0"
              keyboardType="number-pad"
              value={death}
              onChangeText={setDeath}
              placeholderTextColor="#64748b"
            />
          </View>
          <View style={styles.casualtyCol}>
            <Text style={styles.casualtyLabel}>Hilang</Text>
            <TextInput
              style={styles.inputCasualty}
              placeholder="0"
              keyboardType="number-pad"
              value={missing}
              onChangeText={setMissing}
              placeholderTextColor="#64748b"
            />
          </View>
        </View>
      </View>

      {/* Bantuan Dibutuhkan */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionLabel}>5. Bantuan yang Dibutuhkan *</Text>
        <View style={styles.grid2}>
          {helpOptions.map((opt, i) => (
            <TouchableOpacity
              key={opt.label}
              style={[
                styles.helpBtn,
                opt.state && { borderColor: '#dc2626', backgroundColor: '#fee2e2' }
              ]}
              onPress={() => opt.set(!opt.state)}
            >
              <opt.Icon color="#dc2626" size={21} style={{ marginRight: 9 }} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#1e293b',
                  flexShrink: 1,
                }}
                numberOfLines={2}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Deskripsi */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionLabel}>6. Deskripsi Kejadian *</Text>
        <TextInput
          style={styles.inputDesc}
          placeholder="Jelaskan situasi yang terjadi secara detail: apa yang terjadi, kapan, bagaimana kondisi saat ini, dll..."
          multiline
          maxLength={500}
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#9ca3af"
        />
        <View style={styles.descRow}>
          <Text style={styles.descHint}>Minimal 20 karakter</Text>
          <Text style={styles.descCount}>{description.length}/500</Text>
        </View>
      </View>

      {/* Photo Upload */}
      <View style={styles.photoUploadBox}>
        <Text style={styles.sectionLabel}>7. Foto Kejadian (Opsional)</Text>
        <TouchableOpacity onPress={pickImage} style={styles.photoUploadArea}>
          {!image ? (
            <>
              <Text style={{ fontSize: 35, color: '#cbd5e1' }}>＋</Text>
              <Text style={{ color: '#6b7280', fontSize: 13, marginBottom: 5 }}>Tambahkan foto untuk memperjelas situasi</Text>
              <Text style={styles.photoUploadBtn}>Pilih Foto</Text>
            </>
          ) : (
            <View style={styles.photoPreview}>
              <Image source={{ uri: image.uri }} style={styles.photoThumb} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', color: '#1e293b', fontSize: 13 }}>
                  {image.fileName || 'kejadian_foto.jpg'}
                </Text>
                <Text style={{ color: '#64748b', fontSize: 11 }}>
                  {image.fileSize ? (image.fileSize / 1024 / 1024).toFixed(1) : ''} MB • Berhasil diunggah
                </Text>
              </View>
              <TouchableOpacity onPress={() => setImage(null)}>
                <Text style={{ color: '#dc2626', fontSize: 18, fontWeight: 'bold', marginLeft: 6 }}>×</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Info Pelapor */}
      <View style={styles.reporterBox}>
        <Text style={styles.sectionLabel}>8. Informasi Pelapor *</Text>
        <View style={{ marginBottom: 7 }}>
          <Text style={styles.inputReporterLabel}>Nama Lengkap</Text>
          <TextInput
            style={styles.inputReporter}
            placeholder="Masukkan nama lengkap Anda"
            value={reporterName}
            onChangeText={setReporterName}
            placeholderTextColor="#64748b"
          />
        </View>
        <View style={{ marginBottom: 7 }}>
          <Text style={styles.inputReporterLabel}>Nomor Telepon</Text>
          <TextInput
            style={styles.inputReporter}
            placeholder="Contoh: 08123456789"
            keyboardType="phone-pad"
            value={reporterPhone}
            onChangeText={setReporterPhone}
            placeholderTextColor="#64748b"
          />
        </View>
        <View>
          <Text style={styles.inputReporterLabel}>Hubungan dengan Kejadian</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={reporterRelation}
              onValueChange={setReporterRelation}
              style={styles.picker}
            >
              <Picker.Item label="Pilih hubungan Anda..." value="" />
              <Picker.Item label="Saya adalah korban" value="korban" />
              <Picker.Item label="Saya melihat kejadian" value="saksi" />
              <Picker.Item label="Keluarga korban" value="keluarga" />
              <Picker.Item label="Tetangga/warga sekitar" value="tetangga" />
              <Picker.Item label="Petugas/relawan" value="petugas" />
              <Picker.Item label="Lainnya" value="lainnya" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Emergency Checkbox */}
      <View style={styles.emergencyBox}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start' }} onPress={() => setIsEmergency(!isEmergency)}>
          <View style={[
            styles.emergencyCheck,
            isEmergency && { backgroundColor: '#dc2626', borderColor: '#dc2626' }
          ]} />
          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyText}>Ini adalah situasi darurat yang membutuhkan bantuan segera</Text>
            <Text style={styles.emergencySubText}>Dengan mencentang ini, laporan akan diprioritaskan dan dikirim ke layanan darurat</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Submit */}
      <TouchableOpacity
        style={[styles.submitBtn, uploading && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={uploading}
        activeOpacity={0.87}
      >
        {uploading ? <ActivityIndicator color="#fff" /> : (
          <LinearGradient
            colors={['#fbbf24', '#dc2626']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitGradient}
          >
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold', letterSpacing: 0.1 }}>
              Kirim Laporan Darurat
            </Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
      <Text style={styles.submitInfo}>
        Laporan akan dikirim ke pusat komando dan layanan darurat terkait
      </Text>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f8fafc', paddingBottom: 32, paddingTop: 0 },
  headerGradient: { paddingHorizontal: 24, paddingTop: 42, paddingBottom: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginBottom: 18 },
  headerBackBtn: { marginRight: 15, backgroundColor: 'rgba(255,255,255,0.13)', padding: 7, borderRadius: 99 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 1 },
  headerSubtitle: { color: '#fee2e2', fontSize: 13 },
  progressBox: { backgroundColor: 'rgba(255,255,255,0.20)', borderRadius: 16, padding: 10 },
  progressBarBg: { backgroundColor: '#dc2626', borderRadius: 6, height: 8, width: '100%' },
  progressBar: { backgroundColor: '#fff', height: 8, borderRadius: 8 },

  // Lokasi
  locationBox: { backgroundColor: '#f0f9ff', borderRadius: 17, padding: 15, borderWidth: 1, borderColor: '#bae6fd', marginHorizontal: 18, marginBottom: 17 },
  locationIconWrap: { backgroundColor: '#2563eb', borderRadius: 99, padding: 8, marginRight: 11 },
  locationLabel: { color: '#1e40af', fontWeight: '600', fontSize: 13 },
  locationDesc: { color: '#2563eb', fontSize: 11, fontWeight: '600' },
  locationSub: { color: '#3b82f6', fontSize: 11, marginTop: 2 },
  locationUpdateBtn: { backgroundColor: '#dbeafe', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 99, alignSelf: 'flex-start' },
  locationUpdateBtnText: { color: '#1d4ed8', fontWeight: 'bold', fontSize: 12 },
  locationInputLabel: { color: '#2563eb', fontSize: 11, fontWeight: 'bold', marginBottom: 4, marginTop: 8 },
  inputManual: { backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#bae6fd', paddingHorizontal: 12, paddingVertical: 9, fontSize: 13, color: '#334155' },

  // Section Card
  sectionBox: { backgroundColor: '#fff', borderRadius: 17, padding: 15, marginHorizontal: 18, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, borderWidth: 1, borderColor: '#f1f5f9' },
  sectionLabel: { fontSize: 13.5, fontWeight: 'bold', color: '#1f2937', marginBottom: 10 },

  // Radio grid (severity, people)
  grid1: { flexDirection: 'column', marginBottom: 0 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },

  severityBtn: { borderRadius: 15, padding: 13, borderWidth: 2, marginBottom: 8, backgroundColor: '#f8fafc', elevation: 1 },
  peopleBtn: { width: '48%', backgroundColor: '#f3f4f6', borderRadius: 15, padding: 13, borderWidth: 2, borderColor: '#e5e7eb', alignItems: 'center', marginBottom: 7 },

  // Casualty
  casualtyBox: { backgroundColor: '#f9fafb', borderRadius: 17, padding: 15, marginHorizontal: 18, marginBottom: 15, borderWidth: 1, borderColor: '#e5e7eb' },
  casualtyRow: { flexDirection: 'row', justifyContent: 'space-between' },
  casualtyCol: { flex: 1, marginHorizontal: 3 },
  casualtyLabel: { fontSize: 11, color: '#374151', marginBottom: 2, fontWeight: 'bold' },
  inputCasualty: { backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#d1d5db', paddingHorizontal: 9, paddingVertical: 7, fontSize: 13, color: '#374151', marginBottom: 3 },

  // Help (checkboxes)
helpBtn: {
  width: '48%',
  maxWidth: '48%',
  flexBasis: '48%',
  backgroundColor: '#fff',
  borderRadius: 15,
  padding: 12,
  borderWidth: 2,
  borderColor: '#e5e7eb',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: 7,
},

  // Deskripsi
  inputDesc: { backgroundColor: '#fff', borderRadius: 13, borderWidth: 1.5, borderColor: '#e5e7eb', padding: 12, minHeight: 86, fontSize: 14, color: '#1e293b', marginBottom: 4 },
  descRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  descHint: { color: '#6b7280', fontSize: 12 },
  descCount: { color: '#9ca3af', fontSize: 12 },

  // Photo
  photoUploadBox: { backgroundColor: '#fff', borderRadius: 17, padding: 15, marginHorizontal: 18, marginBottom: 15, borderWidth: 1, borderColor: '#e5e7eb' },
  photoUploadArea: { borderStyle: 'dashed', borderWidth: 2, borderColor: '#d1d5db', backgroundColor: '#f8fafc', borderRadius: 15, alignItems: 'center', justifyContent: 'center', padding: 18 },
  photoUploadBtn: { color: '#2563eb', backgroundColor: '#dbeafe', borderRadius: 99, paddingHorizontal: 14, paddingVertical: 7, overflow: 'hidden', fontSize: 13, fontWeight: 'bold' },
  photoPreview: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 10, padding: 7, width: '100%' },
  photoThumb: { width: 46, height: 46, borderRadius: 8, marginRight: 6 },

  // Reporter
  reporterBox: { backgroundColor: '#f9fafb', borderRadius: 17, padding: 15, marginHorizontal: 18, marginBottom: 15, borderWidth: 1, borderColor: '#e5e7eb' },
  inputReporterLabel: { fontSize: 11, color: '#374151', marginBottom: 1, fontWeight: 'bold' },
  inputReporter: { backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#d1d5db', paddingHorizontal: 11, paddingVertical: 9, fontSize: 13, color: '#374151', marginBottom: 2 },

  // Emergency
  emergencyBox: { backgroundColor: '#fef2f2', borderRadius: 16, padding: 12, marginHorizontal: 18, marginBottom: 17, borderWidth: 1, borderColor: '#fecaca' },
  emergencyCheck: { width: 22, height: 22, borderRadius: 8, borderWidth: 2, borderColor: '#dc2626', backgroundColor: '#fff', marginRight: 9, marginTop: 2 },
  emergencyText: { fontSize: 13, fontWeight: 'bold', color: '#b91c1c' },
  emergencySubText: { fontSize: 11, color: '#dc2626', marginTop: 2 },

  // Submit
  submitBtn: { marginHorizontal: 18, marginTop: 6, borderRadius: 16, overflow: 'hidden', shadowColor: '#dc2626', shadowOpacity: 0.09, shadowRadius: 8, elevation: 2, marginBottom: 6 },
  submitBtnDisabled: { opacity: 0.6 },
  submitGradient: { width: '100%', paddingVertical: 15, alignItems: 'center', borderRadius: 16 },
  submitInfo: { fontSize: 12, color: '#64748b', textAlign: 'center', marginTop: 7 },

  pickerBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 2,
    marginBottom: 6,
    minHeight: 44,
    justifyContent: 'center',
  },

  picker: {
    width: '100%',
    height: 55,
    color: '#22223B',
    fontSize: 15,
    backgroundColor: 'transparent',
  }
});