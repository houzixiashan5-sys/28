<template>
  <div class="home">
    
    <div class="Navbar">
      <div class="g-header">
        <div class="navleft">
          <div class="logo-container">
            <img src="@/assets/image/bg.png" alt="Logo" class="logo-img" />
          </div>
        </div>
        <div class="middle fs-18"></div>
        <div v-if="isLoggedIn" class="coin-display">
          <img src="@/assets/image/moeny.png" class="coin-icon" alt="coin" />
          <span class="coin-amount">{{ money || '0' }}</span>
          <div class="refresh-btn" @click="refreshMoney">
            <van-icon name="replay" color="#8B0000" size="14px" />
          </div>
        </div>
        <div v-else class="login-btn" @click="goToLogin">
          <van-icon name="user-o" color="#8B0000" size="16px" />
          <span class="login-text">{{ $t("denglu") || "登录" }}</span>
        </div>
        <div class="navright" @click="goToNews">
          <img src="@/assets/image/yuyan1.png" alt="Language" class="language-icon" />
        </div>
      </div>
      <div class="block"></div>
    </div>
    <div class="g-content flex-column">
      <div class="mescroll">
        <div style="padding: 10px 0">
            <swi-pe></swi-pe>
          </div>
        <div class="broadcast">
          <div class="broadcast-icon">
            <div class="sprite-icon_gonggao"></div>
          </div>
          <div class="c_a0a0a0">{{ $t("dangqianbanben") }}：21.04.02</div>
        </div> 
        
        <div class="function-buttons">
          <div class="function-item" @click="goToGameOdds">
            <div class="function-icon">
              <img src="@/assets/center/hoem-tab-1.png" alt="游戏赔率" />
            </div>
            <span class="function-text">游戏赔率</span>
          </div>
          <div class="function-item" @click="goToGameRules">
            <div class="function-icon">
              <img src="@/assets/center/hoem-tab-2.png" alt="游戏规则" />
            </div>
            <span class="function-text">游戏规则</span>
          </div>
          <div class="function-item" @click="goToBetRecord">
            <div class="function-icon">
              <img src="@/assets/center/hoem-tab-3.png" alt="投注记录" />
            </div>
            <span class="function-text">投注记录</span>
          </div>
          <div class="function-item" @click="goToProfitStats">
            <div class="function-icon">
              <img src="@/assets/center/hoem-tab-4.png" alt="盈利统计" />
            </div>
            <span class="function-text">盈利统计</span>
          </div>
        </div>
        <div class="menu-container"></div>
        <div class="lottery-container">
          <universal-lottery-card 
            :game-id="7" 
            game-name="印度28" 
            :tab-index="0"
            class="lottery-animation">
          </universal-lottery-card>
          <universal-lottery-card 
            :game-id="6" 
            game-name="韩国28" 
            :tab-index="1"
            class="lottery-animation">
          </universal-lottery-card>
          <universal-lottery-card 
            :game-id="5" 
            game-name="日本28" 
            :tab-index="2"
            class="lottery-animation">
          </universal-lottery-card>
          <universal-lottery-card 
            :game-id="2" 
            game-name="加拿大28" 
            :tab-index="3"
            class="lottery-animation">
          </universal-lottery-card>
          <universal-lottery-card 
            :game-id="1" 
            game-name="澳洲28" 
            :tab-index="4"
            class="lottery-animation">
          </universal-lottery-card>
        </div>
      
      </div>
    </div>
    <tab-bar></tab-bar>
    </div>
</template>

<script>
// @ is an alias to /src
import TabBar from "@/components/tabbar/TabBar.vue";
// import LtList from "@/components/ltlist/LtList.vue";
import SwiPe from "@/components/swipe/SwiPe.vue";
import UniversalLotteryCard from "@/components/lottery/UniversalLotteryCard.vue";
import homeApi from "@/api/home";
// import vueSeamlessScroll from "vue-seamless-scroll/src";
// import storeAction from "@/store/typed-actions";  // 已移除
export default {
  name: "Home",
  components: {
    TabBar,
    SwiPe,
    // LtList,
    UniversalLotteryCard,
    // vueSeamlessScroll,
  },
  computed: {
    classOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        // limitMoveNum: 10, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    money() {
      console.log(this.$store.state.money);
      return this.$store.state.money;
    },
    isLoggedIn() {
      return !!this.$store.state.token;
    }
  },
  data() {
    return {
      // showList: false, // 已移除
      infoList: [],
      isShow: true,
      texType: localStorage.getItem("localetype"),
      time:''
    };
  },
  methods: {
    goToNews() {
      this.$router.push({
        path: "/language",
      });
    },
    // activechange(active) { // 已移除
    //   this.$toast.loading({
    //     message: this.$t('jiazaizhong'),
    //     forbidClick: true,
    //     duration: 1000,
    //   });
    //   storeAction.setCurrentUseractiveList(active);
    //   storeAction.setsessionStorage("activeList", active);
    //   console.log(active);
    // },
    info() {
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 0,
      });
      homeApi
        .heart("", "")
        .then((data) => {
          console.log(data.data);
          this.infoList = data.data.hit_notice;
          this.$toast.clear();
        })
        .catch((err) => {
          // alert(err)
          // this.$toast.clear();
          this.$toast.fail(err);
        });
    },
    changeNews() {
      this.$router.push({
        path: "/moreNews",
      });
    },
    refreshMoney() {
      // 刷新金币数据的方法
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 1000,
      });
      // 这里可以调用API刷新金币数据
      setTimeout(() => {
        this.$toast.clear();
      }, 1000);
    },
    goToLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    goToGameOdds() {
      // 跳转到游戏赔率页面
      this.$toast('游戏赔率功能开发中...');
    },
    goToGameRules() {
      // 跳转到游戏规则页面
      this.$toast('游戏规则功能开发中...');
    },
    goToBetRecord() {
      // 跳转到投注记录页面
      this.$router.push({
        path: "/betRecord",
      });
    },
    goToProfitStats() {
      // 跳转到盈利统计页面
      this.$toast('盈利统计功能开发中...');
    }
  },
  mounted() {

  },
  created() {
        let  myDate = new Date();
       let time=  myDate.toLocaleDateString();
       this.time=time.slice(5)
    this.info();
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
}
.g-header {
  position: absolute;
  width: 100%;
  height: 1.18rem;
  text-align: center;
  background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
  z-index: 9999;
  font-size: 0.35rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.3); 
}

@keyframes headerGlow {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(139, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 2px 15px rgba(139, 0, 0, 0.5);
  }
}
.block {
  height: 1.18rem;
}
.navleft,
.navright {
  display: flex;
  z-index: 11;
  position: absolute;
  height: 100%;
  align-items: center;
}
.middle {
  z-index: 10;
  max-width: 80%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.coin-display {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 20px;
  padding: 0rem 0 0 0.3rem;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.2);
  position: absolute;
  right: 1.3rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 11;
  animation: coinFloat 2s ease-in-out infinite;
}

@keyframes coinFloat {
  0%, 100% {
    transform: translateY(-50%) translateX(0);
  }
  50% {
    transform: translateY(-50%) translateX(-3px);
  }
}

.coin-icon {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  left: -0.2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  animation: coinRotate 4s linear infinite;
}

@keyframes coinRotate {
  0% {
    transform: translateY(-50%) rotateY(0deg);
  }
  100% {
    transform: translateY(-50%) rotateY(360deg);
  }
}

.coin-amount {
  color: #8B0000;
  font-size: 0.32rem;
  font-weight: 500;
  margin-right: 0.2rem;
  margin-left: 0.4rem;
  animation: numberPulse 2s ease-in-out infinite;
}

@keyframes numberPulse {
  0%, 100% {
    text-shadow: 0 0 5px rgba(139, 0, 0, 0.3);
  }
  50% {
    text-shadow: 0 0 15px rgba(139, 0, 0, 0.6);
  }
}

.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: refreshSpin 3s linear infinite;
  
  &:hover {
    background: rgba(139, 0, 0, 0.2);
    transform: scale(1.1);
    animation-play-state: paused;
  }
}

@keyframes refreshSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-btn {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 20px;
  padding: 0.2rem 0.4rem;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.2);
  position: absolute;
  right:1.3rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 11;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: loginFloat 2s ease-in-out infinite;
  
  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
  }
}

@keyframes loginFloat {
  0%, 100% {
    transform: translateY(-50%) translateX(0);
  }
  50% {
    transform: translateY(-50%) translateX(-3px);
  }
}

.login-text {
  color: #8B0000;
  font-size: 0.32rem;
  font-weight: 500;
  margin-left: 0.2rem;
  animation: textPulse 2s ease-in-out infinite;
}

@keyframes textPulse {
  0%, 100% {
    text-shadow: 0 0 5px rgba(139, 0, 0, 0.3);
  }
  50% {
    text-shadow: 0 0 15px rgba(139, 0, 0, 0.6);
  }
}

.function-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.4rem 0.2rem;
  margin: 0.2rem 0;
  animation: functionButtonsSlideIn 0.8s ease-out;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.1);
}

@keyframes functionButtonsSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
}

.function-icon {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 2px solid #C0C0C0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: rotate(45deg);
    animation: shimmer 3s infinite;
  }
  
  img {
    width:100%;
    height: 100%;
    z-index: 2;
    position: relative;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.function-text {
  color: #8B0000;
  font-size: 0.28rem;
  font-weight: 500;
  text-align: center;
  text-shadow: 0 1px 2px rgba(139, 0, 0, 0.1);
  animation: textGlow 2s ease-in-out infinite;
}

@keyframes textGlow {
  0%, 100% {
    text-shadow: 0 1px 2px rgba(139, 0, 0, 0.1);
  }
  50% {
    text-shadow: 0 1px 2px rgba(139, 0, 0, 0.1), 0 0 8px rgba(139, 0, 0, 0.3);
  }
}
.fs-18 {
  font-size: 0.36rem;
}
.navright {
  right: 0.2rem;
  animation: slideInFromRight 0.8s ease-out;
}

@keyframes slideInFromRight {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 新增的Logo样式 */
.logo-container {
  padding-left: 0.03rem; /* 留出左侧空隙 */
}
.logo-img {
  width: auto;
  height: 1.1rem; /* 调整 Logo 的高度 */
  display: block;
}

/* 新增的语言图标样式 */
.language-icon {
  width: 0.85rem; /* 调整图标大小 */
  height: 0.8rem;
  display: block;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
}

.broadcast {
  min-height: 30px;
  padding: 0.2rem 0.4rem;
  display: flex;
  align-items: center;
  animation: slideInFromTop 0.8s ease-out;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@keyframes slideInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.broadcast-icon {
  margin-right: 0.2rem;
}
.sprite-icon_gonggao {
  background: url("../assets/image/duo.png");
  width: 0.49rem;
  height: 0.49rem;
  background-size: 2.53913043rem 2.3026087rem;
  background-position: -1rem 0.9rem;
}
.c_a0a0a0 {
  color: #6c757d;
}
.cont-head {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 0.2rem; 
}
.cont-left {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
  padding: 0.6rem 0.2rem;
  color: #495057;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.2);
}
.en-text {
  text-align: left;
  font-size: 0.37rem;
}
.left-text {
  padding-top: 0.22rem;
  color: #6c757d;
  font-size: 0.35rem;
}
.icon {
  margin-left: 0.4rem;
  width: 1.29rem;
  height: 1.32rem;
}
.cont-right {
  width: 50%;
}
.huobin {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.28rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 8px;
  color: #495057;
  font-size: 0.37rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
  }
}
.rightcion {
  width: 0.77rem;
  height: 0.65rem;
  margin-right: 0.2rem;
}
.menu-container {
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
  padding: 0 0.2rem;
}
.prize-news-wrap {
  padding-bottom: 50px;
  margin-top: 0.2rem;
}
.sub-title {
  display: flex;
  text-align: center;
  font-size: 14px;
  color: #495057;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 8px;
  margin: 0 0.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  span {
    flex: 1;
    padding: 0.1rem 0 0.2rem;
  }
}
.prize-news {
  height: 150px;
}
.prize-marquee {
  height: 150px !important;
  font-size: 14px;
}
.vux-marquee {
  width: 100%;
  overflow: hidden;
  height: 300px;
}
.vux-marquee-box {
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
}
.prize-marquee-item {
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  span {
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }
  .name,
  .money {
    color: #8B0000;
  }
  .type,
  .date {
    color: #495057;
  }
}
.content {
  position: absolute;
  width: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  top: 1.18rem;
  z-index: 12;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.line-content {
  background-color: rgba(255, 255, 255, 0.95);
}
.line-content .line-item {
  height: 1rem;
  font-size: 0.35rem;
  padding: 0 0.4rem 0 0.2rem;
  display: flex;
  align-items: center;
  color: #495057;
}
.line-item :after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid rgba(139, 0, 0, 0.2);
  color: rgba(139, 0, 0, 0.2);
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.line-item .icon {
  margin-left: auto;
  width: 0.6rem;
  height: 0.6rem;
}
.angleRotestow {
  transform: rotate(180deg);
  transition: transform 0.3s, -webkit-transform 0.3s;
}
.icon-arrow-bottoms {
  transform: rotate(0);
  transition: transform 0.3s;
}

.lottery-container {
  animation: containerSlideIn 1s ease-out;
}

.lottery-animation {
  // animation: lotteryFloat 3s ease-in-out infinite;
  transition: all 0.3s ease;
 
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

@keyframes lotteryFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}
</style>