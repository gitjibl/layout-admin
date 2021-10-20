import router from '@/router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条
NProgress.configure({
    easing: 'ease',
    speed: 500,
    trickleSpeed: 200,
    showSpinner: false
}) // 进度条
router.beforeEach((to, from, next) => {
    //进度条开始
    NProgress.start()
    next()
})

//跳转完成之后执行
router.afterEach(() => {
    //结束
    NProgress.done()
})