<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  // created(){
  //   if (sessionStorage.getItem('store')) {
  //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
  //   }
  //   //在页面刷新时将vuex里的信息保存到sessionStorage里
  //   window.addEventListener('beforeunload', () => {
  //     sessionStorage.setItem('store', JSON.stringify(this.$store.state));
  //   });
  //   console.log("测试2",JSON.parse(JSON.stringify(this.$store.state)))
  // },
}
</script>

<style lang="scss">
  @import "./assets/css/main.css";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  #nprogress .bar {
    background: #07dfb7 !important; //自定义颜色
  }
</style>