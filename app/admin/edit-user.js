import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://192.168.0.10:3001";

export default function EditUser() {
  const params = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: params.nome || "",
    email: params.email || "",
    telefone: params.telefone || "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  }

  async function salvarAlteracoes() {
    if (loading) return;

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API_URL}/usuarios/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: form.nome.trim(),
          email: form.email.trim(),
          telefone: form.telefone.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || data.message || "Erro ao atualizar usuário.");
        return;
      }

      Alert.alert("Sucesso", "Usuário atualizado com sucesso.");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Editar usuário</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={form.nome}
          onChangeText={(value) => handleChange("nome", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={form.telefone}
          onChangeText={(value) => handleChange("telefone", value)}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.saveButton} onPress={salvarAlteracoes}>
          <Text style={styles.saveButtonText}>
            {loading ? "Salvando..." : "Salvar alterações"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    padding: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 18,
  },
  input: {
    height: 46,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
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
    fontWeight: "700",
  },
});