import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, ActivityIndicator } from 'react-native-paper';
import api from '../../api';

export default function ResortsScreen({ route, navigation }) {
  const { regionId, regionName } = route.params;
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const res = await api.get('/resorts');
        const data = res.data.filter((r) => r.region_id === regionId);
        setResorts(data);
      } catch (error) {
        console.error('Failed to load resorts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResorts();
  }, [regionId]);

  const handleRowPress = (resort) => {
    navigation.navigate('Hotels', { resortId: resort.id, resortName: resort.name });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Курорт</DataTable.Title>
          </DataTable.Header>
          {resorts.map((resort) => (
            <DataTable.Row key={resort.id} onPress={() => handleRowPress(resort)}>
              <DataTable.Cell>{resort.name}</DataTable.Cell>
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