import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import api from "../../src/services/api"

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get("/usuarios?id=2", {
      headers: {
        Authorization: `Bearer ${global.token}`,
      },
    }).then(res => setUsers(res.data))
  }, [])

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuários</Text>

      {users.map((u) => (
        <Text key={u.id}>{u.nome}</Text>
      ))}
    </View>
  )
}