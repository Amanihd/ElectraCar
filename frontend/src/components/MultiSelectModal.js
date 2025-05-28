
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";

const MultiSelectModal = ({
  visible,
  onClose,
  options,
  selectedItems,
  toggleItemSelection,
  onDone,
  title,
}) => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";
const rtlTextAlign = { textAlign: isRTL ? "right" : "left" };
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={[styles.modalTitle, arFontFamilySmiBold,rtlTextAlign]}>{title}</Text>

        <FlatList
          data={options}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.optionItem,
                selectedItems.includes(item) && styles.selectedOption,
              ]}
              onPress={() => toggleItemSelection(item)}
            >
              <Text>{item}</Text>
              {selectedItems.includes(item) && (
                <Ionicons name="checkmark" size={20} color="green" />
              )}
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity style={styles.doneButton} onPress={onDone}>
          <Text style={[{ color: "white" }, arFontFamilySmiBold]}>
            {t("done")}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  optionItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedOption: {
    backgroundColor: "#e7ebf7",
  },
  doneButton: {
    backgroundColor: "#000C66",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
});

export default MultiSelectModal;
