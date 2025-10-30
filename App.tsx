import 'react-native-gesture-handler';
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';

/**
 * Tema base (cores, radius e sombras)
 */
const theme = {
  colors: {
    bg: '#F3F6F9',
    card: '#FFFFFF',
    text: '#222222',
    textMuted: '#6B7280',
    textSoft: '#444444',
    border: '#E5E7EB',
    primary: '#2563EB',
    primaryText: '#FFFFFF',
    secondary: '#6B7280',
    danger: '#EF4444',
    success: '#1F7A1F',
    fieldBg: '#F4F5F7',
    fieldBorder: '#E5E7EB',
    ripple: 'rgba(0,0,0,0.08)',
  },
  radius: {
    card: 16,
    field: 12,
    button: 12,
  },
};

// Sombra cross-platform para cards
const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  android: {
    elevation: 4,
  },
});

/**
 * Catálogo mockado
 */
type Curso = { id: string; titulo: string; categoria: string; preco: number; banner: string };
const CURSOS: Curso[] = [
  { id: '1', titulo: 'React Native Essencial', categoria: 'Mobile',   preco: 199.9, banner: 'https://picsum.photos/seed/rn1/800/400' },
  { id: '2', titulo: 'JavaScript Avançado',   categoria: 'Web',      preco: 149.9, banner: 'https://picsum.photos/seed/js2/800/400' },
  { id: '3', titulo: 'UX para Apps',          categoria: 'Design',   preco: 129.9, banner: 'https://picsum.photos/seed/ux3/800/400' },
  { id: '4', titulo: 'APIs com Node',         categoria: 'Back-end', preco: 179.9, banner: 'https://picsum.photos/seed/api4/800/400' },
];

/**
 * ============================
 * Home (Stack)
 * ============================
 */
function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Bem-vindo</Text>
          <View style={styles.bannerWrap}>
            <Image
              source={{ uri: 'https://picsum.photos/seed/welcome/1200/600' }}
              style={styles.banner}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.paragraph}>
            Este protótipo demonstra uma navegação híbrida combinando Stack, Tabs e Drawer.
            Use as abas para explorar e o menu lateral para itens globais.
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => navigation.navigate('Info')}
            >
              <Text style={styles.btnText}>Ver mais (Info)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>Informações</Text>
          <Text style={styles.paragraph}>
            Padrões aplicados:{'\n'}• Stack para fluxos lineares{'\n'}• Tabs para seções de alto acesso{'\n'}• Drawer para itens globais.
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => Alert.alert('Info', 'Estratégia de navegação compreendida.')}
            >
              <Text style={styles.btnText}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * ============================
 * Catálogo (Stack)
 * ============================
 */
function CatalogoScreen({ navigation }: any) {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState<'Todas' | 'Mobile' | 'Web' | 'Design' | 'Back-end'>('Todas');

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return CURSOS.filter((c) => {
      const matchBusca = q === '' || c.titulo.toLowerCase().includes(q);
      const matchCat = categoria === 'Todas' || c.categoria === categoria;
      return matchBusca && matchCat;
    });
  }, [busca, categoria]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Catálogo de Cursos</Text>

          {/* Filtro */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Buscar por título</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: React, UX, APIs..."
              placeholderTextColor={theme.colors.textMuted}
              value={busca}
              onChangeText={setBusca}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={categoria}
                onValueChange={setCategoria}
                style={styles.picker}
                dropdownIconColor={theme.colors.textMuted}
              >
                <Picker.Item label="Todas" value="Todas" />
                <Picker.Item label="Mobile" value="Mobile" />
                <Picker.Item label="Web" value="Web" />
                <Picker.Item label="Design" value="Design" />
                <Picker.Item label="Back-end" value="Back-end" />
              </Picker>
            </View>
          </View>

          {/* Lista */}
          {filtrados.map((c) => (
            <TouchableOpacity
              key={c.id}
              activeOpacity={0.9}
              style={styles.courseCard}
              onPress={() => navigation.navigate('Detalhe', { cursoId: c.id })}
            >
              <View style={styles.courseBannerWrap}>
                <Image source={{ uri: c.banner }} style={styles.courseBanner} />
              </View>
              <View style={styles.courseBody}>
                <Text style={styles.courseTitle}>{c.titulo}</Text>
                <Text style={styles.courseMeta}>{c.categoria}</Text>
                <Text style={styles.coursePrice}>R$ {c.preco.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {filtrados.length === 0 && (
            <Text style={styles.muted}>Nenhum curso corresponde ao filtro.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetalheCursoScreen({ route, navigation }: any) {
  const curso = useMemo(
    () => CURSOS.find((c) => c.id === route.params?.cursoId),
    [route.params]
  );

  if (!curso) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.card, styles.cardCenter]}>
          <Text style={styles.title}>Curso não encontrado</Text>
          <Text style={styles.muted}>Tente retornar ao catálogo.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>{curso.titulo}</Text>
          <View style={styles.bannerWrap}>
            <Image source={{ uri: curso.banner }} style={styles.banner} />
          </View>
          <Text style={styles.paragraph}>
            Categoria: <Text style={styles.bold}>{curso.categoria}</Text>{'\n'}
            Investimento: <Text style={styles.bold}>R$ {curso.preco.toFixed(2)}</Text>
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => navigation.navigate('Checkout', { cursoId: curso.id })}
            >
              <Text style={styles.btnText}>Ir para Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CheckoutScreen({ route, navigation }: any) {
  const curso = useMemo(
    () => CURSOS.find((c) => c.id === route.params?.cursoId),
    [route.params]
  );
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pagamento, setPagamento] = useState<'credito' | 'debito' | 'pix' | 'boleto'>('credito');

  const confirmar = () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Validação', 'Por favor, preencha nome e e-mail.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Validação', 'Informe um e-mail válido.');
      return;
    }
    Alert.alert(
      'Pedido confirmado',
      `Curso: ${curso?.titulo}\nAluno: ${nome}\nPagamento: ${pagamento.toUpperCase()}`,
      [{ text: 'OK', onPress: () => navigation.popToTop() }],
    );
  };

  if (!curso) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.card, styles.cardCenter]}>
          <Text style={styles.title}>Curso não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Checkout</Text>
          <Text style={styles.paragraph}>
            Você está adquirindo: <Text style={styles.bold}>{curso.titulo}</Text>{'\n'}
            Valor: <Text style={styles.bold}>R$ {curso.preco.toFixed(2)}</Text>
          </Text>

          {/* Formulário 1 — Checkout */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor={theme.colors.textMuted}
              value={nome}
              onChangeText={setNome}
              returnKeyType="next"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor={theme.colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              returnKeyType="done"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Forma de pagamento</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={pagamento}
                onValueChange={setPagamento}
                style={styles.picker}
                dropdownIconColor={theme.colors.textMuted}
              >
                <Picker.Item label="Cartão de crédito" value="credito" />
                <Picker.Item label="Cartão de débito" value="debito" />
                <Picker.Item label="PIX" value="pix" />
                <Picker.Item label="Boleto" value="boleto" />
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.btnPrimary]} activeOpacity={0.85} onPress={confirmar}>
              <Text style={styles.btnText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnDanger]} activeOpacity={0.85} onPress={() => navigation.goBack()}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * ============================
 * Perfil (Stack) — Formulário 2
 * ============================
 */
function PerfilScreen({ navigation }: any) {
  const [perfil] = useState({
    nome: 'Aluno(a) RN',
    email: 'aluno@exemplo.com',
    area: 'Mobile',
    nivel: 'Intermediário',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>Meu Perfil</Text>
          <Text style={styles.paragraph}>
            Nome: <Text style={styles.bold}>{perfil.nome}</Text>{'\n'}
            E-mail: <Text style={styles.bold}>{perfil.email}</Text>{'\n'}
            Área: <Text style={styles.bold}>{perfil.area}</Text>{'\n'}
            Nível: <Text style={styles.bold}>{perfil.nivel}</Text>
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => navigation.navigate('EditarPerfil')}
            >
              <Text style={styles.btnText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function EditarPerfilScreen({ navigation }: any) {
  const [nome, setNome] = useState('Aluno(a) RN');
  const [email, setEmail] = useState('aluno@exemplo.com');
  const [area, setArea] = useState<'Mobile' | 'Web' | 'Design' | 'Back-end'>('Mobile');
  const [nivel, setNivel] = useState<'Iniciante' | 'Intermediário' | 'Avançado'>('Intermediário');

  const salvar = () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Validação', 'Nome e e-mail são obrigatórios.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Validação', 'Informe um e-mail válido.');
      return;
    }
    Alert.alert('Perfil atualizado', 'Suas informações foram salvas.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Editar Perfil</Text>

          {/* Formulário 2 — Perfil */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
              placeholderTextColor={theme.colors.textMuted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="seuemail@exemplo.com"
              placeholderTextColor={theme.colors.textMuted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Área de interesse</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={area}
                onValueChange={setArea}
                style={styles.picker}
                dropdownIconColor={theme.colors.textMuted}
              >
                <Picker.Item label="Mobile" value="Mobile" />
                <Picker.Item label="Web" value="Web" />
                <Picker.Item label="Design" value="Design" />
                <Picker.Item label="Back-end" value="Back-end" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nível</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={nivel}
                onValueChange={setNivel}
                style={styles.picker}
                dropdownIconColor={theme.colors.textMuted}
              >
                <Picker.Item label="Iniciante" value="Iniciante" />
                <Picker.Item label="Intermediário" value="Intermediário" />
                <Picker.Item label="Avançado" value="Avançado" />
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.btn, styles.btnPrimary]} activeOpacity={0.85} onPress={salvar}>
              <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnSecondary]} activeOpacity={0.85} onPress={() => navigation.goBack()}>
              <Text style={styles.btnText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * ============================
 * Navegação (Stacks + Tabs + Drawer)
 * ============================
 */
const commonHeader = {
  headerStyle: { backgroundColor: theme.colors.card },
  headerTitleStyle: { color: theme.colors.text, fontSize: 18, fontWeight: '700' as const },
  headerTintColor: theme.colors.text,
};

const HomeStackNav = createNativeStackNavigator();
function HomeStack() {
  return (
    <HomeStackNav.Navigator screenOptions={commonHeader}>
      <HomeStackNav.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <HomeStackNav.Screen name="Info" component={InfoScreen} options={{ title: 'Informações' }} />
    </HomeStackNav.Navigator>
  );
}

const CatalogStackNav = createNativeStackNavigator();
function CatalogoStack() {
  return (
    <CatalogStackNav.Navigator screenOptions={commonHeader}>
      <CatalogStackNav.Screen name="Catalogo" component={CatalogoScreen} options={{ title: 'Catálogo' }} />
      <CatalogStackNav.Screen name="Detalhe" component={DetalheCursoScreen} options={{ title: 'Detalhe do Curso' }} />
      <CatalogStackNav.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
    </CatalogStackNav.Navigator>
  );
}

const PerfilStackNav = createNativeStackNavigator();
function PerfilStack() {
  return (
    <PerfilStackNav.Navigator screenOptions={commonHeader}>
      <PerfilStackNav.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Perfil' }} />
      <PerfilStackNav.Screen name="EditarPerfil" component={EditarPerfilScreen} options={{ title: 'Editar Perfil' }} />
    </PerfilStackNav.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border },
        tabBarLabelStyle: { fontWeight: '600' },
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="CatalogoTab" component={CatalogoStack} options={{ title: 'Catálogo' }} />
      <Tab.Screen name="PerfilTab" component={PerfilStack} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function RootDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.card },
        headerTitleStyle: { color: theme.colors.text, fontWeight: '700' },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Drawer.Screen name="App" component={AppTabs} options={{ title: 'Aplicativo' }} />
      <Drawer.Screen name="Configurações" component={ConfiguracoesScreen} />
      <Drawer.Screen name="Ajuda" component={AjudaScreen} />
      <Drawer.Screen name="Sobre" component={SobreScreen} />
    </Drawer.Navigator>
  );
}

/** Telas do Drawer */
function ConfiguracoesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.card, styles.cardStart]}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.paragraph}>
          Espaço destinado a preferências do usuário, tema, notificações, etc.
        </Text>
      </View>
    </SafeAreaView>
  );
}
function AjudaScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.card, styles.cardStart]}>
        <Text style={styles.title}>Ajuda</Text>
        <Text style={styles.paragraph}>
          • Use as abas para acessar Home, Catálogo e Perfil.{'\n'}
          • O menu lateral (Drawer) traz itens globais.{'\n'}
          • Em caso de dúvidas, contate o suporte acadêmico.
        </Text>
      </View>
    </SafeAreaView>
  );
}
function SobreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.card, styles.cardCenter]}>
        <Text style={styles.title}>Sobre</Text>
        <View style={styles.logoWrap}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/logo/500/200' }}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.paragraph}>
          App didático para demonstrar navegação híbrida em React Native.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.bg,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <RootDrawer />
    </NavigationContainer>
  );
}

/** Estilos */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.bg },
  scroll: { flexGrow: 1, padding: 20, paddingBottom: 28 },

  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.card,
    padding: 20,
    borderWidth: Platform.OS === 'android' ? StyleSheet.hairlineWidth : 0,
    borderColor: theme.colors.border,
    marginBottom: 16,
    ...cardShadow,
  },

  // ==== FIX ESLINT: variantes sem inline ====
  cardCenter: { alignItems: 'center' },
  cardStart: { alignItems: 'flex-start' },
  logoWrap: {
    width: '100%',
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    marginBottom: 16,
  },
  logoImage: { width: '100%', aspectRatio: 5 / 2 },

  title: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginBottom: 12 },
  paragraph: { fontSize: 16, color: theme.colors.textSoft, lineHeight: 22, marginBottom: 12 },

  bannerWrap: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EEE',
    marginBottom: 12,
  },
  banner: {
    width: '100%',
    aspectRatio: 16 / 9, // evita distorção em telas diferentes
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },

  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: { backgroundColor: theme.colors.primary },
  btnSecondary: { backgroundColor: theme.colors.secondary },
  btnDanger: { backgroundColor: theme.colors.danger },
  btnText: { color: theme.colors.primaryText, fontSize: 16, fontWeight: '700' },

  formGroup: { marginBottom: 14 },
  label: { fontSize: 14, color: theme.colors.textMuted, marginBottom: 6 },
  input: {
    backgroundColor: theme.colors.fieldBg,
    borderRadius: theme.radius.field,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.fieldBorder,
  },
  pickerBox: {
    backgroundColor: theme.colors.fieldBg,
    borderRadius: theme.radius.field,
    borderWidth: 1,
    borderColor: theme.colors.fieldBorder,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 44,
  },

  courseCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...cardShadow,
  },
  courseBannerWrap: {
    width: '100%',
    backgroundColor: '#EAEAEA',
  },
  courseBanner: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  courseBody: { padding: 12 },
  courseTitle: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  courseMeta: { fontSize: 13, color: theme.colors.textMuted, marginTop: 4 },
  coursePrice: { fontSize: 15, color: theme.colors.success, marginTop: 6, fontWeight: '700' },

  muted: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 10 },
  bold: { fontWeight: '700' },
});
