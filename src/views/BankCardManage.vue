<template>
  <div class="bankCardManage">
    <div class="settingwarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">
            {{ type == 0 ? $t('yinhangkaguanli') : $t('xuniqianbaoguanli')}}
          </div>
          <div class="right">
            <div class="bg-icon bg-icon-setting"></div>
          </div>
        </div>
      </header>
      <div class="g-content">
        <!-- 银行卡 -->
        <ul class="card-list" v-if="type ==0&&bank">
          <li class="card-item">
            <div class="card-header">
              <div class="card-icon">
                <img src="@/assets/image/yhk.png" alt="bank" />
              </div>
              <div class="card-info">
                <p class="bank-name">{{bank.acc_bank}}</p>
                <p class="cardNo">{{bank.acc_name}}</p>
              </div>
            </div> 
          </li>
        </ul>
        <!-- 虚拟钱包的卡 -->
        <ul class="card-list" v-if="type == 1&&bank">
          <li class="card-item">
            <div class="card-header">
              <div class="card-icon">
                <img src="@/assets/image/usdt.svg" alt="wallet" />
              </div>
              <div class="card-info">
                <p class="bank-name">{{bank.acc}}</p>
                <p class="cardNo">{{bank.acc_name}}</p>
              </div>
            </div>
            <!-- <div class="card-actions">
              <div class="action-btn edit-btn">
                <van-icon name="edit" color="#F0CC8C" size="16px" />
                <span>编辑</span>
              </div>
              <div class="action-btn delete-btn">
                <van-icon name="delete" color="#ff6b6b" size="16px" />
                <span>删除</span>
              </div>
            </div> -->
          </li>
        </ul>
        <!-- 没有银行卡就显示btn -->
        <div class="add-card-btn">
          <div class="add-card-container" @click="changeAddcard(type)">
            <div class="add-icon">
              <van-icon name="plus" color="#8B0000" size="24px" />
            </div>
            <span class="add-text">{{ type == 0?$t('tianjiayinhangka') : $t('tianjiaxuniqianbao') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "@/api/user";
export default {
  name: "BankCardManage",
  components: {},
  data() {
    return {
      type: null,
      bank:null
    };
  },
  methods: {
    changeAddcard(type) {
      if (type == 0) {
        this.$router.push({
          path: "/addBankCard",
        });
      } else {
        this.$router.push({
          path: "/addVirtualWallet",
        });
      }
    },
    changego() {
      this.$router.go(-1);
    },
  },
  mounted() {},
  created() {
    this.type = this.$route.query.type;
    userApi.payInfo(this.type).then((data) => {
      this.bank = data.data;
    });
  },
};
</script>
<style lang="less" scoped>
.bankCardManage {
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

.card-list {
  margin-bottom: 0.4rem;
}

.card-item {
  border-radius: 0.16rem;
  padding: 0.4rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  box-shadow: 0 8px 32px rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  animation: cardFloat 0.8s ease-out;
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
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(139, 0, 0, 0.2);
    border-color: rgba(139, 0, 0, 0.4);

    &::before {
      left: 100%;
    }
  }
}

@keyframes cardFloat {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.card-header {
  display: flex;
  align-items: center;
}

.card-icon {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.3rem;
  animation: iconPulse 2s ease-in-out infinite;

  img {
    width: 0.8rem;
    height: 0.8rem;
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

.card-info {
  flex: 1;
  text-align: left;
}

.bank-name {
  font-size: 0.38rem;
  color: #495057;
  font-weight: 500;
  margin-bottom: 0.1rem;
  text-shadow: 0 2px 4px rgba(139, 0, 0, 0.1);
}

.cardNo {
  font-size: 0.32rem;
  color: #6c757d;
  margin: 0;
}

.card-actions {
  display: flex;
  gap: 0.2rem;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  padding: 0.2rem 0.3rem;
  border-radius: 0.1rem;
  font-size: 0.28rem;
  transition: all 0.3s ease;
  cursor: pointer;

  span {
    color: inherit;
  }
}

.edit-btn {
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  color: #8B0000;
  border: 1px solid rgba(139, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.2) 0%, rgba(165, 42, 42, 0.2) 100%);
    transform: translateY(-2px);
  }
}

.delete-btn {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 107, 107, 0.1) 100%);
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.3);

  &:hover {
    background: linear-gradient(135deg, rgba(255, 107, 107, 0.3) 0%, rgba(255, 107, 107, 0.2) 100%);
    transform: translateY(-2px);
  }
}

.add-card-btn {
  margin-top: 0.4rem;
}

.add-card-container {
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
  border: 2px dashed rgba(139, 0, 0, 0.4);
  border-radius: 0.16rem;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: addCardPulse 2s ease-in-out infinite;

  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
    border-color: rgba(139, 0, 0, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 0, 0, 0.2);
  }
}

@keyframes addCardPulse {
  0%, 100% {
    border-color: rgba(139, 0, 0, 0.4);
  }
  50% {
    border-color: rgba(139, 0, 0, 0.6);
  }
}

.add-icon {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
  animation: addIconFloat 3s ease-in-out infinite;
}

@keyframes addIconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.add-text {
  color: #8B0000;
  font-size: 0.32rem;
  font-weight: 500;
  text-align: center;
}

.fs-18 {
  font-size: 0.36rem;
}
</style>