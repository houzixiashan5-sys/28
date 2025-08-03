<template>
  <div class="betDetail">
    <div class="settingwarp">
      <header>
        <div class="g-header">
          <div class="left" @click="changego">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="middle fs-18">{{$t('buyxq')}}</div>
          <div class="right">
            <div class="slide-btn"></div>
          </div>
        </div>
        <div class="blockHeight"></div>
      </header>
      <div class="g-content">
        <div>
          <div class="bet-detail-type">
            <!-- 未中奖 -->
            <img src="@/assets/image/type.png" class="" alt="" />
            <!-- 已中奖 -->
            <div class="middle">
              <div>
                <span>SINGAPORE</span>
                <span class="fs-12 issue c_a0a0a0">{{$t('di')}}20211223186{{$t('lun')}}</span>
              </div>
              <div>
                <div class="order-count">
                  <p class="c_a0a0a0">{{$t('jine')}}</p>
                  <p class="count">{{ item.quantity }}u</p>
                </div>
                <div class="prize">
                  <p class="c_a0a0a0">{{$t('yingli')}}</p>
                  <p class="count c_ff7d20">
                    {{ item.status == 0 ? "----" : item.profit + "u" }}
                  </p>
                </div>
              </div>
            </div>
            <!-- 已经开奖 -->
            <div
              class="logo"
              v-if="item.status == 1 && item.whether_hit == 1"
            ></div>
            <div
              class="logo2"
              v-if="item.status == 1 && item.whether_hit == 0"
            ></div>
            <!-- <div class="logo1" v-if="item.status == 0"></div> -->
          </div>
          <div class="bet-detail-msg">
            <div class="list">
              <div class="list-item">
                <div class="title">{{ $t('orderNo') }}</div>
                <div class="content">{{ item.orderNo || 'N/A' }}</div>
              </div>
              <div class="list-item">
                <div class="title">{{$t('plan_name')}}</div>
                <div class="content">{{ safeTranslate(item.plan_name) }}</div>
              </div>
              <div class="list-item">
                <div class="title">{{ $t('kaihaojieguo') }}</div>
                                  <div class="content" v-if="item.status != 0">
                    <div class="result-wrap">
                      <div class="result">
                        <div class="ball ball-orange">{{item.lottery_code && splitStr(item.lottery_code)[0] || ''}}</div>
                        <span class="fs-16">+</span>
                        <div class="ball ball-orange">{{item.lottery_code && splitStr(item.lottery_code)[1] || ''}}</div>
                        <span class="fs-16">+</span>
                        <div class="ball ball-orange">{{item.lottery_code && splitStr(item.lottery_code)[2] || ''}}</div>
                        <span class="fs-16">=</span>
                        <div class="ball ball-red">{{item.lottery_code && splitStr(item.lottery_code)[3] || ''}}</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="list-item">
                <div class="title">{{ $t('buyxx') }}</div>
                <div class="content">
                  <van-collapse v-model="activeNames">
                    <van-collapse-item name="1">
					<template #title><div>{{ $t('haoxx') }} <van-icon name="" /></div></template>
                      <ul class="fs-12 select-num-list">
                        <li class="select-num-item boderTop">
                          <span>{{ safeTranslate(item.play_method) }}</span>
                          <span>{{ item.quantity }}</span>
                          <span class="c_ff7d20">{{item.status == 0?'----': item.profit }}</span>
                        </li>
                      </ul>
                    </van-collapse-item>
                  </van-collapse>
                </div>
              </div>
              <div class="list-item">
                <div class="title">{{ $t('buysj') }}</div>
                <div class="content">{{ timeStr(item.createtime) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import time from "@/utils/time";
export default {
  name: "BetDetail",
  components: {},
  data() {
    return {
      activeNames: ["1"],
      item: "",
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
    changego() {
      this.$router.go(-1);
    },
    splitStr(str) {
      try {
        if (!str || typeof str !== 'string') {
          return ['', '', '', ''];
        }
        return str.split(/\s+/);
      } catch (error) {
        console.error('splitStr错误:', error);
        return ['', '', '', ''];
      }
    },
  },
  mounted() {
    try {
      console.log(this.$route.query.item);
      if (this.$route.query.item) {
        this.item = JSON.parse(this.$route.query.item);
        // 验证必要字段
        if (!this.item || typeof this.item !== 'object') {
          throw new Error('数据格式错误');
        }
        // 确保所有字段都有默认值
        this.item = {
          orderNo: this.item.orderNo || 'N/A',
          plan_name: this.item.plan_name || 'N/A',
          play_method: this.item.play_method || 'N/A',
          quantity: this.item.quantity || 0,
          status: this.item.status || 0,
          profit: this.item.profit || 0,
          whether_hit: this.item.whether_hit || 0,
          createtime: this.item.createtime || Date.now() / 1000,
          lottery_code: this.item.lottery_code || '',
          ...this.item
        };
      } else {
        this.$toast.fail('参数错误');
        this.$router.go(-1);
      }
    } catch (error) {
      console.error('JSON解析错误:', error);
      this.$toast.fail('数据格式错误');
      this.$router.go(-1);
    }
  },
};
</script>
<style lang="less" scoped>
.betDetail {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
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
  }
}

.settingwarp {
  display: flex;
  flex-direction: column;
}

.g-content {
  padding: 0.3rem;
}

.bet-detail-type {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.2);
  margin-bottom: 0.3rem;
  
  img {
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    border: 2px solid #FFD700;
    box-shadow: 0 2px 6px rgba(255, 215, 0, 0.3);
  }
}

.middle {
  margin-left: 0.2rem;
  margin-right: 0.48rem;
  flex: 1;
}

.middle > div:first-child {
  padding-bottom: 0.4rem;
  text-align: left;
  font-size: 0.35rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.2);
  color: #8B0000;
  font-weight: 600;
}

.middle > div:last-child > div {
  flex: 1;
  text-align: center;
}

.middle > div:first-child .issue {
  margin-left: 0.1rem;
  color: #6c757d;
  font-weight: 500;
}

.middle > div:last-child {
  margin-top: 0.2rem;
  display: flex;
  font-size: 0.35rem;
}

.order-count {
  position: relative;
}

.count {
  margin-top: 0.2rem;
  color: #8B0000;
  font-weight: 700;
  font-size: 0.4rem;
}

.order-count::after {
  content: "";
  display: block;
  width: 1px;
  height: 80%;
  background-color: rgba(139, 0, 0, 0.2);
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.prize {
  flex: 1;
  text-align: center;
}

.c_ff7d20 {
  color: #FF7D20;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(255, 125, 32, 0.3);
}

.logo {
  background-image: url(../assets/image/yingli.png);
  position: absolute;
  top: 0;
  right: 0;
  width: 1.2rem;
  height: 1.52rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-top: 0;
}

.logo1 {
  background-image: url(../assets/image/shouli.png);
  position: absolute;
  top: 0;
  right: 0;
  width: 0.7rem;
  height: 1.52rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-top: 0;
}

.logo2 {
  background-image: url(../assets/image/weiyingli.png);
  position: absolute;
  top: 0;
  right: 0;
  width: 1.2rem;
  height: 1.52rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-top: 0;
}

.bet-detail-msg {
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  margin-top: 0.2rem;
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.2);
  overflow: hidden;
}

.list {
  font-size: 0.38rem;
  padding-bottom: 0.4rem;
}

.list-item {
  text-align: left;
  padding: 0.4rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(255, 215, 0, 0.05);
  }
  
  .title {
    display: inline-block;
    color: #8B0000;
    padding: 0 0.4rem;
    font-weight: 600;
    font-size: 0.36rem;
    height: 0.68rem;
    line-height: 0.68rem;
    border-top-right-radius: 0.35rem;
    border-bottom-right-radius: 0.35rem;
    background: linear-gradient(135deg, #30385d 0%, #4a5a7a 100%);
    color: #fff;
  }
  
  .content {
    padding: 0.2rem 0.4rem;
    color: #6c757d;
  }
}

.result {
  display: flex;
  align-items: center;
}

.ball {
  display: inline-block;
  border-radius: 50%;
  margin: 0.04rem;
  width: 0.6rem;
  height: 0.6rem;
  text-align: center;
  line-height: 0.6rem;
  color: #fff;
  font-size: 0.28rem;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.ball-orange {
  background: linear-gradient(135deg, #ffb658 0%, #ff6045 100%);
  border: 1px solid #FFD700;
}

.ball-red {
  background: linear-gradient(135deg, #f8872c 0%, #ff0000 100%);
  border: 1px solid #FFD700;
}

.select-num-item {
  text-align: center;
  padding: 5px 0;
}

.boderTop:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 35px;
  right: 0;
  height: 1px;
  border-top: 1px solid #3d5179;
  color: #3d5179;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}

.select-num-item span {
  display: inline-block;
  width: 33.33%;
  
  &:first-child {
    color: #8B0000;
  }
  
  &:nth-child(2) {
    color: #6c757d;
  }
  
  &:last-child {
    color: #FF7D20;
  }
}
</style>
