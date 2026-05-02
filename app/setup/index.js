import { useState } from "react";
import { Button, ScrollView, Text, TextInput } from "react-native";
import api from "../../src/services/api";

export default function SetupScreen() {
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
    senha: ""
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/api/setup-inicial", form);
      console.log("Setup criado:", res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Setup Inicial - Academia</Text>

      <TextInput placeholder="Nome Academia" onChangeText={(v) => handleChange("nomeAcademia", v)} />
      <TextInput placeholder="CNPJ" onChangeText={(v) => handleChange("cnpj", v)} />
      <TextInput placeholder="Endereço" onChangeText={(v) => handleChange("endereco", v)} />
      <TextInput placeholder="CEP" onChangeText={(v) => handleChange("cep", v)} />
      <TextInput placeholder="Cidade" onChangeText={(v) => handleChange("cidade", v)} />
      <TextInput placeholder="Estado" onChangeText={(v) => handleChange("estado", v)} />

      <TextInput placeholder="Nome" onChangeText={(v) => handleChange("nome", v)} />
      <TextInput placeholder="Sobrenome" onChangeText={(v) => handleChange("sobrenome", v)} />
      <TextInput placeholder="Email" onChangeText={(v) => handleChange("email", v)} />
      <TextInput placeholder="CPF" onChangeText={(v) => handleChange("cpf", v)} />
      <TextInput placeholder="Telefone" onChangeText={(v) => handleChange("telefone", v)} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={(v) => handleChange("senha", v)} />

      <Button title="Criar Admin" onPress={handleSubmit} />
    </ScrollView>
  );
}