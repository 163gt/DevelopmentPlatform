<template>
  <div class="WebRTC">
    <UserList @Bitstream='Bitstream' />
    <div class="WebRTC-video">
        <video ref="videoElement" autoplay></video>
    </div>
  </div>
</template>
<script>
import UserList from "../../components/WebRTC/UserList.vue";
export default {
  components: {
    UserList,
  },
  data() {
    return {
        windowWidth: window.innerWidth,
    };
  },
  //添加窗口变化监听
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  //移出窗口变化监听
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    Bitstream(stream){
        this.$refs.videoElement.srcObject = stream
    },
    //窗口变化改变
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>
<style lang="scss" scoped>
.WebRTC {
  height: 90vh;
  padding: 10px;
  .WebRTC-video{
    height: 50%;
  }
}
</style>