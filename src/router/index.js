import Vue from "vue";
import VueRouter from "vue-router";
import EmptyLayout from '@/layout/EmptyLayout'
/*
  name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  hidden: true // (默认 false) 当设置 true 的时候该路由不会在侧边栏出现 如401
  isLevelOne:true //(默认 false) 显示一级菜单
  meta: {
    //roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
    hidden: true,
    title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
    imgUrl:"" //一级菜单图片路径 (代替icon)
    icon: 'svg-name' //设置该路由的图标
    noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix:false //tag是否隐藏关闭 默认false（显示关闭icon）、
  }

 */
Vue.use(VueRouter);
/* Layout */
import Layout from '@/layout'
const constantRoutes = [
  // 刷新页面
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect')
    }]
  },
  // 首页 控制台
  {
    path: '/',
    component: Layout,
    isLevelOne: true,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/dashboard'),
      name: 'Dashboard',
      meta: {
        title: '控制台',
        icon: 'el-icon-s-home',
        // imgUrl:require('@/assets/imgs/zwgl.png'),
        affix: true
      }
    }]
  },
  // 测试页面
  {
    path: '/test',
    component: Layout,
    meta: {
      title: '测试页面',
      icon: 'el-icon-s-help',
      // imgUrl:require('@/assets/imgs/zwgl.png'),
    },
    children: [{
      path: 'level2',
      name: 'Level2',
      component: EmptyLayout,
      meta: {
        title: 'Level2'
      },
      children: [{
        path: 'level3-1',
        name: 'Level3-1',
        component: resolve => require(['@/views/level/level3'], resolve),
        meta: {
          title: 'Level3-1'
        }
      }, {
        path: 'level3-2',
        name: 'level3-2',
        component: resolve => require(['@/views/level/level3'], resolve),
        meta: {
          title: 'level3-2'
        }
      }]
    }, {
      path: 'showimg',
      name: 'Showimg',
      component: resolve => require(['@/views/showimg'], resolve),
      meta: {
        title: '头像'
      }
    }, {
      path: 'baseform',
      name: 'Baseform',
      component: resolve => require(['@/views/baseform/baseform'], resolve),
      meta: {
        title: '表单'
      },
    }, ]
  },
  {
    path: '/error',
    component: EmptyLayout,
    // hidden: true,
    name: 'Error',
    meta: {
      title: '错误页',
      icon: 'el-icon-warning'
    },
    children: [{
        path: '401',
        name: 'Error401',
        hidden: true,
        component: () => import('@/views/error/401'),
        meta: {
          title: '401'
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/error/404'),
        meta: {
          title: '404'
        },
      },
    ],
  },
  {
    path: 'https://www.baidu.com/',
    name: 'a便签测试',
    meta: {
      title: 'a便签测试',
      icon: 'el-icon-s-promotion',
      // imgUrl:require('@/assets/imgs/user.gif'),
    },
  },

  {
    path: '/level1',
    name: 'Level1',
    component: Layout,
    isLevelOne: true,
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/level/level1'),
      meta: {
        title: 'Level1',
        // imgUrl:require('@/assets/imgs/zwgl.png'),
        icon: 'el-icon-s-data'
      }
    }]
  },

  //可以暴露外部路由
  // {
  //   path: '/out/401',
  //   name: 'Error401',
  //   hidden: true,
  //   component: () => import('@/views/error/401'),
  // },
  // {
  //   path: '/out/level1',
  //   name: 'Level1',
  //   hidden: true,
  //   component: () => import('@/views/level/level1'),
  // }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: constantRoutes
});

export default router;