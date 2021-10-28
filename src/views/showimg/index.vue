<template>
  <div class="demo-image__placeholder">
    <div class="block">
      {{this.val}}
      <el-image :src="src"></el-image>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Showimg",
    data() {
      return {
        src: require("@/assets/imgs/user.gif"),
        val: ""
      }
    },
    created() {
      this.val = this.$route.params.userId;
    },
    mounted() {
       alert(1)
    }
  }
</script>