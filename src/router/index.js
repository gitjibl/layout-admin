import Vue from "vue";
import Router from "vue-router";
import EmptyLayout from '@/layout/EmptyLayout'
/*
  name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  hidden: true // (默认 false) 当设置 true 的时候该路由不会在侧边栏出现 如401
  alwaysShow: true,//如果未设置alwaysShow，则当项目有一个子路由时 会显示子路由
  powerShow:true,//权限保持显示
  oneSubmenu：true, //单一菜单
  meta: {
    hidden: false,
    title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
    imgUrl:"" //一级菜单图片路径 (代替icon)
    icon: 'svg-name' //设置该路由的图标
    noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix:false //tag是否隐藏关闭 默认false（显示关闭icon）、
  }

 */
Vue.use(Router);
/* Layout */
import Layout from '@/layout'
/**
 * 静态路由
 * 没有权限要求的基本页
 */
export const constantRoutes = [
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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/dashboard'),
      name: 'Dashboard',
      meta: {
        title: '控制台',
        // icon: 'el-icon-s-home',
        imgUrl: require('@/assets/imgs/home.png'),
        affix: true
      }
    }]
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
      component: () => import('@/views/error/401'),
      meta: {
        title: 'page401',
        // icon: 'el-icon-warning'
      },
    },
    {
      path: '404',
      name: 'Error404',
      component: () => import('@/views/error/404'),
      meta: {
        title: 'page404',
        // icon: 'el-icon-warning'
      },
    }
    ],
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
/**
 *  动态路由
 *  需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // 测试页面
  {
    path: '/test',
    name:'Test',
    alwaysShow: true,
    component: Layout,
    meta: {
      title: '测试页面',
      icon: 'el-icon-s-help',
      // imgUrl:require('@/assets/imgs/home.png'),
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
        component: () => import('@/views/level/level3'),
        meta: {
          title: 'Level3-1'
        }
      }]
    }, {
      path: 'showimg',
      name: 'Showimg',
      component: () => import('@/views/showimg'),
      meta: {
        title: '头像'
      }
    }, {
      path: 'baseform',
      name: 'Baseform',
      component: () => import('@/views/baseform/baseform'),
      meta: {
        title: '表单'
      },
    },]
  }, 
  {
    path: 'external-link',
    oneSubmenu:true,
    component: Layout,
    children: [{
      name:'External-link',
      path: 'https://www.baidu.com/',
      meta: {
        title: 'External Link',
        icon: 'el-icon-s-promotion'
      }
    }]
  }, 
  {
    path: '/level1',
    name:'/Level1',
    component: Layout,
    alwaysShow: true,
    // powerShow:true,
    meta: { title: 'Level1', icon: 'el-icon-s-help',},
    children: [{
      // powerShow:true,
      path: 'index',
      name: 'Level1-1',
      component: () => import('@/views/level/level1'),
      meta: {
        title: 'Level1-1',
        icon: 'el-icon-s-data'
      }
    }]
  },
]
// const router = new Router({
//   mode: "hash",
//   base: process.env.BASE_URL,
//   routes: constantRoutes
// });
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
