// File: app/map.tsx

import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { db } from '../../firebase/config';

interface ReportLocation {
  id: string;
  latitude: number;
  longitude: number;
  reporterName: string;
  incidentType: string;
}

export default function MapScreen() {
  const [locations, setLocations] = useState<ReportLocation[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'report_locations'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ReportLocation));
      setLocations(data);
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Peta Komunitas</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -6.200000,
          longitude: 106.816666,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {locations.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.incidentType}
            description={`Dilaporkan oleh ${item.reporterName}`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    color: '#1f2937',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 80,
  },
});
