import {  Text, ScrollView, StyleSheet } from "react-native";

import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next"



const FAQScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";

  const rtlTextAlign = { textAlign: isRTL ? "right" : "left" };
  const arFontFamilySmiBold = isRTL ? { fontFamily: "IBM-SemiBold" } : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={[styles.header, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_title")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_1")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_1")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_2")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_2")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_3")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_3")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_4")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_4")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_5")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_5")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_6")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_6")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_7")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_7")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_8")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_8")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_9")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_9")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("faq_question_10")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("faq_answer_10")}</Text>

      <Text style={[styles.paragraph, rtlTextAlign, { marginTop: 20 },arFontFamilyRegular]}>
        {t("faq_footer")}
        <Text
          style={{ color: "#0000EE" }}
          onPress={() => navigation.navigate("Support")}
        >
          {t("support_page")}
        </Text>
        {t("in_me_section")}
      </Text>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
    color: "black",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    color: "black",
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
    color: "#333",
  },
});

export default FAQScreen;
