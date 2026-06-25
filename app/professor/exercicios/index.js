import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://192.168.0.10:3001";

export default function Exercicios() {
  const [exercicios, setExercicios] = useState([]);
  const [nome, setNome] = useState("");
  const [grupoMuscular, setGrupoMuscular] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarExercicios();
  }, []);

  async function buscarExercicios(nomeFiltro = nome, grupoFiltro = grupoMuscular) {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
        return;
      }

      let url = "";

      if (nomeFiltro.trim()) {
        url = `${API_URL}/exercicios?nome=${encodeURIComponent(nomeFiltro.trim())}`;
      } else if (grupoFiltro.trim()) {
        url = `${API_URL}/exercicios/grupo-muscular?grupo_muscular=${encodeURIComponent(
          grupoFiltro.trim()
        )}`;
      } else {
        url = `${API_URL}/exercicios/grupo-muscular`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || data.message || "Erro ao buscar exercícios.");
        return;
      }

      setExercicios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  function limparFiltros() {
    setNome("");
    setGrupoMuscular("");
    buscarExercicios("", "");
  }

  function editarExercicio(exercicio) {
    router.push({
      pathname: "/professor/exercicios/edit-exercise",
      params: {
        id: String(exercicio.id),
        nome: exercicio.nome || "",
        descricao: exercicio.descricao || "",
        grupo_muscular: exercicio.grupo_muscular || "",
      },
    });
  }

  async function excluirExercicio(id) {
    Alert.alert("Excluir exercício", "Deseja realmente excluir este exercício?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);

            const token = await AsyncStorage.getItem("token");

            if (!token) {
              Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
              return;
            }

            const response = await fetch(`${API_URL}/exercicios/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await response.json();

            if (!response.ok) {
              Alert.alert("Erro", data.error || data.message || "Erro ao excluir exercício.");
              return;
            }

            Alert.alert("Sucesso", "Exercício excluído com sucesso.");
            buscarExercicios();
          } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível excluir o exercício.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Exercícios</Text>
        <Text style={styles.subtitle}>Pesquise por nome ou grupo muscular</Text>

        <View style={styles.filterCard}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar por nome"
            placeholderTextColor="#99A1AF"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Filtrar por grupo muscular"
            placeholderTextColor="#99A1AF"
            value={grupoMuscular}
            onChangeText={setGrupoMuscular}
          />

          <TouchableOpacity style={styles.searchButton} onPress={() => buscarExercicios()}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={limparFiltros}>
            <Text style={styles.clearButtonText}>Limpar filtros</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push("/professor/exercicios/create-exercise")}
          >
            <Text style={styles.createButtonText}>Criar novo exercício</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#00C853" style={{ marginTop: 30 }} />
        ) : (
          <View style={styles.list}>
            {exercicios.length === 0 ? (
              <Text style={styles.emptyText}>Nenhum exercício encontrado.</Text>
            ) : (
              exercicios.map((exercicio) => (
                <View key={String(exercicio.id)} style={styles.exerciseCard}>
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{exercicio.nome}</Text>
                    <Text style={styles.exerciseGroup}>
                      {exercicio.grupo_muscular}
                    </Text>
                    <Text style={styles.exerciseDescription}>
                      {exercicio.descricao || "Sem descrição"}
                    </Text>
                  </View>

                  <View style={styles.buttonBox}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => editarExercicio(exercicio)}
                    >
                      <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => excluirExercicio(exercicio.id)}
                    >
                      <Text style={styles.deleteButtonText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
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
  title: {
    fontSize: 26,
    color: "#1F2937",
    fontWeight: "700",
    marginTop: 18,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 18,
  },
  filterCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  input: {
    height: 46,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 12,
    color: "#111827",
  },
  searchButton: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  clearButton: {
    height: 42,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  clearButtonText: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 13,
  },
  createButton: {
    height: 42,
    borderRadius: 10,
    backgroundColor: "#E9FFF5",
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    color: "#00C853",
    fontWeight: "700",
    fontSize: 13,
  },
  list: {
    marginBottom: 30,
  },
  exerciseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  exerciseInfo: {
    flex: 1,
    marginRight: 10,
  },
  exerciseName: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "700",
  },
  exerciseGroup: {
    fontSize: 12,
    color: "#00C853",
    fontWeight: "700",
    marginTop: 4,
  },
  exerciseDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
    lineHeight: 18,
  },
  buttonBox: {
    gap: 8,
  },
  editButton: {
    backgroundColor: "#00C853",
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 30,
    fontSize: 14,
  },
});