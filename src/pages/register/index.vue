<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">
          我有账号，去
          <a>登陆</a>
        </span>
      </h3>
      <!-- 手机号 -->
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" name="phone" v-validate="{required:true,regex:/^1\d{10}$/}" :class="{invalid:errors.has('phone')}" />
        <span class="error-msg">{{errors.first('phone')}}</span>
      </div>
      <!-- 验证码 -->
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" name="code" v-validate="{required:true,regex:/^\d{6}$/}" :class="{invalid:errors.has('code')}" />
        <button style="height: 38px" @click="getCode">获取验证码</button>
        <span class="error-msg">{{errors.first('code')}}</span>
      </div>
      <!-- 登录密码 -->
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="password" name="password" v-validate="{required:true,regex:/^\w{8,20}$/}" :class="{invalid:errors.has('password')}" />
        <span class="error-msg">{{errors.first('password')}}</span>
      </div>
      <!-- 确认密码 -->
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="password1" name="password1" v-validate="{required:true,is:password}" :class="{invalid:errors.has('password1')}" />
        <span class="error-msg">{{errors.first('password1')}}</span>
      </div>
      <!-- 勾选协议 -->
      <div class="controls">
        <input name="agree" type="checkbox" :checked="agree" v-validate="{required:true,'tongyi':true}" :class="{invalid:errors.has('agree')}" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{errors.first('agree')}}</span>
      </div>
      <!-- 注册按钮 -->
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      //手机号
      phone: "",
      //存储验证码
      code: "",
      //登录密码
      password: "",
      //确认密码
      password1: "",
      //协议收集
      agree: true
    };
  },
  methods: {
    //获取验证码按钮的回调
    async getCode() {
      //先不处理表单验证业务
      if (this.phone) {
        try {
          //获取验证码成功
          console.log(this.phone);
          await this.$store.dispatch("getCode", this.phone);
          //修改VC身上的code属性,让验证码自动展示
          this.code = this.$store.state.user.code;
        } catch (error) {}
      }
    },
    //注册按钮的回调
    async register() {
      const success = await this.$validator.validateAll();
      if (success) {
        const { phone, code, password, password1 } = this;
        //目前不做表单验证
        if (phone && code && password == password1) {
          //通知vuex发请求，进行用户的注册
          try {
            //注册成功
            await this.$store.dispatch("registerUser", {
              phone,
              code,
              password
            });
            alert("注册成功");
            //让用户跳转到登录页面进行登录
            this.$router.push("/login");
          } catch (error) {
            //注册失败
            alert(error.message);
          }
        } else {
          alert("有未填的信息");
        }
      }
      //解构出参数
    }
  }
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>