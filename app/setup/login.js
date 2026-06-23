import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [modoAtivacao, setModoAtivacao] = useState(false);

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [ativacao, setAtivacao] = useState({
    token: "",
    senha: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  }

  function handleChangeAtivacao(field, value) {
    setAtivacao((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  }

  async function handleLogin() {
    if (loading) return;

    try {
      setLoading(true);

      const response = await fetch("http://192.168.0.10:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Credenciais inválidas");
        return;
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("tipo", data.tipo);

      Alert.alert("Sucesso", "Login realizado!");

      setTimeout(() => {
        router.replace(data.tipo === "ADMIN" ? "/admin" : "/usuario");
      }, 200);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAtivacao() {
    if (loading) return;

    if (!ativacao.token.trim() || !ativacao.senha.trim()) {
      Alert.alert("Erro", "Informe o token e a nova senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://192.168.0.10:3001/auth/ativar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: ativacao.token.trim(),
          senha: ativacao.senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Falha ao ativar conta");
        return;
      }

      Alert.alert("Sucesso", "Conta ativada!");
      setAtivacao({ token: "", senha: "" });
      setModoAtivacao(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível ativar a conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        {modoAtivacao ? "Ativar Conta" : "Login"}
      </Text>

      {!modoAtivacao ? (
        <>
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

          <TouchableOpacity onPress={() => setModoAtivacao(true)}>
            <Text style={{ color: "blue", textAlign: "center", marginTop: 15 }}>
              Ativar conta
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Token de ativação"
            value={ativacao.token}
            onChangeText={(v) => handleChangeAtivacao("token", v)}
            style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Nova senha"
            secureTextEntry
            value={ativacao.senha}
            onChangeText={(v) => handleChangeAtivacao("senha", v)}
            style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
          />

          <Button
            title={loading ? "Ativando..." : "Ativar conta"}
            onPress={handleAtivacao}
            disabled={loading}
          />

          <TouchableOpacity onPress={() => setModoAtivacao(false)}>
            <Text style={{ color: "blue", textAlign: "center", marginTop: 15 }}>
              Voltar ao login
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}