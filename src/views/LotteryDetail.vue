<template>
  <div class="lotteryDetail">
    <div class="lotteryDetailWarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">{{ name }}</div>
          <div class="right">
            <div class="slide-btn" @click="show = !show">
              <div class="bg-icon bg-icon-filtrate"></div>
            </div>
          </div>
        </div>
      </header>
      <div class="g-content">
        <div class="lottery-container">
          <ul class="digital-result">
            <li
              class="digital-item"
              v-for="(item, index) in issueList"
              :key="index"
            >
              <div class="result-wrap">
                <div class="title">
                  <span class="issue fs-12">{{ $t("di") }}{{ item.issue }}{{ $t("lun") }}</span>
                </div>
                <div class="result">
                  <div class="ball ball-orange">{{ item.site_1 }}</div>
                  <span class="fs-16">+</span>
                  <div class="ball ball-orange">{{ item.site_2 }}</div>
                  <span class="fs-16">+</span>
                  <div class="ball ball-orange">{{ item.site_3 }}</div>
                  <span class="fs-16">=</span>
                  <div class="ball ball-orange">{{ item.code }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import homeApi from "@/api/home";
export default {
  name: "BetRecord",
  components: {},
  data() {
    return {
      game_id: null,
      issueList: null,
      name: "",
    };
  },
  methods: {
    changego() {
      this.$router.go(-1);
    },
    showIssueChange() {
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 0,
      });
      homeApi
        .issueList(this.game_id)
        .then((data) => {
          console.log(data.data);
          this.issueList = data.data;
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast.fail(err.msg);
        });
    },
  },
  mounted() {
    this.game_id = this.$route.query.game_id;
    this.name = this.$route.query.name;
    this.showIssueChange();
  },
};
</script>
<style lang="less" scoped>
.lotteryDetail {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
}

.lotteryDetailWarp {
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

.lottery-container {
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

.digital-result {
  padding: 0.2rem;
  padding: 0 0.2rem 0.2rem;
}

.digital-item {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  margin-bottom: 0.3rem;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 0.16rem;
  box-shadow: 0 8px 32px rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
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

.result-wrap {
  width: 100%;
  
  .title {
    font-size: 0.34rem;
    margin-bottom: 0.2rem;
    text-align: left;
    color: #495057;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(139, 0, 0, 0.1);
  }
}

.result {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
}

.ball-orange {
  background: linear-gradient(135deg, #ffb658 0%, #ff6045 100%);
  box-shadow: 0 4px 16px rgba(255, 182, 88, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 182, 88, 0.4);
  }
}

.ball {
  display: inline-block;
  border-radius: 50%;
  margin: 0.04rem;
  width: 0.7rem;
  height: 0.7rem;
  text-align: center;
  line-height: 0.7rem;
  color: #fff;
  background-position: center center;
  background-size: cover;
  font-size: 0.35rem;
  font-weight: 600;
  overflow: hidden;
  position: relative;
  z-index: 1;
  animation: ballPulse 2s ease-in-out infinite;
}

@keyframes ballPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.fs-16 {
  font-size: 0.32rem;
  color: #8B0000;
  font-weight: 600;
  margin: 0 0.1rem;
  text-shadow: 0 1px 2px rgba(139, 0, 0, 0.2);
}

.fs-12 {
  font-size: 0.24rem;
}

.fs-18 {
  font-size: 0.36rem;
}
</style>