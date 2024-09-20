<template>
  <div>
    <lottieVue class="lottie" :lottieData="lottieData" />
  </div>
</template>

<script>
import { ref } from "vue";
import lottieVue from "../components/lottie.vue";
import Animationdata from "../assets/Animation - 1726819559998.json?url";

export default {
  components: {
    lottieVue,
  },
  setup() {
    const lottieData = ref({
      path: Animationdata,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });

    return {
      lottieData,
    };
  },
};
</script>

<style scoped>
.lottie {
  width: 500px;
  height: 500px;
}
</style>
