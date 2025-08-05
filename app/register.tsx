// File: app/register.tsx

import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../firebase/config';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sukses', 'Registrasi berhasil');
      router.replace('/' as const);
    } catch (error: any) {
      Alert.alert('Gagal', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Daftar" onPress={handleRegister} />
      <Pressable onPress={() => router.push('/login')}>
        <Text style={styles.link}>Sudah punya akun? Masuk</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  link: {
    marginTop: 16,
    color: '#2563EB',
    textAlign: 'center'
  }
});
