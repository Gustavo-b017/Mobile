import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Título Rosa */}
      <Text style={styles.title}>Minha Tela Inicial</Text>

      {/* Seção de Subtítulo com Tópicos */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Tópicos Importantes</Text>
        {/* Itens */}
        <Text style={styles.item}>• Item 1</Text>
        <Text style={styles.item}>• Item 2</Text>
        <Text style={styles.item}>• Item 3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20, // Adicionando um padding para não colar nas bordas
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF69B4', // Cor rosa vibrante
  },
  section: {
    marginTop: 20, // Espaço entre o título e a nova seção
    width: '100%', // Para ocupar toda a largura e alinhar à esquerda
    alignItems: 'flex-start', // Alinha o conteúdo da seção à esquerda
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});