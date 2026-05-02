import { useRouter } from "expo-router"
import { useState } from "react"
import { Button, Text, TextInput, View } from "react-native"
import api from "../../src/services/api"

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [msg, setMsg] = useState("")

  const login = async () => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        senha,
      })

      global.token = data.token
      global.tipo = data.tipo

      if (data.tipo === "ADMIN") {
        router.replace("/admin")
      }

    } catch (err) {
      setMsg(err?.response?.data?.error || "Erro no login")
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text>Login</Text>

      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setSenha} />

      <Button title="Entrar" onPress={login} />

      {msg !== "" && <Text style={{ color: "red" }}>{msg}</Text>}
    </View>
  )
}