<template>
  <div id="AframeAR">
    <h1>My A-Frame Vue App</h1>
    <AFrameScene />
  </div>
</template>

<script>
import AFrameScene from "../components/AFrameScene.vue";
export default {
  name: "AframeAR",
  components: {
    AFrameScene,
  },
};
</script>

<style>
/* 你可以在这里添加一些全局样式 */
</style>
