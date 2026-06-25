import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfessorHome() {
  const router = useRouter();

  async function handleLogout() {
    Alert.alert("Sair", "Deseja realmente sair da conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("tipo");
          router.replace("/setup/login");
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>♙</Text>
          </View>

          <View style={styles.headerTextBox}>
            <Text style={styles.appTitle}>FitPro Professor</Text>
            <Text style={styles.appSubtitle}>Área do treinador</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.titleBox}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Gerencie treinos e exercícios</Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>☰</Text>
            </View>
            <Text style={styles.cardLabel}>Fichas</Text>
            <Text style={styles.cardValue}>0</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>＋</Text>
            </View>
            <Text style={styles.cardLabel}>Exercícios</Text>
            <Text style={styles.cardValue}>0</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>♙</Text>
            </View>
            <Text style={styles.cardLabel}>Alunos</Text>
            <Text style={styles.cardValue}>0</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>✓</Text>
            </View>
            <Text style={styles.cardLabel}>Ativos</Text>
            <Text style={styles.cardValue}>0</Text>
          </View>
        </View>

        <View style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Ações rápidas</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/professor/exercicios/create-exercise")}
          >
            <Text style={styles.actionIcon}>＋</Text>
            <Text style={styles.actionText}>Criar Exercício</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtonSecondary}
            onPress={() => router.push("/professor/exercicios")}
          >
            <Text style={styles.actionIconSecondary}>☰</Text>
            <Text style={styles.actionTextSecondary}>Listar Exercícios</Text>
          </TouchableOpacity>

            <TouchableOpacity
                style={styles.actionButtonSecondary}
                onPress={() => router.push("/professor/grupos/create-group")}
            >
                <Text style={styles.actionIconSecondary}>🏋️</Text>
                <Text style={styles.actionTextSecondary}>
                Criar Grupo de Treino
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.actionButtonSecondary}
                onPress={() => router.push("/professor/grupos")}
                >
                <Text style={styles.actionIconSecondary}>☰</Text>
                <Text style={styles.actionTextSecondary}>Listar Grupos de Treino</Text>
            </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtonSecondary}
            onPress={() => router.push("/professor/create-ficha")}
          >
            <Text style={styles.actionIconSecondary}>＋</Text>
            <Text style={styles.actionTextSecondary}>Criar Ficha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButtonSecondary}
            onPress={() => router.push("/professor/fichas")}
          >
            <Text style={styles.actionIconSecondary}>☷</Text>
            <Text style={styles.actionTextSecondary}>Listar Fichas</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 20,
  },
  logoBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  headerTextBox: {
    flex: 1,
  },
  appTitle: {
    fontSize: 18,
    color: "#1F2937",
    fontWeight: "700",
  },
  appSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: "#00C853",
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  titleBox: {
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    color: "#1F2937",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E9FFF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  icon: {
    color: "#00C853",
    fontSize: 20,
    fontWeight: "700",
  },
  cardLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 26,
    color: "#1F2937",
    fontWeight: "700",
  },
  actionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "700",
    marginBottom: 14,
  },
  actionButton: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#00C853",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  actionIcon: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  actionButtonSecondary: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  actionIconSecondary: {
    color: "#00C853",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  actionTextSecondary: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
  },
});