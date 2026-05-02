import { useRouter } from "expo-router"
import { Button, Text, View } from "react-native"

export default function AdminHome() {
  const router = useRouter()

  return (
    <View style={{ padding: 20 }}>
      <Text>Admin</Text>

      <Button
        title="Criar usuário"
        onPress={() => router.push("/admin/create-user")}
      />

      <Button
        title="Listar usuários"
        onPress={() => router.push("/admin/users")}
      />
    </View>
  )
}