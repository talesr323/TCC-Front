import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../src/styles/style"; // Importação do arquivo central de estilos

export default function Activate() {
  const [token, setToken] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const ativar = async () => {
    if (!token.trim() || !senha.trim()) {
      setMsg("Por favor, preencha todos os campos.");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.147:3001/auth/ativacao-conta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenAtivacao: token.trim(),
            senha,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMsg(data.message || data.error || "Erro ao ativar");
        setIsSuccess(false);
        console.log("ERRO ATIVAÇÃO:", data);
        return;
      }

      setMsg("Conta ativada com sucesso!");
      setIsSuccess(true);
      console.log("Resposta teste:", data);
    } catch (err) {
      console.log("Erro:", err);
      setMsg("Erro de conexão");
      setIsSuccess(false);
    }
  };

  return (
    <SafeAreaView style={styles.activateContainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.activateView}>
          <View style={styles.activateView2}>
            <View style={styles.activateColumn}>
              {/* Header com Ícone e Títulos */}
              <View style={styles.activateColumn2}>
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/05kx2nor_expires_30_days.png",
                  }}
                  resizeMode={"stretch"}
                  style={styles.activateImage}
                />
                <Text style={styles.activateText}>{"Ativar sua conta"}</Text>
                <Text style={styles.activateText2}>
                  {
                    "Informe seu token de ativação enviado e defina sua nova senha de acesso."
                  }
                </Text>
              </View>

              {/* Formulário de Inputs */}
              <View style={styles.activateColumn3}>
                <View style={styles.activateColumn4}>
                  {/* Campo de Token */}
                  <View style={styles.activateView3}>
                    <Text style={styles.activateText3}>
                      {"Token de Ativação"}
                    </Text>
                  </View>
                  <View style={styles.activateRow}>
                    <Image
                      source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/pa3nrb3s_expires_30_days.png",
                      }}
                      resizeMode={"stretch"}
                      style={styles.activateImage2}
                    />
                    <TextInput
                      placeholder={"Digite o token recebido"}
                      value={token}
                      onChangeText={setToken}
                      autoCapitalize="none"
                      style={styles.activateInput}
                    />
                  </View>

                  {/* Campo de Senha */}
                  <View style={styles.activateView3}>
                    <Text style={styles.activateText3}>{"Nova Senha"}</Text>
                  </View>
                  <View style={styles.activateRow}>
                    <Image
                      source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/pa3nrb3s_expires_30_days.png",
                      }} // Mantido o mesmo ícone padrão
                      resizeMode={"stretch"}
                      style={styles.activateImage2}
                    />
                    <TextInput
                      placeholder={"Digite sua nova senha"}
                      value={senha}
                      onChangeText={setSenha}
                      secureTextEntry
                      style={styles.activateInput}
                    />
                  </View>
                </View>

                {/* Botão de Envio */}
                <TouchableOpacity
                  style={styles.activateButton}
                  onPress={ativar}
                >
                  <Text style={styles.activateText4}>{"Ativar Conta"}</Text>
                </TouchableOpacity>

                {/* Mensagens de Feedback Dinâmicas */}
                {msg !== "" && (
                  <Text
                    style={[styles.msgText, isSuccess && styles.msgSuccess]}
                  >
                    {msg}
                  </Text>
                )}
              </View>

              {/* Footer Informativo */}
              <View style={styles.activateRow2}>
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/i8oe4g8i_expires_30_days.png",
                  }}
                  resizeMode={"stretch"}
                  style={styles.activateImage3}
                />
                <Text style={styles.activateText5}>
                  {
                    "Sua conta deve ser criada previamente pelo administrador da academia."
                  }
                </Text>
              </View>

              <Text style={styles.activateText6}>{"Precisa de ajuda?"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
