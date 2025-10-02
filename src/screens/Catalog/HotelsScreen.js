import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, ActivityIndicator } from 'react-native-paper';
import api from '../../api';

export default function HotelsScreen({ route, navigation }) {
  const { resortId } = route.params;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get('/hotels');
        const data = res.data.filter((h) => h.resort_id === resortId);
        setHotels(data);
      } catch (error) {
        console.error('Failed to load hotels', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [resortId]);

  const handleRowPress = (hotel) => {
    navigation.navigate('Packages', { hotelId: hotel.id, hotelName: hotel.name });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Отель</DataTable.Title>
            <DataTable.Title numeric>Звёзды</DataTable.Title>
          </DataTable.Header>
          {hotels.map((hotel) => (
            <DataTable.Row key={hotel.id} onPress={() => handleRowPress(hotel)}>
              <DataTable.Cell>{hotel.name}</DataTable.Cell>
              <DataTable.Cell numeric>{hotel.stars || '-'}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});