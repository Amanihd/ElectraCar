import React from "react";
import { Modal, View, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";

const LanguageModal = ({ visible, onRequestClose, changeLanguage }) => {
  const languages = {
    en: { nativeName: "English" },
    ar: { nativeName: "Arabic" },
    // Add more languages as needed
  };

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 280,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 10, // adds subtle shadow for depth
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  languageButton: {
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // subtle elevation for the button
    transition: "background-color 0.3s",
  },
  languageButtonPressed: {
    backgroundColor: "#e0e0e0", // on press background color
  },
  languageText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333", // a soft dark color for text
  },
});

export default LanguageModal;
