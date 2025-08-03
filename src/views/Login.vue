<template>
  <div class="login">
    <!-- Header Section -->
    <div class="login-header">
      <div class="back-btn" @click="changeRouteHome">
        <i class="icon-back"></i> 
      </div>
      <div class="login-title">登录</div>
    </div>

    <!-- Logo Section -->
    <div class="logo-section">
      <img src="@/assets/image/logo.png" class="app-logo" alt="Logo" />
    </div>

    <!-- Login Form Container -->
    <div class="login-form-container">
      <div class="form-group">
        <div class="input-field">
          <img src="@/assets/image/user.png" class="input-icon" alt="" />
          <input 
            type="text" 
            :placeholder="$t('plusername')" 
            v-model="username" 
            class="form-input"
          />
        </div>
        
        <div class="input-field">
          <img src="@/assets/image/pwd.png" class="input-icon" alt="" />
          <input 
            type="password" 
            :placeholder="$t('plpassword')" 
            v-model="password" 
            class="form-input"
          />
        </div>

        <div class="checkbox-row">
          <label class="checkbox-container">
            <input type="checkbox" v-model="checked" class="checkbox-input" />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text">{{ $t("jizhumima") }}</span>
          </label>
        </div>

        <button class="login-button" @click="changeHome">
          {{ $t("denglu") }}
        </button>

        <div class="register-link">
          <span class="no-account">没有账号?</span>
          <span class="register-text" @click="changeRegister">立即注册</span>
        </div>
      </div>
    </div>

    <!-- Version Info -->
    <p class="app-version">{{ $t("dangqianbanben") }}：21.04.02</p>


  </div>
</template>

<script>
// @ is an alias to /src
import loginApi from "@/api/login";
import storeAction from "@/store/typed-actions";

export default {
  name: "Login",
  data() {
    return {
      checked: true,
      username: "",
      password: "",
    };
  },
  methods: {
    changeRegister() {
      this.$router.push({
        path: "/register",
      });
    },
    changeHome() {
      if (!this.username) {
        this.$toast(this.$t('plusername'));
      } else if (!this.password) {
        this.$toast(this.$t('plpassword'));
      } else {
        if (this.checked) {
          this.setCookie(this.username, this.password, 14);
        } else {
          this.setCookie("", "", -1);
        }
        loginApi
          .login(this.username, this.password)
          .then((data) => {
            console.log(data.data, this.$t('Tips.dlcg'));
            storeAction.loginDone(data.data);
          })
          .catch((err) => {
            this.$toast.clear();
            this.$toast.fail(err.msg);
          });
      }
    },




    changeRouteHome() {
      let that = this;
      storeAction.clearCurrentUserId();
      storeAction.clearToken();
      storeAction.delsessionStorage("id");
      storeAction.delsessionStorage("userId");
      storeAction.delsessionStorage("money");
      storeAction.delsessionStorage("idcard");
      storeAction.delsessionStorage("group_id");
      storeAction.setCurrentUserMoney(null);
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 500,
        onClose() {
          that.$router.push(`/`);
        },
      });
    },

    setCookie(name, pwd, exdays) {
      var exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    // 读取cookie 将用户名和密码回显到input框中
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === "userName") {
            this.username = arr2[1]; // 保存到保存数据的地方
            // 其中unescape() 方法是将字符串进行编码，escape()方法是将字符串进行解码。
          } else if (arr2[0] === "userPwd") {
            this.password = arr2[1];
          }
        }
      }
    },
  },
  created() {
    this.getCookie();
  },
};
</script>
<style lang="less" scoped>
.login {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

/* Header Section */
.login-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4vw 4vw 2vw;
  position: relative;
  box-sizing: border-box;
}

.back-btn {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 3.5vw;
  cursor: pointer;
  z-index: 10;
}

.icon-back {
  display: inline-block;
  width: 3vw;
  height: 3vw;
  border-left: 1px solid #333;
  border-bottom: 1px solid #333;
  transform: rotate(45deg);
  margin-right: 1vw;
}

.login-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4.5vw;
  font-weight: 500;
  color: #333;
}

/* Logo Section */
.logo-section {
  display: flex;
  justify-content: center;
  margin: 6vw 0 4vw;
  padding: 0 4vw;
}

.app-logo {
  width: 50vw;
  height: 20vw;
  object-fit: contain;
  border-radius: 2vw;
}

/* Login Form Container */
.login-form-container {
  flex: 1;
  padding: 0 4vw;
  margin-bottom: 4vw;
  box-sizing: border-box;
}

.form-group {
  background-color: #fff;
  border-radius: 4vw;
  padding: 6vw 4vw;
  box-shadow: 0 1vw 3vw rgba(0, 0, 0, 0.1);
}

.input-field {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2vw;
  padding: 3vw 3vw;
  margin-bottom: 3vw;
  box-sizing: border-box;
}

.input-icon {
  width: 5vw;
  height: 5vw;
  margin-right: 3vw;
  opacity: 0.6;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 4vw;
  background: transparent;
  color: #333;
}

.form-input::placeholder {
  color: #999;
}

/* Checkbox Styling */
.checkbox-row {
  margin-bottom: 5vw;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 4vw;
  height: 4vw;
  border: 1px solid #ddd;
  border-radius: 0.8vw;
  margin-right: 2vw;
  position: relative;
  background-color: #fff;
  flex-shrink: 0;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5vw;
  height: 2.5vw;
  background-color: #4CAF50;
  border-radius: 0.4vw;
}

.checkbox-text {
  color: #666;
  font-size: 3.5vw;
}

/* Login Button */
.login-button {
  width: 100%;
  background-color: #8B0000;
  color: #fff;
  border: none;
  border-radius: 2vw;
  padding: 4vw;
  font-size: 4vw;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 5vw;
  transition: background-color 0.3s;
  box-sizing: border-box;
}

.login-button:hover {
  background-color: #8B0000;
}

.login-button:active {
  background-color: #8B0000;
}

/* Register Link */
.register-link {
  text-align: center;
}

.no-account {
  color: #999;
  font-size: 3.5vw;
}

.register-text {
  color: #8B0000;
  font-size: 3.5vw;
  cursor: pointer;
  margin-left: 1vw;
}

.register-text:hover {
  text-decoration: underline;
}

/* Version Info */
.app-version {
  text-align: center;
  color: #999;
  font-size: 3vw;
  margin-top: auto;
  padding: 3vw;
}

/* Mobile specific adjustments */
@media screen and (max-width: 480px) {
  .login-header {
    padding: 3vw 3vw 1.5vw;
  }
  
  .back-btn {
    font-size: 3vw;
  }
  
  .icon-back {
    width: 2.5vw;
    height: 2.5vw;
  }
  
  .login-title {
    font-size: 4vw;
  }
  
  .app-logo {
    width: 55vw;
    height: 22vw;
  }
  
  .form-group {
    padding: 5vw 3vw;
  }
  
  .input-field {
    padding: 2.5vw 2.5vw;
  }
  
  .input-icon {
    width: 4.5vw;
    height: 4.5vw;
  }
  
  .form-input {
    font-size: 3.5vw;
  }
  
  .checkbox-custom {
    width: 3.5vw;
    height: 3.5vw;
  }
  
  .checkbox-text {
    font-size: 3vw;
  }
  
  .login-button {
    padding: 3.5vw;
    font-size: 3.5vw;
  }
  
  .no-account,
  .register-text {
    font-size: 3vw;
  }
  
  .app-version {
    font-size: 2.5vw;
  }
}

/* Prevent text zoom on iOS */
@media screen and (max-width: 480px) {
  .form-input {
    font-size: 16px;
  }
}

/* Large screen adjustments */
@media screen and (min-width: 768px) {
  .login-header {
    padding: 2vw 3vw 1vw;
  }
  
  .back-btn {
    font-size: 2.5vw;
  }
  
  .icon-back {
    width: 2vw;
    height: 2vw;
  }
  
  .login-title {
    font-size: 3vw;
  }
  
  .app-logo {
    width: 30vw;
    height: 12vw;
  }
  
  .form-group {
    padding: 4vw 3vw;
  }
  
  .input-field {
    padding: 2vw 2.5vw;
  }
  
  .input-icon {
    width: 3.5vw;
    height: 3.5vw;
  }
  
  .form-input {
    font-size: 3vw;
  }
  
  .checkbox-custom {
    width: 3vw;
    height: 3vw;
  }
  
  .checkbox-text {
    font-size: 2.5vw;
  }
  
  .login-button {
    padding: 3vw;
    font-size: 3vw;
  }
  
  .no-account,
  .register-text {
    font-size: 2.5vw;
  }
  
  .app-version {
    font-size: 2vw;
  }
}
</style>
