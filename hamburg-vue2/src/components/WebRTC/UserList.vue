<template>
  <div class="UserList">
    <div class="Roominput">
      <input class="RoomID" type="text" v-model="RoomID" placeholder="房间号" />
      <button class="Roomjoin" @click="join">加入</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserList",
  data() {
    return {
      RoomID: null,
      stream:null,
    };
  },
  methods: {
    join(){
      console.log('JOIN');
      this.initLocalStream();
    },
    //获取视频码流
    initLocalStream(){
      console.log('initLocalStream');
      navigator.mediaDevices.getUserMedia({
        audio:false,
        video:true,
      })
      .then(this.openLocalString)
      .catch(()=>{
        alert('获取摄像头失败')
      })
    },
    //保存码流
    openLocalString(stream){
      console.log(stream);
      this.stream = stream
      this.$emit('Bitstream',stream)
    }
  },
};
</script>
<style lang="scss" scoped>
.UserList {
  height: 40%;
  min-height: 200px;
  border-radius: 20px;
  border: 3px solid rgb(119, 174, 170);
  .Roominput {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    .RoomID {
      width: 70%;
      height: 30px;
      border-radius: 10px;
      border: 1px solid rgb(82, 145, 140);
    }
    .Roomjoin{
      all: unset;
      width: 50px;
      height: 30px;
      text-align: center;
      border-radius: 15px;
      border: 1px solid rgb(82, 145, 140);
      text-align: center;
      margin-left: 5px;
      color: rgb(82, 145, 140);
    }
  }
}
</style>