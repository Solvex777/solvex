import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, ActivityIndicator, Button } from 'react-native-paper';
import api from '../../api';

export default function AgencyDetailScreen({ route }) {
  const { agencyId } = route.params;
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAgency = async () => {
    try {
      const res = await api.get(`/agencies/${agencyId}`);
      setAgency(res.data);
    } catch (error) {
      console.error('Failed to load agency', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgency();
  }, [agencyId]);

  if (loading || !agency) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={agency.name} />
        <Card.Content>
          <Text>ИНН: {agency.inn || '—'}</Text>
          <Text>КПП: {agency.kpp || '—'}</Text>
          <Text>Email: {agency.email || '—'}</Text>
          <Text>Телефон: {agency.phone || '—'}</Text>
          <Text>Город: {agency.city || '—'}</Text>
          <Text>Баланс: {agency.balance.toFixed(2)} ₽</Text>
          <Text>Кредитный лимит: {agency.credit_limit.toFixed(2)} ₽</Text>
          <Text>Активен: {agency.is_active ? 'Да' : 'Нет'}</Text>
          <Text>Менеджер: {agency.manager ? agency.manager.full_name : '—'}</Text>
        </Card.Content>
      </Card>
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
});