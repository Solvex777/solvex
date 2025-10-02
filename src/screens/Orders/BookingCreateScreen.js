import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Card } from 'react-native-paper';
import api from '../../api';

export default function BookingCreateScreen({ navigation }) {
  const [packageId, setPackageId] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [priceTotal, setPriceTotal] = useState('');
  const [numTourists, setNumTourists] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const tourists = [];
      const n = parseInt(numTourists, 10) || 1;
      for (let i = 0; i < n; i++) {
        tourists.push({
          full_name: `Турист ${i + 1}`,
          birth_date: new Date().toISOString().substring(0, 10),
          passport_number: 'N/A',
          passport_expires: new Date().toISOString().substring(0, 10),
        });
      }
      await api.post('/bookings', {
        package_id: parseInt(packageId, 10),
        agency_id: agencyId ? parseInt(agencyId, 10) : null,
        tourists,
        status: 'draft',
        price_total: parseFloat(priceTotal),
        currency: 'RUB',
      });
      navigation.goBack();
    } catch (err) {
      console.error(err);
      setError('Ошибка при создании заказа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Создание заказа" />
        <Card.Content>
          <TextInput
            label="ID пакета"
            value={packageId}
            onChangeText={setPackageId}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="ID агентства (опционально)"
            value={agencyId}
            onChangeText={setAgencyId}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Сумма"
            value={priceTotal}
            onChangeText={setPriceTotal}
            keyboardType="decimal-pad"
            style={styles.input}
          />
          <TextInput
            label="Число туристов"
            value={numTourists}
            onChangeText={setNumTourists}
            keyboardType="numeric"
            style={styles.input}
          />
          {error && <HelperText type="error">{error}</HelperText>}
          <Button mode="contained" onPress={onSubmit} loading={loading}>
            Создать
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
});