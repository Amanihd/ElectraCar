
import { useTranslation } from "react-i18next";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import i18next from "../services/i18next";

const LanguageModal = ({ visible, onRequestClose, changeLanguage }) => {
  const { t } = useTranslation();
  const languages = {
    en: { key: "English" },
    ar: { key: "Arabic" },
   
  };
  const isRTL = i18next.language === "ar";
  const arFontFamilySmiBold = isRTL
  ? { fontFamily: "IBM-SemiBold" }
  : { fontWeight: "bold" };
  
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
      transparent
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={Object.keys(languages)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => changeLanguage(item)}
              >
                <Text style={[styles.languageText,arFontFamilySmiBold]}> 
                  {t(languages[item].key)} 
                </Text> 
              </TouchableOpacity>
              //if item is en then key english 
            )}
            keyExtractor={(item) => item} //key en or ar for flat list
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
    elevation: 10,
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
    elevation: 3, 
    transition: "background-color 0.3s",
  },
  languageButtonPressed: {
    backgroundColor: "#e0e0e0",
  },
  languageText: {
    fontSize: 16,
    color: "#333", 
  },
});

export default LanguageModal;
