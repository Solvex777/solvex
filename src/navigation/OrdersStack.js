import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookingsListScreen from '../screens/Orders/BookingsListScreen';
import BookingDetailScreen from '../screens/Orders/BookingDetailScreen';
import BookingCreateScreen from '../screens/Orders/BookingCreateScreen';

const Stack = createNativeStackNavigator();

export default function OrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookingsList" component={BookingsListScreen} options={{ title: 'Заказы' }} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ title: 'Заказ' }} />
      <Stack.Screen name="BookingCreate" component={BookingCreateScreen} options={{ title: 'Новый заказ' }} />
    </Stack.Navigator>
  );
}