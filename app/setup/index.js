import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect, useRootNavigationState } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const navigationState = useRootNavigationState();
  const [isReady, setIsReady] = useState(false);
  const [hasAdmin, setHasAdmin] = useState(false);

  useEffect(() => {
    async function checkFirstSetup() {
      try {
        // Verifica se a chave do cadastro existe no dispositivo
        const cadastroFeito = await AsyncStorage.getItem(
          "@primeiro_cadastro_feito",
        );
        if (cadastroFeito === "true") {
          setHasAdmin(true);
        }
      } catch (error) {
        console.log("Erro ao ler AsyncStorage", error);
      } finally {
        setIsReady(true);
      }
    }

    if (navigationState?.key) {
      checkFirstSetup();
    }
  }, [navigationState?.key]);

  // Enquanto o router monta ou lê o AsyncStorage, exibe um loading limpo
  if (!navigationState?.key || !isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  // Redireciona dinamicamente com base no status do cadastro
  if (hasAdmin) {
    return <Redirect href="/setup/login" />; // Substitua pelo caminho correto do seu login se necessário
  }

  return <Redirect href="/cadastroAdmin" />;
}
