import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar
} from 'react-native';
// A importação está correta conforme a documentação
import { Picker } from '@react-native-picker/picker';

// Componente principal da Calculadora
const App = () => {
  // --- Estados para gerenciar os dados da calculadora ---
  const [primeiroValor, setPrimeiroValor] = useState('');
  const [segundoValor, setSegundoValor] = useState('');
  const [operacao, setOperacao] = useState('soma');
  const [resultado, setResultado] = useState('');

  const limparCampos = () => {
    setPrimeiroValor('');
    setSegundoValor('');
    setOperacao('soma');
    setResultado('');
  };

  const calcular = () => {
    const num1 = parseFloat(primeiroValor.replace(',', '.'));
    const num2 = parseFloat(segundoValor.replace(',', '.'));

    if (isNaN(num1) || isNaN(num2)) {
      Alert.alert("Erro de Entrada", "Por favor, insira números válidos em ambos os campos.");
      return;
    }

    let calculoFinal = 0;

    switch (operacao) {
      case 'soma':
        calculoFinal = num1 + num2;
        break;
      case 'subtracao':
        calculoFinal = num1 - num2;
        break;
      case 'multiplicacao':
        calculoFinal = num1 * num2;
        break;
      case 'divisao':
        if (num2 === 0) {
          Alert.alert("Erro Matemático", "Divisão por zero não é permitida.");
          return;
        }
        calculoFinal = num1 / num2;
        break;
      default:
        return;
    }

    setResultado(`Resultado: ${calculoFinal.toFixed(2).replace('.', ',')}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.safeArea.backgroundColor} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Calculadora Profissional RN</Text>
          <Text style={styles.subtitulo}>Insira os valores e selecione a operação</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o primeiro valor"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={primeiroValor}
            onChangeText={setPrimeiroValor}
          />
           
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={operacao}
              onValueChange={(itemValue: string) => setOperacao(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Adição (+)" value="soma" />
              <Picker.Item label="Subtração (-)" value="subtracao" />
              <Picker.Item label="Multiplicação (×)" value="multiplicacao" />
              <Picker.Item label="Divisão (÷)" value="divisao" />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Digite o segundo valor"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={segundoValor}
            onChangeText={setSegundoValor}
          />

          <TouchableOpacity style={styles.botaoCalcular} onPress={calcular} activeOpacity={0.7}>
            <Text style={styles.textoBotao}>Calcular</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos} activeOpacity={0.7}>
            <Text style={styles.textoBotao}>Limpar</Text>
          </TouchableOpacity>

          {resultado ? (
            <View style={styles.containerResultado}>
              <Text style={styles.textoResultado}>{resultado}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ... O objeto 'styles' permanece o mesmo
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  botaoCalcular: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoLimpar: {
    width: '100%',
    padding: 15,
    backgroundColor: '#6C757D',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerResultado: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#E1F5FE',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  textoResultado: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#01579B',
  },
});

export default App;