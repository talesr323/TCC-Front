import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
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
import api from "../../src/services/api";

export default function CreateUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    nome: "",
    cpf: "",
    telefone: "",
    tipo: "PROFESSOR",
    cref: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  }

  const criar = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const payload = {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        telefone: form.telefone,
        tipo: form.tipo,
        ...(form.tipo === "PROFESSOR" ? { cref: form.cref } : {}),
      };

      const tokenLogin = await AsyncStorage.getItem("token");

      if (!tokenLogin) {
        Alert.alert("Erro", "Token de login não encontrado. Faça login novamente.");
        return;
      }

      const { data } = await api.post("/usuarios", payload, {
        headers: {
          Authorization: `Bearer ${tokenLogin}`,
        },
      });

      const tokenAtivacao = data.tokenAtivacao || data.token;

      const mensagem = `Olá ${form.nome}!

Seu cadastro foi criado.

Ative sua conta pelo token:

${tokenAtivacao}`;

      const telefone = form.telefone.replace(/\D/g, "");
      const url = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;

      await Linking.openURL(url);

      Alert.alert("Sucesso", "Usuário criado e WhatsApp aberto!");
      router.replace("/admin");
    } catch (error) {
      console.log("ERRO:", error.response?.data || error.message);

      Alert.alert(
        "Erro",
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Erro ao criar usuário"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>＋</Text>
          </View>

          <Text style={styles.title}>Criar Usuário</Text>
          <Text style={styles.subtitle}>Cadastre aluno ou professor</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>

          <Text style={styles.avatarText}>Novo usuário</Text>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionIcon}>♙</Text>
            <Text style={styles.sectionTitle}>Dados do Usuário</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome *</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>♙</Text>
              <TextInput
                placeholder="João Silva"
                value={form.nome}
                onChangeText={(v) => handleChange("nome", v)}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail *</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>✉</Text>
              <TextInput
                placeholder="seuemail@exemplo.com"
                value={form.email}
                onChangeText={(v) => handleChange("email", v)}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CPF *</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>▣</Text>
              <TextInput
                placeholder="000.000.000-00"
                value={form.cpf}
                onChangeText={(v) => handleChange("cpf", v)}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefone *</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>☎</Text>
              <TextInput
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChangeText={(v) => handleChange("telefone", v)}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <Text style={styles.label}>Tipo *</Text>

          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                form.tipo === "PROFESSOR" && styles.typeButtonActive,
              ]}
              onPress={() => handleChange("tipo", "PROFESSOR")}
            >
              <Text
                style={[
                  styles.typeText,
                  form.tipo === "PROFESSOR" && styles.typeTextActive,
                ]}
              >
                Professor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                form.tipo === "ALUNO" && styles.typeButtonActive,
              ]}
              onPress={() =>
                setForm((prev) => ({
                  ...prev,
                  tipo: "ALUNO",
                  cref: "",
                }))
              }
            >
              <Text
                style={[
                  styles.typeText,
                  form.tipo === "ALUNO" && styles.typeTextActive,
                ]}
              >
                Aluno
              </Text>
            </TouchableOpacity>
          </View>

          {form.tipo === "PROFESSOR" && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>CREF *</Text>
              <View style={styles.inputBox}>
                <Text style={styles.inputIcon}>▣</Text>
                <TextInput
                  placeholder="000000-G/SP"
                  value={form.cref}
                  onChangeText={(v) => handleChange("cref", v)}
                  style={styles.input}
                  autoCapitalize="characters"
                />
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitButton, { opacity: loading ? 0.6 : 1 }]}
            onPress={criar}
            disabled={loading}
          >
            <Text style={styles.submitText}>
              {loading ? "Criando..." : "Criar Usuário"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.requiredText}>* Campos obrigatórios</Text>
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
    paddingTop: 22,
    paddingBottom: 22,
  },
  logoIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logoIconText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  title: {
    fontSize: 24,
    color: "#1F2937",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 28,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 26,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  avatarCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 8,
  },
  avatarIcon: {
    fontSize: 26,
  },
  avatarText: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 22,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: "#374151",
    marginBottom: 5,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    borderRadius: 9,
    paddingHorizontal: 10,
  },
  inputIcon: {
    fontSize: 14,
    color: "#9CA3AF",
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 42,
    fontSize: 12,
    color: "#111827",
    padding: 0,
  },
  typeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  typeButton: {
    flex: 1,
    height: 42,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  typeButtonActive: {
    backgroundColor: "#00C853",
    borderColor: "#00C853",
  },
  typeText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "600",
  },
  typeTextActive: {
    color: "#FFFFFF",
  },
  submitButton: {
    height: 46,
    borderRadius: 9,
    backgroundColor: "#00C853",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  requiredText: {
    textAlign: "center",
    color: "#00C853",
    fontSize: 10,
    marginTop: 18,
  },
});