<template>
  <div class="setting">
    <div class="settingwarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">{{ type == 1 ?  $t('shezhi')  :  $t('zhanghuxinxni') }}</div>
          <div class="right">
            <div class="bg-icon bg-icon-setting"></div>
          </div>
        </div>
        <div class="blockHeight"></div>
      </header>
      <div class="g-content">
        <div class="settings-container">
          <ul class="settings-grid" v-if="type == 1">
            <li @click="changeline">
              <div class="setting-card">
                <div class="card-icon">
                  <img src="@/assets/image/seting.png" alt="线路设置" />
                </div>
                <p class="card-title">{{ $t('genggaixianlu') }}</p>
              </div>
            </li>
            <li @click="changeabout">
              <div class="setting-card">
                <div class="card-icon">
                  <img src="@/assets/image/guanyu.png" alt="关于我们" />
                </div>
                <p class="card-title">{{ $t('guanyuwomen') }}</p>
              </div>
            </li>
            <li @click="changeSystem">
              <div class="setting-card">
                <div class="card-icon">
                  <img src="@/assets/image/xitong.png" alt="系统设置" />
                </div>
                <p class="card-title">{{ $t('xitongshezhi') }}</p>
              </div>
            </li>
            <li @click="changeLanguage">
              <div class="setting-card">
                <div class="card-icon">
                  <img src="@/assets/image/yuyan.png" alt="语言设置" />
                </div>
                <p class="card-title">{{ $t('yuyanshezhi') }}</p>
              </div>
            </li>
          </ul>
          <!-- 账户信息的 -->
          <ul class="settings-grid" v-if="type == 2">
            <li @click="changebane(0)">
              <div class="setting-card">
                <div class="card-icon">
                  <img src="@/assets/image/yhk.png" alt="银行卡" />
                </div>
                <p class="card-title">{{ $t('bangdingyinhangka') }}</p>
              </div>
            </li>
            <li @click="changebane(1)">
              <div class="setting-card">
                <div class="card-icon">
                  <img src="@/assets/image/qianbao.png" alt="虚拟钱包" />
                </div>
                <p class="card-title">{{ $t('bangdingxuniqianbao') }}</p>
              </div>
            </li>
            <li @click="changeSetSecurityCode">
              <div class="setting-card">
                <div class="card-icon">
                  <img src="@/assets/image/anquan.png" alt="安全码" />
                </div>
                <p class="card-title">{{ $t('anquanma') }}</p>
              </div>
            </li>
            <li @click="changeChangePassword">
              <div class="setting-card">
                <div class="card-icon">
                  <img src="@/assets/image/denglu.png" alt="修改密码" />
                </div>
                <p class="card-title">{{ $t('xiugailenglumima') }}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- 退出登录 -->
        <div class="logout-section">
          <div class="logout-button" @click="changelogin">
            <van-icon name="close" color="#fff" size="18px" />
            <span>{{ $t('tuichudenglu') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "@/api/user";
export default {
  name: "Setting",
  components: {},
  data() {
    return {
      type: null,
    };
  },
  methods: {
    changeline() {
      this.$router.push({
        path: "/changeline",
      });
    },
    changeabout() {
      this.$router.push({
        path: "/about",
      });
    },
    changeSystem() {
      this.$router.push({
        path: "/system",
      });
    },
    changeLanguage() {
      this.$router.push({
        path: "/language",
      });
    },
    changebane(type) {
      this.$router.push({
        path: "/bankCardManage",
        query: {
          type: type,
        },
      });
    },
    changeSetSecurityCode() {
      userApi.safetyInfo().then((data) => {
        console.log(data.data.isTrue);
        let isTrue = data.data.isTrue;
        this.$router.push({
          path: "/setSecurityCode",
          query: {
            isTrue: isTrue,
          },
        });
      });
    },
    changeChangePassword() {
      this.$router.push({
        path: "/changePassword",
      });
    },
    changego() {
      this.$router.go(-1);
    },
    changelogin() {
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 0,
      });
      this.$router.push({
        path: "/login",
      });
      this.$toast.clear();
    },
  },
  mounted() {
    this.type = this.$route.query.type;
  },
};
</script>
<style lang="less" scoped>
.setting {
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

.settings-container {
  margin-bottom: 2rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.3rem;
  animation: gridSlideIn 1s ease-out;
}

@keyframes gridSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.settings-grid li {
  list-style: none;
  animation: cardFloat 0.8s ease-out;
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

.setting-card {
  height: 3rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.16rem;
  box-shadow: 0 8px 32px rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(139, 0, 0, 0.2);
    border-color: rgba(139, 0, 0, 0.4);

    &::before {
      left: 100%;
    }

    .card-icon {
      transform: scale(1.1);
    }

    .card-title {
      color: #8B0000;
    }
  }
}

.card-icon {
  width: 1.2rem;
  height: 1.2rem;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  border-radius: 50%;
  padding: 0.2rem;
  transition: all 0.3s ease;
  animation: iconPulse 2s ease-in-out infinite;

  img {
    width: 100%;
    height: 100%;
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

.card-title {
  font-size: 0.32rem;
  color: #495057;
  font-weight: 500;
  margin: 0;
  transition: color 0.3s ease;
  text-shadow: 0 1px 2px rgba(139, 0, 0, 0.1);
}

.logout-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.3rem;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.95) 100%);
  backdrop-filter: blur(10px);
  z-index: 100;
  animation: logoutSlideUp 1s ease-out;
}

@keyframes logoutSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.4rem;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.9) 0%, rgba(165, 42, 42, 0.9) 100%);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 0.16rem;
  color: #fff;
  font-size: 0.36rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(139, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 0, 0, 0.4);
    background: linear-gradient(135deg, rgba(139, 0, 0, 1) 0%, rgba(165, 42, 42, 1) 100%);
  }

  span {
    color: #fff;
  }
}

.fs-18 {
  font-size: 0.36rem;
}
</style>