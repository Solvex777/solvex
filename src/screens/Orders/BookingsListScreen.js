import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, ActivityIndicator, FAB } from 'react-native-paper';
import api from '../../api';

export default function BookingsListScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const res = await api.get('/bookings');
      setBookings(res.data);
    } catch (error) {
      console.error('Failed to load bookings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleRowPress = (booking) => {
    navigation.navigate('BookingDetail', { bookingId: booking.id });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title numeric>ID</DataTable.Title>
            <DataTable.Title numeric>Пакет</DataTable.Title>
            <DataTable.Title>Статус</DataTable.Title>
            <DataTable.Title numeric>Сумма</DataTable.Title>
          </DataTable.Header>
          {bookings.map((b) => (
            <DataTable.Row key={b.id} onPress={() => handleRowPress(b)}>
              <DataTable.Cell numeric>{b.id}</DataTable.Cell>
              <DataTable.Cell numeric>{b.package_id}</DataTable.Cell>
              <DataTable.Cell>{b.status}</DataTable.Cell>
              <DataTable.Cell numeric>{b.price_total.toFixed(2)}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        label="Создать"
        onPress={() => navigation.navigate('BookingCreate')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});