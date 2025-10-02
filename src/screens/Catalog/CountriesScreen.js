import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DataTable, ActivityIndicator, FAB } from 'react-native-paper';
import api from '../../api';
import { useAuth } from '../../contexts/AuthContext';

export default function CountriesScreen({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await api.get('/countries');
        setCountries(res.data);
      } catch (error) {
        console.error('Failed to load countries', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleRowPress = (country) => {
    navigation.navigate('Regions', { countryId: country.id, countryName: country.name });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Код</DataTable.Title>
            <DataTable.Title>Название</DataTable.Title>
            <DataTable.Title>Активна</DataTable.Title>
          </DataTable.Header>
          {countries.map((country) => (
            <DataTable.Row key={country.id} onPress={() => handleRowPress(country)}>
              <DataTable.Cell>{country.code}</DataTable.Cell>
              <DataTable.Cell>{country.name}</DataTable.Cell>
              <DataTable.Cell>{country.is_active ? 'Да' : 'Нет'}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
      {/* Optional add country button for admins */}
      {user?.roles?.some((r) => r.code === 'admin') && (
        <FAB
          style={styles.fab}
          icon="plus"
          label="Добавить"
          onPress={() => {
            // Navigate to create country screen (not implemented)
          }}
        />
      )}
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