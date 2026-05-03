import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput } from "react-native";

export default function CadastroAdmin() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nomeAcademia: "",
    cnpj: "",
    endereco: "",
    cep: "",
    cidade: "",
    estado: "",
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "", // 🔥 evita null/undefined
    }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const response = await fetch(
  "http://192.168.0.10:3001/api/setup-inicial",
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
        Alert.alert("Erro", data.error || "Erro ao cadastrar");
        return;
      }

          Alert.alert("Sucesso", "Admin cadastrado com sucesso!");

    setTimeout(() => {
      router.replace("/login");
    }, 300);

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha na requisição");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        Cadastro da Academia
      </Text>

      <TextInput
        placeholder="Nome da academia"
        value={form.nomeAcademia}
        onChangeText={(v) => handleChange("nomeAcademia", v)}
      />

      <TextInput
        placeholder="CNPJ"
        value={form.cnpj}
        onChangeText={(v) => handleChange("cnpj", v)}
      />

      <TextInput
        placeholder="Endereço"
        value={form.endereco}
        onChangeText={(v) => handleChange("endereco", v)}
      />

      <TextInput
        placeholder="CEP"
        value={form.cep}
        onChangeText={(v) => handleChange("cep", v)}
      />

      <TextInput
        placeholder="Cidade"
        value={form.cidade}
        onChangeText={(v) => handleChange("cidade", v)}
      />

      <TextInput
        placeholder="Estado"
        value={form.estado}
        onChangeText={(v) => handleChange("estado", v)}
      />

      <Text style={{ fontSize: 18, marginTop: 20 }}>
        Administrador
      </Text>

      <TextInput
        placeholder="Nome"
        value={form.nome}
        onChangeText={(v) => handleChange("nome", v)}
      />

      <TextInput
        placeholder="Sobrenome"
        value={form.sobrenome}
        onChangeText={(v) => handleChange("sobrenome", v)}
      />

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />

      <TextInput
        placeholder="CPF"
        value={form.cpf}
        onChangeText={(v) => handleChange("cpf", v)}
      />

      <TextInput
        placeholder="Telefone"
        value={form.telefone}
        onChangeText={(v) => handleChange("telefone", v)}
      />

      <TextInput
        placeholder="Senha"
        value={form.senha}
        secureTextEntry
        onChangeText={(v) => handleChange("senha", v)}
      />

      <Button
        title={loading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </ScrollView>
  );
}