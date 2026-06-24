import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Activate() {
  const [token, setToken] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const ativar = async () => {
    if (loading) return;

    if (!token.trim() || !senha.trim()) {
      setMsg("Por favor, preencha todos os campos.");
      setIsSuccess(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.0.10:3001/auth/ativacao-conta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenAtivacao: token.trim(),
            senha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMsg(data.message || data.error || "Erro ao ativar");
        setIsSuccess(false);
        return;
      }

      setMsg("Conta ativada com sucesso!");
      setIsSuccess(true);
    } catch (err) {
      console.log("Erro:", err);
      setMsg("Erro de conexão");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>✓</Text>
          </View>

          <Text style={styles.title}>Ativar sua conta</Text>

          <Text style={styles.subtitle}>
            Informe seu token de ativação e defina sua senha de acesso.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionIcon}>▣</Text>
            <Text style={styles.sectionTitle}>Dados de Ativação</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Token de Ativação *</Text>

            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>#</Text>
              <TextInput
                placeholder="Digite o token recebido"
                value={token}
                onChangeText={setToken}
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nova Senha *</Text>

            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>⌕</Text>
              <TextInput
                placeholder="Digite sua nova senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
            onPress={ativar}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Ativando..." : "Ativar Conta"}
            </Text>
          </TouchableOpacity>

          {msg !== "" && (
            <Text style={[styles.msgText, isSuccess && styles.msgSuccess]}>
              {msg}
            </Text>
          )}

          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>i</Text>
            <Text style={styles.infoText}>
              Sua conta deve ser criada previamente pelo administrador da
              academia.
            </Text>
          </View>

          <Text style={styles.helpText}>Precisa de ajuda?</Text>
        </View>
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
    marginBottom: 30,
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

  button: {
    height: 46,
    borderRadius: 9,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#00C853",
    shadowOpacity: 0.28,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  msgText: {
    marginTop: 14,
    color: "#DC2626",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },

  msgSuccess: {
    color: "#00A86B",
  },

  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  infoIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E9FFF5",
    color: "#00C853",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "700",
    marginRight: 8,
  },

  infoText: {
    flex: 1,
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 17,
  },

  helpText: {
    textAlign: "center",
    color: "#00C853",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 18,
  },
});