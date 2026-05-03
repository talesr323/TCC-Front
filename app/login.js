import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  }

  async function handleLogin() {
    if (loading) return; // 🔥 evita múltiplos cliques

    try {
      setLoading(true);

      console.log("Tentando login...");

      const response = await fetch(
        "http://192.168.0.10:3001/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      console.log("Status:", response.status);

      const data = await response.json();

      console.log("Resposta:", data);

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Credenciais inválidas");
        return;
      }

      // ✅ salva dados
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("tipo", data.tipo);

      Alert.alert("Sucesso", "Login realizado!");

      // 🔥 navegação corrigida
      setTimeout(() => {
        if (data.tipo === "ADMIN") {
          router.replace("/admin"); // ✅ CORRETO
        } else {
          router.replace("/usuario");
        }
      }, 200);

    } catch (error) {
      console.log("ERRO COMPLETO:", error.message);

      Alert.alert(
        "Erro de conexão",
        "Não foi possível conectar ao servidor.\nVerifique IP/rede."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={form.senha}
        secureTextEntry
        onChangeText={(v) => handleChange("senha", v)}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
}