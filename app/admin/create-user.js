import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import api from "../src/services/api";

export default function CreateUser() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    nome: "",
    cpf: "",
    telefone: "", // 🔥 NOVO
    tipo: "PROFESSOR",
    cref: "",
  });

  const [loading, setLoading] = useState(false);

  const criar = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const payload = {
        ...form,
        ...(form.tipo === "ALUNO" ? { cref: undefined } : {}),
      };

      const { data } = await api.post("/usuarios", payload);

      console.log("USUÁRIO CRIADO:", data);

      const token = data.token;

      // 🔥 monta mensagem
      const mensagem = `Olá ${form.nome}!\n\nSeu cadastro foi criado.\nAtive sua conta pelo token:\n${token}`;

      // 🔥 remove caracteres do telefone (importante)
      const telefone = form.telefone.replace(/\D/g, "");

      // 🔥 URL do WhatsApp
      const url = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;

      // 🔥 abre WhatsApp
      await Linking.openURL(url);

      Alert.alert("Sucesso", "Usuário criado e WhatsApp aberto!");

      router.replace("/admin");

    } catch (error) {
      console.log("ERRO:", error.response?.data || error.message);

      Alert.alert(
        "Erro",
        error.response?.data?.error || "Erro ao criar usuário"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Criar Usuário
      </Text>

      <TextInput
        placeholder="Email"
        onChangeText={(v) => setForm({ ...form, email: v })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Nome"
        onChangeText={(v) => setForm({ ...form, nome: v })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="CPF"
        onChangeText={(v) => setForm({ ...form, cpf: v })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      {/* 🔥 NOVO TELEFONE */}
      <TextInput
        placeholder="Telefone (DDD + número)"
        onChangeText={(v) => setForm({ ...form, telefone: v })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        keyboardType="phone-pad"
      />

      <Text style={{ marginBottom: 5 }}>Tipo:</Text>

      <Button
        title={form.tipo === "PROFESSOR" ? "✔ Professor" : "Professor"}
        onPress={() => setForm({ ...form, tipo: "PROFESSOR" })}
      />

      <Button
        title={form.tipo === "ALUNO" ? "✔ Aluno" : "Aluno"}
        onPress={() => setForm({ ...form, tipo: "ALUNO" })}
      />

      {form.tipo === "PROFESSOR" && (
        <TextInput
          placeholder="CREF"
          onChangeText={(v) => setForm({ ...form, cref: v })}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        />
      )}

      <Button
        title={loading ? "Criando..." : "Criar"}
        onPress={criar}
        disabled={loading}
      />
    </View>
  );
}