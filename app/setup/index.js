import { Redirect, useRootNavigationState } from "expo-router";

export default function Index() {
  const navigationState = useRootNavigationState();

  if (!navigationState?.key) {
    return null; // espera o router montar
  }

  return <Redirect href="/cadastroAdmin" />;
}