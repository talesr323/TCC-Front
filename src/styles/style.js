import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // --- ESTILOS ORIGINAIS DO style (INALTERADOS) ---
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#F0FDF4",
    borderRadius: 26843500,
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  button4: {
    alignSelf: "stretch",
    alignItems: "center",
    backgroundColor: "#00C950",
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 36,
    marginHorizontal: 24,
    shadowColor: "#0000001A",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  column: {
    alignItems: "center",
    marginBottom: 32,
  },
  column2: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 24,
    shadowColor: "#0000001A",
    shadowOpacity: 0.1,
  },

  // --- ESTILOS ADICIONADOS DO DASHBOARDADMREACT.JS (MIGRADO E SIMPLIFICADO) ---
  dashContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  dashGradientButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  dashColumn: {
    marginBottom: 20,
  },
  dashColumn2: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
  },
  dashColumn3: {
    alignItems: "flex-start",
  },
  dashColumn4: {
    marginBottom: 19,
    marginHorizontal: 15,
  },
  dashColumn5: {
    marginHorizontal: 16,
  },
  dashCardColumn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 17,
    marginRight: 13,
    shadowColor: "#0000001A",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  dashCardColumn7: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#0000001A",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  dashActionTab: {
    alignItems: "center",
    borderRadius: 14,
    padding: 10,
  },
  dashImage: {
    width: 39,
    height: 39,
    marginRight: 12,
  },
  dashImage2: {
    width: 35,
    height: 35,
    marginRight: 9,
  },
  dashImage3: {
    width: 35,
    height: 35,
  },
  dashImage7: {
    borderRadius: 14,
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  dashRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 11,
    paddingBottom: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
  },
  dashRow2: {
    flexDirection: "row",
    alignItems: "center",
  },
  dashRow3: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  dashRow4: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dashRow6: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dashRow13: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginTop: 20,
  },
  dashScrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  dashText: {
    color: "#101828",
    fontSize: 14,
    fontWeight: "bold",
  },
  dashText2: {
    color: "#6A7282",
    fontSize: 12,
  },
  dashText3: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  dashText4: {
    color: "#101828",
    fontSize: 20,
    fontWeight: "bold",
  },
  dashText5: {
    color: "#4A5565",
    fontSize: 12,
  },
  dashActionTabText: {
    color: "#6A7282",
    fontSize: 12,
  },
  dashActionTabTextActive: {
    color: "#009966",
    fontSize: 12,
    fontWeight: "bold",
  },
  dashView: {
    paddingRight: 17,
  },
  dashView2: {
    marginBottom: 4,
  },
  dashView3: {
    marginBottom: 7,
  },

  // --- ESTILOS ADICIONADOS DO CADASTROUSUARIOREACT.JS (MIGRADO) ---
  cadContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  cadScrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  cadRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  cadRow2: {
    flexDirection: "row",
    alignItems: "center",
  },
  cadTextHeaderLink: {
    color: "#717182",
    fontSize: 16,
    marginRight: 9,
  },
  cadTextHeaderActive: {
    color: "#717182",
    fontSize: 16,
  },
  cadImageHeaderArrow: {
    width: 6,
    height: 11,
    marginRight: 11,
  },
  cadViewTitle: {
    marginBottom: 30,
  },
  cadTextMainTitle: {
    color: "#0A0A0A",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
  },
  cadTextSubtitle: {
    color: "#717182",
    fontSize: 14,
  },
  cadInputWrapperRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F5",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  cadInputIcon: {
    width: 18,
    height: 18,
    marginRight: 14,
  },
  cadTextInput: {
    flex: 1,
    color: "#0A0A0A",
    fontSize: 15,
  },
  cadRowTypeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F3F5",
    borderRadius: 14,
    padding: 6,
    marginBottom: 20,
  },
  cadTypeOptionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  cadTypeOptionActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cadTextTypeLabel: {
    color: "#717182",
    fontSize: 15,
    fontWeight: "500",
  },
  cadTextTypeLabelActive: {
    color: "#0A0A0A",
    fontWeight: "bold",
  },
  cadSubmitButtonContainer: {
    marginTop: 15,
    marginBottom: 40,
    borderRadius: 14,
    overflow: "hidden",
  },
  cadSubmitGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cadTextSubmitButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function StyleRouterFallback() {
  return null;
}
