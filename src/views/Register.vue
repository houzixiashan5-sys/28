<template>
  <div class="register">
    <!-- Header Section -->
    <div class="register-header">
      <div class="back-btn" @click="changeHome">
        <i class="icon-back"></i> 
      </div>
      <div class="register-title">{{ $t("zhuce") }}</div>
    </div>

    <!-- Logo Section -->
    <div class="logo-section">
      <img src="@/assets/image/logo.png" class="app-logo" alt="Logo" />
    </div>

    <!-- Register Form Container -->
    <div class="register-form-container">
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

        <div class="input-field">
          <img src="@/assets/image/pwd.png" class="input-icon" alt="" />
          <input 
            type="password" 
            :placeholder= "$t('plquerenmima')"
            v-model="confirmPassword" 
            class="form-input"
          />
        </div>

        <div class="input-field">
          <img src="@/assets/center/inv.svg" class="input-icon" alt="" />
          <input 
            type="text" 
            :placeholder="$t('shuruyaoqingma')" 
            v-model="inviter_id" 
            class="form-input"
          />
        </div>

       <!-- <div class="input-field">
          <div class="dots-icon"></div>
          <input 
            type="text" 
            placeholder="请输入Telegram账号 (选填)" 
            v-model="telegramAccount" 
            class="form-input"
          />
        </div>-->

        <div class="action-links">
          <div class="login-link">
            <span class="has-account">{{ $t("yiyouzhanghao") }}?</span>
            <span class="login-text" @click="changeLogin">{{ $t("dengluzhanghao") }}</span>
          </div> 
        </div>

        <button class="register-button" @click="ChangeRegister">
          {{ $t("zhuce") }}
        </button>
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
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      inviter_id: "",
      telegramAccount: "",
    };
  },
  methods: {
    changeLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    changeHome() {
      this.$router.push({
        path: "/",
      });
    },
    ChangeRegister() {
      if (!this.username) {
        this.$toast(this.$t('plusername'));
      } else if (!this.password) {
        this.$toast(this.$t('plpassword'));
      } else if (!this.confirmPassword) {
        this.$toast(this.$t('plquerenmima'));
      } else if (this.password !== this.confirmPassword) {
       this.$toast(this.$t('Tips.buyizhi'));
      } else {
        loginApi
          .register(this.username, this.password, "1", this.inviter_id)
          .then((data) => {
            console.log(data.data, this.$t('wanchengzhuce'));
            storeAction.loginDone(data.data);
          })
          .catch((err) => {
            this.$toast.clear();
            this.$toast.fail(err.msg);
          });
      }
    },
  },
  mounted() {
    // http://localhost:8080/register?inviter_id=37
    console.log(this.$route.query.inviter_id);
    this.inviter_id = this.$route.query.inviter_id;
  },
};
</script>
<style lang="less" scoped>
.register {
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
.register-header {
 height: 12vw;
 padding: 0 4vw;
 display: flex;
 align-items: center;
 position: relative;
 box-sizing: border-box;
 background-color: #8B0000;// 添加背景色为暗红
}

.back-btn {
  display: flex;
  align-items: center;
  color: #fff; // 修改为白色
  font-size: 3.5vw;
  cursor: pointer;
  z-index: 10;
}

.icon-back {
  display: inline-block;
  width: 3vw;
  height: 3vw;
  border-left: 1px solid #fff;  // 改为白色箭头
  border-bottom: 1px solid #fff; // 改为白色箭头
  transform: rotate(45deg);
  margin-right: 1vw;
}

.register-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4.5vw;
  font-weight: 500;
  color: #fff; // 修改为白色
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

/* Register Form Container */
.register-form-container {
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
  position: relative;
}

.form-group::before {
  content: '';
  position: absolute;
  bottom: 2vw;
  left: 2vw;
  width: 8vw;
  height: 8vw;
  background: linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
  border-radius: 50%;
  z-index: 0;
}

.form-group::after {
  content: '';
  position: absolute;
  bottom: 4vw;
  right: 2vw;
  width: 6vw;
  height: 6vw;
  background: linear-gradient(45deg, rgba(76, 175, 80, 0.08), rgba(76, 175, 80, 0.03));
  border-radius: 50%;
  z-index: 0;
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
  position: relative;
  z-index: 1;
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

/* Action Links */
.action-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5vw;
  position: relative;
  z-index: 1;
}

.login-link {
  display: flex;
  align-items: center;
}

.has-account {
  color: #999;
  font-size: 3.5vw;
}

.login-text {
  color: #8B0000;
  font-size: 3.5vw;
  cursor: pointer;
  margin-left: 1vw;
}

.login-text:hover {
  text-decoration: underline;
}

.customer-service {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.service-icon {
  width: 4vw;
  height: 4vw;
  margin-right: 1vw;
  opacity: 0.7;
}

.service-text {
  color: #2196F3;
  font-size: 3.5vw;
}

/* Register Button */
.register-button {
  width: 100%;
  background-color: #8B0000;
  color: #fff;
  border: none;
  border-radius: 2vw;
  padding: 4vw;
  font-size: 4vw;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.register-button:hover {
  background-color: #8B0000;
}

.register-button:active {
  background-color: #8B0000;
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
  .register-header {
    padding: 3vw 3vw 1.5vw;
  }
  
  .back-btn {
    font-size: 3vw;
  }
  
  .icon-back {
    width: 2.5vw;
    height: 2.5vw;
  }
  
  .register-title {
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
  
  .has-account,
  .login-text,
  .service-text {
    font-size: 3vw;
  }
  
  .service-icon {
    width: 3.5vw;
    height: 3.5vw;
  }
  
  .register-button {
    padding: 3.5vw;
    font-size: 3.5vw;
  }
  
  .app-version {
    font-size: 2.5vw;
  }
}

/* Large screen adjustments */
@media screen and (min-width: 768px) {
  .register-header {
    padding: 2vw 3vw 1vw;
  }
  
  .back-btn {
    font-size: 2.5vw;
  }
  
  .icon-back {
    width: 2vw;
    height: 2vw;
  }
  
  .register-title {
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
  
  .has-account,
  .login-text,
  .service-text {
    font-size: 2.5vw;
  }
  
  .service-icon {
    width: 3vw;
    height: 3vw;
  }
  
  .register-button {
    padding: 3vw;
    font-size: 3vw;
  }
  
  .app-version {
    font-size: 2vw;
  }
}

/* Prevent text zoom on iOS */
@media screen and (max-width: 480px) {
  .form-input {
    font-size: 16px;
  }
}
</style>
