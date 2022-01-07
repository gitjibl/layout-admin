<template>
  <div class="header">
    <!-- logo -->
    <div class="logo">
      <img src="@/assets/imgs/logo.gif">
    </div>
    <div class="title">后台管理系统</div>
    <div class="menu">
      <v-menu></v-menu>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?'取消全屏':'全屏'" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <!-- <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div> -->
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/assets/imgs/user.gif">
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" style="color: #ecf5ff" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/admin">
              <el-dropdown-item>用户信息</el-dropdown-item>
            </router-link>
            <el-dropdown-item command="password">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  import vMenu from "./Menu.vue";
  export default {
    data() {
      return {
        fullscreen: false, //全屏显示
        username: "测试用户",
        message: 2
      };
    },
    components: {
      vMenu
    },
    computed: {
      // username() {
      //   let username = localStorage.getItem("ms_username");
      //   return username ? username : this.name;
      // },
    },
    methods: {
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if (command == "loginout") {
          this.$router.push("/login");
        } else if (command == "password") {
          alert("修改密码");
        }
      },
      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    }
  };
</script>
<style scoped>
  .header {
    background-color: #095a91;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 65px;
    font-size: 22px;
    color: #fff;
  }

  .header .logo {
    float: left;
    display: flex;
    height: 65px;
    align-items: center;
    margin: 0px 5px 0px 10px;
  }

  .header .logo img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .header .title {
    float: left;
    width: 150px;
    line-height: 65px;
  }

  .header .menu {
    float: left;
    display: flex;
    height: 65px;
    align-items: center;
  }

  .header-right {
    float: right;
    padding-right: 20px;
  }

  .header-user-con {
    display: flex;
    height: 65px;
    align-items: center;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-bell,
  .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .btn-bell .el-icon-bell {
    color: #fff;
  }

  .user-name {
    margin-left: 5px;
  }

  .user-avator {
    margin-top: 5px;
  }

  .user-avator img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
</style>