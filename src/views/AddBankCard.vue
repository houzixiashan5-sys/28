<template>
  <div class="addBankCard">
    <div class="settingwarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">{{$t('tianjiayinhangka')}}</div>
          <div class="right">
            <div class="bg-icon bg-icon-setting"></div>
          </div>
        </div>
        <div class="blockHeight"></div>
      </header>
      <div class="g-content">
        <div class="form-container">
          <div class="form-header">
            <div class="form-icon">
              <img src="@/assets/image/yhk.png" alt="bank" />
            </div>
            <h3 class="form-title">{{$t('tianjiayinhangka')}}</h3>
            <p class="form-subtitle">请填写银行卡信息</p>
          </div>
          
          <div class="tips-container">
            <div class="tips-icon">
              <van-icon name="info-o" color="#8B0000" size="16px" />
            </div>
            <div class="tips c_a0a0a0">{{$t('yhkTps')}}</div>
          </div>
          
          <div class="form">
            <div class="input-group">
              <van-field 
                v-model="acc" 
                :placeholder="$t('plchikaren')"
                class="custom-field"
              >
                <template #label>
                  <span class="addtitle">{{$t('chiakren')}}</span>
                </template>
              </van-field>
            </div>
            
            <div class="input-group">
              <van-field 
                v-model="acc_name" 
                type='number' 
                :placeholder="$t('plkahao')"
                class="custom-field"
              >
                <template #label>
                  <span class="addtitle">{{$t('yinhangkakahao')}}</span>
                </template>
              </van-field>
            </div>
            
            <div class="input-group">
              <van-field 
                v-model="acc_bank" 
                :placeholder="$t('plyinhangmingcheng')"
                class="custom-field"
              >
                <template #label>
                  <span class="addtitle">{{$t('yinhangmingcheng')}}</span>
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
            @click="btnSubmit"
          >
            <van-icon name="success" color="#fff" size="16px" style="margin-right: 0.1rem;" />
            完成
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "@/api/user";
export default {
  name: "addBankCard",
  components: {},
  data() {
    return {
      acc: "",
      acc_name: "",
      acc_bank: "",
      mark: "",
      type: 0,
    };
  },
  methods: {
    changego() {
      this.$router.go(-1);
    },
    btnSubmit() {
      if (!this.acc) {
        this.$toast(this.$t('plchikaren'));
      } else if (!this.acc_name) {
        this.$toast(this.$t('plkahao'));
      } else if (!this.acc_bank) {
        this.$toast(this.$t('plyinhangmingcheng'));
      } else {
        let that=this
        userApi.setPayInfo(this.acc,this.acc_name,this.acc_bank,'',this.type).then((data) => {
          console.log(data.msg);
          this.$toast.loading({
            message: this.$t('Tips.tjcg'),
            forbidClick: true,
            duration: 500,
            onClose() {
              that.$router.go(-1);
            },
          });
        });
      }
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.addBankCard {
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

  img {
    width: 1.2rem;
    height: 1.2rem;
    object-fit: contain;
  }
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

.tips-container {
  display: flex;
  align-items: flex-start;
  gap: 0.2rem;
  padding: 0.2rem;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.05) 0%, rgba(165, 42, 42, 0.05) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.12rem;
  margin-bottom: 0.3rem;
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