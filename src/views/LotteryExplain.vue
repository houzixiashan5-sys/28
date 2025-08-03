<template>
  <div class="lotteryExplain">
    <div class="lotteryExplainWarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">{{$t('chanpingshuoming')}}</div>
          <div class="right"></div>
        </div>
      </header>
      <div class="g-content">
        <div class="notice-container">
          <div class="notice-main">
            <div class="noticetitle">
              <p>SINGAPORE {{$t('chanpingshuoming')}}</p>
            </div>
            <div class="notice-content">
                <div>
                    <p>{{$t('chanpin1')}}</p>
                    <p>{{$t('chanpin2')}}</p>
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
  name: "LotteryExplain",
  components: {},
  data() {
    return {};
  },
  methods: {
    changego() {
      this.$router.go(-1);
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.lotteryExplain {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
}

.lotteryExplainWarp {
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

.notice-container {
  margin-bottom: 2rem;
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

.notice-main {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 0.16rem;
  border: 1px solid rgba(139, 0, 0, 0.2);
  margin: 0 auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: hidden;
  animation: cardFloat 0.8s ease-out;

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

.noticetitle {
  position: relative;
  color: #8B0000;
  text-align: center;
  margin-bottom: 0.5rem;
  z-index: 10;
  animation: titleSlideIn 1.2s ease-out;
}

@keyframes titleSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.noticetitle p {
  display: inline-block;
  padding: 0.2rem 0.4rem;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  border: 2px solid rgba(139, 0, 0, 0.3);
  border-radius: 0.12rem;
  color: #8B0000;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(139, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(139, 0, 0, 0.3);
    border-color: rgba(139, 0, 0, 0.5);
  }
}

.notice-content {
  padding: 0.5rem 0.4rem;
  font-size: 0.35rem;
  overflow: auto;
  animation: contentFadeIn 1.5s ease-out;
  color: #495057;
  line-height: 1.6;

  p {
    text-align: left;
    margin-bottom: 0.3rem;
    text-shadow: 0 1px 2px rgba(139, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      color: #8B0000;
      transform: translateX(4px);
    }
  }
}

@keyframes contentFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.notice-content p:not(:first-child) {
  margin-top: 0.3rem;
}

.fs-18 {
  font-size: 0.36rem;
}
</style>