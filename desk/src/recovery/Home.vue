<template>
  <div class="login" style="position: relative">
    <div class="UP">
      <lottieVue class="lottie" :lottieData="lottieData" />
    </div>
    <div style="display: flex">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="Down">
      <lottieVue class="lottie" :lottieData="lottieData" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import lottieVue from "../components/lottie.vue";
import Animationdata from "../assets/lottie/Animation - 1727419221626.json?url";

export default {
  components: {
    lottieVue,
  },
  setup() {
    const lottieData = ref({
      path: Animationdata,
      renderer: "svg",
      loop: false,
      autoplay: false,
    });

    return {
      lottieData,
    };
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #1e1e1e, #0f0c29);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: Arial, sans-serif;
}
.lottie {
  width: 300px;
  height: 300px;
}
.UP {
  width: 100%;
  height: 100px;
  position: relative;
  top: 0;
}
.Down {
  width: 100%;
  height: 100px;
  position: relative;
  bottom: 0;
}
</style>
