import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DashboardStack from './DashboardStack';
import CatalogStack from './CatalogStack';
import OrdersStack from './OrdersStack';
import AgenciesStack from './AgenciesStack';
import MoreStack from './MoreStack';
import CalendarStack from './CalendarStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="DashboardTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0066cc',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'DashboardTab':
              iconName = 'view-dashboard';
              break;
            case 'CatalogTab':
              iconName = 'book-open-variant';
              break;
            case 'OrdersTab':
              iconName = 'clipboard-list';
              break;
            case 'AgenciesTab':
              iconName = 'account-multiple';
              break;
            case 'CalendarTab':
              iconName = 'calendar-month';
              break;
            case 'MoreTab':
              iconName = 'dots-horizontal';
              break;
            default:
              iconName = 'square';
          }
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="DashboardTab" component={DashboardStack} options={{ title: 'Дашборд' }} />
      <Tab.Screen name="CatalogTab" component={CatalogStack} options={{ title: 'Каталог' }} />
      <Tab.Screen name="OrdersTab" component={OrdersStack} options={{ title: 'Заказы' }} />
      <Tab.Screen name="AgenciesTab" component={AgenciesStack} options={{ title: 'Агентства' }} />
      <Tab.Screen name="CalendarTab" component={CalendarStack} options={{ title: 'Календарь' }} />
      <Tab.Screen name="MoreTab" component={MoreStack} options={{ title: 'Ещё' }} />
    </Tab.Navigator>
  );
}