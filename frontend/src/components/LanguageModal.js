import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

const LanguageModal = ({ visible, onRequestClose, changeLanguage }) => {
  const languages = {
    en: { nativeName: "English" },
    ar: { nativeName: "Arabic" },
    // Add more languages as needed
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <FlatList
          data={Object.keys(languages)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => changeLanguage(item)}
            >
              <Text style={styles.languageText}>
                {languages[item].nativeName}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  languageButton: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  languageText: {
    fontSize: 18,
  },
});

export default LanguageModal;
