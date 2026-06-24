import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import api from "../../src/services/api";

export default function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  async function buscarUsuarios() {
    try {
      const { data } = await api.get("/usuarios");
      setUsuarios(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator color="#00C853" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>👥</Text>
        </View>

        <Text style={styles.title}>Usuários</Text>
        <Text style={styles.subtitle}>Lista de usuários cadastrados</Text>
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 25 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.nome?.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>

              <Text style={styles.email}>{item.email}</Text>

              <View
                style={[
                  styles.badge,
                  item.tipo === "ADMIN"
                    ? styles.admin
                    : item.tipo === "PROFESSOR"
                    ? styles.professor
                    : styles.aluno,
                ]}
              >
                <Text style={styles.badgeText}>{item.tipo}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5F6F8",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },

  logo: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#00C853",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  logoText: {
    fontSize: 26,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2937",
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 5,
    fontSize: 13,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#00C853",
  },

  nome: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
  },

  email: {
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 10,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  admin: {
    backgroundColor: "#D1FAE5",
  },

  professor: {
    backgroundColor: "#DBEAFE",
  },

  aluno: {
    backgroundColor: "#FEF3C7",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1F2937",
  },
});