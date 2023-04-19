<template>
  <div><typenav></typenav>
<listcontianer></listcontianer>
<recommend></recommend>
<rank></rank>
<like></like>
<floor></floor>
<floor></floor>
<brand></brand>
</div>
  <!-- 商品分类导航 -->

</template>

<script>
import listcontianer from './listcontianer.vue';
import recommend from './recommend.vue';
import like from './like.vue';
import rank from './rank.vue';
import brand from './brand.vue';
import floor from './floor.vue';

export default {
  components: {
    listcontianer,recommend,like,rank,brand,floor
  }
}
</script>

<style  lang="less" scoped>

</style>