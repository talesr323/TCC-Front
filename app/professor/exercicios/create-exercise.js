import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
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

export default function CreateExercise() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    grupo_muscular: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  }

  async function criarExercicio() {
    if (loading) return;

    if (!form.nome.trim()) {
      Alert.alert("Erro", "Informe o nome do exercício.");
      return;
    }

    if (!form.grupo_muscular.trim()) {
      Alert.alert("Erro", "Informe o grupo muscular.");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
        return;
      }

      const response = await fetch(`${API_URL}/exercicios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: form.nome.trim(),
          descricao: form.descricao.trim(),
          grupo_muscular: form.grupo_muscular.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Erro",
          data.error || data.message || "Erro ao cadastrar exercício."
        );
        return;
      }

      Alert.alert("Sucesso", "Exercício cadastrado com sucesso!");

      setForm({
        nome: "",
        descricao: "",
        grupo_muscular: "",
      });

      router.replace("/professor");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Criar Exercício</Text>
          <Text style={styles.subtitle}>Cadastre um novo exercício no sistema</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Supino reto"
              placeholderTextColor="#99A1AF"
              value={form.nome}
              onChangeText={(value) => handleChange("nome", value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Grupo muscular *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Peito, Costas, Pernas"
              placeholderTextColor="#99A1AF"
              value={form.grupo_muscular}
              onChangeText={(value) => handleChange("grupo_muscular", value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva como executar o exercício"
              placeholderTextColor="#99A1AF"
              value={form.descricao}
              onChangeText={(value) => handleChange("descricao", value)}
              multiline
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { opacity: loading ? 0.6 : 1 }]}
            onPress={criarExercicio}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Cadastrar Exercício</Text>
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
  header: {
    paddingTop: 22,
    paddingBottom: 18,
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
  card: {
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
  submitButton: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  submitButtonText: {
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