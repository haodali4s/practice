<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="delindex">
      <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(a1,b) in categoryList" :key="a1.categoryId">
              <h3 @mouseenter="getindex(b)" :class="{current:currentindex==b}">
                <a :data-categoryName="a1.categoryName" :data-category1Id="a1.categoryId">{{ a1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix" :style="{display:currentindex==b?'block':'none'}">
                <div class="subitem" v-for="(a2,b) in a1.categoryChild" :key="a2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="a2.categoryName" :data-category2Id="a2.categoryId">{{ a2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="(a3,b) in a2.categoryChild" :key="a3.categoryId">
                        <a :data-categoryName="a3.categoryName" :data-category3Id="a3.categoryId">{{ a3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
  
<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  methods: {
    getindex: throttle(function(index) {
      //修改响应式数据
      this.currentindex = index;
      //鼠标进入事件,假如用户的行为过快,会导致项目业务丢失【里面业务有很多，可能出现卡顿现象】。
      //一句话：用户行为过快,浏览器反应不过来,导致业务丢失!!!!
      //函数的防抖与节流技术
      // console.log("处理业务" + index);
    }, 10),
    goSearch(event) {
      //第一个问题:div父节点子元素太多【h3、h2、em、dt、dd、dl...a】？你怎么知道你点击的一定是a
      //第二个问题:要区分一级分类、二级分类、三级分类的a标签【category1Id|category2Id|category2Id】
      let targetNode = event.target;

      //获取触发事件节点的自定义属性【a:data-categoryName】
      let {
        categoryname,
        category1id,
        category2id,
        category3id
      } = targetNode.dataset;
      //判断点击的是a【不管是1|2|3】
      if (categoryname) {
        //点击只要是a,就是往search模块跳转
        var locations = {
          name: "search",
          query: { categoryName: categoryname }
        };
        //一级分类的a
        if (category1id) {
          locations.query.category1Id = category1id;
        } else if (category2id) {
          //二级分类的a
          locations.query.category2Id = category2id;
        } else {
          //三级分类的a
          locations.query.category3Id = category3id;
        }

        //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
        /*<!-- if (this.$route.params.keyword) {
          locations.params = this.$route.params;
        } -->*/
        //目前商品分类这里携带参数只有query参数
        if (this.$route.params.keyword) {
          locations.params = this.$route.params;
        }
        this.$router.push(locations);
        this.show = false;
      }
    },
    delindex() {
      this.currentindex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    changeShow() {
      //鼠标进入:在search路由下,在修改数据
      if (this.$route.path != "/home") {
        this.show = true;
      }
    }
  },
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  data() {
    return {
      currentindex: -1,
      show: true
    };
  },

  computed: {
    ...mapState({
      categoryList: state => state.home.category
    })
  }
};
</script>
  
<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    a {
      color: #333;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 510px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            &.active {
              background: yellowgreen;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          /*温馨提示:豪哥不想利用样式控制二级、三级分类显示与隐藏,下面的代码进行注释*/
          /*&:hover {
            .item-list {
              display: block;
            }
          }
            */
        }
      }
      .current {
        background: skyblue;
      }
    }
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 510px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
