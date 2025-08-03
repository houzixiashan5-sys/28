<template>
  <div class="setSecurityCode">
    <div class="settingwarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">{{$t('shezhianquanma')}}</div>
          <div class="right">
            <div class="bg-icon bg-icon-setting"></div>
          </div>
        </div>
        <div class="blockHeight"></div>
      </header>
      <div class="g-content">
        <!-- 第一次设置安全码显示这个 -->
        <template v-if="setCode == 'false'">
          <div class="form-container">
            <div class="form-header">
              <div class="form-icon">
                <van-icon name="shield-o" color="#8B0000" size="32px" />
              </div>
              <h3 class="form-title">{{$t('shezhianquanma')}}</h3>
              <p class="form-subtitle">请设置您的安全码</p>
            </div>
            
            <div class="security-input-container">
              <div class="lock-bg">
                <div class="paycode">
                  <van-password-input
                    :value="new_code"
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"
                    class="custom-password-input"
                  />
                  <van-number-keyboard
                    v-model="new_code"
                    :show="showKeyboard"
                    @blur="showKeyboard = false"
                    class="custom-keyboard"
                  />
                </div>
                <p class="security-tips">
                  {{$t('anquanmaTps')}}
                </p>
              </div>
            </div>
            
            <div class="tips-container">
                              <div class="tips-icon">
                  <van-icon name="info-o" color="#8B0000" size="16px" />
                </div>
              <div class="tips c_a0a0a0">
                {{$t('anquanmaTpsTow')}}
              </div>
            </div>
          </div>
        </template>
        
        <!-- 后续修改安全码显示这个 -->
        <template v-if="setCode == 'true'">
          <div class="form-container">
            <div class="form-header">
              <div class="form-icon">
                <van-icon name="edit" color="#8B0000" size="32px" />
              </div>
              <h3 class="form-title">{{$t('shezhianquanma')}}</h3>
              <p class="form-subtitle">请修改您的安全码</p>
            </div>
            
            <div class="form">
              <div class="input-group">
                <van-field
                  v-model="after_code"
                  type="password"
                  :placeholder="$t('planquanma')"
                  class="custom-field"
                >
                  <template #label>
                    <span class="addtitle">{{$t('yuananquanma')}}</span>
                  </template>
                </van-field>
              </div>
              
              <div class="input-group">
                <van-field
                  v-model="new_code"
                  maxlength="6"
                  type="password"
                  :placeholder="$t('plxinanquanma')"
                  class="custom-field"
                >
                  <template #label>
                    <span class="addtitle">{{$t('xinanquanma')}}</span>
                  </template>
                </van-field>
              </div>
            </div>
          </div>
          
          <div class="finish-btn">
            <van-button
              type="primary"
              round
              block
              class="Btnlogin"
              @click="setSafety"
            >
              <van-icon name="success" color="#fff" size="16px" style="margin-right: 0.1rem;" />
              {{$t('queren')}}
            </van-button>
          </div>
        </template>
      </div>
    </div>
    <alert-pop
      :alertType="3"
      :Tips="TipsTxt"
      v-if="PopAlert"
      @showAletfalse="showAletfalse"
    ></alert-pop>
  </div>
</template>
<script>
import AlertPop from "@/components/alert/AlertPop.vue";
import userApi from "@/api/user";
export default {
  name: "SetSecurityCode",
  components: {
    AlertPop,
  },
  data() {
    return {
      PopAlert: false,
      setCode: null,
      showKeyboard: true,
      value: "",
      new_code: "",
      after_code: "",
      TipsTxt: this.$t('Tips.szcg'),
    };
  },
  watch: {
    new_code(value) {
      if (value.length === 6 && this.setCode == "false") {
        // 调用接口
        this.showKeyboard = false;
        this.$toast.loading({
          message: this.$t('jiazaizhong'),
          forbidClick: true,
          duration: 300,
        });

        userApi
          .setSafety(this.new_code, this.after_code)
          .then((data) => {
            console.log(data.data);
            this.PopAlert = true;
          })
          .catch((err) => {
            this.$toast.fail(err.msg);
          });
      }
    },
  },
  methods: {
    showAletfalse() {
      this.PopAlert = false;
      this.$router.go(-1);
    },
    changego() {
      this.$router.go(-1);
    },
    setSafety() {
      if (!this.after_code) {
        this.$toast(this.$t('planquanma'));
      } else if (!this.new_code && this.setCode) {
        this.$toast("plxinanquanma");
      } else {
        this.$toast.loading({
          message: this.$t('jiazaizhong'),
          forbidClick: true,
          duration: 0,
        });

        userApi
          .setSafety(this.new_code, this.after_code)
          .then((data) => {
            console.log(data.data);
            this.$toast.clear();
            this.PopAlert = true;
          })
          .catch((err) => {
            this.$toast.clear();
            this.$toast.fail(err.msg);
          });
      }
    },
  },
  mounted() {},
  created() {
    this.setCode = this.$route.query.isTrue;
  },
};
</script>
<style lang="less" scoped>
.setSecurityCode {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
}

.settingwarp {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.g-header {
  position: relative;
  width: 100%;
  height: 1.18rem;
  text-align: center;
  background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
  z-index: 9999;
  font-size: 0.35rem;
  color: #fff;
  box-shadow: 0 4px 20px rgba(139, 0, 0, 0.4);
}

.left, .right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 11;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.3rem;
}

.left {
  left: 0;
  animation: slideInFromLeft 0.6s ease-out;
}

.right {
  right: 0;
  animation: slideInFromRight 0.6s ease-out;
}

@keyframes slideInFromLeft {
  0% {
    opacity: 0;
    transform: translateY(-50%) translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

@keyframes slideInFromRight {
  0% {
    opacity: 0;
    transform: translateY(-50%) translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  font-size: 0.36rem;
  font-weight: 500;
  animation: fadeInScale 0.8s ease-out;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.blockHeight {
  height: 1.18rem;
}

.g-content {
  flex: 1;
  padding: 0.3rem;
  animation: contentSlideIn 0.8s ease-out;
}

@keyframes contentSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-container {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.16rem;
  box-shadow: 0 8px 32px rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.4rem;
  margin-bottom: 0.4rem;
  animation: formFloat 0.8s ease-out;
}

@keyframes formFloat {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.form-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.4rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.2);
}

.form-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.form-title {
  color: #495057;
  font-size: 0.4rem;
  font-weight: 600;
  margin: 0 0 0.1rem 0;
  text-shadow: 0 2px 4px rgba(139, 0, 0, 0.1);
}

.form-subtitle {
  color: #6c757d;
  font-size: 0.28rem;
  margin: 0;
}

.security-input-container {
  margin-bottom: 0.3rem;
}

.lock-bg {
  position: relative;
  text-align: center;
  width: 100%;
  height: 6rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.16rem;
  display: flex;
  flex-direction: column-reverse;
  padding: 0.6rem 0.2rem;
  animation: lockFloat 3s ease-in-out infinite;
}

@keyframes lockFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.paycode {
  margin-top: 0.2rem;
}

.custom-password-input {
  background: transparent;
  
  .van-password-input__item {
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
    border: 1px solid rgba(139, 0, 0, 0.3);
    border-radius: 0.08rem;
    color: #8B0000;
    font-weight: 600;
    
    &.van-password-input__item--focus {
      border-color: rgba(139, 0, 0, 0.6);
      box-shadow: 0 0 10px rgba(139, 0, 0, 0.3);
    }
  }
}

.custom-keyboard {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-top: 1px solid rgba(139, 0, 0, 0.2);
  
  .van-number-keyboard__body {
    background: transparent;
  }
  
  .van-number-keyboard__keys {
    background: transparent;
  }
  
  .van-number-keyboard__key {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
    border: 1px solid rgba(139, 0, 0, 0.2);
    color: #8B0000;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:active {
      background: linear-gradient(135deg, rgba(139, 0, 0, 0.2) 0%, rgba(165, 42, 42, 0.2) 100%);
      transform: scale(0.95);
    }
  }
}

.security-tips {
  color: #8B0000;
  font-size: 0.32rem;
  font-weight: 500;
  margin: 0.3rem 0 0 0;
  text-shadow: 0 2px 4px rgba(139, 0, 0, 0.3);
}

.tips-container {
  display: flex;
  align-items: flex-start;
  gap: 0.2rem;
  padding: 0.2rem;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.05) 0%, rgba(165, 42, 42, 0.05) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.12rem;
  animation: tipsFadeIn 1.2s ease-out;
}

@keyframes tipsFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.tips-icon {
  flex-shrink: 0;
  margin-top: 0.02rem;
}

.tips {
  flex: 1;
  font-size: 0.24rem;
  text-align: left;
  line-height: 1.4;
  margin: 0;
}

.c_a0a0a0 {
  color: #6c757d;
}

.form {
  animation: formSlideIn 1s ease-out;
}

@keyframes formSlideIn {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.input-group {
  margin-bottom: 0.3rem;
}

.custom-field {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.12rem;
  transition: all 0.3s ease;
  overflow: hidden;
  color: #000 !important;

  &:hover {
    border-color: rgba(139, 0, 0, 0.4);
    box-shadow: 0 4px 16px rgba(139, 0, 0, 0.2);
  }

  &:focus-within {
    border-color: rgba(139, 0, 0, 0.6);
    box-shadow: 0 4px 20px rgba(139, 0, 0, 0.3);
  }

  .van-field__control {
    color: #000 !important;
  }

  .van-field__placeholder {
    color: #6c757d !important;
  }

  input {
    color: #000 !important;
  }

  .van-field__value {
    color: #000 !important;
  }
}

.addtitle {
  color: #8B0000;
  font-weight: 500;
  font-size: 0.32rem;
}

.van-cell::after {
  display: none;
}

.finish-btn {
  margin-top: auto;
  margin-bottom: 0.4rem;
  padding: 0.2rem;
  animation: buttonSlideUp 1s ease-out;
}

@keyframes buttonSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.Btnlogin {
  color: #fff;
  background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
  border: none;
  font-weight: 600;
  font-size: 0.36rem;
  height: 1.2rem;
  box-shadow: 0 4px 16px rgba(139, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 0, 0, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
}

.fs-18 {
  font-size: 0.36rem;
}

/* 确保所有输入框文字为黑色 */
:deep(.van-field__control) {
  color: #000 !important;
}

:deep(.van-field input) {
  color: #000 !important;
}

:deep(.van-field__value) {
  color: #000 !important;
}
</style>