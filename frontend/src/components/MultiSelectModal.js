// components/MultiSelectModal.js
import React from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or 'react-native-vector-icons'

const MultiSelectModal = ({
  visible,
  onClose,
  options, // Generic options to display
  selectedItems, // Generic selected items
  toggleItemSelection, // Toggle selection for items
  onDone,
  title, // Title for the modal, to specify context like "Select Plug Types" or "Select Amenities"
}) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>

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
          <Text style={{ color: "white", fontWeight: "bold" }}>Done</Text>
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
    fontWeight: "bold",
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
