import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, ActivityIndicator } from 'react-native-paper';
import api from '../../api';

export default function RegionsScreen({ route, navigation }) {
  const { countryId, countryName } = route.params;
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await api.get('/regions');
        const data = res.data.filter((r) => r.country_id === countryId);
        setRegions(data);
      } catch (error) {
        console.error('Failed to load regions', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, [countryId]);

  const handleRowPress = (region) => {
    navigation.navigate('Resorts', { regionId: region.id, regionName: region.name });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Регион</DataTable.Title>
          </DataTable.Header>
          {regions.map((region) => (
            <DataTable.Row key={region.id} onPress={() => handleRowPress(region)}>
              <DataTable.Cell>{region.name}</DataTable.Cell>
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