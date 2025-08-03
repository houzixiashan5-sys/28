<template>
  <div class="trendChart">
    <div class="trendChartWarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div
            class="middle fs-18"
            :class="{ active: showTitle }"
            @click="showTitle = !showTitle"
          >
            <span>{{ name }}</span>
            <img src="@/assets/image/sanjiao.png" class="icon" alt="" />
          </div>
          <div class="right" @click="showTime = !showTime">
            <span>{{time}}</span>
          </div>
        </div>
      </header>
      <div class="g-content">
        <div class="chart-container">
          <!-- 表格 -->
          <div class="table-wrap Pc28 h100">
            <div class="tr tb-head">
              <div class="td issue">
                <span>{{$t('lunshu')}}</span>
                <span class="c_a0a0a0">{{ $t("yilou") }}</span>
              </div>
              <div class="td hezhi">
                <span>{{$t('hezhi')}}</span>
              </div>
              <div class="td">
                <span>{{$t('多单')}}</span>
              </div>
              <div class="td">
                <span>{{$t('空单')}}</span>
              </div>
              <div class="td">
                <span>{{$t('多双')}}</span>
              </div>
              <div class="td">
                <span>{{$t('空双')}}</span>
              </div>
              <div class="td">
                <span>{{$t('做多')}}</span>
              </div>
              <div class="td">
                <span>{{$t('做空')}}</span>
              </div>
              <div class="td">
                <span>{{$t('平单')}}</span>
              </div>
              <div class="td">
                <span>{{$t('平双')}}</span>
              </div>
            </div>
            <div class="mescroll tb-body">
              <div>
                <div
                  class="tr"
                  v-for="(item, index) in issueList"
                  :key="index"
                  @click="findList"
                >
                  <div class="td issue c_fe5050">{{ item.issue }}</div>
                  <div class="td hezhi">
                    <span class="ball fs-12 ball-green">{{ item.code }}</span>
                  </div>
                  <div
                    class="td"
                    :class="
                      item.base[0] == '多单' || item.base[1] == '多单'|| item.join == '多单' || item.join == '多單'
                        ? 'select'
                        : ''
                    "
                  >
                    {{
                      item.base[0] == "多单" || item.base[1] == "多单"||item.join == "多单" || item.join == "多單" ? $t('多单') : ""
                    }}
                  </div>
                  <div
                    class="td"
                    :class="
                      item.base[0] == '空单' || item.base[1] == '空单'|| item.join == '空单' || item.join == '空單'
                        ? 'select'
                        : ''
                    "
                  >
                    {{
                      item.base[0] == "空单" || item.base[1] == "空单"||   item.join == "空单" || item.join == "空單" ?$t('空单') : ""
                    }}
                  </div>
                  <div
                    class="td"
                    :class="
                      item.base[0] == '多双' || item.base[1] == '多双'||item.join == '多双' || item.join == '多雙'
                        ? 'select'
                        : ''
                    "
                  >
                    {{
                      item.base[0] == "多双" || item.base[1] == "多双"||item.join == '多双' || item.join == '多雙' ? $t('多双') : ""
                    }}
                  </div>
                  <div
                    class="td"
                    :class="
                      item.base[0] == '空双' || item.base[1] == '空双'||item.join == '空双' || item.join == '空雙'
                        ? 'select'
                        : ''
                    "
                  >
                    {{
                      item.base[0] == "空双" || item.base[1] == "空双"||item.join == '空双' || item.join == '空雙' ?$t('空双') : ""
                    }}
                  </div>
                  <div
                    class="td"
                    :class="
                      item.base[0] == '做多' || item.base[1] == '做多'
                        ? 'select'
                        : ''
                    "
                  >
                    {{
                      item.base[0] == "做多" || item.base[1] == "做多" ? $t('做多') : ""
                    }}
                  </div>
                  <div
                    class="td"
                    :class="
                      item.base[0] == '做空' || item.base[1] == '做空'
                        ? 'select'
                        : ''
                    "
                  >
                    {{
                      item.base[0] == "做空" || item.base[1] == "做空" ? $t('做空') : ""
                    }}
                  </div>
                  <div
                    class="td"
                    :class="
                      item.base[0] == '平单' || item.base[1] == '平单'||item.base[0] == '平單' || item.base[1] == '平單'
                        ? 'select'
                        : ''
                    "
                  >
                    {{
                      item.base[0] == "平单" || item.base[1] == "平单"||item.base[0] == '平單' || item.base[1] == '平單' ?$t('平单') : ""
                    }}
                  </div>
                  <div
                    class="td"
                    :class="
                      item.base[0] == '平双' || item.base[1] == '平双'||item.base[0] == '平雙' || item.base[1] == '平雙'  
                        ? 'select'
                        : ''
                    "
                  >
                    {{
                      item.base[0] == "平双" || item.base[1] == "平双"||item.base[0] == '平雙' || item.base[1] == '平雙'   ? $t('平双') : ""
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <van-overlay v-model:show="showTitle" @click="showTitle = false">
      <div class="content">
        <ul class="lottery-list clear fs-12">
          <li
            class="lottery-item"
            :class="game_id == 1 ? 'activeli' : ''"
            @click="game_id = 1"
          >
            <div class="text">SINGAPORE</div>
          </li>
          <li
            class="lottery-item"
            :class="game_id == 2 ? 'activeli' : ''"
            @click="game_id = 2"
          >
            <div class="text">NEW ZEALAND</div>
          </li>
          <li
            class="lottery-item"
            :class="game_id == 3 ? 'activeli' : ''"
            @click="game_id = 3"
          >
            <div class="text">KUALA LUMPUR</div>
          </li>
          <li
            class="lottery-item"
            :class="game_id == 4 ? 'activeli' : ''"
            @click="game_id = 4"
          >
            <div class="text">AUSTRALIA</div>
          </li>
        </ul>
      </div>
    </van-overlay>
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
      />
    </van-popup>
  </div>
</template>
<script>
import homeApi from "@/api/home";
export default {
  name: "TrendChart",
  components: {},
  data() {
    return {
      name: "",
      showTitle: false,
      showGourp: 0,
      showTime: false,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      game_id: "",
      issueList: "",
      list: ["多单", "空单", "多双", "空双", "做多", "做空", "平单", "平双"],
      indexOne: "",
      time:''
    };
  },
  watch: {
    game_id(newVal) {
      if (newVal == 1) {
        this.name = "SINGAPORE";
      } else if (newVal == 2) {
        this.name = "NEW ZEALAND";
      } else if (newVal == 3) {
        this.name = "KUALA LUMPUR";
      } else if (newVal == 4) {
        this.name = "AUSTRALIA";
      }
      this.showIssueChange();
    },
  },
  methods: {
    findList(base) {
      for (let i = 0; i < this.list.length; i++) {
        if (base["0"] == this.list[i]) {
          console.log(i, this.list[i], "listIndex");
          return i;
        } else if (base["1"] == this.list[i]) {
          return i;
        }
      }
    },
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
  mounted() {},
  created() {
            let  myDate = new Date();
       let time=  myDate.toLocaleDateString();
         this.time=time
    this.game_id = this.$route.query.game_id;
    if (this.game_id == 1) {
      this.name = "SINGAPORE";
    } else if (this.game_id == 2) {
      this.name = "NEW ZEALAND";
    } else if (this.game_id == 3) {
      this.name = "KUALA LUMPUR";
    } else if (this.game_id == 4) {
      this.name = "AUSTRALIA";
    }
    this.showIssueChange();
  },
};
</script>
<style lang="less" scoped>
.trendChart {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
}

.trendChartWarp {
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
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
  }
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

.chart-container {
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

.icon {
  width: 0.33rem;
  height: 0.25rem;
  transform: rotate(0deg);
  -webkit-transform-origin: 50% 35%;
  transform-origin: 50% 35%;
  transition: transform 0.3s;
  margin-left: 0.1rem;
}

.active {
  span {
    color: #ff7d20;
  }
  .icon {
    transform: rotate(180deg);
    transition: transform 0.3s;
  }
}

.content {
  z-index: 12;
  position: absolute;
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  height: 1.18rem;
  top: 1.18rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.2);
  box-shadow: 0 4px 16px rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.lottery-list {
  background: transparent;
  padding: 0.1rem;
  animation: listSlideIn 0.6s ease-out;
}

@keyframes listSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.lottery-item {
  width: 25%;
  float: left;
  text-align: center;
  padding: 0.12rem;
  animation: itemFloat 0.8s ease-out;

  .text {
    padding: 0.15rem 0.1rem;
    border: 1px solid rgba(139, 0, 0, 0.3);
    border-radius: 0.08rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);
    color: #495057;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(139, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
      border-color: rgba(139, 0, 0, 0.5);
    }
  }
}

@keyframes itemFloat {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.activeli .text {
  color: #8B0000;
  border-color: #8B0000;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
}

.table-wrap {
  width: 9rem;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 0.16rem;
  border: 1px solid rgba(139, 0, 0, 0.2);
  box-shadow: 0 8px 32px rgba(139, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  animation: tableFloat 0.8s ease-out;
}

@keyframes tableFloat {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.table-wrap.Pc28 {
  width: 13.7rem;
}

.tr {
  display: flex;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 0, 0, 0.05);
  }
}

.td {
  flex: 1;
  height: 1rem;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 0.35rem;
  border-right: 1px solid rgba(139, 0, 0, 0.1);
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
  color: #495057;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(139, 0, 0, 0.1);
    color: #8B0000;
  }
}

.tb-head .td {
  height: 1.33rem;
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(165, 42, 42, 0.1) 100%);
  color: #8B0000;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(139, 0, 0, 0.1);
}

.issue {
  width: 2.7rem;
  flex: unset;
}

.hezhi {
  width: 1.33rem;
  flex: unset;
}

.mescroll {
  flex: 1;
}

.select {
  color: #fff;
  animation: selectPulse 0.6s ease-out;
}

@keyframes selectPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.Pc28 .tr .select:nth-child(4n + 3) {
  background: linear-gradient(135deg, #ff4349 0%, #ff6b6b 100%);
  box-shadow: 0 4px 16px rgba(255, 67, 73, 0.3);
}

.Pc28 .tr .select:nth-child(4n + 4) {
  background: linear-gradient(135deg, #24abe2 0%, #4fc3f7 100%);
  box-shadow: 0 4px 16px rgba(36, 171, 226, 0.3);
}

.Pc28 .tr .select:nth-child(4n + 5) {
  background: linear-gradient(135deg, #8a0a61 0%, #e91e63 100%);
  box-shadow: 0 4px 16px rgba(138, 10, 97, 0.3);
}

.Pc28 .tr .select:nth-child(4n + 6) {
  background: linear-gradient(135deg, #fccf2e 0%, #ffeb3b 100%);
  box-shadow: 0 4px 16px rgba(252, 207, 46, 0.3);
}

.ball-green {
  background: linear-gradient(135deg, #41ff9a 0%, #01ac7a 100%);
  box-shadow: 0 4px 16px rgba(65, 255, 154, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(65, 255, 154, 0.4);
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
  font-size: 0.38rem;
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

.c_fe5050 {
  color: #fe5050;
  font-weight: 600;
}

.fs-12 {
  font-size: 0.24rem;
}

.fs-18 {
  font-size: 0.36rem;
}
</style>