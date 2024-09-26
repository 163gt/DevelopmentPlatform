<template>
  <div style="position:relative">
    <div class="UP" >
      <lottieVue class="lottie" :lottieData="lottieData" />
    </div>
    <div style="display:flex;">
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
import Animationdata from "../assets/lottie/Animation - 1727075231106.json?url";

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
.lottie {
  width: 100px;
  height: 100px;
}
.UP{
  width: 100%;
  height: 100px;
  position: relative;
  top: 0;
}
.Down{
  width: 100%;
  height: 100px;
  position: relative;
  bottom: 0;
}
</style>
