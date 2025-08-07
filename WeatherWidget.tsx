import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { BMKG_WEATHER_CODES, findParamValue } from './bmkg';

const StyledView = styled(View);
const StyledText = styled(Text);

// Definisikan tipe data yang diharapkan dari API
interface BmkgWeatherData {
  city: string;
  temp: string | null;
  humidity: string | null;
  weatherCode: string | null;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<BmkgWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL Data Digital Forecast BMKG untuk DKI Jakarta
  // Anda bisa mengganti 'DKIJakarta' dengan provinsi lain yang tersedia di data.bmkg.go.id
  const url = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-DKIJakarta.xml';
  const targetCity = 'Makassar'; // Kota yang ingin ditampilkan

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Ambil data XML dari BMKG
        const response = await axios.get(url, { responseType: 'text' });
        
        // 2. Parse XML menjadi JavaScript Object
        const parser = new XMLParser();
        const parsedData = parser.parse(response.data as string);
        
        // 3. Cari area (kota) yang sesuai
        const forecastArea = parsedData.data.forecast[0].area;
        const cityData = forecastArea.find(
          (area: any) => area.name === targetCity
        );

        if (cityData) {
          // 4. Ekstrak parameter yang dibutuhkan (suhu, kelembapan, kode cuaca)
          const params = cityData.parameter;
          setWeather({
            city: targetCity,
            temp: findParamValue(params, 't'),
            humidity: findParamValue(params, 'hu'),
            weatherCode: findParamValue(params, 'weather'),
          });
        } else {
          setError(`Data untuk ${targetCity} tidak ditemukan.`);
        }
      } catch (err) {
        setError('Gagal memuat data cuaca.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [url, targetCity]); // Fetch ulang jika URL atau kota target berubah

  if (loading) {
    return (
      <StyledView className="bg-white rounded-2xl p-4 mx-5 mb-4 shadow-md border border-gray-200 items-center justify-center h-36">
        <ActivityIndicator size="large" color="#2563EB" />
        <StyledText className="mt-2.5 text-gray-500">Memuat data cuaca...</StyledText>
      </StyledView>
    );
  }

  if (error) {
    return (
      <StyledView className="bg-white rounded-2xl p-4 mx-5 mb-4 shadow-md border border-gray-200 items-center justify-center h-36">
        <StyledText className="text-red-500 font-bold">{error}</StyledText>
      </StyledView>
    );
  }

  if (!weather) {
    return null;
  }

  const weatherInfo = weather.weatherCode ? BMKG_WEATHER_CODES[weather.weatherCode] : BMKG_WEATHER_CODES['0'];

  return (
    <StyledView className="bg-white rounded-2xl p-4 mx-5 mb-4 shadow-md border border-gray-200">
      <StyledText className="font-bold text-lg text-gray-800 mb-4">Cuaca Saat Ini di {weather.city}</StyledText>
      <StyledView className="flex-row items-center">
        <StyledView className="mr-3">
          {weatherInfo.icon}
        </StyledView>
        <StyledView className="flex-1">
          <StyledText className="text-5xl font-bold text-gray-800">{weather.temp || '--'}</StyledText>
          <StyledText className="text-base text-gray-600 capitalize font-medium">{weatherInfo.label}</StyledText>
          <StyledText className="text-sm text-gray-500 mt-1.5">Kelembapan: {weather.humidity || '--'}</StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};



export default WeatherWidget;