<template>
  <div class="betRecord">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">{{$t('lishizhangdan')}}</div>
          <div class="right">
            <div class="slide-btn" @click="show = !show">
              <div class="bg-icon bg-icon-filtrate"></div>
            </div>
          </div>
        </div>
        <div class="blockHeight"></div>
      </header>
      <div class="mescroll g-content">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="--END--"
            @load="onLoad"
          >
            <!-- 空数据的时候显示 -->
            <ul class="capital-list" v-if="list.length == []">
              <div class="mescroll-empty">
                <div class="empty-icon">📊</div>
                <p class="empty-tip">{{$t('wuTps')}}~</p>
                <p class="empty-btn" @click="BtnOk">{{$t('jiazaicx')}}</p>
              </div>
            </ul>
            <!-- 有数据显示他 -->
            <ul class="capital-list" v-else>
              <li class="capital-list-item" @click="changeDetail(item)" v-for="(item, index) in list"
                  :key="index">
                <div class="item-top">
                  <div class="time">{{$t('shijian')}}：{{timeStr(item.createtime)}}</div>
                </div>
                <div class="item-middle">
                  <span class="game-name">{{item.name}}</span>
                  <span class="plan-name">{{safeTranslate(item.plan_name)}}</span>
                  <span class="status-badge" :class="getStatusClass(item)" v-if="item.status==0">{{$t('yishouli')}}</span>
                  <span class="profit-badge" :class="getProfitClass(item)" v-if="item.status==1">{{item.whether_hit==0?$t('weiyingli'):(item.profit || 0)}}</span>
                </div>
                
                <div class="item-bottom">
                  <span class="issue-info">{{$t('di')}}{{item.issue}}{{$t('lun')}}</span>
                  <span class="amount-info">{{item.quantity}}u</span>
                  <span class="arrow-icon">→</span>
                </div>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </div>
    <!-- 弹出层 -->
    <van-popup
      v-model:show="show"
      position="right"
      :style="{ width: '5.88rem', height: '100%' }"
    >
      <div class="drawer-content is-open">
        <div class="my-drawer-content">
          <div class="filter-section">
            <p class="title">{{$t('shijian')}}</p>
            <ul class="opt-time">
              <li class="time-option" @click="(showTime = !showTime), (showTimeType = 0)">
                <span class="option-label">{{$t('upshijian')}}</span>
                <span class="option-value">{{ begin_date ? begin_date : '请选择' }}</span>
              </li>
              <li class="time-option" @click="(showTime = !showTime), (showTimeType = 1)">
                <span class="option-label">{{$t('downshijian')}}</span>
                <span class="option-value">{{ end_date ? end_date : '请选择' }}</span>
              </li>
            </ul>
          </div>
          <div v-if="false">
            <p class="title">{{$t('zhuangtai')}}</p>
            <ul class="opt-time">
              <template v-for="(item, index) in statueList" :key="index">
                <li
                  style="color: #fff"
                  :class="index == statueActive ? 'active' : ''"
                  @click="statueActive = index"
                >
                  {{ item }}
                </li>
              </template>
            </ul>
          </div>
          <div v-if="false">
            <p class="title">分类</p>
            <ul class="opt-time">
              <template v-for="(item, index) in statueList" :key="index">
                <li
                  style="color: #fff"
                  :class="index == statueActive ? 'active' : ''"
                  @click="statueActive = index"
                >
                  {{ item }}
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <div class="my-drawer-btns">
        <van-button class="reset-btn" @click="Reset">{{$t('chongzhi')}}</van-button>
        <van-button class="confirm-btn" @click="BtnOk">{{$t('queren')}}</van-button>
      </div>
    </van-popup>
    <!-- 时间选择 -->
    <van-popup
      v-model:show="showTime"
      @click="showTime = false"
      :style="{ width: '100%' }"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :title="showGourp"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="changeTime"
      />
    </van-popup>
  </div>
</template>
<script>
import userApi from "@/api/user";
import time from "@/utils/time";
export default {
  name: "BetRecord",
  components: {},
  data() {
    return {
      show: false,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      statueList: ["全部", "未盈利", "已盈利", "已受理", "未受理", "已取消"],
      statueActive: 0,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      begin_date: "",
      end_date: "",
      showTime: false,
    };
  },
  computed: {
    // 安全的翻译函数
    safeTranslate() {
      return (key) => {
        try {
          if (!key) return '';
          return this.$t(key) || key;
        } catch (error) {
          console.warn('翻译键错误:', key, error);
          return key || '';
        }
      };
    }
  },
  methods: {
    timeStr(items) {
      return time.formatDatethree(items * 1000);
    },
    getStatusClass(item) {
      return {
        'status-processing': item.status == 0,
        'status-completed': item.status == 1
      };
    },
    getProfitClass(item) {
      return {
        'profit-loss': item.whether_hit == 0,
        'profit-win': item.whether_hit == 1
      };
    },
    Reset() {
      this.statueActive = 0;
      this.begin_date = "";
      this.end_date = "";
    },
      BtnOk() {
      this.show = false;
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        duration: 0,
        forbidClick: true,
      });
        userApi
          .orderList(
            this.begin_date ? this.begin_date : this.formatDate(new Date()),
            this.end_date ? this.end_date : this.formatDate(new Date())
          )
          .then((data) => {
            if (data.data.length) {
              this.list = data.data;
            } else {
               this.list =[]
              this.$toast(this.$t('Tips.zanwu'));
            }
          });
      this.loading = false;
      this.finished = true;
      this.$toast.clear();
    },
      formatDate(date) {
      let yy = date.getFullYear();
      let mm = date.getMonth() + 1;
      mm = mm.toString();
      let dd = date.getDate().toString();
      return yy + "-" + mm.padStart(2, 0) + "-" + dd.padStart(2, 0);
    },
    changeTime(value) {
      console.log(this.formatDate(value));
      if (this.showTimeType == 0) {
        this.begin_date = this.formatDate(value);
      } else {
        this.end_date = this.formatDate(value);
      }
    },
    onRefresh() {
      this.refreshing = false;
      this.finished = false;
      this.loading = true;
      this.BtnOk();
    },
    changego() {
      this.$router.go(-1);
    },
    onLoad() {
       if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
        this.BtnOk();
      }
    },
    changeDetail(item) {
      try {
        // 传详情iD
        this.$router.push({
          path: "/betDetail",
          query: {item: JSON.stringify(item) },
        });
      } catch (error) {
        console.error('跳转错误:', error);
        this.$toast.fail('跳转失败');
      }
    },
  },
  mounted() {
     this.onRefresh();
  },
};
</script>
<style lang="less" scoped>
.betRecord {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  animation: pageSlideIn 0.8s ease-out;
}

@keyframes pageSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.g-header {
  background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.3);
  position: relative;
  width: 100%;
  height: 1.18rem;
  text-align: center;
  z-index: 9999;
  font-size: 0.35rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.2rem;
  
  .left, .right {
    display: flex;
    align-items: center;
    z-index: 11;
    height: 100%;
  }
  
  .middle {
    z-index: 10;
    max-width: 80%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(139, 0, 0, 0.5);
  }
}

.settingwarp {
  display: flex;
  flex-direction: column;
}
.slide-btn {
  padding: 0.24rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.slide-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.bg-icon-filtrate {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url(../assets/image/shoudian.png);
  filter: brightness(1.2) drop-shadow(0 1px 2px rgba(255, 215, 0, 0.3));
}

.bg-icon {
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.1rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  transition: all 0.3s ease;
}
.right {
  right: 0.3rem !important;
}
.mescroll {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  flex: 1;
}

.capital-list {
  padding: 0.2rem;
  animation: listSlideIn 0.6s ease-out 0.2s both;
}

@keyframes listSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.mescroll-empty {
  width: 100%;
  padding: 2rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 12px;
  margin: 1rem;
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.1);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
  animation: emptyIconFloat 2s ease-in-out infinite;
}

@keyframes emptyIconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.empty-tip {
  margin: 1rem 0;
  font-size: 0.36rem;
  color: #8B0000;
  font-weight: 500;
}

.empty-btn {
  max-width: 60%;
  margin: 1rem auto;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
  border: 2px solid #FFD700;
  border-radius: 8px;
  color: #FFD700 !important;
  font-weight: 600;
  font-size: 0.32rem;
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.empty-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 0, 0, 0.4);
  background: linear-gradient(135deg, #A52A2A 0%, #8B0000 100%);
}
.drawer-content {
  z-index: 1;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
  transform: translate3d(100%, 0, 0);
  transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
  visibility: hidden;
  box-shadow: 0 8px 32px rgba(139, 0, 0, 0.3);
  border-left: 2px solid #FFD700;
}
.drawer-content.is-open {
  visibility: visible;
  transform: translate3d(0, 0, 0);
}
.my-drawer-content {
  padding: 0.5rem;
  padding-bottom: 0.72rem;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.filter-section {
  margin-bottom: 1rem;
  padding: 0.3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.2);
}

.my-drawer-content ul {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.my-drawer-content ul li {
  width: 100%;
  text-align: left;
  margin-bottom: 0.2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.3rem;
  font-size: 0.32rem;
  border: 1px solid rgba(255, 215, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.my-drawer-content ul li:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #FFD700;
  transform: translateX(5px);
}

.time-option {
  .option-label {
    color: #FFD700;
    font-weight: 600;
  }
  
  .option-value {
    color: #fff;
    font-weight: 500;
    opacity: 0.8;
  }
}
.title {
  margin-bottom: 0.3rem;
  font-size: 0.4rem;
  color: #FFD700;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(139, 0, 0, 0.5);
}

.opt-time {
  color: #fff;
}
.active {
  border: 2px solid #FFD700 !important;
  background: rgba(255, 215, 0, 0.2) !important;
  color: #FFD700 !important;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.my-drawer-btns {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;
  display: flex;
  gap: 0.2rem;
  padding: 0.3rem;
  background: rgba(139, 0, 0, 0.8);
  border-top: 2px solid #FFD700;
}

.reset-btn {
  flex: 1;
  background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
  border: 2px solid #6c757d;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  font-size: 0.32rem;
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
  transition: all 0.3s ease;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(108, 117, 125, 0.4);
  background: linear-gradient(135deg, #5a6268 0%, #6c757d 100%);
}

.confirm-btn {
  flex: 1;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border: 2px solid #FFD700;
  border-radius: 8px;
  color: #8B0000;
  font-weight: 700;
  font-size: 0.32rem;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  transition: all 0.3s ease;
}

.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 215, 0, 0.5);
  background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
}
.capital-list-item:first-child {
  margin-top: 0;
}

.capital-list .capital-list-item {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  margin-top: 0.4rem;
  border-radius: 12px;
  padding: 0.4rem;
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.capital-list .capital-list-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.capital-list .capital-list-item:hover::before {
  opacity: 1;
}

.capital-list .capital-list-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(139, 0, 0, 0.2);
  border-color: #FFD700;
}
.capital-list-item > div {
  display: flex;
  text-align: left;
  
  .time {
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 8px;
    background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
    color: #FFD700;
    font-size: 0.32rem;
    font-weight: 600;
    padding: 0 0.2rem;
    display: inline-block;
    box-shadow: 0 2px 6px rgba(139, 0, 0, 0.3);
    border: 1px solid #FFD700;
  }
}
.item-middle {
  padding: 0.3rem 0;
  font-size: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  flex-wrap: wrap;
}

.game-name {
  color: #8B0000;
  font-weight: 700;
  font-size: 0.36rem;
  flex: 1;
  min-width: 2rem;
}

.plan-name {
  color: #6c757d;
  font-weight: 500;
  flex: 1;
  min-width: 2rem;
}

.status-badge {
  padding: 0.1rem 0.2rem;
  border-radius: 6px;
  font-size: 0.28rem;
  font-weight: 600;
  text-align: center;
  min-width: 1.5rem;
}

.status-processing {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #8B0000;
  box-shadow: 0 2px 6px rgba(255, 215, 0, 0.3);
}

.status-completed {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: #fff;
  box-shadow: 0 2px 6px rgba(40, 167, 69, 0.3);
}

.profit-badge {
  padding: 0.1rem 0.2rem;
  border-radius: 6px;
  font-size: 0.28rem;
  font-weight: 600;
  text-align: center;
  min-width: 1.5rem;
}

.profit-loss {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: #fff;
  box-shadow: 0 2px 6px rgba(220, 53, 69, 0.3);
}

.profit-win {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: #fff;
  box-shadow: 0 2px 6px rgba(40, 167, 69, 0.3);
  animation: profitGlow 2s ease-in-out infinite;
}

@keyframes profitGlow {
  0%, 100% {
    box-shadow: 0 2px 6px rgba(40, 167, 69, 0.3);
  }
  50% {
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.5);
  }
}
.capital-list .capital-list-item > div span:first-child {
  flex: 1;
}

.capital-list-item > div {
  display: flex;
}

.item-bottom {
  font-size: 0.35rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.2rem;
  border-top: 1px solid rgba(139, 0, 0, 0.1);
  margin-top: 0.2rem;
}

.issue-info {
  color: #6c757d;
  font-weight: 500;
  font-size: 0.32rem;
}

.amount-info {
  color: #8B0000;
  font-weight: 700;
  font-size: 0.36rem;
  text-shadow: 0 1px 2px rgba(139, 0, 0, 0.2);
}

.arrow-icon {
  color: #FFD700;
  font-size: 0.4rem;
  font-weight: bold;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.capital-list .capital-list-item:hover .arrow-icon {
  opacity: 1;
  transform: translateX(5px);
}

/* 滚动条美化 */
.mescroll::-webkit-scrollbar {
  width: 6px;
}

.mescroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.mescroll::-webkit-scrollbar-thumb {
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border-radius: 3px;
}

.mescroll::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(145deg, #FFA500, #FFD700);
}

/* 触摸优化 */
@media (hover: none) and (pointer: coarse) {
  .capital-list .capital-list-item:hover,
  .slide-btn:hover,
  .my-drawer-content ul li:hover {
    transform: none;
  }
  
  .capital-list .capital-list-item:active {
    transform: scale(0.98);
  }
  
  .slide-btn:active {
    transform: scale(0.95);
  }
  
  .my-drawer-content ul li:active {
    transform: translateX(3px);
  }
}

/* 响应式设计 */
@media (max-width: 375px) {
  .game-name,
  .plan-name {
    font-size: 0.32rem;
  }
  
  .status-badge,
  .profit-badge {
    font-size: 0.24rem;
    padding: 0.08rem 0.15rem;
  }
  
  .time {
    font-size: 0.28rem;
    padding: 0 0.15rem;
  }
  
  .item-bottom {
    font-size: 0.32rem;
  }
}

/* 高分辨率屏幕优化 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .capital-list .capital-list-item,
  .status-badge,
  .profit-badge {
    border-width: 1px;
  }
}

/* 列表项动画 */
.capital-list .capital-list-item {
  animation: listItemSlideIn 0.5s ease-out both;
}

.capital-list .capital-list-item:nth-child(1) { animation-delay: 0.1s; }
.capital-list .capital-list-item:nth-child(2) { animation-delay: 0.2s; }
.capital-list .capital-list-item:nth-child(3) { animation-delay: 0.3s; }
.capital-list .capital-list-item:nth-child(4) { animation-delay: 0.4s; }
.capital-list .capital-list-item:nth-child(5) { animation-delay: 0.5s; }
.capital-list .capital-list-item:nth-child(6) { animation-delay: 0.6s; }
.capital-list .capital-list-item:nth-child(7) { animation-delay: 0.7s; }
.capital-list .capital-list-item:nth-child(8) { animation-delay: 0.8s; }
.capital-list .capital-list-item:nth-child(9) { animation-delay: 0.9s; }
.capital-list .capital-list-item:nth-child(10) { animation-delay: 1.0s; }

@keyframes listItemSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>