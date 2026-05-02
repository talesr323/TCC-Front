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
    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.0.11:3001/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Credenciais inválidas");
        return;
      }

      // 🔥 Aqui você pode salvar o token depois (AsyncStorage)
      console.log("TOKEN:", data.token);

      Alert.alert("Sucesso", "Login realizado!");

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha na requisição");
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
      />

      <TextInput
        placeholder="Senha"
        value={form.senha}
        secureTextEntry
        onChangeText={(v) => handleChange("senha", v)}
      />

      <Button
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
}