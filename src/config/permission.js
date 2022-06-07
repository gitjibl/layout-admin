/*
 * @Descripttion: 
 * @Author: jibl
 * @Date: 2021-10-20 10:10:42
 * @LastEditors: jibl
 * @LastEditTime: 2022-06-07 11:32:10
 */
import router from '@/router'
import store from '@/store'
import {
    getLoginUser,
    getUserPermission
} from '@/utils/auth'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import defaultSettings from '@/config/settings'
const {
    EnablePower
} = defaultSettings
NProgress.configure({
    easing: 'ease',
    speed: 500,
    trickleSpeed: 200,
    showSpinner: false
})
/**
 * 路由守卫
 */
var flag = false;
router.beforeEach(async (to, from, next) => {
    //saveBlankPages是拥有三级菜单的二级菜单名称合集
    let saveBlankPages = ['Level2']
    //我拿取这个数据是在src\components\Breadcrumb这个目录下，找到所有的二级菜单缓存起来
    if (to.matched && to.matched.length > 2) {
        for (let i = 0; i < to.matched.length; i++) {
            const element = to.matched[i]
            const Index = saveBlankPages.findIndex((item) => {
                return item === element.name
            })
            if (Index >= 0) {
                to.matched.splice(i, 1)
            }
        }
    }
    //进度条开始
    NProgress.start()
    if (EnablePower) {
        var userInfo = store.state.user.userInfo
        if (userInfo.hasOwnProperty('loginName')) {
            console.log("用户已登录....")
            const hasRoles = store.getters.userPermissions && store.getters.userPermissions.loginName
            console.log("是否加载权限", hasRoles, store.getters.userPermissions)
            if (hasRoles) {
                next()
            } else {
                const userPermissions = await getUserPermission(userInfo.loginName, 'VUE-Layout');
                console.log("正在加载权限信息...", userPermissions.data)
                store.dispatch('user/setUserPermissions', userPermissions.data)
                // 获取动态路由
                const accessRoutes = await store.dispatch('permission/generateRoutes', {
                    roles: [],
                    permissions: userPermissions.data.permissionList
                })
                router.addRoutes(accessRoutes)
                next({
                    ...to,
                    replace: true
                })
            }
        } else {
            console.log("正在登录...")
            const userInfo = await getLoginUser();
            console.log("获取登录人信息", userInfo)
            store.dispatch('user/setUserInfo', userInfo.data)
            next({
                ...to,
                replace: true
            })
        }
    } else {
        if (flag) {
            next()
        } else {
            const accessRoutes = await store.dispatch('permission/generateRoutes', {
                roles: ['user_admin'],
                permissions: []
            })
            router.addRoutes(accessRoutes)
            flag = true
            next({
                ...to,
                replace: true
            })
        }
    }

})
//跳转完成之后执行
router.afterEach(() => {
    //结束
    NProgress.done()
})