<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <typenav></typenav>
    <section class="con">
      <!-- 导航路径区域:面包屑 -->
      <div class="conPoin">
        <!-- 程序的警告:categoryView是undefined,它是vuex给的 -->
        <span v-show="categoryView.category1Name">{{ categoryView.category1Name }}</span>
        <span v-show="categoryView.category2Name">{{ categoryView.category2Name }}</span>
        <span v-show="categoryView.category3Name">{{ categoryView.category3Name }}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :list="skuInfo.skuImageList" v-if="skuInfo.skuImageList != null"></Zoom>
          <!-- 小图列表 -->
          <ImageList :list="skuInfo.skuImageList" v-if="skuInfo.skuImageList != null"></ImageList>
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{ skuInfo.skuName }}</h3>
            <p class="news">{{ skuInfo.skuDesc }}</p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <!--代表的是某一个数字的多少幂-->
                  <em>{{ skuInfo.id ** 2 }}</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray">{{ skuInfo.createTime }}</em>
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
                <div class="fixWidth">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <!--这里是商品销售属性的地方-->
              <dl v-for="(saleAttr, index) in spuSaleAttrList" :key="saleAttr.id">
                <dt class="title">{{ saleAttr.saleAttrName }}</dt>
                <!--每一个销售属性的属性值的地方-->
                <dd
                  changepirce="0"
                  :class="{ active: saleAttrValue.isChecked == 1 }"
                  v-for="(
                      saleAttrValue, index
                    ) in saleAttr.spuSaleAttrValueList"
                  :key="saleAttrValue.id"
                  @click="changeChecked(saleAttrValue, saleAttr.spuSaleAttrValueList)
                      "
                >{{ saleAttrValue.saleAttrValueName }}</dd>
              </dl>
            </div>
            <div class="cartWrap">
              <!-- 购物商品个数的操作地方 -->
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="skuNum" @change="handler" />
                <a href="javascript:" class="plus" @click="skuNum++">+</a>
                <a href="javascript:" class="mins" @click="skuNum > 1 ? skuNum-- : 1">-</a>
              </div>
              <div class="add">
                <!--点击加入购物车按钮:不能用声明式导航,第一个：要发请求（有业务）-->
                <a @click="addOrUpdateCart">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";
//通过辅助函数获取数据
import { mapGetters } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      //控制商品购买个数
      skuNum: 1
    };
  },
  components: {
    ImageList,
    Zoom
  },
  mounted() {
    //派发action:详情模块发请求需要携带商品的id
    this.$store.dispatch("getDetailInfo", this.$route.params.spid);
  },
  computed: {
    ...mapGetters(["categoryView", "skuInfo", "spuSaleAttrList"])
  },
  methods: {
    changeChecked(saleAttrValue, arr) {
      //响应式数据:对象、数组
      //数组的响应式数据:变更、替换【基本类型数据、引用类型对象响应式的】
      //数组里面是基本类型数据：替换、变更    如果对象，不管你怎么玩都是相应的!!!!
      //排他操作
      //底下的代码:修改数组里面的对象【相应的式的】,数据变化视图跟这变化！！！
      arr.forEach(item => {
        item.isChecked = "0";
      });
      saleAttrValue.isChecked = "1";
    },
    //数量的表单元素的change回调
    handler(e) {
      //通过event事件对象获取用户输入内容[用户输入的内容一定是字符串类型的数据]
      let value = e.target.value * 1;
      //用户输入进来非法情况判断
      if (isNaN(value) || value < 1) {
        this.skuNum = 1;
      } else {
        //正常情况
        this.skuNum = parseInt(value);
      }
    },
    //加入购物车按钮
    async addOrUpdateCart() {
      //派发action:携带的载荷，分别商品的id、商品个数
      //思考底下的这行代码实质做了一个什么事情?
      //实质就是调用了小仓库里面相应的这个函数->addOrUpdateCart,声明部分加上asyc,这个函数执行的结构一定是Promise
      //返回结果是一个Promise对象【三种状态:pending、成功、失败】，返回状态到底是什么，取决于这个函数addOrUpdateCart返回结果
      try {
        //成功干什么
        await this.$store.dispatch("addOrUpdateCart", {
          skuId: this.$route.params.spid,
          skuNum: this.skuNum
        });
        //路由跳转:携带参数,携带参数一般都是基本类型数据【字符串、数字等等】，引用类型数据白扯【传递过来路由获取不到】！！！
        //浏览器存储功能，在路由跳转在之前，存储到浏览器中
        // sessionStorage.setItem("SKUINFO", JSON.stringify(this.skuInfo));
        // //路由跳转
        // this.$router.push({
        //   path: "/addcartsuccess",
        //   query: { skuNum: this.skuNum }
        // });
        var attribute = {};
        for (var i of this.spuSaleAttrList) {
          for (var j of i.spuSaleAttrValueList) {
            if (j.isChecked == "1") {
              attribute[j.saleAttrName] = j.saleAttrValueName;
              break;
            }
          }
        }

        sessionStorage.setItem("other", JSON.stringify(attribute));
        sessionStorage.setItem("name", this.skuInfo.skuDesc);
        sessionStorage.setItem("id", this.skuInfo.id);
        sessionStorage.setItem("num", this.skuNum);
        sessionStorage.setItem("pic", this.skuInfo.skuDefaultImg);
        this.$router.push({ name: "addcartsuccess" });
      } catch (error) {
        //失败干什么
        alert(error);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &:hover {
                  cursor: pointer;
                }
                &.active {
                  color: green;
                  border: 1px solid green;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;
              &:hover {
                cursor: pointer;
              }

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .product-detail {
    width: 1200px;
    margin: 30px auto 0;
    overflow: hidden;

    .aside {
      width: 210px;
      float: left;
      border: 1px solid #ccc;

      .tabWraped {
        height: 40px;

        h4 {
          border-top: 3px solid #fff;
          float: left;
          line-height: 37px;
          width: 105px;
          text-align: center;
          border-bottom: 1px solid #ccc;

          &.active {
            border-top: 3px solid #e1251b;
            border-bottom: 0;
            font-weight: normal;
          }
        }
      }

      .tabContent {
        padding: 10px;

        .tab-pane {
          display: none;

          &.active {
            display: block;
          }

          &:nth-child(1) {
            .partList {
              overflow: hidden;

              li {
                width: 50%;
                float: left;
                border-bottom: 1px dashed #ededed;
                line-height: 28px;
              }
            }

            .goodsList {
              & > li {
                margin: 5px 0 15px;
                border-bottom: 1px solid #ededed;
                padding-bottom: 5px;

                .list-wrap {
                  .p-img {
                    text-align: center;

                    img {
                      width: 152px;
                    }
                  }

                  .price {
                    font-size: 16px;
                    color: #c81623;
                  }

                  .operate {
                    text-align: center;
                    margin: 5px 0;

                    a {
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;
                      display: inline-block;
                      padding: 2px 14px;
                      line-height: 18px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail {
      width: 980px;
      float: right;

      .fitting {
        border: 1px solid #ddd;
        margin-bottom: 15px;

        .kt {
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          padding: 5px 0 5px 15px;
        }

        .good-suits {
          height: 170px;
          padding-top: 10px;

          .master {
            width: 127px;
            height: 165px;
            text-align: center;
            position: relative;
            float: left;

            img {
              width: 87px;
            }

            p {
              color: #c81623;
              font-size: 16px;
              font-weight: 700;
            }

            i {
              position: absolute;
              top: 48px;
              right: -25px;
              font-size: 16px;
            }
          }

          .suits {
            width: 668px;
            height: 165px;
            float: left;

            .suitsItem {
              float: left;
              width: 127px;
              padding: 0 20px;
              text-align: center;

              img {
                width: 120px;
                height: 130px;
              }

              p {
                font-size: 12px;
              }

              label {
                display: block;
                position: relative;

                input {
                  vertical-align: middle;
                }

                span {
                  vertical-align: middle;
                }
              }
            }
          }

          .result {
            border-left: 1px solid #ddd;
            width: 153px;
            height: 165px;
            padding-left: 20px;
            float: left;

            .num {
              font-size: 14px;
              margin-bottom: 10px;
              margin-top: 10px;
            }

            .price-tit {
              font-weight: bold;
              margin-bottom: 10px;
            }

            .price {
              color: #b1191a;
              font-size: 16px;
              margin-bottom: 10px;
            }

            .addshopcar {
              background-color: #e1251b;
              border: 1px solid #e1251b;
              padding: 10px 25px;
              font-size: 16px;
              color: #fff;
              display: inline-block;
              box-sizing: border-box;
            }
          }
        }
      }

      .intro {
        .tab-wraped {
          background: #ededed;
          // border: 1px solid #ddd;
          overflow: hidden;

          li {
            float: left;

            & + li > a {
              border-left: 1px solid #ddd;
            }

            &.active {
              a {
                // border: 0;
                background: #e1251b;
                color: #fff;
              }
            }

            a {
              display: block;
              height: 40px;
              line-height: 40px;
              padding: 0 11px;
              text-align: center;
              color: #666;
              background: #fcfcfc;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
            }
          }
        }

        .tab-content {
          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .goods-intro {
                padding-left: 10px;

                li {
                  margin: 10px 0;
                }
              }

              .intro-detail {
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>