import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
export default function App() {
// Declara uma variável de estado chamada "valor1"
// e uma função "setValor1" para alterá-la
const [valor1, setValor1] = useState(0);
return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Text>Você clicou {valor1} vezes</Text>
<Button title="Clique aqui" onPress={() => setValor1(valor1 + 1)} />
</View>
);
}