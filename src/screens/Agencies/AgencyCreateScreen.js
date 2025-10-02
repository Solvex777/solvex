import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, HelperText, Card } from 'react-native-paper';
import api from '../../api';

export default function AgencyCreateScreen({ navigation }) {
  const [name, setName] = useState('');
  const [inn, setInn] = useState('');
  const [kpp, setKpp] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/agencies', {
        name,
        inn: inn || null,
        kpp: kpp || null,
        email: email || null,
        phone: phone || null,
        city: city || null,
        credit_limit: creditLimit ? parseFloat(creditLimit) : 0,
        balance: balance ? parseFloat(balance) : 0,
        is_active: true,
      });
      navigation.goBack();
    } catch (err) {
      console.error(err);
      setError('Ошибка при создании агентства');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Title title="Новое агентство" />
        <Card.Content>
          <TextInput label="Название" value={name} onChangeText={setName} style={styles.input} />
          <TextInput label="ИНН" value={inn} onChangeText={setInn} style={styles.input} />
          <TextInput label="КПП" value={kpp} onChangeText={setKpp} style={styles.input} />
          <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
          <TextInput label="Телефон" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
          <TextInput label="Город" value={city} onChangeText={setCity} style={styles.input} />
          <TextInput label="Кредитный лимит" value={creditLimit} onChangeText={setCreditLimit} style={styles.input} keyboardType="decimal-pad" />
          <TextInput label="Баланс" value={balance} onChangeText={setBalance} style={styles.input} keyboardType="decimal-pad" />
          {error && <HelperText type="error">{error}</HelperText>}
          <Button mode="contained" onPress={onSubmit} loading={loading}>Создать</Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
});