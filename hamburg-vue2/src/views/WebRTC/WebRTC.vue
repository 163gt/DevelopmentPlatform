<template>
  <div class="WebRTC" :style="{padding:windowWidth > 800?'10px':'1px'}">
    <div v-if="windowWidth > 800" class="computer">
      <UserList @Bitstream="Bitstream" :windowWidth="windowWidth" />
      <div class="WebRTC-video">
        <video ref="videoElement" autoplay></video>
      </div>
    </div>
    <div v-else class="move">
      <UserList @Bitstream="Bitstream" :windowWidth="windowWidth" />
      <div class="WebRTC-video">
        <video ref="videoElement" autoplay></video>
      </div>
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
      windowHeight:window.innerHeight,
      //websocket内容
      wsURL: '',
      signaling: null,
      SIGNAL_TYPE_JOIN:'join',
      SIGNAL_TYPE_RESP_JOIN:'resp-join', //对方是谁
      SIGNAL_TYPE_LEAVE:'leave',
      SIGNAL_TYPE_NEW_PEER:'new-peer',
      SIGNAL_TYPE_PEER_LEAVE:'peer-leave',
      SIGNAL_TYPE_OFFER:'offer',
      SIGNAL_TYPE_ANSWER:'answer',
      SIGNAL_TYPE_CANDIDATE:'candidate',
      localUserId:Math.random().toString(36).substr(2), //本地
      remoteUserId:-1,  // 对端
    };
  },
  mounted() {
    //添加窗口变化监听
    window.addEventListener("resize", this.handleResize);
    this.init("ws://localhost:8099")//传递地址
    this.createWebsocket()//创建连接
  },

  //移出窗口变化监听
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    //传递码流过来
    Bitstream(stream,RoomID) {
      //视频码流渲染
      this.$refs.videoElement.srcObject = stream;
      //
      this.dojoin(RoomID)
    },
    //窗口变化改变
    handleResize() {
      this.windowWidth = window.innerWidth;
    },




    //
    //
    // websocket
    dojoin(roomId){
      const jsonMsg = {
        'cmd':'join',
        'roomId':roomId,
        'uid':this.localUserId
      }
      const message = JSON.stringify(jsonMsg)
      this.sendMessage(message)
    },
    init(wsURL) {
      this.wsURL = wsURL;
      this.signaling = null;
    },
    createWebsocket() {
      this.signaling = new WebSocket(this.wsURL);

      this.signaling.onopen = () => {
        this.onOpen();
      };

      this.signaling.onmessage = (ev) => {
        this.onMessage(ev);
      };

      this.signaling.onerror = (ev) => {
        this.onError(ev);
      };

      this.signaling.onclose = (ev) => {
        this.onClose(ev);
      };
    },
    onOpen() {
      console.log("WebSocket open");
    },
    onMessage(event) {
      console.log("onMessage", event.data);
    },
    onError(event) {
      console.error("WebSocket error:", event);
    },
    onClose(event) {
      console.log("WebSocket close -> code:", event.code, "reason:", event.reason);
    },
    sendMessage(message){
      this.signaling.send(message)
    }
  },
};
</script>
<style lang="scss" scoped>
.WebRTC {
  height: 98vh;
  padding: 5px;
  touch-action: none;//禁止移动端触摸缩放
  .WebRTC-video {
    // width: 100%;
    flex-grow: 1;
    border-radius: 10px 10px 0 0;
    border: 3px solid rgb(71, 102, 127);
  }
  .computer{
    width: 100%;
    height: 100%;
    display: flex;
  }
  .move{
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>