<template>
  <el-menu style="width:100%" class="el-menu-demo" :default-active="activeMenu" background-color="rgb(10, 141, 230)"
    text-color="#fff" active-text-color="#ffd04b" mode="horizontal" unique-opened>
    <!--手动定义菜单-->
    <!-- <template v-for="item in menuItems">
      <template v-if="item.subs">
        <el-submenu :index="item.index" :key="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
              <template slot="title">{{ subItem.title }}</template>
              <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                {{ threeItem.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>

        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template> -->
    <!--动态路由读取菜单 -->
    <!--1级菜单-->
    <template v-for="(route,index) in routes">
      <template v-if="!route.hidden">
        <template v-if="route.children && route.children.length>0 && !route.isLevelOne">
          <el-submenu :index="route.path" :key="index">
            <template v-if="route.meta && !route.meta.imgUrl" slot="title">
              <i :class="route.meta && route.meta.icon"></i>
              <span slot="title">{{route.meta.title}}</span>
            </template>
            <template v-else slot="title">
              <el-image :src="route.meta.imgUrl" style="height:60px;width:60px"></el-image>
            </template>
            <MenuItemGroup v-for="(e,i) in route.children" :key="i" :item="e" :base-path="route.path">
            </MenuItemGroup>
          </el-submenu>
        </template>
        <!---isLevelOne--->
        <template v-else-if="route.children && route.isLevelOne">
          <el-menu-item :key="index" :index="resolvePath(route.path,route.children[0].path)">
            <app-link :to="resolvePath(route.path,route.children[0].path)" style="display:block;">
              <template v-if="route.children[0].meta && !route.children[0].meta.imgUrl">
                <item v-if="route.children[0].meta" :icon="route.children[0].meta && route.children[0].meta.icon"
                  :title="route.children[0].meta.title" />
              </template>
              <template v-else>
                <el-image :src="route.children[0].meta.imgUrl" style="height:60px;width:60px"></el-image>
              </template>
            </app-link>
          </el-menu-item>

        </template>
        <!---a标签--->
        <template v-else>
          <el-menu-item :key="index" :index="resolvePath(route.path,'')">
            <app-link :to="resolvePath(route.path,'')" style="display:block;">
              <template v-if="route.meta && !route.meta.imgUrl">
                <item v-if="route.meta" :icon="route.meta && route.meta.icon" :title="route.meta.title" />
              </template>
              <template v-else>
                <el-image :src="route.meta.imgUrl" style="height:60px;width:60px"></el-image>
              </template>
            </app-link>
          </el-menu-item>
        </template>
      </template>
    </template>
  </el-menu>
</template>


<script>
  import MenuItemGroup from './MenuItemGroup'
  import Item from './Item'
  import AppLink from './Link'
  import path from 'path'
  import {
    isExternal
  } from '@/utils/validate'
  export default {
    data() {
      return {
        menuItems: [{
            icon: "el-icon-s-home",
            index: "dashboard",
            title: "首页"
          },
          {
            icon: "el-icon-question",
            index: "baseform",
            title: "测试页面",
            subs: [{
                index: "baseform",
                title: "表单"
              },
              {
                index: "2-1",
                title: "图片",
                subs: [{
                  index: "showimg",
                  title: "头像"
                }]
              }
            ]
          },
          {
            icon: "el-icon-info",
            index: "error",
            title: "错误页面",
            subs: [{
                index: "/error/401",
                title: "401"
              },
              {
                index: "/error/404",
                title: "404"
              }
            ]
          },
        ]
      };
    },
    mounted() {
      console.log("routes列表", this.routes, this.$router, this.$route)
    },
    components: {
      AppLink,
      MenuItemGroup,
      Item
    },
    computed: {
      routes() {
        return this.$router.options.routes
      },
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
          return routePath
        }
        if (isExternal(basePath)) {
          return basePath
        }
        return path.resolve(basePath, routePath)
      },
    }
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
    padding: 0 10px;
  }

  .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
  }

  .el-menu-item {
    padding: 0 10px;
  }

  /* ::v-deep .el-icon-arrow-down:before {
    content: "";
  } */
</style>