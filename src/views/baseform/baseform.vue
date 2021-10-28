<template>
   <div>
       <h1>this is baseform</h1>
       <button @click="toImage">to img</button>
   </div>
</template>
<script>
export default {
    name:"Baseform",
    methods:{
        toImage(){
            this.$router.push({ name: 'showimg', params: { userId: 123 }})
        }
    },
    mounted(){
       
    }
}
</script>