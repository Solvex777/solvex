import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, ActivityIndicator, FAB } from 'react-native-paper';
import api from '../../api';

export default function AgenciesListScreen({ navigation }) {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAgencies = async () => {
    try {
      const res = await api.get('/agencies');
      setAgencies(res.data);
    } catch (error) {
      console.error('Failed to load agencies', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgencies();
  }, []);

  const handleRowPress = (agency) => {
    navigation.navigate('AgencyDetail', { agencyId: agency.id });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Название</DataTable.Title>
            <DataTable.Title numeric>Баланс</DataTable.Title>
            <DataTable.Title numeric>Лимит</DataTable.Title>
          </DataTable.Header>
          {agencies.map((a) => (
            <DataTable.Row key={a.id} onPress={() => handleRowPress(a)}>
              <DataTable.Cell>{a.name}</DataTable.Cell>
              <DataTable.Cell numeric>{a.balance.toFixed(2)}</DataTable.Cell>
              <DataTable.Cell numeric>{a.credit_limit.toFixed(2)}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        label="Добавить"
        onPress={() => navigation.navigate('AgencyCreate')}
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