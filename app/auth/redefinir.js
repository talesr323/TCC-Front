import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../src/styles/style"; // Importando seus estilos centralizados

export default function RedefinirSenha() {
  const [telefone, setTelefone] = useState("");
  const [codigoVerificacao, setCodigoVerificacao] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSolicitarCodigo() {
    if (loading) return;

    if (!telefone.trim()) {
      Alert.alert("Erro", "Informe o telefone.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.1.147:3001/auth/solicitacao-codigo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telefone: telefone.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Erro",
          data.message || data.error || "Erro ao solicitar código",
        );
        return;
      }

      Alert.alert("Sucesso", data.message || "Código enviado com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível solicitar o código.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRedefinirSenha() {
    if (loading) return;

    if (!codigoVerificacao.trim() || !novaSenha.trim()) {
      Alert.alert("Erro", "Informe o código e a nova senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://192.168.1.147:3001/auth/redefinicao-senha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigoVerificacao: codigoVerificacao.trim(),
            novaSenha,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Erro",
          data.message || data.error || "Erro ao redefinir senha",
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
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.pwdContainer}>
      <ScrollView style={styles.pwdScrollView}>
        {/* Cabeçalho */}
        <View style={styles.pwdHeader}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/i9cc3ewe_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.pwdImage}
          />
          <Text style={styles.pwdTitle}>Redefinir Senha</Text>
          <Text style={styles.pwdSubtitle}>
            Informe seu telefone para receber o código e digite sua nova senha
            de acesso.
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.pwdFormCard}>
          {/* Campo: Telefone */}
          <View style={styles.pwdFieldGroup}>
            <Text style={styles.pwdLabel}>Telefone</Text>
            <View style={styles.pwdInputRow}>
              <TextInput
                style={styles.pwdInput}
                placeholder="Ex: 11999999999"
                placeholderTextColor="#99A1AF"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Botão: Solicitar Código */}
          <TouchableOpacity
            style={[
              styles.pwdSubmitButton,
              loading && styles.pwdSubmitButtonDisabled,
              { marginBottom: 25 },
            ]}
            onPress={handleSolicitarCodigo}
            disabled={loading}
          >
            <Text
              style={[
                styles.pwdSubmitButtonText,
                loading && styles.pwdSubmitButtonTextDisabled,
              ]}
            >
              {loading ? "Enviando..." : "Enviar código"}
            </Text>
          </TouchableOpacity>

          {/* Campo: Código de Verificação */}
          <View style={styles.pwdFieldGroup}>
            <Text style={styles.pwdLabel}>Código de Verificação</Text>
            <View style={styles.pwdInputRow}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/kjjexcuw_expires_30_days.png",
                }}
                resizeMode={"stretch"}
                style={styles.pwdIconLeft}
              />
              <TextInput
                style={styles.pwdInput}
                placeholder="Digite o código recebido"
                placeholderTextColor="#99A1AF"
                value={codigoVerificacao}
                onChangeText={setCodigoVerificacao}
                keyboardType="numeric"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Campo: Nova Senha */}
          <View style={styles.pwdFieldGroup}>
            <Text style={styles.pwdLabel}>Nova Senha</Text>
            <View style={styles.pwdInputRow}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/pbt2yb5y_expires_30_days.png",
                }}
                resizeMode={"stretch"}
                style={styles.pwdIconLeft}
              />
              <TextInput
                style={styles.pwdInput}
                placeholder="Crie uma senha segura"
                placeholderTextColor="#99A1AF"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
              />
            </View>
          </View>

          {/* Botão: Executar Redefinição */}
          <TouchableOpacity
            style={[
              styles.pwdSubmitButton,
              loading && styles.pwdSubmitButtonDisabled,
            ]}
            onPress={handleRedefinirSenha}
            disabled={loading}
          >
            <Text
              style={[
                styles.pwdSubmitButtonText,
                loading && styles.pwdSubmitButtonTextDisabled,
              ]}
            >
              {loading ? "Processando..." : "Redefinir Senha"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Requisitos da Senha */}
        <View style={styles.pwdRequirementsCard}>
          <Text style={styles.pwdRequirementsTitle}>Requisitos da senha:</Text>

          <View style={styles.pwdRequirementRow}>
            <View style={styles.pwdRequirementBullet} />
            <Text style={styles.pwdRequirementText}>
              Mínimo de 8 caracteres
            </Text>
          </View>

          <View style={styles.pwdRequirementRow}>
            <View style={styles.pwdRequirementBullet} />
            <Text style={styles.pwdRequirementText}>
              Letras maiúsculas e minúsculas
            </Text>
          </View>

          <View style={styles.pwdRequirementRow}>
            <View style={styles.pwdRequirementBullet} />
            <Text style={styles.pwdRequirementText}>Pelo menos um número</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
