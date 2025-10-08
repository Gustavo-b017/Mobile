import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';

const App = () => {
  const [valor, setValor] = useState('0');
  const [operacao, setOperacao] = useState<string | null>(null);
  const [numeroAntigo, setNumeroAntigo] = useState<string | null>(null);
  const [expressao, setExpressao] = useState<string>(''); // Para exibir a expressão

  const adicionarValor = (num: string) => {
    if (valor === '0') {
      setValor(num);
    } else {
      setValor(valor + num);
    }
    setExpressao(expressao + num); // Adiciona o número à expressão
  };

  const definirOperacao = (oper: string) => {
    setOperacao(oper);
    setNumeroAntigo(valor);
    setValor('0');
    setExpressao(expressao + ' ' + oper + ' '); // Adiciona a operação à expressão
  };

  const calcular = () => {
    const num1 = parseFloat(numeroAntigo ?? '0');
    const num2 = parseFloat(valor);

    if (isNaN(num1) || isNaN(num2)) {
      Alert.alert('Erro', 'Por favor, insira números válidos.');
      return;
    }

    let resultado = 0;
    switch (operacao) {
      case '+':
        resultado = num1 + num2;
        break;
      case '-':
        resultado = num1 - num2;
        break;
      case 'X':
        resultado = num1 * num2;
        break;
      case '%':
        resultado = (num1 * num2) / 100;
        break;
      case '/': // Divisão
        if (num2 === 0) {
          Alert.alert('Erro', 'Divisão por zero não permitida.');
          return;
        }
        resultado = num1 / num2;
        break;
      default:
        return;
    }

    setValor(resultado.toString());
    setExpressao(expressao + ' = ' + resultado); // Exibe o resultado na expressão
    setNumeroAntigo(null);
    setOperacao(null);
  };

  const limpar = () => {
    setValor('0');
    setNumeroAntigo(null);
    setOperacao(null);
    setExpressao(''); // Limpa a expressão
  }; // 🚨 FUNÇÃO ALTERADA AQUI 🚨

  const alternarSinal = () => {
    setValor(prevValor => {
      let novoValor;
      if (prevValor.startsWith('-')) {
        novoValor = prevValor.slice(1); // Remove o sinal negativo
      } else {
        novoValor = '-' + prevValor; // Adiciona o sinal negativo
      }

      // Atualiza a expressão removendo o valor anterior e adicionando o novoValor.
      setExpressao(prevExpressao => {
        const index = prevExpressao.lastIndexOf(prevValor);

        // Se o valor anterior for encontrado no final da expressão, substitui.
        if (index !== -1 && index + prevValor.length === prevExpressao.length) {
          return prevExpressao.substring(0, index) + novoValor;
        }

        // Caso seja o primeiro número (e a expressão é igual ao valor), substitui a expressão.
        if (prevExpressao === prevValor) {
          return novoValor;
        }

        // Se nenhuma das condições acima for atendida, retorna a expressão anterior.
        return prevExpressao;
      });

      return novoValor;
    });
  };
  // 🚨 FIM DA FUNÇÃO ALTERADA 🚨

  const apagarUltimoNumero = () => {
    if (valor.length === 1) {
      setValor('0');
    } else {
      setValor(valor.slice(0, -1)); // Apaga o último número
    }
    setExpressao(expressao.slice(0, -1)); // Apaga o último caractere da expressão
  };

  return (
    <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />     {' '}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
               {' '}
        <View style={styles.container}>
                    <Text style={styles.expressao}>{expressao}</Text>{' '}
          {/* Exibe a expressão */}         {' '}
          <Text style={styles.resultado}>{valor}</Text>{' '}
          {/* Exibe o resultado abaixo da expressão */}         {' '}
          <View style={styles.botoesContainer}>
                       {' '}
            <View style={styles.row}>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={apagarUltimoNumero}
              >
                                <Text style={styles.textoBotao}>⌫</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity style={styles.botaoLimpar} onPress={limpar}>
                                <Text style={styles.textoBotao}>AC</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => definirOperacao('%')}
              >
                                <Text style={styles.textoBotao}>%</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => definirOperacao('/')}
              >
                                <Text style={styles.textoBotao}>÷</Text>       
                     {' '}
              </TouchableOpacity>
                         {' '}
            </View>
                       {' '}
            <View style={styles.row}>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('1')}
              >
                                <Text style={styles.textoBotao}>1</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('2')}
              >
                                <Text style={styles.textoBotao}>2</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('3')}
              >
                                <Text style={styles.textoBotao}>3</Text>       
                     {' '}
              </TouchableOpacity>
                                         {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => definirOperacao('X')}
              >
                                <Text style={styles.textoBotao}>×</Text>       
                     {' '}
              </TouchableOpacity>
                         {' '}
            </View>
                       {' '}
            <View style={styles.row}>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('4')}
              >
                                <Text style={styles.textoBotao}>4</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('5')}
              >
                                <Text style={styles.textoBotao}>5</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('6')}
              >
                                <Text style={styles.textoBotao}>6</Text>       
                     {' '}
              </TouchableOpacity>
                                         {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => definirOperacao('-')}
              >
                                <Text style={styles.textoBotao}>−</Text>       
                     {' '}
              </TouchableOpacity>
                         {' '}
            </View>
                       {' '}
            <View style={styles.row}>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('7')}
              >
                                <Text style={styles.textoBotao}>7</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('8')}
              >
                                <Text style={styles.textoBotao}>8</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('9')}
              >
                                <Text style={styles.textoBotao}>9</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => definirOperacao('+')}
              >
                                <Text style={styles.textoBotao}>+</Text>       
                     {' '}
              </TouchableOpacity>
                         {' '}
            </View>
                       {' '}
            <View style={styles.row}>
                           {' '}
              <TouchableOpacity style={styles.botao} onPress={alternarSinal}>
                                <Text style={styles.textoBotao}>±</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('0')}
              >
                                <Text style={styles.textoBotao}>0</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => adicionarValor('.')}
              >
                                <Text style={styles.textoBotao}>.</Text>       
                     {' '}
              </TouchableOpacity>
                           {' '}
              <TouchableOpacity style={styles.botao} onPress={calcular}>
                                <Text style={styles.textoBotao}>=</Text>       
                     {' '}
              </TouchableOpacity>
                         {' '}
            </View>
                     {' '}
          </View>
                 {' '}
        </View>
             {' '}
      </ScrollView>
         {' '}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  expressao: {
    fontSize: 24,
    color: '#888',
    textAlign: 'right',
    marginBottom: 10,
  },
  resultado: {
    fontSize: 60,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
    marginBottom: 30,
  },
  botoesContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  botao: {
    width: '22%',
    height: 70,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  botaoLimpar: {
    backgroundColor: '#FF4B4B',
    width: '22%',
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default App;
