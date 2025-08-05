declare module 'firebase/auth/react-native' {
  export * from 'firebase/auth';

  // Ini deklarasi manual untuk fungsi yang tidak didefinisikan secara otomatis
  export function getReactNativePersistence(storage: any): any;
}
