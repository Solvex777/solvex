import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CountriesScreen from '../screens/Catalog/CountriesScreen';
import RegionsScreen from '../screens/Catalog/RegionsScreen';
import ResortsScreen from '../screens/Catalog/ResortsScreen';
import HotelsScreen from '../screens/Catalog/HotelsScreen';
import PackagesScreen from '../screens/Catalog/PackagesScreen';

const Stack = createNativeStackNavigator();

export default function CatalogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Countries" component={CountriesScreen} options={{ title: 'Страны' }} />
      <Stack.Screen name="Regions" component={RegionsScreen} options={{ title: 'Регионы' }} />
      <Stack.Screen name="Resorts" component={ResortsScreen} options={{ title: 'Курорты' }} />
      <Stack.Screen name="Hotels" component={HotelsScreen} options={{ title: 'Отели' }} />
      <Stack.Screen name="Packages" component={PackagesScreen} options={{ title: 'Пакеты' }} />
    </Stack.Navigator>
  );
}