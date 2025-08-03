<template>
  <div class="language">
    <div class="settingwarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">{{ $t("yuyanshezhi") }}</div>
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
              <img src="@/assets/image/yuyan1.png" alt="language" />
            </div>
            <h3 class="form-title">{{ $t("yuyanshezhi") }}</h3>
            <p class="form-subtitle">{{ $t("pianhaoyuyan") }}</p>
          </div>
          
          <div class="lang-list">
            <div
              class="lang-item"
              :class="{ active: show == 0 }"
              @click="(show = 0), languageSet(0)"
            >
              <div class="lang-info">
                <div class="lang-icon">
                  <img src="@/assets/image/yuyan.png" alt="System" />
                </div>
                <div class="lang-text">
                  <span class="lang-name">{{ $t("gensuixitong") }}</span>
                  <span class="lang-desc">{{ $t("gensuixitong1") }}</span>
                </div>
              </div>
              <div class="lang-check" v-if="show == 0">
                <van-icon name="success" color="#8B0000" size="20px" />
              </div>
            </div>
            
            <div
              class="lang-item"
              :class="{ active: show == 3 }"
              @click="(show = 3), languageSet(3)"
            >
              <div class="lang-info">
                <div class="lang-icon">
                  <img src="@/assets/image/yyy.png" alt="English Flag" />
                </div>
                <div class="lang-text">
                  <span class="lang-name">English</span>
                  <span class="lang-desc">English</span>
                </div>
              </div>
              <div class="lang-check" v-if="show == 3">
                <van-icon name="success" color="#8B0000" size="20px" />
              </div>
            </div>
            
            <div
              class="lang-item"
              :class="{ active: show == 1 }"
              @click="(show = 1), languageSet(1)"
            >
              <div class="lang-info">
                <div class="lang-icon">
                  <img src="@/assets/image/yny.png" alt="Chinese Simplified Flag" />
                </div>
                <div class="lang-text">
                  <span class="lang-name">{{ $t("jiantizhongwen") }}</span>
                  <span class="lang-desc">{{ $t("jiantizhongwen") }}</span>
                </div>
              </div>
              <div class="lang-check" v-if="show == 1">
                <van-icon name="success" color="#8B0000" size="20px" />
              </div>
            </div>
            
            <div
              class="lang-item"
              :class="{ active: show == 2 }"
              @click="(show = 2), languageSet(2)"
            >
              <div class="lang-info">
                <div class="lang-icon">
                  <img src="@/assets/image/fty.png" alt="Chinese Traditional Flag" />
                </div>
                <div class="lang-text">
                  <span class="lang-name">中文繁体</span>
                  <span class="lang-desc">繁體中文</span>
                </div>
              </div>
              <div class="lang-check" v-if="show == 2">
                <van-icon name="success" color="#8B0000" size="20px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Language",
  components: {},
  data() {
    return {
      checked: false,
      show: 0,
    };
  },
  methods: {
    changego() {
      this.$router.go(-1);
    },
    languageSet(type) {
      if (type == 0) {
        localStorage.setItem("locale", "zh");
        localStorage.setItem("localetype", type);
        this.show = 0;
      } else if (type == 1) {
        localStorage.setItem("locale", "zh");
        localStorage.setItem("localetype", type);
        this.show = 1;
      } else if (type == 2) {
        localStorage.setItem("locale", "tw");
        localStorage.setItem("localetype", type);
        this.show = 2;
      } else if (type == 3) {
        localStorage.setItem("locale", "en");
        localStorage.setItem("localetype", type);
        this.show = 3;
      }
      location.reload();
    },
  },
  created() {
    if (localStorage.getItem("localetype") == 1) {
      this.show = 1;
    } else if (localStorage.getItem("localetype") == 2) {
      this.show = 2;
    } else if (localStorage.getItem("localetype") == 3) {
      this.show = 3;
    } else [(this.show = 0)];
  },
};
</script>
<style lang="less" scoped>
.language {
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

.lang-list {
  animation: listSlideIn 1s ease-out;
}

@keyframes listSlideIn {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.lang-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
  margin-bottom: 0.2rem;
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

  &.active {
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
    border-color: rgba(139, 0, 0, 0.5);
    box-shadow: 0 4px 20px rgba(139, 0, 0, 0.2);
  }
}

.lang-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.lang-icon {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.3rem;
  animation: iconFloat 3s ease-in-out infinite;

  img {
    width: 100%; /* 图片撑满容器 */
    height: 100%;
    object-fit: contain; /* 保持图片比例 */
    border-radius: 50%; /* 如果图片是正方形，可以裁剪成圆形 */
    padding: 0rem; /* 增加内边距，使图片不贴边 */
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.lang-text {
  display: flex;
  flex-direction: column;
}

.lang-name {
  color: #495057;
  font-size: 0.36rem;
  font-weight: 500;
  margin-bottom: 0.05rem;
}

.lang-desc {
  color: #6c757d;
  font-size: 0.24rem;
}

.lang-check {
  animation: checkSlideIn 0.3s ease-out;
}

@keyframes checkSlideIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fs-18 {
  font-size: 0.36rem;
}
</style>