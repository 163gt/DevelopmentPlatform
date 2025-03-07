import { ref } from "vue";
import { defineStore } from "pinia";

export const overallStyle = defineStore("overallStyle", () => {
  const styleName = ref("convention");
  function setStyleName(value) {
    styleName.value = value;
  }
  return {
    styleName,
    setStyleName,
  };
});
