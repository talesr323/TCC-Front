  import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

  export default function Activate() {
    const [token, setToken] = useState("");
    const [senha, setSenha] = useState("");
    const [msg, setMsg] = useState("");

    const ativar = async () => {
      try {
        const response = await fetch("http://192.168.0.10:3001/auth/ativacao-conta", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenAtivacao: token.trim(),
            senha,
          }),
        });   

        const data = await response.json();

        if (!response.ok) {
          setMsg(data.error || "Erro ao ativar");
          return;
        }

        setMsg("Teste funcionou!");
        console.log("Resposta teste:", data);
      } catch (err) {
        console.log("Erro:", err);
        setMsg("Erro de conexão");
      }
    };

    return (
      <View style={{ padding: 20 }}>
        <Text>Ativar Conta</Text>

        <TextInput
          placeholder="Token"
          value={token}
          onChangeText={setToken}
          autoCapitalize="none"
          style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        />

        <TextInput
          placeholder="Senha"
          value={senha}
          secureTextEntry
          onChangeText={setSenha}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        />

        <Button title="Ativar" onPress={ativar} />

        {msg !== "" && <Text style={{ marginTop: 10 }}>{msg}</Text>}
      </View>
    );
  }