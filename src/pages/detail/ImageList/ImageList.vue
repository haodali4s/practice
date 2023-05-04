<template>
  <div class="swiper" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in list" :key="index" @mouseover="getindex(index)" @click="select(index)">
        <img :src="slide.imgUrl" :class="{ active: currentIndex == index }" />
      </div>
    </div>

    <div class="swiper-button-next" @click="add"></div>
    <div class="swiper-button-prev" @click="minus"></div>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from "swiper";
import throttle from "lodash/throttle";
export default {
  name: "ImageList",
  props: ["list"],
  data() {
    return {
      //控制小图类名的索引值
      currentIndex: 0
    };
  },
  watch: {
    //floor是父组件给与的props:它的props属性值从来没有变化过！！！！
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          //初始化Swiper类的实例

          //初始化Swiper类的实例
          var mySwiper = new Swiper(this.$refs.cur, {
            //设置轮播图防线
            direction: "horizontal",
            // loop:true,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },
            //展示区域同时展示三张图片
            slidesPerView: 3
          });
        });
      }
    }
  },
  methods: {
    getindex: throttle(function(index) {
      //修改响应式数据
      this.currentIndex = index;
    }, 10),
    select: throttle(function(index) {
      //修改响应式数据
      this.$bus.$emit("sendIndex", this.currentIndex);
    }, 10),

    minus() {
      this.currentIndex--;
      if (this.currentIndex <= 0) this.currentIndex = 0;
      this.$bus.$emit("sendIndex", this.currentIndex);
    },
    add() {
      this.currentIndex++;
      if (this.currentIndex >= this.list.length - 1) {
        this.currentIndex = this.list.length - 1;
      }
      this.$bus.$emit("sendIndex", this.currentIndex);
    }
  }
};
</script>

<style lang="less" scoped>
.swiper {
  height: 56px;
  width: 402px;
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
    z-index: 10;
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