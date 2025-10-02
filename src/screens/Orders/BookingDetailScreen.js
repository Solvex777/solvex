import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Button, Menu, Divider, ActivityIndicator, Card } from 'react-native-paper';
import api from '../../api';

const statusOptions = ['draft', 'pending', 'paid', 'confirmed', 'cancelled', 'refund'];

export default function BookingDetailScreen({ route, navigation }) {
  const { bookingId } = route.params;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const loadBooking = async () => {
    try {
      const res = await api.get(`/bookings/${bookingId}`);
      setBooking(res.data);
    } catch (error) {
      console.error('Failed to load booking', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooking();
  }, [bookingId]);

  const changeStatus = async (newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, null, {
        params: { status: newStatus },
      });
      setMenuVisible(false);
      loadBooking();
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const cancelBooking = () => changeStatus('cancelled');

  if (loading || !booking) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={`Заказ #${booking.id}`} />
        <Card.Content>
          <Text>Пакет: {booking.package_id}</Text>
          <Text>Агентство: {booking.agency_id || '—'}</Text>
          <Text>Статус: {booking.status}</Text>
          <Text>Сумма: {booking.price_total.toFixed(2)} ₽</Text>
          <Text>Создан: {new Date(booking.created_at).toLocaleString()}</Text>
          <Text>Туристов: {booking.tourists.length}</Text>
        </Card.Content>
      </Card>
      <View style={styles.actions}>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<Button mode="outlined" onPress={() => setMenuVisible(true)}>Изменить статус</Button>}
        >
          {statusOptions.map((opt) => (
            <Menu.Item key={opt} onPress={() => changeStatus(opt)} title={opt} />
          ))}
        </Menu>
        <Button
          mode="contained"
          onPress={cancelBooking}
          style={{ marginTop: 8 }}
          disabled={booking.status === 'cancelled' || booking.status === 'refund'}
        >
          Отменить
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    marginTop: 8,
  },
});