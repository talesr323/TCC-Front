import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [rota, setRota] = useState(null);

  useEffect(() => {
    verificarSistema();
  }, []);

  async function verificarSistema() {
    try {
      const response = await fetch(
        "http://192.168.0.10:3001/admin/inicializado"
      );

      const data = await response.json();

      if (data.inicializado) {
        setRota("/setup/login");
      } else {
        setRota("/setup/cadastroAdmin");
      }
    } catch (error) {
      // Se não conseguir conectar, por segurança vai para cadastro
      setRota("/setup/cadastroAdmin");
    }
  }

  if (!rota) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={rota} />;
}