import { useState } from "react"
import { Button, Text, TextInput, View } from "react-native"
import api from "../../src/services/api"

export default function CreateUser() {
  const [form, setForm] = useState({
    email: "",
    nome: "",
    cpf: "",
    tipo: "PROFESSOR",
    cref: "",
  })

  const [token, setToken] = useState("")

  const criar = async () => {
    const { data } = await api.post("/usuarios", form, {
      headers: {
        Authorization: `Bearer ${global.token}`,
      },
    })

    setToken(data.token)
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Criar Usuário</Text>

      <TextInput placeholder="Email"
        onChangeText={(v) => setForm({ ...form, email: v })}
      />

      <TextInput placeholder="Nome"
        onChangeText={(v) => setForm({ ...form, nome: v })}
      />

      <TextInput placeholder="CPF"
        onChangeText={(v) => setForm({ ...form, cpf: v })}
      />

      <TextInput placeholder="CREF"
        onChangeText={(v) => setForm({ ...form, cref: v })}
      />

      <Button title="Criar" onPress={criar} />

      {token !== "" && <Text selectable>{token}</Text>}
    </View>
  )
}