import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../src/services/api";
import { styles } from "../../src/styles/style"; // Importando do arquivo unificado de estilos

export default function CreateUser() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    nome: "",
    cpf: "",
    telefone: "",
    tipo: "PROFESSOR", // PROFESSOR ou ALUNO
    cref: "",
  });

  const [loading, setLoading] = useState(false);

  const criar = async () => {
    if (loading) return;

    // Validação básica antes de enviar
    if (!form.nome || !form.email || !form.cpf || !form.telefone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (form.tipo === "PROFESSOR" && !form.cref) {
      Alert.alert("Erro", "Por favor, preencha o CREF do professor.");
      return;
    }

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
        Alert.alert(
          "Erro",
          "Token de login não encontrado. Faça login novamente.",
        );
        return;
      }

      await api.post("/usuarios", payload, {
        headers: {
          Authorization: `Bearer ${tokenLogin}`,
        },
      });

      Alert.alert("Sucesso", "Usuário criado com sucesso!", [
        { text: "OK", onPress: () => router.replace("/admin") },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        "Não foi possível criar o usuário. Verifique os dados.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.cadContainer}>
      <ScrollView style={styles.cadScrollView}>
        {/* Header / Navegação superior */}
        <View style={styles.cadRow}>
          <TouchableOpacity onPress={() => router.push("/admin")}>
            <Text style={styles.cadTextHeaderLink}>Dashboard</Text>
          </TouchableOpacity>
          <View style={styles.cadRow2}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/txcv988i_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.cadImageHeaderArrow}
            />
            <Text style={styles.cadTextHeaderActive}>Usuários</Text>
          </View>
        </View>

        {/* Título da tela */}
        <View style={styles.cadViewTitle}>
          <Text style={styles.cadTextMainTitle}>Criar novo usuário</Text>
          <Text style={styles.cadTextSubtitle}>
            Insira as informações do novo membro
          </Text>
        </View>

        {/* Campo: Nome Completo */}
        <View style={styles.cadInputWrapperRow}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/0m0as87x_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.cadInputIcon}
          />
          <TextInput
            placeholder={"Nome Completo"}
            placeholderTextColor={"#717182"}
            value={form.nome}
            onChangeText={(v) => setForm({ ...form, nome: v })}
            style={styles.cadTextInput}
          />
        </View>

        {/* Campo: E-mail */}
        <View style={styles.cadInputWrapperRow}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/0clx8r9h_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.cadInputIcon}
          />
          <TextInput
            placeholder={"E-mail corporativo ou pessoal"}
            placeholderTextColor={"#717182"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
            style={styles.cadTextInput}
          />
        </View>

        {/* Campo: CPF */}
        <View style={styles.cadInputWrapperRow}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/z098d575_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.cadInputIcon}
          />
          <TextInput
            placeholder={"CPF (somente números)"}
            placeholderTextColor={"#717182"}
            keyboardType="numeric"
            value={form.cpf}
            onChangeText={(v) => setForm({ ...form, cpf: v })}
            style={styles.cadTextInput}
          />
        </View>

        {/* Campo: Telefone */}
        <View style={styles.cadInputWrapperRow}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/9itd003p_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.cadInputIcon}
          />
          <TextInput
            placeholder={"Telefone (DDD + número)"}
            placeholderTextColor={"#717182"}
            keyboardType="phone-pad"
            value={form.telefone}
            onChangeText={(v) => setForm({ ...form, telefone: v })}
            style={styles.cadTextInput}
          />
        </View>

        {/* Seletor de Tipo (Professor / Aluno) */}
        <View style={styles.cadRowTypeSelector}>
          <TouchableOpacity
            style={[
              styles.cadTypeOptionButton,
              form.tipo === "PROFESSOR" && styles.cadTypeOptionActive,
            ]}
            onPress={() => setForm({ ...form, tipo: "PROFESSOR" })}
          >
            <Text
              style={[
                styles.cadTextTypeLabel,
                form.tipo === "PROFESSOR" && styles.cadTextTypeLabelActive,
              ]}
            >
              Professor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cadTypeOptionButton,
              form.tipo === "ALUNO" && styles.cadTypeOptionActive,
            ]}
            onPress={() => setForm({ ...form, tipo: "ALUNO", cref: "" })}
          >
            <Text
              style={[
                styles.cadTextTypeLabel,
                form.tipo === "ALUNO" && styles.cadTextTypeLabelActive,
              ]}
            >
              Aluno
            </Text>
          </TouchableOpacity>
        </View>

        {/* Campo Dinâmico: CREF (Exibido apenas se for Professor) */}
        {form.tipo === "PROFESSOR" && (
          <View style={styles.cadInputWrapperRow}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/z098d575_expires_30_days.png",
              }} // Reutilizando ícone de documento
              resizeMode={"stretch"}
              style={styles.cadInputIcon}
            />
            <TextInput
              placeholder={"Registro CREF"}
              placeholderTextColor={"#717182"}
              value={form.cref}
              onChangeText={(v) => setForm({ ...form, cref: v })}
              style={styles.cadTextInput}
            />
          </View>
        )}

        {/* Botão de Envio com Gradiente */}
        <TouchableOpacity
          style={styles.cadSubmitButtonContainer}
          onPress={criar}
          disabled={loading}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#00C951", "#009966"]}
            style={styles.cadSubmitGradient}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.cadTextSubmitButton}>Salvar Usuário</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
