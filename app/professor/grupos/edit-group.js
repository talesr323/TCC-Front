import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
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

export default function EditGroup() {
  const params = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: params.nome || "",
    descricao: params.descricao || "",
    nivel: params.nivel || "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  }

  function selecionarNivel(nivel) {
    setForm((prev) => ({
      ...prev,
      nivel,
    }));
  }

  async function salvarAlteracoes() {
    if (loading) return;

    if (!form.nome.trim()) {
      Alert.alert("Erro", "Informe o nome do grupo de treino.");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
        return;
      }

      const response = await fetch(`${API_URL}/grupos-treino/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: form.nome.trim(),
          descricao: form.descricao.trim(),
          nivel: form.nivel.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || data.message || "Erro ao atualizar grupo.");
        return;
      }

      Alert.alert("Sucesso", "Grupo de treino atualizado com sucesso.");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Editar Grupo</Text>
        <Text style={styles.subtitle}>Atualize os dados do grupo de treino</Text>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Grupo de treino *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Hipertrofia iniciante"
              value={form.nome}
              onChangeText={(value) => handleChange("nome", value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição do grupo"
              value={form.descricao}
              onChangeText={(value) => handleChange("descricao", value)}
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nível</Text>

            <View style={styles.nivelBox}>
              <TouchableOpacity
                style={[
                  styles.nivelButton,
                  form.nivel === "INICIANTE" && styles.nivelButtonActive,
                ]}
                onPress={() => selecionarNivel("INICIANTE")}
              >
                <Text
                  style={[
                    styles.nivelText,
                    form.nivel === "INICIANTE" && styles.nivelTextActive,
                  ]}
                >
                  Iniciante
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.nivelButton,
                  form.nivel === "INTERMEDIARIO" && styles.nivelButtonActive,
                ]}
                onPress={() => selecionarNivel("INTERMEDIARIO")}
              >
                <Text
                  style={[
                    styles.nivelText,
                    form.nivel === "INTERMEDIARIO" && styles.nivelTextActive,
                  ]}
                >
                  Inter.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.nivelButton,
                  form.nivel === "AVANCADO" && styles.nivelButtonActive,
                ]}
                onPress={() => selecionarNivel("AVANCADO")}
              >
                <Text
                  style={[
                    styles.nivelText,
                    form.nivel === "AVANCADO" && styles.nivelTextActive,
                  ]}
                >
                  Avanç.
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { opacity: loading ? 0.6 : 1 }]}
            onPress={salvarAlteracoes}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>Salvar alterações</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Voltar</Text>
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    minHeight: 46,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: "#111827",
  },
  textArea: {
    minHeight: 100,
  },
  nivelBox: {
    flexDirection: "row",
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
  saveButton: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  backButton: {
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "700",
  },
});