<template>
  <div class="UserList" :style="{height:windowWidth>800?'100%':'30%'}">
    <div class="Roominput">
      <input class="RoomID" type="text" v-model="RoomID" placeholder="房间号" />
      <button class="Roomjoin" @click="join">加入</button>
    </div>
    <!-- 消息 -->
    <div class="JoinContent">
      
    </div>
  </div>
</template>
<script>
export default {
  name: "UserList",
  props:{
    windowWidth:{
      type:Number,
    }
  },
  data() {
    return {
      RoomID: null,
      stream:null,
    };
  },
  mounted() {
  },
  methods: {
    join(){
      if(this.RoomID == null){
        this.$message({
          message: '请输入房间id',
          type: 'warning'
        });
        return 
      }
      this.initLocalStream();
    },
    //获取视频码流
    initLocalStream(){
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
      //保存一份本地流
      this.stream = stream
      this.$emit('Bitstream',stream,this.RoomID)
    }
  },
};
</script>
<style lang="scss" scoped>
.UserList {
  min-width: 30%;
  border-radius: 10px;
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
      font-size: 16px; //通过设置输入框文字防止移动端放大
      border-radius: 10px;
      border: 1px solid rgb(82, 145, 140);
    }
    .Roomjoin{
      all: unset;
      width: 50px;
      height: 30px;
      text-align: center;
      border-radius: 10px;
      border: 1px solid rgb(82, 145, 140);
      text-align: center;
      margin-left: 5px;
      color: rgb(82, 145, 140);
    }
  }
  .JoinContent{
    width: 100%;
    height: 82%;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
}
</style>