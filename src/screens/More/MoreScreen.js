import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';

export default function MoreScreen() {
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Справочники</List.Subheader>
        <List.Item title="Типы питания" left={(props) => <List.Icon {...props} icon="food" />} onPress={() => { /* Navigate to meal plans */ }} />
        <List.Item title="Типы номеров" left={(props) => <List.Icon {...props} icon="bed-double" />} onPress={() => { /* Navigate to room types */ }} />
        <List.Item title="Вылеты" left={(props) => <List.Icon {...props} icon="airplane" />} onPress={() => { /* Navigate to departures */ }} />
        <List.Item title="Локации (страны, регионы, курорты)" left={(props) => <List.Icon {...props} icon="map" />} onPress={() => { /* Already accessible in catalog */ }} />
        <Divider />
        <List.Subheader>Профиль</List.Subheader>
        <List.Item title="Выйти" left={(props) => <List.Icon {...props} icon="logout" />} onPress={logout} />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});