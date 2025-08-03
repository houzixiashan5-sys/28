<template>
  <div class="lottery">
    <header>
      <div class="g-header">
        <div class="left"></div>
        <div class="middle fs-18">{{ $t('jiaoyidating') }}</div>
        <div class="right">
          <div class="bg-icon bg-icon-setting"></div>
        </div>
      </div>
      <div class="blockHeight"></div>
    </header>
    <div class="g-content mescroll">
      <div>
        <div class="tab-box-wrap">
          <ul class="tab-box">
            <li
              v-for="(item, index) in gameList"
              :key="index"
              class="tab"
              :class="curr == index ? 'active' : ''"
              @click="changeTab(index)"
            >
              {{ item.name }}
            </li>

            <div class="tab_lines" :style="activeLines"></div>
          </ul>
          <div>
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item, index) in gameList"
                  :key="index"
                >
                  <ul class="level-box" :key="`level-box-${curr}-${animationKey}`">
                    <!-- 根据房间类型换图 -->
                    <template
                      v-for="(liitem, Liindex) in item.planList"
                      :key="Liindex"
                    >
                      <li
                        class="level level-item"
                        :class="{ 'animate-in': shouldAnimate(index) }"
                        @click="changeroom(liitem.id, liitem.game_id,item.name,liitem.title,liitem.join_limit)"
                        v-if="liitem.type == 0"
                      >
                        <div class="title">
                          <div class="level-name">{{ $t('jichulicai') }}</div>
                          <div class="people-box">
                            <img
                              src="@/assets/image/iconline.png"
                              class="icon"
                              alt=""
                            />
                            <span>{{ liitem.robot_num }}</span>
                          </div>
                        </div>
                        <div class="text-box">
                          <div class="text">
                            <span>{{ $t('zuiditouzi') }}</span>
                            <span class="price">{{ liitem.min_limit }}</span>
                          </div>
                          <div class="text">
                            <span>{{ $t('zuidijinru') }}</span>
                            <span class="price">{{ liitem.join_limit }}</span>
                          </div>
                        </div>
                      </li>
                      <li
                        class="level1 level-item"
                        :class="{ 'animate-in': shouldAnimate(index) }"
                        @click="changeroom(liitem.id, liitem.game_id,item.name,liitem.title,liitem.join_limit)"
                        v-if="liitem.type == 1"
                      >
                        <div class="title">
                          <div class="level-name">{{ $t('zishenlicai') }}</div>
                          <div class="people-box">
                            <img
                              src="@/assets/image/iconline.png"
                              class="icon"
                              alt=""
                            />
                            <span>{{ liitem.robot_num }}</span>
                          </div>
                        </div>
                        <div class="text-box">
                          <div class="text">
                            <span>{{ $t('zuiditouzi') }}</span>
                            <span class="price">{{ liitem.min_limit }}</span>
                          </div>
                          <div class="text">
                            <span>{{ $t('zuidijinru') }}</span>
                            <span class="price">{{ liitem.join_limit }}</span>
                          </div>
                        </div>
                      </li>
                      <li
                        class="level2 level-item"
                        :class="{ 'animate-in': shouldAnimate(index) }"
                        @click="changeroom(liitem.id, liitem.game_id,item.name,liitem.title,liitem.join_limit)"
                        v-if="liitem.type == 2"
                      >
                        <div class="title">
                          <div class="level-name">{{ $t('dashilicai') }}</div>
                          <div class="people-box">
                            <img
                              src="@/assets/image/iconline.png"
                              class="icon"
                              alt=""
                            />
                            <span>{{ liitem.robot_num }}</span>
                          </div>
                        </div>
                        <div class="text-box">
                          <div class="text">
                            <span>{{ $t('zuiditouzi') }}</span>
                            <span class="price">{{ liitem.min_limit }}</span>
                          </div>
                          <div class="text">
                            <span>{{ $t('zuidijinru') }}</span>
                            <span class="price">{{ liitem.join_limit }}</span>
                          </div>
                        </div>
                      </li>
                      <li
                        class="level3 level-item"
                        :class="{ 'animate-in': shouldAnimate(index) }"
                        @click="changeroom(liitem.id, liitem.game_id,item.name,liitem.title,liitem.join_limit)"
                        v-if="liitem.type == 3"
                      >
                        <div class="title">
                          <div class="level-name">{{ $t('zhuanjialicai') }}</div>
                          <div class="people-box">
                            <img
                              src="@/assets/image/iconline.png"
                              class="icon"
                              alt=""
                            />
                            <span>{{ liitem.robot_num }}</span>
                          </div>
                        </div>
                        <div class="text-box">
                          <div class="text">
                            <span>{{ $t('zuiditouzi') }}</span>
                            <span class="price">{{ liitem.min_limit }}</span>
                          </div>
                          <div class="text">
                            <span>{{ $t('zuidijinru') }}</span>
                            <span class="price">{{ liitem.join_limit }}</span>
                          </div>
                        </div>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import TabBar from "@/components/tabbar/TabBar.vue";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import homeApi from "@/api/home";
export default {
  name: "Lottery",
  components: {
    TabBar,
  },
  data() {
    return {
      curr: 0,
      activeLines: "left: 0%; width: 25%",
      SweipeIndex: 0,
      gameList: "",
      animationKey: 0, // 用于触发动画重新播放
    };
  },
    computed: {
    money() {
      console.log(this.$store.state.money);
      return this.$store.state.money;
    },
    },
  watch: {
    curr() {
      this.updateActiveLines();
    },
    '$route.query.tab'(newTab) {
      // 监听路由参数变化
      if (newTab !== undefined && this.gameList && this.gameList.length > 0) {
        const tabIndex = parseInt(newTab);
        if (tabIndex >= 0 && tabIndex < this.gameList.length && tabIndex !== this.curr) {
          this.curr = tabIndex;
          this.changeTab(tabIndex);
        }
      }
    },
  },
  methods: {
    changeTab(index) {
      this.curr = index;
      // 重置动画，触发重新播放
      this.resetAnimation();
      if (this.mySwiper) {
        this.mySwiper.slideTo(index, 300, false);
      }
    },
    updateActiveLines() {
      if (!this.gameList || this.gameList.length === 0) return;
      
      const tabCount = this.gameList.length;
      const tabWidth = 100 / tabCount;
      const leftPosition = this.curr * tabWidth;
      
      this.activeLines = `left: ${leftPosition}%; width: ${tabWidth}%`;
    },
    handleClickSlide(index) {
      console.log(index);
    },
    tabIndex(target, nodeList) {
      for (let i = 0; i < nodeList.length; i++) {
        if (target === nodeList[i]) {
          return i;
        }
      }
    },
    changeroom(id, game_id,name,title,joinmoeny) {
      // 判断进入金额和自己的金额
      console.log(this.money*1,joinmoeny*1)
      if(this.money*1<joinmoeny*1){
        // alert(1)
        this.$toast(this.$t('Tips.zcbz'))
        return
      }
      this.$router.push({
        path: "/betRoom",
        query: {
          id: id,
          game_id: game_id,
          name:name,
          title:title
        },
      });
    },
    info() {},
    shouldAnimate(slideIndex) {
      // 只有当当前显示的slide与当前tab匹配时才播放动画
      return slideIndex === this.curr;
    },
    resetAnimation() {
      // 先重置animationKey
      this.animationKey = 0;
      // 使用nextTick确保DOM更新后再触发动画
      this.$nextTick(() => {
        this.animationKey++;
      });
    },
    
    checkUrlTab() {
      // 检查URL参数中的tab值
      const tabParam = this.$route.query.tab;
      if (tabParam !== undefined && this.gameList && this.gameList.length > 0) {
        const tabIndex = parseInt(tabParam);
        if (tabIndex >= 0 && tabIndex < this.gameList.length) {
          this.curr = tabIndex;
          // 如果swiper已经初始化，则切换tab
          if (this.mySwiper) {
            this.changeTab(tabIndex);
          }
        }
      }
    },
  },
  mounted() {
    this.$toast.loading({
      message: this.$t('jiazaizhong'),
      forbidClick: true,
      duration: 0,
    });
    homeApi
      .Lotteryinfo("", "")
      .then((data) => {
        console.log(data.data);
        this.gameList = data.data.gameList;
        // 初始化activeLines
        this.$nextTick(() => {
          this.updateActiveLines();
          // 初始化动画
          this.resetAnimation();
          // 检查URL参数，自动切换到指定tab
          this.checkUrlTab();
        });
        let that = this;
        this.mySwiper = new Swiper(".swiper-container", {
          // 如果需要分页器
          pagination: ".swiper-pagination",
          // 如果需要前进后退按钮
          nextButton: ".swiper-button-next",
          observer: true,
          observerParents: false,
          prevButton: ".swiper-button-prev",
          onSlideChangeEnd: function (swiper) {
            that.SweipeIndex = swiper.activeIndex;
            that.curr = swiper.activeIndex;
            console.log(that.SweipeIndex, swiper.activeIndex);
            // 每次滑动结束时重置动画
            that.resetAnimation();
          },
        });
        this.$toast.clear();
      })
      .catch((err) => {
        this.$toast.clear();
        this.$toast.fail(err.msg);
      });
  },
  created() {},
};
</script>
<style lang="less" scoped>
.lottery {
  height: 100%;
  display: flex;
  padding-bottom: 1rem;
  padding-bottom: calc(1rem + constant(safe-area-inset-bottom));
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
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

.blockHeight {
  height: 1.18rem;
}

.mescroll {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
}

.tab-box-wrap {
  padding: 0 0.24rem;
  animation: slideInFromTop 0.8s ease-out;
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

.tab-box {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 0.36rem 0 0.54rem;
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 8px;
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.1);
  overflow: hidden;
}

.tab {
  flex: 1;
  padding: 0.4em 0;
  font-size: 0.35rem;
  font-weight: 700;
  text-align: center;
  color: #6c757d;
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  cursor: pointer;
  
  &:hover {
    color: #8B0000;
  }
}

.active {
  color: #fff !important;
  font-weight: 800;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  animation: activeGlow 2s ease-in-out infinite;
}

@keyframes activeGlow {
  0%, 100% {
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);
  }
}

.tab_lines {
  position: absolute;
  height: 100%;
  background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  z-index: 0;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.3);
  animation: tabLinesGlow 2s ease-in-out infinite;
}

@keyframes tabLinesGlow {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(139, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 2px 15px rgba(139, 0, 0, 0.6), 0 0 20px rgba(139, 0, 0, 0.4);
  }
}

.swiper-container {
  width: 100%;
  .swiper-wrapper {
    .swiper-slide {
    }
  }
}

.level-box {
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

/* 添加level-item的基础样式和动画 */
.level-item {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s ease;
}

.level-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* 为每个level-item添加延迟动画，实现一个一个出现的效果 */
.level-item:nth-child(1).animate-in {
  transition-delay: 0.1s;
}

.level-item:nth-child(2).animate-in {
  transition-delay: 0.2s;
}

.level-item:nth-child(3).animate-in {
  transition-delay: 0.3s;
}

.level-item:nth-child(4).animate-in {
  transition-delay: 0.4s;
}

.level-item:nth-child(5).animate-in {
  transition-delay: 0.5s;
}

.level-item:nth-child(6).animate-in {
  transition-delay: 0.6s;
}

.level-item:nth-child(7).animate-in {
  transition-delay: 0.7s;
}

.level-item:nth-child(8).animate-in {
  transition-delay: 0.8s;
}

.level {
  height: 3rem;
  margin-bottom: 0.2rem;
  background: url('../assets/center/libg.png');
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
}

.level1 {
  height: 3rem;
  margin-bottom: 0.2rem;
  background: url('../assets/center/libg1.png');
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
}

.level2 {
  height: 3rem;
  margin-bottom: 0.2rem;
  background: url('../assets/center/libg2.png');
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
}

.level3 {
  height: 3rem;
  margin-bottom: 0.2rem;
  background:  url('../assets/center/libg3.png');
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
}

.title {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 0.56rem 0;
  font-size: 0.45rem;
  color: #fff;
  position: relative;
  z-index: 2;
}

.level-name {
  color: #fff;
  font-weight: 600;
  animation: textGlow 2s ease-in-out infinite;
}

@keyframes textGlow {
  0%, 100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
  }
}

.people-box {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 0.2rem;
  font-size: 0.45rem;
  color: #fff;
  position: relative;
  z-index: 2;
  
  .icon {
    margin-right: 0.06rem;
    width: 0.5rem;
    height: 0.5rem;
    animation: iconPulse 2s ease-in-out infinite;
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.text-box {
  padding: 0.3rem 0.56rem 0;
  font-size: 0.3rem;
  text-align: right;
  position: relative;
  z-index: 2;
}

.text {
  color: #fff;
}

.price {
  padding-left: 0.1rem;
  color: #fff;
  font-weight: 600;
  animation: priceGlow 2s ease-in-out infinite;
}

@keyframes priceGlow {
  0%, 100% {
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  }
}

.text:last-child {
  margin-top: 0.2rem;
}
</style>