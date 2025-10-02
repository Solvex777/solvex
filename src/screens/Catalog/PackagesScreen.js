import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, ActivityIndicator } from 'react-native-paper';
import api from '../../api';

export default function PackagesScreen({ route }) {
  const { hotelId } = route.params;
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get('/packages', { params: { hotel_id: hotelId } });
        setPackages(res.data);
      } catch (error) {
        console.error('Failed to load packages', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [hotelId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title numeric>Ночи</DataTable.Title>
            <DataTable.Title>Дата вылета</DataTable.Title>
            <DataTable.Title numeric>Цена</DataTable.Title>
            <DataTable.Title numeric>Остаток</DataTable.Title>
          </DataTable.Header>
          {packages.map((pkg) => (
            <DataTable.Row key={pkg.id}>
              <DataTable.Cell numeric>{pkg.nights}</DataTable.Cell>
              <DataTable.Cell>{pkg.departure?.date || '-'}</DataTable.Cell>
              <DataTable.Cell numeric>{pkg.base_price.toFixed(2)}</DataTable.Cell>
              <DataTable.Cell numeric>{pkg.available}</DataTable.Cell>
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