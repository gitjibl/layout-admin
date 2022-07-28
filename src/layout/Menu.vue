<template>
  <el-menu style="width: 100%" class="el-menu-demo" :default-active="activeMenu" background-color="#095a91"
    text-color="#fff" active-text-color="rgb(21 209 113)" mode="horizontal" unique-opened>
    <!--动态路由读取菜单 -->
    <!--1级菜单-->
    <template v-for="(route, index) in permission_routes">
      <template v-if="!route.hidden">
        <el-menu-item v-if="route.children && route.children.length == 1 && !route.alwaysShow" :key="index"
          :index="resolvePath(route.path, route.children[0].path)">
          <app-link :to="resolvePath(route.path, route.children[0].path)" style="display: block">
            <template v-if="route.children[0].meta && !route.children[0].meta.imgUrl">
              <item v-if="route.children[0].meta" :icon="route.children[0].meta && route.children[0].meta.icon"
                :title="route.children[0].meta.title" />
            </template>
            <template v-else>
              <el-image :src="route.children[0].meta.imgUrl" style="height: 60px; width: 60px"></el-image>
            </template>
          </app-link>
        </el-menu-item>

        <el-submenu :index="route.path" :key="index" v-else>
          <template v-if="route.meta && !route.meta.imgUrl" slot="title">
            <item v-if="route.meta" :icon="route.meta && route.meta.icon" :title="route.meta.title" />
          </template>
          <template v-else slot="title">
            <el-image :src="route.meta.imgUrl" style="height: 60px; width: 60px"></el-image>
          </template>
          <MenuItemGroup v-for="(e, i) in route.children" :key="i" :item="e" :base-path="route.path">
          </MenuItemGroup>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>


<script>
  import MenuItemGroup from "./MenuItemGroup";
  import Item from "./Item";
  import AppLink from "./Link";
  import path from "path";
  import {
    isExternal
  } from "@/utils/validate";
  import {
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {};
    },
    components: {
      AppLink,
      MenuItemGroup,
      Item,
    },
    computed: {
      // routes() {
      //   // return this.$store.state.permission.routes;
      //   return this.$router.options.routes;
      // },
      ...mapGetters(["permission_routes"]),
      activeMenu() {
        const route = this.$route;
        const {
          meta,
          path
        } = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      },
    },
    methods: {
      resolvePath(basePath, routePath) {
        if (isExternal(routePath)) {
          return routePath;
        }
        if (isExternal(basePath)) {
          return basePath;
        }
        return path.resolve(basePath, routePath);
      },
    },
  };
</script>
<style scoped>
  .el-menu-item i {
    color: #eeeff3;
  }

  ::v-deep .el-submenu__title i {
    color: #eeeff3;
  }

  ::v-deep .el-submenu__title {
    padding: 0 6px;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
  }

  .el-menu-item {
    padding: 0 6px;
  }

  /**
  隐藏menu 下拉显示
*/
  ::v-deep .el-icon-arrow-down:before {
    content: "";
  }
</style>