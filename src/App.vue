<template>
  <div id="app">
    <router-view />
  </div>
</template>

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