<template>
    <ul>
        <slot></slot>
    </ul>
</template>

<script>
export default {
  name: 'my-ul',
  data () {
    return {

    }
  }
}

</script>

<style scoped>
     ul{
        margin:0;
        padding:0;
        list-style:none;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        text-align:center;
    }
</style>


