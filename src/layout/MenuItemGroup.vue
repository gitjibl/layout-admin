<!--2 3级... 菜单递归-->
<template>
    <div v-if="!item.hidden" style="height:100%">
        <div v-if="item.children && item.children.length>0 && !item.isLevelOne">
            <el-submenu :index="resolvePath(item.path)">
                <template slot="title">
                    <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
                </template>
                <MenuItemGroup v-for="(e,i) in item.children" :key="i" :item="e" :base-path="resolvePath(item.path)">
                </MenuItemGroup>
            </el-submenu>
        </div>
        <div v-else style="height:100%;">
            <app-link :to="resolvePath(item.path)" style="height:100%">
                <el-menu-item :index="resolvePath(item.path)" style="height:100%">
                    <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
                </el-menu-item>
            </app-link>
        </div>
    </div>
</template>
<script>
    import path from 'path'
    import {
        isExternal
    } from '@/utils/validate'
    import Item from './Item'
    import AppLink from './Link'
    export default {
        name: 'MenuItemGroup',
        data() {
            return {}
        },
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        components: {
            Item,
            AppLink
        },
        methods: {
            resolvePath(routePath) {
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(this.basePath)) {
                    return this.basePath
                }
                return path.resolve(this.basePath, routePath)
            },
        }
    }
</script>
<style scoped>
    .el-menu-item {
        padding: 0 10px;
    }
</style>