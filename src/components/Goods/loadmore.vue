<template>
    <mt-loadmore :top-method="loadTop"  :bottom-method="loadBottom"  @top-status-change="handleTopChange" ref="loadmore">
        <ul>
            <li v-for="item in list">{{ item }}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
    </mt-loadmore>
</template>
<script>
  export default {
    data() {
      return {
        topStatus: '',
        list:[]
      };
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop(){
         this.$refs.loadmore.onTopLoaded();
      },
      loadBottom(){
         this.$refs.loadmore.onBottomLoaded();
      }
    }

  };
</script>



