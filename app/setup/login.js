import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { styles } from "../../src/styles/style"; // Importando os estilos migrados

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [modoAtivacao, setModoAtivacao] = useState(false);
  const [modoRedefinirSenha, setModoRedefinirSenha] = useState(false);

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [ativacao, setAtivacao] = useState({
    token: "",
    senha: "",
  });

  const [redefinicao, setRedefinicao] = useState({
    telefone: "",
    codigo: "",
    novaSenha: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value ?? "" }));
  }

  function handleChangeAtivacao(field, value) {
    setAtivacao((prev) => ({ ...prev, [field]: value ?? "" }));
  }

  function handleChangeRedefinicao(field, value) {
    setRedefinicao((prev) => ({ ...prev, [field]: value ?? "" }));
  }

  async function handleLogin() {
    if (loading) return;
    try {
      setLoading(true);
      const response = await fetch("http://192.168.1.147:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Credenciais inválidas");
        return;
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("tipo", data.tipo);

      Alert.alert("Sucesso", "Login realizado!");

      setTimeout(() => {
        router.replace(data.tipo === "ADMIN" ? "/admin" : "/usuario");
      }, 200);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAtivacao() {
    if (loading) return;
    if (!ativacao.token.trim() || !ativacao.senha.trim()) {
      Alert.alert("Erro", "Informe o token e a nova senha.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://192.168.1.147:3001/auth/ativacao-conta",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tokenAtivacao: ativacao.token.trim(),
            senha: ativacao.senha,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Erro",
          data.message || data.error || "Falha ao ativar conta",
        );
        return;
      }

      Alert.alert("Sucesso", "Conta ativada!");
      setAtivacao({ token: "", senha: "" });
      setModoAtivacao(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível ativar a conta.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSolicitarCodigo() {
    if (loading) return;
    if (!redefinicao.telefone.trim()) {
      Alert.alert("Erro", "Informe o telefone.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://192.168.1.147:3001/auth/solicitacao-codigo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telefone: redefinicao.telefone.trim() }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Erro",
          data.message || data.error || "Não foi possível enviar o código.",
        );
        return;
      }

      Alert.alert("Sucesso", data.message || "Código enviado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível solicitar o código.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRedefinirSenha() {
    if (loading) return;
    if (!redefinicao.codigo.trim() || !redefinicao.novaSenha.trim()) {
      Alert.alert("Erro", "Informe o código e a nova senha.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://192.168.1.147:3001/auth/redefinicao-senha",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            codigoVerificacao: redefinicao.codigo.trim(),
            novaSenha: redefinicao.novaSenha,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Erro",
          data.message || data.error || "Falha ao redefinir senha",
        );
        return;
      }

      Alert.alert("Sucesso", data.message || "Senha redefinida!");
      setRedefinicao({ telefone: "", codigo: "", novaSenha: "" });
      setModoRedefinirSenha(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível redefinir a senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho */}
        <View style={styles.column}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/m0vzgskw_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.image}
          />
          <Text style={styles.text}>
            {modoAtivacao
              ? "Ativar Conta"
              : modoRedefinirSenha
                ? "Redefinir Senha"
                : "Bem-vindo"}
          </Text>
          <Text style={styles.text2}>
            {modoAtivacao || modoRedefinirSenha
              ? "Preencha os dados abaixo"
              : "Acesse sua conta no FitLife"}
          </Text>
        </View>

        {/* Formulário Dinâmico baseado no Estado */}
        <View style={styles.column2}>
          {/* MODO: LOGIN */}
          {!modoAtivacao && !modoRedefinirSenha && (
            <>
              {/* Input Email */}
              <View style={styles.column3}>
                <View style={styles.row}>
                  <Text style={styles.text3}>E-mail</Text>
                  <Text style={styles.text4}>*</Text>
                </View>
                <View style={styles.row2}>
                  <Image
                    source={{
                      uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/8x1t297f_expires_30_days.png",
                    }}
                    resizeMode={"stretch"}
                    style={styles.image2}
                  />
                  <TextInput
                    placeholder={"seu.email@exemplo.com"}
                    placeholderTextColor="#717182"
                    value={form.email}
                    onChangeText={(v) => handleChange("email", v)}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              {/* Input Senha */}
              <View style={styles.column3}>
                <View style={styles.row}>
                  <Text style={styles.text5}>Senha</Text>
                  <Text style={styles.text4}>*</Text>
                </View>
                <View style={styles.row3}>
                  <Image
                    source={{
                      uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/67adu6cq_expires_30_days.png",
                    }}
                    resizeMode={"stretch"}
                    style={styles.image3}
                  />
                  <TextInput
                    placeholder={"Digite sua senha"}
                    placeholderTextColor="#717182"
                    secureTextEntry
                    value={form.senha}
                    onChangeText={(v) => handleChange("senha", v)}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Lembrar-me e Esqueceu a senha */}
              <View style={styles.row4}>
                <View style={styles.row5}>
                  <View style={styles.box2} />
                  <Text style={styles.text6}>Lembrar-me</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setModoRedefinirSenha(true);
                    setModoAtivacao(false);
                  }}
                >
                  <Text style={styles.text4}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>

              {/* Botão Entrar */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#10B981", "#059669"]}
                  style={styles.gradientButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.text7}>Entrar</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Link Mudar para Modo Ativação */}
              <View style={styles.column4}>
                <Text style={styles.text8}>Primeira vez aqui? </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModoAtivacao(true);
                    setModoRedefinirSenha(false);
                  }}
                >
                  <Text style={styles.text9}>Ativar minha conta</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* MODO: ATIVAÇÃO DE CONTA */}
          {modoAtivacao && (
            <>
              {/* Input Token */}
              <View style={styles.column3}>
                <View style={styles.row}>
                  <Text style={styles.text3}>Token de ativação</Text>
                  <Text style={styles.text4}>*</Text>
                </View>
                <View style={styles.row2}>
                  <TextInput
                    placeholder={"Digite o token recebido"}
                    placeholderTextColor="#717182"
                    value={ativacao.token}
                    onChangeText={(v) => handleChangeAtivacao("token", v)}
                    style={[styles.input, { marginLeft: 15 }]}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Input Nova Senha */}
              <View style={styles.column3}>
                <View style={styles.row}>
                  <Text style={styles.text5}>Nova Senha</Text>
                  <Text style={styles.text4}>*</Text>
                </View>
                <View style={styles.row3}>
                  <TextInput
                    placeholder={"Crie uma senha forte"}
                    placeholderTextColor="#717182"
                    secureTextEntry
                    value={ativacao.senha}
                    onChangeText={(v) => handleChangeAtivacao("senha", v)}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Botão Ativar */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleAtivacao}
                disabled={loading}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#10B981", "#059669"]}
                  style={styles.gradientButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.text7}>Ativar conta</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Voltar */}
              <TouchableOpacity
                onPress={() => setModoAtivacao(false)}
                style={styles.column4}
              >
                <Text style={styles.text9}>Voltar ao login</Text>
              </TouchableOpacity>
            </>
          )}

          {/* MODO: REDEFINIR SENHA */}
          {modoRedefinirSenha && (
            <>
              {/* Input Telefone */}
              <View style={styles.column3}>
                <View style={styles.row}>
                  <Text style={styles.text3}>Telefone</Text>
                  <Text style={styles.text4}>*</Text>
                </View>
                <View style={styles.row2}>
                  <TextInput
                    placeholder={"(00) 00000-0000"}
                    placeholderTextColor="#717182"
                    value={redefinicao.telefone}
                    onChangeText={(v) => handleChangeRedefinicao("telefone", v)}
                    style={[styles.input, { marginLeft: 15 }]}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Botão Solicitar Código */}
              <TouchableOpacity
                style={[styles.button, { marginBottom: 15 }]}
                onPress={handleSolicitarCodigo}
                disabled={loading}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#10B981", "#059669"]}
                  style={styles.gradientButton}
                >
                  <Text style={styles.text7}>Enviar código por SMS</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View
                style={{
                  height: 1,
                  backgroundColor: "#E5E7EB",
                  marginVertical: 15,
                }}
              />

              {/* Input Código de Verificação */}
              <View style={styles.column3}>
                <View style={styles.row}>
                  <Text style={styles.text3}>Código de verificação</Text>
                  <Text style={styles.text4}>*</Text>
                </View>
                <View style={styles.row2}>
                  <TextInput
                    placeholder={"Digite o código numérico"}
                    placeholderTextColor="#717182"
                    value={redefinicao.codigo}
                    onChangeText={(v) => handleChangeRedefinicao("codigo", v)}
                    style={[styles.input, { marginLeft: 15 }]}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Input Nova Senha */}
              <View style={styles.column3}>
                <View style={styles.row}>
                  <Text style={styles.text5}>Nova Senha</Text>
                  <Text style={styles.text4}>*</Text>
                </View>
                <View style={styles.row3}>
                  <TextInput
                    placeholder={"Digite a nova senha"}
                    placeholderTextColor="#717182"
                    secureTextEntry
                    value={redefinicao.novaSenha}
                    onChangeText={(v) =>
                      handleChangeRedefinicao("novaSenha", v)
                    }
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Botão Confirmar Nova Senha */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleRedefinirSenha}
                disabled={loading}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#10B981", "#059669"]}
                  style={styles.gradientButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.text7}>Redefinir senha</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Voltar */}
              <TouchableOpacity
                onPress={() => setModoRedefinirSenha(false)}
                style={styles.column4}
              >
                <Text style={styles.text9}>Voltar ao login</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Rodapé / Direitos Autorais */}
        <View style={styles.view}>
          <Text style={styles.text10}>
            {"© 2026 FitLife. Todos os direitos reservados."}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
