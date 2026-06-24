import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../src/styles/style"; // Importando do arquivo de estilos unificado

export default function AdminHome() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("tipo");
          router.replace("/setup/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.dashContainer}>
      <ScrollView style={styles.dashScrollView}>
        <View style={styles.dashColumn}>
          <View style={styles.dashColumn2}>
            {/* Header */}
            <View style={styles.dashRow}>
              <View style={styles.dashRow2}>
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/5z41gpzy_expires_30_days.png",
                  }}
                  resizeMode={"stretch"}
                  style={styles.dashImage}
                />
                <View style={styles.dashColumn3}>
                  <View style={styles.dashView}>
                    <Text style={styles.dashText}>FitPro Admin</Text>
                  </View>
                  <Text style={styles.dashText2}>Academia Premium</Text>
                </View>
              </View>
              <View style={styles.dashRow2}>
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/h4sy5l4e_expires_30_days.png",
                  }}
                  resizeMode={"stretch"}
                  style={styles.dashImage2}
                />
                {/* Botão de Logout */}
                <TouchableOpacity
                  style={styles.dashGradientButton}
                  onPress={handleLogout}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={["#00D492", "#009966"]}
                    style={styles.dashGradientButton}
                  >
                    <Text style={styles.dashText3}>Sair</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* Títulos do Dashboard */}
            <View style={styles.dashColumn4}>
              <View style={styles.dashView2}>
                <Text style={styles.dashText4}>Dashboard</Text>
              </View>
              <View>
                <Text style={styles.dashText5}>Visão geral do sistema</Text>
              </View>
            </View>

            {/* Grid de Cards de Estatísticas (Sem as porcentagens/indicadores) */}
            <View style={styles.dashColumn5}>
              <View style={styles.dashRow3}>
                <View style={styles.dashCardColumn}>
                  <View style={styles.dashRow4}>
                    <Image
                      source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/884avt0g_expires_30_days.png",
                      }}
                      resizeMode={"stretch"}
                      style={styles.dashImage3}
                    />
                  </View>
                  <View style={styles.dashView3}>
                    <Text style={styles.dashText5}>Total de Alunos</Text>
                  </View>
                  <View>
                    <Text style={styles.dashText4}>0</Text>
                  </View>
                </View>

                <View style={styles.dashCardColumn7}>
                  <View style={styles.dashRow4}>
                    <Image
                      source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/lh2arzmb_expires_30_days.png",
                      }}
                      resizeMode={"stretch"}
                      style={styles.dashImage3}
                    />
                  </View>
                  <View style={styles.dashView3}>
                    <Text style={styles.dashText5}>Funcionários</Text>
                  </View>
                  <View>
                    <Text style={styles.dashText4}>0</Text>
                  </View>
                </View>
              </View>

              <View style={styles.dashRow6}>
                <View style={styles.dashCardColumn}>
                  <View style={styles.dashRow4}>
                    <Image
                      source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/dcauhslj_expires_30_days.png",
                      }}
                      resizeMode={"stretch"}
                      style={styles.dashImage3}
                    />
                  </View>
                  <View style={styles.dashView3}>
                    <Text style={styles.dashText5}>Ativos</Text>
                  </View>
                  <View>
                    <Text style={styles.dashText4}>0</Text>
                  </View>
                </View>

                <View style={styles.dashCardColumn7}>
                  <View style={styles.dashRow4}>
                    <Image
                      source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/narmku18_expires_30_days.png",
                      }}
                      resizeMode={"stretch"}
                      style={styles.dashImage3}
                    />
                  </View>
                  <View style={styles.dashView3}>
                    <Text style={styles.dashText5}>Inativos</Text>
                  </View>
                  <View>
                    <Text style={styles.dashText4}>0</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Menu de Ações/Navegação inferior */}
        <View style={styles.dashRow13}>
          <TouchableOpacity
            style={styles.dashActionTab}
            onPress={() => router.push("/admin/create-user")}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/1ni9ocgr_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.dashImage7}
            />
            <Text style={styles.dashActionTabTextActive}>Criar Usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dashActionTab}
            onPress={() => router.push("/admin/users")}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Qq7nG9QwoU/yqwdmunc_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.dashImage7}
            />
            <Text style={styles.dashActionTabText}>Listar Usuários</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
