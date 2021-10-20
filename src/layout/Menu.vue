<template>
  <el-menu class="el-menu-demo" mode="horizontal" :default-active="activeMenu" background-color="rgb(10, 141, 230)"
    text-color="#f5f7fa" active-text-color="#67c23a" unique-opened router>
    <template v-for="item in menuItems">
      <template v-if="item.subs">
        <el-submenu :index="item.index+''" :key="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <el-submenu v-if="subItem.subs" :index="subItem.index+''" :key="subItem.index">
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
    </template>
  </el-menu>
</template>


<script>
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
            index: "2",
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
    computed: {
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
</style>