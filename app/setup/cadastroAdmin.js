import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../src/styles/style";

export default function CadastroAdmin() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nomeAcademia: "",
    cnpj: "",
    endereco: "",
    cep: "",
    cidade: "",
    estado: "",
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  }

  async function handleSubmit() {
    if (loading) return;

    try {
      setLoading(true);

      const response = await fetch("http://192.168.0.10:3001/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.error || "Erro ao cadastrar");
        return;
      }

      Alert.alert("Sucesso", "Admin cadastrado com sucesso!");

      setTimeout(() => {
        router.replace("/setup/login");
      }, 300);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha na requisição");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>▣</Text>
          </View>

          <Text style={styles.text}>Cadastro Inicial</Text>
          <Text style={styles.text2}>Configure sua academia</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.text3}>Administrador</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column2}>
          <View style={styles.column}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarIcon}>📷</Text>
              <View style={styles.plusBadge}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </View>

            <Text style={styles.text4}>Foto de perfil (opcional)</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.sectionIcon}>⌂</Text>
            <Text style={styles.text5}>Dados da Academia</Text>
          </View>

          <View style={styles.column3}>
            <View style={styles.view}>
              <Text style={styles.text6}>Nome da Academia *</Text>
            </View>

            <View style={styles.row2}>
              <Text style={styles.inputIcon}>▣</Text>
              <TextInput
                placeholder="Academia FitPro"
                value={form.nomeAcademia}
                onChangeText={(v) => handleChange("nomeAcademia", v)}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.column3}>
            <View style={styles.view}>
              <Text style={styles.text6}>CNPJ *</Text>
            </View>

            <View style={styles.row2}>
              <Text style={styles.inputIcon}>▣</Text>
              <TextInput
                placeholder="00.000.000/0000-00"
                value={form.cnpj}
                onChangeText={(v) => handleChange("cnpj", v)}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.column4}>
            <View style={styles.view}>
              <Text style={styles.text6}>Endereço *</Text>
            </View>

            <View style={styles.row2}>
              <Text style={styles.inputIcon}>⌖</Text>
              <TextInput
                placeholder="Rua, número, bairro"
                value={form.endereco}
                onChangeText={(v) => handleChange("endereco", v)}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.row3}>
            <View style={styles.column5}>
              <Text style={styles.text7}>CEP *</Text>
              <View style={styles.row2}>
                <TextInput
                  placeholder="16200-070"
                  value={form.cep}
                  onChangeText={(v) => handleChange("cep", v)}
                  style={[styles.input, { paddingHorizontal: 10 }]}
                />
              </View>
            </View>

            <View style={styles.column6}>
              <Text style={styles.text9}>Cidade *</Text>
              <TextInput
                placeholder="São Paulo"
                value={form.cidade}
                onChangeText={(v) => handleChange("cidade", v)}
                style={styles.input2}
              />
            </View>

            <View style={styles.column7}>
              <View style={styles.view2}>
                <Text style={styles.text6}>Estado *</Text>
              </View>

              <View style={styles.row2}>
                <TextInput
                  placeholder="SP"
                  maxLength={2}
                  autoCapitalize="characters"
                  value={form.estado}
                  onChangeText={(v) => handleChange("estado", v)}
                  style={[
                    styles.input,
                    { paddingHorizontal: 10, textAlign: "center" },
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={styles.column8}>
            <View style={styles.row4}>
              <Text style={styles.sectionIcon}>♙</Text>
              <Text style={styles.text5}>Dados do Administrador</Text>
            </View>

            <View style={styles.row5}>
              <View style={styles.column9}>
                <View style={styles.view}>
                  <Text style={styles.text6}>Nome *</Text>
                </View>

                <View style={styles.row2}>
                  <Text style={styles.inputIcon}>♙</Text>
                  <TextInput
                    placeholder="João"
                    value={form.nome}
                    onChangeText={(v) => handleChange("nome", v)}
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.column10}>
                <View style={styles.view}>
                  <Text style={styles.text6}>Sobrenome *</Text>
                </View>

                <View style={styles.row2}>
                  <Text style={styles.inputIcon}>♙</Text>
                  <TextInput
                    placeholder="Silva"
                    value={form.sobrenome}
                    onChangeText={(v) => handleChange("sobrenome", v)}
                    style={styles.input}
                  />
                </View>
              </View>
            </View>

            <View style={styles.column11}>
              <View style={styles.view}>
                <Text style={styles.text6}>E-mail *</Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.inputIcon}>✉</Text>
                <TextInput
                  placeholder="seuemail@exemplo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={form.email}
                  onChangeText={(v) => handleChange("email", v)}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <View style={styles.view}>
                <Text style={styles.text6}>CPF *</Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.inputIcon}>▣</Text>
                <TextInput
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChangeText={(v) => handleChange("cpf", v)}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={[styles.column11, { marginTop: 12 }]}>
              <View style={styles.view}>
                <Text style={styles.text6}>Telefone *</Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.inputIcon}>☎</Text>
                <TextInput
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChangeText={(v) => handleChange("telefone", v)}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={[styles.column11, { marginTop: 12 }]}>
              <View style={styles.view}>
                <Text style={styles.text6}>Senha *</Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.inputIcon}>⌕</Text>
                <TextInput
                  placeholder="Mínimo 6 caracteres"
                  secureTextEntry
                  value={form.senha}
                  onChangeText={(v) => handleChange("senha", v)}
                  style={styles.input}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button4, { opacity: loading ? 0.6 : 1 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.text10}>
              {loading ? "Cadastrando..." : "Cadastrar Academia"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.text11}>* Campos obrigatórios</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}