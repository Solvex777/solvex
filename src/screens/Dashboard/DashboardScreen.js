import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, ActivityIndicator, List } from 'react-native-paper';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory-native';
import api from '../../api';

export default function DashboardScreen() {
  const [kpi, setKpi] = useState(null);
  const [widgets, setWidgets] = useState(null);
  const [bookingSeries, setBookingSeries] = useState(null);
  const [revenueSeries, setRevenueSeries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiRes, widgetsRes] = await Promise.all([
          api.get('/dashboard/kpi'),
          api.get('/dashboard/widgets'),
        ]);
        setKpi(kpiRes.data);
        setWidgets(widgetsRes.data);
        // Fetch chart series
        const [bookingsRes, revenueRes] = await Promise.all([
          api.get('/v1/charts/bookings/series'),
          api.get('/v1/charts/revenue/series'),
        ]);
        setBookingSeries(bookingsRes.data.series);
        setRevenueSeries(revenueRes.data.series);
      } catch (error) {
        console.error('Error loading dashboard', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {kpi && (
        <Card style={styles.card}>
          <Card.Title title="Основные показатели" />
          <Card.Content>
            <Text>Всего заказов: {kpi.total_bookings}</Text>
            <Text>Выручка: {kpi.revenue.toFixed(2)} ₽</Text>
            <Text>Маржа: {kpi.margin.toFixed(2)} ₽</Text>
            <Text>Конверсия: {(kpi.conversion * 100).toFixed(2)}%</Text>
          </Card.Content>
        </Card>
      )}
      {bookingSeries && bookingSeries.length > 0 && (
        <Card style={styles.card}>
          <Card.Title title="Динамика заявок (180 дней)" />
          <Card.Content>
            <VictoryChart theme={VictoryTheme.material} height={220}>
              <VictoryAxis fixLabelOverlap />
              <VictoryAxis dependentAxis />
              <VictoryLine
                data={bookingSeries}
                x="x"
                y="y"
                labels={({ datum }) => `${datum.y}`}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryChart>
          </Card.Content>
        </Card>
      )}
      {revenueSeries && revenueSeries.length > 0 && (
        <Card style={styles.card}>
          <Card.Title title="Динамика выручки (180 дней)" />
          <Card.Content>
            <VictoryChart theme={VictoryTheme.material} height={220}>
              <VictoryAxis fixLabelOverlap />
              <VictoryAxis dependentAxis />
              <VictoryLine
                data={revenueSeries}
                x="x"
                y="y"
                labels={({ datum }) => `${datum.y.toFixed ? datum.y.toFixed(0) : datum.y}`}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryChart>
          </Card.Content>
        </Card>
      )}
      {widgets && (
        <Card style={styles.card}>
          <Card.Title title="Задачи" />
          <Card.Content>
            <List.Section>
              <List.Subheader>Сегодня</List.Subheader>
              {widgets.today_bookings && widgets.today_bookings.length > 0 ? (
                widgets.today_bookings.map((bid) => <List.Item key={bid} title={`Заказ #${bid}`} />)
              ) : (
                <Text>Нет новых заказов</Text>
              )}
              <List.Subheader>Ожидают оплату</List.Subheader>
              {widgets.pending_payments && widgets.pending_payments.length > 0 ? (
                widgets.pending_payments.map((bid) => <List.Item key={bid} title={`Заказ #${bid}`} />)
              ) : (
                <Text>Нет ожидающих оплат</Text>
              )}
            </List.Section>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});