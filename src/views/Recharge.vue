<template>
  <div class="recharge">
    <div class="settingwarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">{{ $t("cunru") }}</div>
          <div class="right">
            <div class="btn-save fs-16"></div>
          </div>
        </div>
        <div class="g-content flex-column">
          <div class="mescroll">
            <div>
              <div class="scroll-wrapper">
                <div class="balance">
                  <div class="balance-bg"></div>
                  <div class="money-box">
                    <div class="money-icon">
                      <img src="@/assets/image/moeny.png" alt="money" />
                    </div>
                    <p class="num">{{ money }}</p>
                    <p class="balance-label">{{$t('zongzichan')}}(u)</p>
                  </div>
                </div>
                <div class="pay-box">
                  <!-- 虚拟钱包 -->
                  <div class="pay-type" v-if="usdt">
                    <div class="type-catalog">
                      <div class="catalog-icon">
                        <img src="@/assets/center/usdt.svg" alt="USDT" />
                      </div>
                      <div class="bank-title">{{$t('saomacunru')}}</div>
                    </div>
                    <ul>
                      <li>
                        <div class="conetnt">
                          <div class="title">
                            <p class="fs-12">{{$t('TRC20')}}</p>
                            <h2>{{ usdt }}</h2>
                          </div> 
                        </div>
                      </li>
                    </ul>
                  </div>
                  <!-- 银行卡 -->
                  <div class="pay-type" v-if="yinhang">
                    <div class="type-catalog">
                      <div class="catalog-icon">
                        <img src="@/assets/image/yhk.png" alt="Bank" />
                      </div>
                      <div class="bank-title">{{$t('wangyincunru')}}</div>
                    </div>
                    <ul>
                      <li><div class="conetnt"><div class="title"><h2>{{ yinhang }}</h2></div></div></li>
                      <li><div class="conetnt"><div class="title"><h2>{{ xingming }}</h2></div></div></li>
                      <li><div class="conetnt"><div class="title"><h2>{{ kahao }}</h2></div></div></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <alert-pop
        :alertType="alertType"
        :Tips="TipsTxt"
        v-if="true"
        @showAletfalse="showAletfalse"
      ></alert-pop>
    </div>
  </div>
</template>

<script>
import AlertPop from "@/components/alert/AlertPop.vue";
import userApi from "@/api/user";
export default {
  name: "recharge",
  components: {
    AlertPop,
  },
  data() {
    return {
      money: this.$t('jiazaizhong'),
      usdt: null,
      yinhang: null,
      kahao: null,
      xingming: null,
      alertType: null,
      TipsTxt: this.$t('Tips.youke'),
      PopAlert: false,
    };
  },
   computed: {
    group_id() {
      return this.$store.state.group_id;
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
    info() {
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 0,
      });
      userApi
        .recharge()
        .then((data) => {
          console.log(data.data);
          this.money = data.data.money;
          this.usdt = data.data.usdt;
          this.yinhang = data.data.bankname;
          this.kahao = data.data.banknum;
          this.xingming = data.data.bankxm;
          this.$toast.clear();
          this.PopAlert = true;
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast.fail(err.msg);
        });
    },
  },
  mounted() {
	console.log(this.group_id);
  },
  created() {
    this.info();
      if (this.group_id != 1) {
      this.alertType = 1;
    }
  },
};
</script>
<style lang="less" scoped>
.recharge {
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

@keyframes headerGlow {
  0%, 100% {
    box-shadow: 0 4px 20px rgba(139, 0, 0, 0.4);
  }
  50% {
    box-shadow: 0 4px 25px rgba(139, 0, 0, 0.6);
  }
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
  padding:0 0;
}

.scroll-wrapper {
  animation: containerSlideIn 1s ease-out;
}

@keyframes containerSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.balance {
  position: relative;
  height: 4rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 0.2rem;
  margin-bottom: 0.4rem;
  backdrop-filter: blur(10px);
  overflow: hidden;

 
 
}

@keyframes balanceFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.balance-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.05) 0%, rgba(165, 42, 42, 0.05) 100%);
  border-radius: 0.2rem;
  z-index: 1;
}

.money-box {
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.4rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.money-icon {
  width: 1.2rem;
  height: 1.2rem;
  margin-bottom: 0.3rem;
  animation: coinRotate 4s linear infinite;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

@keyframes coinRotate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.num {
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
  font-weight: bold;
  color: #8B0000;
  text-shadow: 0 2px 4px rgba(139, 0, 0, 0.3);
  animation: numberPulse 2s ease-in-out infinite;
}

@keyframes numberPulse {
  0%, 100% {
    text-shadow: 0 2px 4px rgba(139, 0, 0, 0.3);
  }
  50% {
    text-shadow: 0 2px 8px rgba(139, 0, 0, 0.6);
  }
}

.balance-label {
  font-size: 0.32rem;
  color: #8B0000;
  opacity: 0.9;
  font-weight: 500;
}

.pay-box {
  animation: payBoxSlideIn 1.2s ease-out;
}

@keyframes payBoxSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.pay-type {
  margin-bottom: 0.4rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.16rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(139, 0, 0, 0.6), transparent);
    animation: borderGlow 2s ease-in-out infinite;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(139, 0, 0, 0.2);
    border-color: rgba(139, 0, 0, 0.4);
  }
}

@keyframes borderGlow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

.type-catalog {
  height: 1.2rem;
  line-height: 1.2rem;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.05) 0%, rgba(165, 42, 42, 0.05) 100%);
  border-bottom: 1px solid rgba(139, 0, 0, 0.2);
}

 

.catalog-icon {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  border-radius: 50%;
  padding: 0.1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.bank-title {
  font-weight: 600;
  text-align: left;
  color: #8B0000;
  font-size: 0.36rem;
  text-shadow: 0 2px 4px rgba(139, 0, 0, 0.3);
}

li {
  background: transparent;
  padding: 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 0, 0, 0.05);
  }
}

ul li:last-child .conetnt {
  border: none;
}

.conetnt {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(139, 0, 0, 0.2);
  padding: 0.4rem 0.4rem;
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
    background: linear-gradient(90deg, transparent, rgba(139, 0, 0, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: rgba(139, 0, 0, 0.05);
    
    &::before {
      left: 100%;
    }
    
    .title h2 {
      color: #8B0000;
    }
  }
}

li .conetnt .title {
  margin-left: 0.3rem;
  flex: 1;
  text-align: left;
}

.title h2 {
  font-size: 0.36rem;
  color: #495057;
  margin-top: 0.15rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(139, 0, 0, 0.1);
  transition: color 0.3s ease;
}

ul li .conetnt .title p {
  color: #6c757d;
  font-size: 0.28rem;
  margin-top: 0.05rem;
  transition: color 0.3s ease;
}

.conetnt .radio {
  padding-left: 0.4rem;
}

.advice {
  height: 0.8rem;
  width: 0.8rem;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  background-size: contain;
  transition: all 0.3s ease;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  border: 2px solid rgba(139, 0, 0, 0.3);
}

.advice-hl {
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.2) 0%, rgba(165, 42, 42, 0.2) 100%);
  border-color: rgba(139, 0, 0, 0.8);
  box-shadow: 0 0 15px rgba(139, 0, 0, 0.4);
  animation: radioPulse 1s ease-in-out;
}

@keyframes radioPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.advice.advice-nor {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  border-color: rgba(139, 0, 0, 0.3);
}

.fs-18 {
  font-size: 0.36rem;
}

.fs-12 {
  font-size: 0.24rem;
}

.fs-16 {
  font-size: 0.32rem;
}

// 响应式设计
@media (max-width: 375px) {
  .balance {
    height: 3.5rem;
  }
  
  .num {
    font-size: 0.7rem;
  }
  
  .money-icon {
    width: 0.8rem;
    height: 0.8rem;
  }
}
</style>