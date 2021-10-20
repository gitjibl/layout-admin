import Vue from "vue";
import VueRouter from "vue-router";
import EmptyLayout from '@/layout/EmptyLayout'
/*
  name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  meta: {
    roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
    title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
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
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect')
    }]
  },
  // 首页 控制台
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/dashboard'),
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'el-icon-s-home',
        affix: true
      }
    }, {
      path: '/baseform',
      name: 'baseform',
      component: resolve => require(['@/views/baseform/baseform.vue'], resolve),
      meta: {
        title: '表单'
      }
    }, {
      path: '/showimg',
      name: 'showimg',
      component: resolve => require(['@/views/showimg'], resolve),
      meta: {
        title: '头像'
      }
    }
  ]
  },
  {
    path: '/error',
    component: EmptyLayout,
    redirect: 'noRedirect',
    name: 'Error',
    meta: {
      title: '错误页',
      icon: 'bug'
    },
    children: [{
        path: '401',
        name: 'Error401',
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
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: constantRoutes
});

export default router;