import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AgenciesListScreen from '../screens/Agencies/AgenciesListScreen';
import AgencyDetailScreen from '../screens/Agencies/AgencyDetailScreen';
import AgencyCreateScreen from '../screens/Agencies/AgencyCreateScreen';

const Stack = createNativeStackNavigator();

export default function AgenciesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AgenciesList" component={AgenciesListScreen} options={{ title: 'Агентства' }} />
      <Stack.Screen name="AgencyDetail" component={AgencyDetailScreen} options={{ title: 'Агентство' }} />
      <Stack.Screen name="AgencyCreate" component={AgencyCreateScreen} options={{ title: 'Новое агентство' }} />
    </Stack.Navigator>
  );
}