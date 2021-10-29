<template>
    <div>
        <h1>this is baseform</h1>
        <button @click="toImage">to img</button>
    </div>
</template>
<script>
    export default {
        name: "Baseform",
        methods: {
            toImage() {
                console.log("visitedViews.....", this.visitedViews)
                let view = {
                    name: 'Showimg',
                    params: {
                        userId: 123
                    }
                };
                this.goRefreshCachedView(view)
            },
            /**
             * 跳转需要重新刷新的缓存页面
             */
            goRefreshCachedView(view) {
                let flag = this.visitedViews.filter(e => {
                    return e.name == view.name
                });
                if (flag.length == 0) {
                    this.$router.replace(view)
                } else {
                    this.$store.dispatch("tagsView/delCachedView", view).then(() => {
                        this.$nextTick(() => {
                            this.$router.replace(view)
                        });
                    });
                }
            },
        },
        computed: {
            visitedViews() {
                return this.$store.state.tagsView.visitedViews;
            },
        },
        mounted() {}
    }
</script>