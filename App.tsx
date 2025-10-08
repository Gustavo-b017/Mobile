import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operacao, setOperacao] = useState('+');
  const [resultado, setResultado] = useState('');

  const calcular = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      Alert.alert('Erro', 'Por favor, insira números válidos.');
      return;
    }

    let res = 0;
    switch (operacao) {
      case '+':
        res = n1 + n2;
        break;
      case '-':
        res = n1 - n2;
        break;
      case '*':
        res = n1 * n2;
        break;
      case '/':
        if (n2 === 0) {
          Alert.alert('Erro', 'Divisão por zero não é permitida.');
          return;
        }
        res = n1 / n2;
        break;
      case '%':
        res = (n1 * n2) / 100;
        break;
      default:
        return;
    }

    setResultado(res.toString());
  };

  const limpar = () => {
    setNum1('');
    setNum2('');
    setResultado('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Calculadora</Text>

          {/* Formulário 1 */}
          <View style={styles.formulario}>
            <Text style={styles.label}>Primeiro número:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o primeiro número"
              keyboardType="numeric"
              value={num1}
              onChangeText={setNum1}
            />
          </View>

          {/* Formulário 2 */}
          <View style={styles.formulario}>
            <Text style={styles.label}>Segundo número:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o segundo número"
              keyboardType="numeric"
              value={num2}
              onChangeText={setNum2}
            />
          </View>

          {/* Picker para operação */}
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Selecione a operação:</Text>
            <Picker
              selectedValue={operacao}
              style={styles.picker}
              onValueChange={(itemValue) => setOperacao(itemValue)}
            >
              <Picker.Item label="Adição (+)" value="+" />
              <Picker.Item label="Subtração (-)" value="-" />
              <Picker.Item label="Multiplicação (×)" value="*" />
              <Picker.Item label="Divisão (÷)" value="/" />
              <Picker.Item label="Porcentagem (%)" value="%" />
            </Picker>
          </View>

          {/* Botões */}
          <View style={styles.botoesContainer}>
            <TouchableOpacity style={styles.botao} onPress={calcular}>
              <Text style={styles.textoBotao}>Calcular</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.botaoLimpar]}
              onPress={limpar}
            >
              <Text style={styles.textoBotao}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {/* Resultado */}
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoLabel}>Resultado:</Text>
            <Text style={styles.resultadoValor}>
              {resultado !== '' ? resultado : '—'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// 🎨 Estilos
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f6f9',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  formulario: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
  },
  picker: {
    width: '100%',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  botao: {
    flex: 1,
    backgroundColor: '#4A90E2',
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoLimpar: {
    backgroundColor: '#E94E4E',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  resultadoLabel: {
    fontSize: 18,
    color: '#666',
  },
  resultadoValor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
