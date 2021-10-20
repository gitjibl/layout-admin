<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <el-image  :src="src"></el-image>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            src: require("@/assets/imgs/user.gif")
        }
    },
    mounted(){
    }
}
</script>
