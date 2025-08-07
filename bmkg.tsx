import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const BMKG_WEATHER_CODES: { [key: string]: { label: string; icon: JSX.Element } } = {
  '0': { label: 'Cerah', icon: <MaterialCommunityIcons name="weather-sunny" size={48} color="#FFD700" /> },
  '1': { label: 'Cerah Berawan', icon: <MaterialCommunityIcons name="weather-partly-cloudy" size={48} color="#FFA500" /> },
  '2': { label: 'Cerah Berawan', icon: <MaterialCommunityIcons name="weather-partly-cloudy" size={48} color="#FFA500" /> },
  '3': { label: 'Berawan', icon: <MaterialCommunityIcons name="weather-cloudy" size={48} color="#808080" /> },
  '4': { label: 'Berawan Tebal', icon: <MaterialCommunityIcons name="weather-cloudy" size={48} color="#696969" /> },
  '5': { label: 'Udara Kabur', icon: <MaterialCommunityIcons name="weather-fog" size={48} color="#A9A9A9" /> },
  '10': { label: 'Asap', icon: <MaterialCommunityIcons name="weather-hazy" size={48} color="#D3D3D3" /> },
  '45': { label: 'Kabut', icon: <MaterialCommunityIcons name="weather-fog" size={48} color="#A9A9A9" /> },
  '60': { label: 'Hujan Ringan', icon: <MaterialCommunityIcons name="weather-rainy" size={48} color="#4682B4" /> },
  '61': { label: 'Hujan Sedang', icon: <MaterialCommunityIcons name="weather-pouring" size={48} color="#4169E1" /> },
  '63': { label: 'Hujan Lebat', icon: <MaterialCommunityIcons name="weather-pouring" size={48} color="#191970" /> },
  '80': { label: 'Hujan Lokal', icon: <MaterialCommunityIcons name="weather-rainy" size={48} color="#4682B4" /> },
  '95': { label: 'Hujan Petir', icon: <MaterialCommunityIcons name="weather-lightning-rainy" size={48} color="#8A2BE2" /> },
  '97': { label: 'Hujan Petir', icon: <MaterialCommunityIcons name="weather-lightning-rainy" size={48} color="#8A2BE2" /> },
};

export const findParamValue = (params: any[], id: string): string | null => {
  const param = params.find((p: any) => p.id === id);
  if (param && param.timerange && param.timerange.length > 0) {
    // Mengambil nilai dari timerange pertama (biasanya yang paling relevan/saat ini)
    return param.timerange[0].value; // Menggunakan _ untuk mengakses nilai teks
  }
  return null;
};
