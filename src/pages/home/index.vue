<template>
  <div>
    <typenav></typenav>
    <listcontianer></listcontianer>
    <recommend></recommend>
    <rank></rank>
    <like></like>
    <floor v-for="(item,index) in floorList" :key="item.id" :floor="item"></floor>

    <brand></brand>
  </div>
  <!-- 商品分类导航 -->
</template>

<script>
import listcontianer from "./listcontianer.vue";
import recommend from "./recommend.vue";
import like from "./like.vue";
import rank from "./rank.vue";
import brand from "./brand.vue";
import floor from "./floor.vue";
import { mapState } from "vuex";
export default {
  components: {
    listcontianer,
    recommend,
    like,
    rank,
    brand,
    floor
  },
  mounted() {
    this.$store.dispatch("getFloorList");

  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    })},
};
</script>

<style  lang="less" scoped>
</style>