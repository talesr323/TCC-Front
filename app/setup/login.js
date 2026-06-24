import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

      const response = await fetch("http://192.168.0.10:3001/auth/login", {
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
        "http://192.168.0.10:3001/auth/ativacao-conta",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tokenAtivacao: ativacao.token.trim(),
            senha: ativacao.senha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || data.error || "Falha ao ativar conta");
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
        "http://192.168.0.10:3001/auth/solicitacao-codigo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telefone: redefinicao.telefone.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || data.error || "Não foi possível enviar o código.");
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
        "http://192.168.0.10:3001/auth/redefinicao-senha",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            codigoVerificacao: redefinicao.codigo.trim(),
            novaSenha: redefinicao.novaSenha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || data.error || "Falha ao redefinir senha");
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

  const titulo = modoAtivacao
    ? "Ativar Conta"
    : modoRedefinirSenha
      ? "Redefinir Senha"
      : "Bem-vindo";

  const subtitulo =
    modoAtivacao || modoRedefinirSenha
      ? "Preencha os dados abaixo"
      : "Acesse sua conta no FitLife";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>
              {modoAtivacao ? "✓" : modoRedefinirSenha ? "⌕" : "▣"}
            </Text>
          </View>

          <Text style={styles.title}>{titulo}</Text>
          <Text style={styles.subtitle}>{subtitulo}</Text>
        </View>

        <View style={styles.card}>
          {!modoAtivacao && !modoRedefinirSenha && (
            <>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionIcon}>▣</Text>
                <Text style={styles.sectionTitle}>Acesso ao sistema</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail *</Text>
                <View style={styles.inputBox}>
                  <Text style={styles.inputIcon}>✉</Text>
                  <TextInput
                    placeholder="seu.email@exemplo.com"
                    placeholderTextColor="#99A1AF"
                    value={form.email}
                    onChangeText={(v) => handleChange("email", v)}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha *</Text>
                <View style={styles.inputBox}>
                  <Text style={styles.inputIcon}>⌕</Text>
                  <TextInput
                    placeholder="Digite sua senha"
                    placeholderTextColor="#99A1AF"
                    secureTextEntry
                    value={form.senha}
                    onChangeText={(v) => handleChange("senha", v)}
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.loginOptions}>
                <View style={styles.rememberRow}>
                  <View style={styles.checkbox} />
                  <Text style={styles.rememberText}>Lembrar-me</Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setModoRedefinirSenha(true);
                    setModoAtivacao(false);
                  }}
                >
                  <Text style={styles.linkText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, { opacity: loading ? 0.6 : 1 }]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Entrar</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footerLinkRow}>
                <Text style={styles.footerText}>Primeira vez aqui? </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModoAtivacao(true);
                    setModoRedefinirSenha(false);
                  }}
                >
                  <Text style={styles.linkText}>Ativar minha conta</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {modoAtivacao && (
            <>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionIcon}>✓</Text>
                <Text style={styles.sectionTitle}>Ativação de conta</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Token de ativação *</Text>
                <View style={styles.inputBox}>
                  <Text style={styles.inputIcon}>#</Text>
                  <TextInput
                    placeholder="Digite o token recebido"
                    placeholderTextColor="#99A1AF"
                    value={ativacao.token}
                    onChangeText={(v) => handleChangeAtivacao("token", v)}
                    style={styles.input}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nova Senha *</Text>
                <View style={styles.inputBox}>
                  <Text style={styles.inputIcon}>⌕</Text>
                  <TextInput
                    placeholder="Crie uma senha forte"
                    placeholderTextColor="#99A1AF"
                    secureTextEntry
                    value={ativacao.senha}
                    onChangeText={(v) => handleChangeAtivacao("senha", v)}
                    style={styles.input}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, { opacity: loading ? 0.6 : 1 }]}
                onPress={handleAtivacao}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Ativar conta</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModoAtivacao(false)}
                style={styles.footerLinkRow}
              >
                <Text style={styles.linkText}>Voltar ao login</Text>
              </TouchableOpacity>
            </>
          )}

          {modoRedefinirSenha && (
            <>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionIcon}>⌕</Text>
                <Text style={styles.sectionTitle}>Recuperação de senha</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Telefone *</Text>
                <View style={styles.inputBox}>
                  <Text style={styles.inputIcon}>☎</Text>
                  <TextInput
                    placeholder="(00) 00000-0000"
                    placeholderTextColor="#99A1AF"
                    value={redefinicao.telefone}
                    onChangeText={(v) => handleChangeRedefinicao("telefone", v)}
                    style={styles.input}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.secondaryButton, { opacity: loading ? 0.6 : 1 }]}
                onPress={handleSolicitarCodigo}
                disabled={loading}
              >
                <Text style={styles.secondaryButtonText}>
                  {loading ? "Enviando..." : "Enviar código por SMS"}
                </Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Código de verificação *</Text>
                <View style={styles.inputBox}>
                  <Text style={styles.inputIcon}>#</Text>
                  <TextInput
                    placeholder="Digite o código numérico"
                    placeholderTextColor="#99A1AF"
                    value={redefinicao.codigo}
                    onChangeText={(v) => handleChangeRedefinicao("codigo", v)}
                    style={styles.input}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nova Senha *</Text>
                <View style={styles.inputBox}>
                  <Text style={styles.inputIcon}>⌕</Text>
                  <TextInput
                    placeholder="Digite a nova senha"
                    placeholderTextColor="#99A1AF"
                    secureTextEntry
                    value={redefinicao.novaSenha}
                    onChangeText={(v) => handleChangeRedefinicao("novaSenha", v)}
                    style={styles.input}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, { opacity: loading ? 0.6 : 1 }]}
                onPress={handleRedefinirSenha}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Redefinir senha</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModoRedefinirSenha(false)}
                style={styles.footerLinkRow}
              >
                <Text style={styles.linkText}>Voltar ao login</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={styles.copyright}>
          © 2026 FitLife. Todos os direitos reservados.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  scrollView: {
    flex: 1,
  },

  header: {
    alignItems: "center",
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 22,
  },

  logoIcon: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#00C853",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  logoIconText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  title: {
    fontSize: 24,
    color: "#1F2937",
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 19,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 28,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 26,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionIcon: {
    fontSize: 14,
    color: "#00C853",
    marginRight: 7,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "700",
  },

  inputGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 11,
    color: "#374151",
    marginBottom: 6,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    borderRadius: 9,
    paddingHorizontal: 10,
  },

  inputIcon: {
    width: 20,
    fontSize: 14,
    color: "#9CA3AF",
    marginRight: 6,
    textAlign: "center",
    fontWeight: "700",
  },

  input: {
    flex: 1,
    height: 44,
    fontSize: 12,
    color: "#111827",
    padding: 0,
  },

  loginOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    marginRight: 7,
  },

  rememberText: {
    fontSize: 12,
    color: "#6B7280",
  },

  submitButton: {
    height: 46,
    borderRadius: 9,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    shadowColor: "#00C853",
    shadowOpacity: 0.28,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  secondaryButton: {
    height: 44,
    borderRadius: 9,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },

  secondaryButtonText: {
    color: "#00C853",
    fontSize: 13,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },

  footerLinkRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },

  footerText: {
    fontSize: 12,
    color: "#6B7280",
  },

  linkText: {
    fontSize: 12,
    color: "#00C853",
    fontWeight: "700",
  },

  copyright: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 11,
    marginBottom: 26,
  },
});