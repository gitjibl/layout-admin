<template>
    <div>
        <h1>Level 1</h1>
        <i :class="lev && lev.icon"></i>
        <!-- {{lev1 && lev.icon}} -->
    </div>
</template>
<script>
    export default {
        name: "Level1",
        data() {
            return {
                lev1:null,
                lev: {
                    icon: "el-icon-platform-eleme"
                }
  
            }
        }
    }
</script>