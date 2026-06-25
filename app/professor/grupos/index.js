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

export default function GruposTreino() {
  const [grupos, setGrupos] = useState([]);
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarGrupos();
  }, []);

  async function buscarGrupos(nomeFiltro = nome, nivelFiltro = nivel) {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
        return;
      }

      let url = "";

      if (nomeFiltro.trim()) {
        url = `${API_URL}/grupos-treino?nome=${encodeURIComponent(nomeFiltro.trim())}`;
      } else if (nivelFiltro.trim()) {
        url = `${API_URL}/grupos-treino/nivel?nivel=${encodeURIComponent(
          nivelFiltro.trim()
        )}`;
      } else {
        url = `${API_URL}/grupos-treino/nivel`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || data.message || "Erro ao buscar grupos.");
        return;
      }

      setGrupos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  function limparFiltros() {
    setNome("");
    setNivel("");
    buscarGrupos("", "");
  }

  function selecionarNivel(valor) {
    setNivel(valor);
  }

  function editarGrupo(grupo) {
    router.push({
      pathname: "/professor/grupos/edit-group",
      params: {
        id: String(grupo.id),
        nome: grupo.nome || "",
        descricao: grupo.descricao || "",
        nivel: grupo.nivel || "",
      },
    });
  }

  async function excluirGrupo(id) {
    Alert.alert("Excluir grupo", "Deseja realmente excluir este grupo de treino?", [
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

            const response = await fetch(`${API_URL}/grupos-treino/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await response.json();

            if (!response.ok) {
              Alert.alert("Erro", data.error || data.message || "Erro ao excluir grupo.");
              return;
            }

            Alert.alert("Sucesso", "Grupo de treino excluído com sucesso.");
            buscarGrupos();
          } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível excluir o grupo.");
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
        <Text style={styles.title}>Grupos de Treino</Text>
        <Text style={styles.subtitle}>Pesquise por nome ou nível</Text>

        <View style={styles.filterCard}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar por nome"
            placeholderTextColor="#99A1AF"
            value={nome}
            onChangeText={setNome}
          />

          <View style={styles.nivelBox}>
            <TouchableOpacity
              style={[styles.nivelButton, nivel === "" && styles.nivelButtonActive]}
              onPress={() => selecionarNivel("")}
            >
              <Text style={[styles.nivelText, nivel === "" && styles.nivelTextActive]}>
                Todos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nivelButton,
                nivel === "INICIANTE" && styles.nivelButtonActive,
              ]}
              onPress={() => selecionarNivel("INICIANTE")}
            >
              <Text
                style={[
                  styles.nivelText,
                  nivel === "INICIANTE" && styles.nivelTextActive,
                ]}
              >
                Iniciante
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nivelButton,
                nivel === "INTERMEDIARIO" && styles.nivelButtonActive,
              ]}
              onPress={() => selecionarNivel("INTERMEDIARIO")}
            >
              <Text
                style={[
                  styles.nivelText,
                  nivel === "INTERMEDIARIO" && styles.nivelTextActive,
                ]}
              >
                Inter.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nivelButton,
                nivel === "AVANCADO" && styles.nivelButtonActive,
              ]}
              onPress={() => selecionarNivel("AVANCADO")}
            >
              <Text
                style={[
                  styles.nivelText,
                  nivel === "AVANCADO" && styles.nivelTextActive,
                ]}
              >
                Avanç.
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={() => buscarGrupos()}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={limparFiltros}>
            <Text style={styles.clearButtonText}>Limpar filtros</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push("/professor/grupos/create-group")}
          >
            <Text style={styles.createButtonText}>Criar novo grupo</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#00C853" style={{ marginTop: 30 }} />
        ) : (
          <View style={styles.list}>
            {grupos.length === 0 ? (
              <Text style={styles.emptyText}>Nenhum grupo encontrado.</Text>
            ) : (
              grupos.map((grupo) => (
                <View key={String(grupo.id)} style={styles.groupCard}>
                  <View style={styles.groupInfo}>
                    <Text style={styles.groupName}>{grupo.nome}</Text>

                    <Text style={styles.groupLevel}>
                      {grupo.nivel || "Sem nível"}
                    </Text>

                    <Text style={styles.groupDescription}>
                      {grupo.descricao || "Sem descrição"}
                    </Text>
                  </View>

                  <View style={styles.buttonBox}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => editarGrupo(grupo)}
                    >
                      <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => excluirGrupo(grupo.id)}
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
  nivelBox: {
    flexDirection: "row",
    marginBottom: 12,
  },
  nivelButton: {
    flex: 1,
    height: 40,
    borderRadius: 9,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  nivelButtonActive: {
    backgroundColor: "#00C853",
    borderColor: "#00C853",
  },
  nivelText: {
    color: "#374151",
    fontSize: 10,
    fontWeight: "700",
  },
  nivelTextActive: {
    color: "#FFFFFF",
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
  groupCard: {
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
  groupInfo: {
    flex: 1,
    marginRight: 10,
  },
  groupName: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "700",
  },
  groupLevel: {
    fontSize: 12,
    color: "#00C853",
    fontWeight: "700",
    marginTop: 4,
  },
  groupDescription: {
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