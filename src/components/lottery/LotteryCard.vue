<template>
  <div class="lottery-card">
    <div class="card-header">
      <div class="header-left">
        <div class="game-title">加拿大28</div>
        <div class="issue-text">第{{ currentIssue }}期</div>
      </div>
      <div class="header-right">
        <div class="status-tag" :class="{ 'betting': !isClosed, 'closed': isClosed }">
          {{ isClosed ? '已封盘' : '下注中' }}
        </div>
        <div class="time-text" v-if="!isClosed">
          下起开奖时间： {{ countdownText }}
        </div>
      </div>
    </div>
    
    <div class="grid-section">
      <div class="number-grid" :class="{ 'grid-loaded': displayCodes.length > 0 }">
        <div 
          class="grid-cell" 
          v-for="(code, index) in displayCodes" 
          :key="index"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          {{ code }}
        </div>
        <div v-if="displayCodes.length === 0" class="loading-cells">
          <div class="loading-cell" v-for="i in 36" :key="i"></div>
        </div>
      </div>
    </div>
    
    <div class="action-section">
      <button class="bet-button" @click="goToLottery">立即投注</button>
    </div>
    
    <div class="footer-info">
      <span>已有{{ randomOrderCount }}人下单</span>
    </div>
  </div>
</template>

<script>
import homeApi from '@/api/home.js'

export default {
  name: 'LotteryCard',
  data() {
    return {
      displayCodes: [],
      gameId: 2, // 加拿大28的游戏ID
      planId: null, // 计划ID
      currentIssue: '',
      isClosed: false,
      countdownText: '',
      countdownTimer: null,
      openTime: null,
      randomOrderCount: 0
    }
  },
  mounted() {
    this.generateRandomOrderCount()
    this.fetchIssueList()
    this.startHeartbeat()
  },
  beforeUnmount() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer)
    }
  },
  methods: {
    generateRandomOrderCount() {
      this.randomOrderCount = Math.floor(Math.random() * (12000 - 9000 + 1)) + 9000
    },
    
    async fetchIssueList() {
      try {
        const response = await homeApi.issueList(this.gameId, "28vue.ai-ex-xo.com", "tw")
        if (response.code === 1 && response.data) {
          // 取前36个的code值
          this.displayCodes = response.data.slice(0, 36).map(item => item.code)
          // 获取第一个数据的plan_id用于心跳
          if (response.data.length > 0) {
            this.planId = response.data[0].id
          }
        }
      } catch (error) {
        console.error('获取期数列表失败:', error)
      }
    },
    
    async startHeartbeat() {
      if (!this.planId) {
        await this.fetchIssueList()
      }
      
      this.fetchHeartbeat()
      // 每5秒调用一次心跳
      setInterval(() => {
        this.fetchHeartbeat()
      }, 5000)
    },
    
    async fetchHeartbeat() {
      try {
        const response = await homeApi.heart(this.planId, this.gameId, "28vue.ai-ex-xo.com", "tw")
        if (response.code === 1 && response.data) {
          const { issue, whether_close } = response.data.issue
          this.currentIssue = issue
          this.isClosed = whether_close
          this.openTime = response.data.issue.openTime
          
          if (!this.isClosed) {
            this.startCountdown()
          } else {
            this.stopCountdown()
          }
        }
      } catch (error) {
        console.error('心跳请求失败:', error)
      }
    },
    
    startCountdown() {
      this.stopCountdown()
      this.updateCountdown()
      this.countdownTimer = setInterval(() => {
        this.updateCountdown()
      }, 1000)
    },
    
    stopCountdown() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer)
        this.countdownTimer = null
      }
    },
    
    updateCountdown() {
      if (!this.openTime) return
      
      const now = new Date()
      const openTime = new Date(this.openTime)
      const diff = openTime.getTime() - now.getTime()
      
      if (diff <= 0) {
        this.countdownText = '开奖中...'
        return
      }
      
      const minutes = Math.floor(diff / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      this.countdownText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    
    goToLottery() {
      this.$router.push({
        path: '/lottery',
        query: { tab: '0' }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.lottery-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 8px;
  padding: 16px; 
  color: #495057;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.header-left {
  .game-title {
    font-size: 18px;
    font-weight: bold;
    color: #8B0000;
    margin-bottom: 4px;
    text-align: left;
  }
  
  .issue-text {
    font-size: 14px;
    color: #6c757d;
    opacity: 0.8;
  }
}

.header-right {
  text-align: right;
  
  .status-tag {
    border-radius: 12px;
    padding: 4px 8px;
    font-size: 12px;
    margin-bottom: 4px;
    display: inline-block;
    
    &.betting {
      background: linear-gradient(90deg, #8B0000 0%, #A52A2A 100%);
      border: 1px solid #8B0000;
      color: #fff;
    }
    
    &.closed {
      background: rgba(139, 0, 0, 0.1);
      border: 1px solid rgba(139, 0, 0, 0.3);
      color: #6c757d;
    }
  }
  
  .time-text {
    font-size: 12px;
    color: #6c757d;
    opacity: 0.7;
  }
}

.grid-section {
  margin-bottom: 16px;
}

.number-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  position: relative;
}

.loading-cells {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.loading-cell {
  background: rgba(139, 0, 0, 0.1);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 2px;
  min-height: 28px;
  animation: loadingPulse 1.5s ease-in-out infinite;
}

@keyframes loadingPulse {
  0%, 100% {
    opacity: 0.3;
    background: rgba(139, 0, 0, 0.1);
  }
  50% {
    opacity: 0.7;
    background: rgba(139, 0, 0, 0.2);
  }
}

.grid-cell {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(139, 0, 0, 0.2);
  border-radius: 2px;
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #8B0000;
  font-weight: 500;
  animation: cellAppear 0.6s ease-out forwards;
  opacity: 0;
  transform: scale(0.8);
}

@keyframes cellAppear {
  0% {
    opacity: 0;
    transform: scale(0.8) rotateY(90deg);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1) rotateY(45deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }
}

.action-section {
  margin-bottom: 12px;
}

.bet-button {
  width: 100%;
  height: 44px;
  background: linear-gradient(91deg, #8B0000 4.7%, #A52A2A 97.41%);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
  
  &:hover {
    background: linear-gradient(91deg, #A52A2A 4.7%, #8B0000 97.41%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(139, 0, 0, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(139, 0, 0, 0.2);
  }
}

.footer-info {
  text-align: center;
  font-size: 12px;
  color: #6c757d;
  opacity: 0.7;
}
</style> 