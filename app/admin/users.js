import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import api from "../src/services/api";

export default function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  async function buscarUsuarios() {
    try {
      const { data } = await api.get("/usuarios");

      console.log("USUARIOS:", data);

      setUsuarios(data);
    } catch (error) {
      console.log("ERRO:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.email}</Text>
            <Text>{item.tipo}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  nome: {
    fontWeight: "bold",
    fontSize: 16,
  },
});