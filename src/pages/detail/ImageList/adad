<template>
  <div class="swiper" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in list" :key="index">
        <img :src="slide.imgUrl" :class="{ active: currentIndex == index }" @mouseover="getindex(index)" />
      </div>
    </div>
    <div class="swiper-button-next" @click="add"></div>
    <div class="swiper-button-prev" @click="minus"></div>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from "swiper";
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ImageList",
  props: ["list"],
  data() {
    return {
      //控制小图类名的索引值
      currentIndex: -1
    };
  },
  methods: {
    getindex: throttle(function(index) {
      //修改响应式数据
      this.currentindex = index;
      console.log(this.currentindex, index);
      // this.$bus.$emit("sendIndex", index);
      //鼠标进入事件,假如用户的行为过快,会导致项目业务丢失【里面业务有很多，可能出现卡顿现象】。
      //一句话：用户行为过快,浏览器反应不过来,导致业务丢失!!!!
      //函数的防抖与节流技术
      // console.log("处理业务" + index);
    }, 10)
    //小图的点击事件
    // minus() {
    //   this.currentIndex--;
    //   if (this.currentIndex <= 0) this.currentIndex = 0;
    //   this.$bus.$emit("sendIndex", this.currentIndex);
    // },
    // add() {
    //   this.currentIndex++;
    //   if (this.currentIndex >= this.skuInfo.skuImageList.length - 1) {
    //     this.currentIndex = this.skuInfo.skuImageList.length - 1;
    //   }
    //   this.$bus.$emit("sendIndex", this.currentIndex);
    // }
  }
};
</script>

<style lang="less" scoped>
.swiper {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
        cursor: pointer;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>