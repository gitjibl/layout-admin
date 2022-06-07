import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 判断当前用户是否具有菜单权限
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
  //  console.log(permissions, route,"permissions, route")
  if (route.powerShow) {
    return true;
  } else if (route.meta) {
    return permissions.find(e => {
      return e.menuCode == route.name
    })
  } else {
    return true
  }

}
/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param permissions
 */
export function filterAsyncRoutes(routes, permissions) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
      }
      if(tmp.oneSubmenu && tmp.children.length == 0){
        
      }else{
        res.push(tmp)
      }
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, { roles, permissions }) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('user_admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
      }
      console.log("accessedRoutes", accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
