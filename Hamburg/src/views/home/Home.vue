<template>
  <div>
    <button>789</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()

onMounted(()=>{
    wssw()
})
const wssw = () => {
  router.push({path:'/Login'})
};


</script>

<style scoped>
</style>