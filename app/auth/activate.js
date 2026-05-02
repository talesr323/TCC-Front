import { useState } from "react"
import { Button, Text, TextInput, View } from "react-native"
import api from "../../src/services/api"

export default function Activate() {
  const [token, setToken] = useState("")
  const [senha, setSenha] = useState("")
  const [msg, setMsg] = useState("")

  const ativar = async () => {
    try {
      await api.post("/auth/ativar", {
        token,
        senha,
      })

      setMsg("Conta ativada com sucesso!")
    } catch (err) {
      setMsg(err?.response?.data?.error || "Erro ao ativar")
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Ativar Conta</Text>

      <TextInput placeholder="Token" onChangeText={setToken} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setSenha} />

      <Button title="Ativar" onPress={ativar} />

      {msg !== "" && <Text>{msg}</Text>}
    </View>
  )
}