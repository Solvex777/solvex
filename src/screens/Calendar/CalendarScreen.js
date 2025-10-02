import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { FAB, Snackbar, Text, useTheme } from 'react-native-paper';
import api from '../../api';
import { format, startOfMonth, endOfMonth, addMonths } from 'date-fns';

/**
 * Calendar screen for administrator events.
 *
 * This screen fetches calendar events from the backend and displays them
 * in an agenda view.  The user can scroll through months and see
 * events grouped by date.  A floating action button opens a stub for
 * event creation (to be implemented later).
 */
export default function CalendarScreen() {
  const [items, setItems] = useState({});
  const [error, setError] = useState(null);
  const theme = useTheme();

  /**
   * Load events from the server for the specified date range.  The
   * Agenda component will request items for a range of days; we
   * proactively fetch a full month at a time.
   */
  const loadEvents = useCallback(async (fromDate, toDate) => {
    try {
      const params = {
        date_from: fromDate.toISOString(),
        date_to: toDate.toISOString(),
      };
      const res = await api.get('/v1/calendar/events', { params });
      const grouped = {};
      res.data.forEach((evt) => {
        const day = evt.start_ts.substring(0, 10);
        if (!grouped[day]) grouped[day] = [];
        grouped[day].push({ name: evt.title, evt });
      });
      setItems(grouped);
    } catch (e) {
      console.error('Failed to load calendar events', e);
      setError('Не удалось загрузить события');
    }
  }, []);

  // On mount, load current month events
  useEffect(() => {
    const now = new Date();
    const from = startOfMonth(now);
    const to = endOfMonth(addMonths(now, 1));
    loadEvents(from, to);
  }, [loadEvents]);

  const renderItem = (item) => {
    return (
      <View style={[styles.item, { backgroundColor: theme.colors.surfaceVariant }]}> 
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={format(new Date(), 'yyyy-MM-dd')}
        renderItem={renderItem}
        renderEmptyDate={() => <View style={styles.empty} />}
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
        pastScrollRange={12}
        futureScrollRange={12}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // TODO: navigate to event creation screen
          setError('Создание событий пока не реализовано');
        }}
      />
      <Snackbar
        visible={!!error}
        onDismiss={() => setError(null)}
        duration={3000}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 12,
    marginRight: 12,
    marginTop: 12,
    borderRadius: 8,
  },
  empty: {
    height: 24,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});