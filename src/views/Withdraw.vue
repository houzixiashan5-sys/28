<template>
  <div class="withdraw">
    <div class="settingwarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18" @click="alertTypetitle = 2">
            {{ $t("zhuanchu") }}
          </div>
          <div class="right">
            <div class="btn-save fs-16"></div>
          </div>
        </div>
      </header>
      <div class="g-content flex-column">
        <div class="mescroll">
          <div class="withdraw-container">
            <!-- 余额显示 -->
            <div class="balance-section">
              <div class="balance-card">
                <div class="balance-icon">
                  <img src="@/assets/image/jinbi.png" alt="balance" />
                </div>
                <div class="balance-info">
                  <div class="balance-amount" v-if="infoList">{{ infoList.money }}</div>
                  <div class="balance-label">{{ $t("zongzichan") }}(u)</div>
                </div>
              </div>
            </div>

            <!-- 提现金额输入 -->
            <div class="withdraw-input-section">
              <div class="section-title">{{ $t("zhuanchujine") }}</div>
              <div class="input-container">
                <van-field
                  v-model="money"
                  type="number"
                  :placeholder="$t('plzhuanchu')"
                  class="custom-field"
                >
                  <template #left-icon>
                    <img
                      src="@/assets/image/jinbi.png"
                      class="left-form-icon"
                      alt=""
                    />
                  </template>
                </van-field>
              </div>
              <div class="tips-container">
                <div class="tips-icon">
                  <van-icon name="info-o" color="#8B0000" size="16px" />
                </div>
                <div class="tips">{{ $t("zhuanchuTps") }}</div>
              </div>
            </div>

            <!-- 支付方式选择 -->
            <div class="payment-section">
              <!-- 虚拟钱包 -->
              <div class="payment-type" v-if="infoList && infoList.pay_list && infoList.pay_list.length != 0 && infoList.pay_list[0]">
                <div class="type-header">
                  <div class="type-icon">
                    <van-icon name="wallet-o" color="#8B0000" size="20px" />
                  </div>
                  <div class="type-title">{{ $t("xuanzehb") }}</div>
                </div>
                <div class="payment-option" @click="selectActive = 1">
                  <div class="option-info">
                    <div class="option-name">{{ infoList.pay_list[0].acc_name }}</div>
                    <div class="option-desc">{{ infoList.pay_list[0].acc }}</div>
                  </div>
                  <div class="option-radio">
                    <div class="radio-circle" :class="{ active: selectActive == 1 }">
                      <van-icon v-if="selectActive == 1" name="success" color="#8B0000" size="16px" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 银行卡 -->
              <div class="payment-type" v-if="infoList && infoList.pay_list && infoList.pay_list.length != 0 && infoList.pay_list[1]">
                <div class="type-header">
                  <div class="type-icon">
                    <van-icon name="credit-pay" color="#8B0000" size="20px" />
                  </div>
                  <div class="type-title">{{ $t("xuanzeyh") }}</div>
                </div>
                <div class="payment-option" @click="selectActive = 0">
                  <div class="option-info">
                    <div class="option-name">{{ infoList.pay_list[1].acc_bank }}</div>
                    <div class="option-desc">{{ infoList.pay_list[1].acc_name }}</div>
                  </div>
                  <div class="option-radio">
                    <div class="radio-circle" :class="{ active: selectActive == 0 }">
                      <van-icon v-if="selectActive == 0" name="success" color="#8B0000" size="16px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 提交按钮 -->
        <div class="submit-section">
          <van-button
            type="primary"
            block
            class="Btnsub"
            @click="changeSubmit"
          >
            <van-icon name="send" color="#fff" size="16px" style="margin-right: 0.1rem;" />
            {{ $t("tijiaoshenqing") }}
          </van-button>
        </div>
      </div>
    </div>
    
    <alert-pop
      :alertType="alertType"
      :Tips="TipsTxt"
      v-if="PopAlert"
      @showAletfalse="showAletfalse"
    ></alert-pop>
    
    <!-- 安全码弹出框提交申请的时候弹出 -->
    <van-popup v-model:show="showsecurity" class="securityalert">
      <div class="security-popup">
        <div class="safe-code">
          <div class="security-header">
            <div class="security-icon">
              <van-icon name="shield-o" color="#8B0000" size="32px" />
            </div>
            <div class="security-title">{{ $t("shuruanquanma") }}</div>
          </div>
          <div class="paycode">
            <van-password-input
              :value="showsecurityValue"
              :focused="showKeyboard"
              @focus="showKeyboard = true"
              class="custom-password-input"
            />
          </div>
        </div>
      </div>
    </van-popup>
    
    <van-number-keyboard
      v-model="showsecurityValue"
      :show="showsecurity"
      @blur="showsecurity = false"
      class="custom-keyboard"
    />
  </div>
</template>

<script>
import AlertPop from "@/components/alert/AlertPop.vue";
import userApi from "@/api/user";
export default {
  name: "Withdraw",
  components: {
    AlertPop,
  },
  data() {
    return {
      selectActive: 0,
      showsecurity: false,
      showsecurityValue: "",
      alertType: null,
      infoList: [],
      isTrue: null,
      TipsTxt: this.$t('Tips.youke'),
      PopAlert: false,
      money: "",
      alertTypetitle: 2,
    };
  },
  watch: {
    showsecurityValue(value) {
      if (value.length === 6) {
        // 调用接口
        this.showsecurity = false;
        this.Withdrawal();
      }
    },
  },

  methods: {
    showAletfalse() {
      this.PopAlert = false;
      this.$router.go(-1);
    },
    changeSubmit() {
      // 个人资料完整验证废除
      //判断是否游客
      if (!this.usercrud) {
        userApi.userInfo().then((data) => {
          this.user = data.msg;
          this.$router.push({
            path: "/baseinfo",
            query: {
              name: data.msg.username,
            },
          });
        });
        return;
      }
      if (!this.infoList.pay_list) {
        // 是否有银行卡

        this.$router.push({
          path: "/bankCardManage",
          query: {
            type: 0,
          },
        });
      } else if (!this.isTrue) {
        // 是否有安全码
        this.$router.push({
          path: "/setSecurityCode",
          query: {
            isTrue: this.isTrue,
          },
        });
      } else {
        // 提现请求
        if (!this.money) {
          this.$toast(this.$t('Tips.pltxje'));
        } else if (this.money < 100) {
          this.$toast(this.$t('Tips.zdtx'));
        } else {
          this.showsecurity = true;
        }
      }
    },
    Withdrawal() {
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 0,
      });
      userApi
        .withdrawAction(this.selectActive, this.money, this.showsecurityValue)
        .then((data) => {
          console.log(data.data);
          this.infoList = data.data;
          this.$toast.clear();
          this.alertType = 3;
          this.TipsTxt = this.$t('Tips.tjcg');
          this.PopAlert = true;
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast.fail(err.msg);
        });
    },
    ChangeAuth() {
      this.$router.push({
        path: "/defaultAvatar",
      });
    },
    changego() {
      this.$router.go(-1);
    },
    info() {
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 0,
      });
      userApi
        .withdrawInfo()
        .then((data) => {
          console.log(data.data);
          this.infoList = data.data;
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast.fail(err.msg);
        });
    },
  },
  computed: {
    group_id() {
      return this.$store.state.group_id;
    },
    usercrud() {
      console.log(this.$store.state.usercrud, "12");
      return this.$store.state.usercrud;
    },
  },
  created() {
    this.info();
    // this.group_id = this.$route.query.group_id;
    if (this.group_id != 1) {
      // 打开弹窗
      this.alertType = 1;
      this.PopAlert = true;
    }
    userApi.safetyInfo().then((data) => {
      this.isTrue = data.data.isTrue;
    });
  },
};
</script>
<style lang="less" scoped>
.withdraw {
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

.mescroll {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 2rem;
  padding:0 0 !important;
}

.withdraw-container {
  animation: containerSlideIn 1s ease-out;
}

@keyframes containerSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 余额显示区域 */
.balance-section {
  margin-bottom: 0.4rem;
}

.balance-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.16rem;
  padding: 0.6rem;
  display: flex;
  align-items: center;
}

@keyframes balanceFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.balance-icon {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.4rem;

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

.balance-info {
  flex: 1;
  text-align: left;
}

.balance-amount {
  color: #8B0000;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.1rem;
  text-shadow: 0 2px 4px rgba(139, 0, 0, 0.3);
}

.balance-label {
  color: #6c757d;
  font-size: 0.28rem;
}

/* 提现金额输入区域 */
.withdraw-input-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.16rem;
  backdrop-filter: blur(10px);
  padding: 0.4rem;
  margin-bottom: 0.4rem;
  animation: sectionFloat 0.8s ease-out;
}

@keyframes sectionFloat {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.section-title {
  color: #495057;
  font-size: 0.36rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  text-shadow: 0 2px 4px rgba(139, 0, 0, 0.1);
}

.input-container {
  margin-bottom: 0.3rem;
  color: #000;
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

.left-form-icon {
  width: 20px;
  margin-right: 5px;
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
  color: #6c757d;
  font-size: 0.24rem;
  line-height: 1.4;
  margin: 0;
}

/* 支付方式选择区域 */
.payment-section {
  animation: paymentSlideIn 1.2s ease-out;
}

@keyframes paymentSlideIn {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.payment-type {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.16rem;
  backdrop-filter: blur(10px);
  padding: 0.4rem;
  margin-bottom: 0.3rem;
}

.type-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.2);
}

.type-icon {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.2rem;
}

.type-title {
  color: #495057;
  font-size: 0.32rem;
  font-weight: 600;
}

.payment-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.12rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(139, 0, 0, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(139, 0, 0, 0.2);
    border-color: rgba(139, 0, 0, 0.4);

    &::before {
      left: 100%;
    }
  }
}

.option-info {
  flex: 1;
  text-align: left;
}

.option-name {
  color: #495057;
  font-size: 0.32rem;
  font-weight: 500;
  margin-bottom: 0.05rem;
}

.option-desc {
  color: #6c757d;
  font-size: 0.24rem;
}

.option-radio {
  margin-left: 0.3rem;
}

.radio-circle {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 2px solid rgba(139, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &.active {
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.2) 0%, rgba(165, 42, 42, 0.2) 100%);
    border-color: rgba(139, 0, 0, 0.6);
    box-shadow: 0 0 10px rgba(139, 0, 0, 0.3);
  }
}

/* 提交按钮区域 */
.submit-section {
  margin-top: 0.4rem;
  padding: 0.2rem;
  animation: buttonSlideUp 1s ease-out;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.95) 100%);
  backdrop-filter: blur(10px);
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

.Btnsub {
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

/* 安全码弹窗 */
.security-popup {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 0.16rem;
  padding: 0.6rem;
  border: 1px solid rgba(139, 0, 0, 0.2);
  box-shadow: 0 8px 32px rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.security-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.4rem;
}

.security-icon {
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

.security-title {
  color: #495057;
  font-size: 0.4rem;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 2px 4px rgba(139, 0, 0, 0.1);
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

.fs-18 {
  font-size: 0.36rem;
}

.van-cell::after {
  display: none;
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