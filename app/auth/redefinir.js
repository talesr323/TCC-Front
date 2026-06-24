import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RedefinirSenha() {
  const [telefone, setTelefone] = useState("");
  const [codigoVerificacao, setCodigoVerificacao] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loadingCodigo, setLoadingCodigo] = useState(false);
  const [loadingSenha, setLoadingSenha] = useState(false);

  async function handleSolicitarCodigo() {
    if (loadingCodigo || loadingSenha) return;

    if (!telefone.trim()) {
      Alert.alert("Erro", "Informe o telefone.");
      return;
    }

    try {
      setLoadingCodigo(true);

      const response = await fetch(
        "http://192.168.0.10:3001/auth/solicitacao-codigo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telefone: telefone.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Erro",
          data.message || data.error || "Erro ao solicitar código"
        );
        return;
      }

      Alert.alert("Sucesso", data.message || "Código enviado com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível solicitar o código.");
    } finally {
      setLoadingCodigo(false);
    }
  }

  async function handleRedefinirSenha() {
    if (loadingCodigo || loadingSenha) return;

    if (!codigoVerificacao.trim() || !novaSenha.trim()) {
      Alert.alert("Erro", "Informe o código e a nova senha.");
      return;
    }

    try {
      setLoadingSenha(true);

      const response = await fetch(
        "http://192.168.0.10:3001/auth/redefinicao-senha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigoVerificacao: codigoVerificacao.trim(),
            novaSenha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Erro",
          data.message || data.error || "Erro ao redefinir senha"
        );
        return;
      }

      Alert.alert("Sucesso", data.message || "Senha redefinida com sucesso!");

      setTelefone("");
      setCodigoVerificacao("");
      setNovaSenha("");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoadingSenha(false);
    }
  }

  const loading = loadingCodigo || loadingSenha;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>⌕</Text>
          </View>

          <Text style={styles.title}>Redefinir Senha</Text>

          <Text style={styles.subtitle}>
            Informe seu telefone para receber o código e digite sua nova senha
            de acesso.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionIcon}>▣</Text>
            <Text style={styles.sectionTitle}>Recuperação de Acesso</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefone *</Text>

            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>☎</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 11999999999"
                placeholderTextColor="#99A1AF"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              { opacity: loadingCodigo || loadingSenha ? 0.6 : 1 },
            ]}
            onPress={handleSolicitarCodigo}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>
              {loadingCodigo ? "Enviando..." : "Enviar código"}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Código de Verificação *</Text>

            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>#</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o código recebido"
                placeholderTextColor="#99A1AF"
                value={codigoVerificacao}
                onChangeText={setCodigoVerificacao}
                keyboardType="numeric"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nova Senha *</Text>

            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>⌕</Text>
              <TextInput
                style={styles.input}
                placeholder="Crie uma senha segura"
                placeholderTextColor="#99A1AF"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              { opacity: loadingCodigo || loadingSenha ? 0.6 : 1 },
            ]}
            onPress={handleRedefinirSenha}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loadingSenha ? "Processando..." : "Redefinir Senha"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsTitle}>Requisitos da senha</Text>

          <View style={styles.requirementRow}>
            <View style={styles.bullet} />
            <Text style={styles.requirementText}>Mínimo de 8 caracteres</Text>
          </View>

          <View style={styles.requirementRow}>
            <View style={styles.bullet} />
            <Text style={styles.requirementText}>
              Letras maiúsculas e minúsculas
            </Text>
          </View>

          <View style={styles.requirementRow}>
            <View style={styles.bullet} />
            <Text style={styles.requirementText}>Pelo menos um número</Text>
          </View>
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
    marginBottom: 18,
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

  submitButton: {
    height: 46,
    borderRadius: 9,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
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

  requirementsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 28,
    borderRadius: 18,
    padding: 18,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  requirementsTitle: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "700",
    marginBottom: 12,
  },

  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  bullet: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#00C853",
    marginRight: 9,
  },

  requirementText: {
    fontSize: 12,
    color: "#6B7280",
  },
});