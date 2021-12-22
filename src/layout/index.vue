<template>
  <div class="wrapper">
    <v-head></v-head>
    <div class="content-box">
      <tags-view />
      <div class="content">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import vHead from "./Header.vue";
  import TagsView from '@/layout/TagsView/TabsView'
  export default {
    name: 'index',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
    },
    components: {
      vHead,
      TagsView
    },
    created() {

    }
  };
</script>
<style scoped>
  .content-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 65px;
    bottom: 0;
    padding-bottom: 40px;
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    background: #f0f0f0;
  }

  .content {
    width: auto;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }

  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .5s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(0px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(0px);
  }
</style>