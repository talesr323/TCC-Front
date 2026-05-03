import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AdminHome() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.title}>Dashboard</Text>

      {/* Cards */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total de Alunos</Text>
          <Text style={styles.cardValue}>0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Funcionários</Text>
          <Text style={styles.cardValue}>0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ativos</Text>
          <Text style={styles.cardValue}>0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Inativos</Text>
          <Text style={styles.cardValue}>0</Text>
        </View>
      </View>

      {/* Ações */}
      <Text style={styles.subtitle}>Ações</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/admin/create-user")}
      >
        <Text style={styles.buttonText}>Criar usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/admin/users")}
      >
        <Text style={styles.buttonText}>Listar usuários</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f3f4f6",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },

  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  cardTitle: {
    color: "#6b7280",
  },

  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});