<template>
  <div class="personal">
    <div class="p-account">
      <header>
        <div class="g-header">
          <div class="left"></div>
          <div class="middle fs-18">{{$t('gerenzhongxin')}}</div>
          <div class="right" @click="changestting(1)">
            <div class="bg-icon bg-icon-setting"></div>
          </div>
        </div>
        <div class="blockHeight"></div>
      </header>
      <div style="height: 40px;"></div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="scroll-area">
          <div class="assets-overview">
            <div class="asset-card">
              <div class="user-info">
                <div class="user-avatar" @click="changebaseinfo">
                  <div class="avatar-border"></div>
                  <img src="@/assets/image/auth.png" class="avatar" alt="" />
                </div>
                <div class="user-details">
                  <div class="user-name">
                    <span>{{ user.username }}</span>
                    <!-- <span class="vip-badge">
                      <span class="vip-icon"></span>
                      <span>{{ $t('huiyuanquanyi') }}</span>
                    </span> -->
                  </div>
                  <div class="user-id">ID: {{ user.idcard || '--' }}</div>
                 
                </div>
              </div>
              <div class="asset-items-container">
                <div class="asset-item">
                  <div class="asset-icon asset-profit">
                    <img src="@/assets/center/tikuanjilv.svg" alt="昨日收益" />
                  </div>
                  <div class="asset-info">
                    <div class="asset-label">{{ $t('zuoriyingli') }}(u)</div>
                    <div class="asset-value">{{ user.today_profit }}</div>
                  </div>
                </div>
                <div class="asset-item">
                  <div class="asset-icon asset-total">
                    <img src="@/assets/center/cunkuanjilu.svg" alt="总资产" />
                  </div>
                  <div class="asset-info">
                    <div class="asset-label">{{ $t('zongzichan') }}(u)</div>
                    <div class="asset-value">{{ user.money }}</div>
                  </div>
                </div>
                <div class="asset-item">
                  <div class="asset-icon asset-storage">
                    <img src="@/assets/center/help_center.svg" alt="储存金" />
                  </div>
                  <div class="asset-info">
                    <div class="asset-label">{{ $t('chucunjin') }}(u)</div>
                    <div class="asset-value">{{ user.score }}</div>
                  </div>
                </div>
                <div class="asset-item">
                  <div class="asset-icon asset-today">
                    <img src="@/assets/center/touzhujilu.svg" alt="今日收益" />
                  </div>
                  <div class="asset-info">
                    <div class="asset-label">{{ $t('jinriyingli') }}(u)</div>
                    <div class="asset-value">{{ user.profit }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="quick-actions">
            <div class="action-card">
              <div class="action-item" @click="changeWithdraw">
                <div class="action-icon withdraw-icon">
                  <img src="@/assets/center/tikuan.svg" alt="转出" />
                </div>
                <div class="action-text">{{ $t('zhuanchu') }}</div>
              </div>
              <div class="action-item" @click="changeRecharge">
                <div class="action-icon recharge-icon">
                  <img src="@/assets/center/cunkuan.svg" alt="存入" />
                </div>
                <div class="action-text">{{ $t('cunru') }}</div>
              </div>
            </div>
          </div>
          <div class="menu-section">
            <div class="menu-card">
              <div class="menu-item" @click="changestting(2)">
                <div class="menu-icon account-icon">
                  <img src="@/assets/center/zhanghuanquan.svg" alt="账户信息" />
                </div>
                <div class="menu-text">{{ $t('zhanghuxinxni') }}</div>
                <div class="menu-arrow">
                  <img src="@/assets/center/into.svg" alt="进入" />
                </div>
              </div>
              <div class="menu-item" @click="changeBet">
                <div class="menu-icon history-icon">
                  <img src="@/assets/center/chase-jl.png" alt="历史账单" />
                </div>
                <div class="menu-text">{{ $t('lishizhangdan') }}</div>
                <div class="menu-arrow">
                  <img src="@/assets/center/into.svg" alt="进入" />
                </div>
              </div>
              <div class="menu-item" @click="changeCapitalDetail">
                <div class="menu-icon capital-icon">
                  <img src="@/assets/center/touzhujilu.svg" alt="资金明细" />
                </div>
                <div class="menu-text">{{ $t('zijinminxi') }}</div>
                <div class="menu-arrow">
                  <img src="@/assets/center/into.svg" alt="进入" />
                </div>
              </div>
              <div class="menu-item" @click="changeShareFriend">
                <div class="menu-icon share-icon">
                  <img src="@/assets/center/lang_change.svg" alt="推荐分享" />
                </div>
                <div class="menu-text">{{ $t('tuijianfenxiang') }}</div>
                <div class="menu-arrow">
                  <img src="@/assets/center/into.svg" alt="进入" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/tabbar/TabBar.vue";
import userApi from "@/api/user";
import storeAction from "@/store/typed-actions";
export default {
  name: "Personal",
  components: {
    TabBar,
  },
  data() {
    return {
      isLoading: false,
      user: "",
    };
  },
  methods: {
    onRefresh() {
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 0,
      });
      userApi.userInfo().then((data) => {
        this.user = data.msg;
        storeAction.setCurrentUserMoney(data.msg.money);
        storeAction.setCurrentUserGroup_id(data.msg.group_id);
        storeAction.setsessionStorage("money", data.msg.money);
        storeAction.setsessionStorage("group_id", data.msg.group_id);
        storeAction.setsessionStorage("idcard", data.msg.idcard);
        storeAction.setCurrentUserusercrud(data.msg.idcard);
        this.isLoading = false;
        this.$toast.clear();
      });
    },
    changestting(type) {
      this.$router.push({
        path: "/setting",
        query: {
          type: type,
        },
      });
    },
    changebaseinfo() {
      this.$router.push({
        path: "/baseinfo",
        query: {
          name: this.user.username,
        },
      });
    },
    changeShareFriend() {
      this.$router.push({
        path: "/shareFriend",
      });
    },
    changeBet() {
      this.$router.push({
        path: "/BetRecord",
      });
    },
    changeCapitalDetail() {
      this.$router.push({
        path: "/CapitalDetail",
      });
    },
    changeWithdraw() {
      this.$router.push({
        path: "/Withdraw",
        query: {
          group_id: this.user.group_id,
        },
      });
    },
    changeRecharge() {
      this.$router.push({
        path: "/Recharge",
        query: {
          group_id: this.user.group_id,
        },
      });
    },
  },
  created() {
    this.onRefresh();
  },
};
</script>

<style lang="less" scoped>
.personal {
  height: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  animation: backgroundShift 8s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%, 100% {
    background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  }
  50% {
    background: linear-gradient(180deg, #ffffff 0%, #f0f2f5 50%, #ffffff 100%);
  }
}

.p-account {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.g-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 1.2rem;
  padding: 0 0.4rem;
  color: #fff;
  font-size: 0.42rem;
  font-weight: bold;
  background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
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
  height: 0.2rem;
}

.user-info {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.3rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
}
  
      .user-avatar {
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        transition: all 0.3s ease;
      }
      
      .avatar-border {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        border-radius: 50%;
        pointer-events: none;
      }
    }
  
      .user-details {
        flex: 1;
        animation: textFadeIn 1s ease-out 0.3s both;
        position: relative;
        
        .user-name {
          font-size: 0.48rem;
          font-weight: 600;
          color: #495057;
          display: flex;
          align-items: center;
          margin-bottom: 0.15rem;
          position: relative;
          
          .vip-badge {
            display: flex;
            align-items: center;
            margin-left: 0.2rem;
            background: linear-gradient(135deg, rgba(139, 0, 0, 0.1), rgba(165, 42, 42, 0.05));
            padding: 0.08rem 0.15rem;
            border-radius: 12px;
            border: 1px solid rgba(139, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
            
            .vip-icon {
              width: 0.5rem;
              height: 0.5rem;
              background: #8B0000;
              border-radius: 50%;
              margin-right: 0.08rem;
              animation: iconSpin 4s linear infinite;
              box-shadow: 0 0 8px rgba(139, 0, 0, 0.4);
            }
            
            span {
              font-size: 0.32rem;
              color: #8B0000;
              font-weight: 500;
              text-shadow: 0 0 5px rgba(139, 0, 0, 0.3);
            }
          }
        }
        
        .user-id {
          font-size: 0.28rem;
          color: #6c757d;
          margin-top: 0.1rem;
          display: flex;
          align-items: center;
          position: relative;
        }
        
        .user-status {
          margin-top: 0.15rem;
          display: flex;
          align-items: center;
          gap: 0.2rem;
          
          .status-item {
            display: flex;
            align-items: center;
            font-size: 0.24rem;
            color: #6c757d;
            
            .status-dot {
              width: 0.08rem;
              height: 0.08rem; 
              border-radius: 50%;
              margin-right: 0.05rem;
              animation: statusBlink 2s ease-in-out infinite;
            }
            
            &.online .status-dot {
              background: #b0e57c;
              animation-delay: 0s;
            }
            
            &.vip .status-dot {
              background: #8B0000;
              animation-delay: 1s;
            }
          }
        }
      }


.assets-overview {
  margin: 0.2rem 0.3rem;
  animation: cardSlideIn 0.8s ease-out 0.2s both;
  
  .asset-card {
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(139, 0, 0, 0.1);
    padding: 0.6rem 0.4rem;
    border: 1px solid rgba(139, 0, 0, 0.2);
    transition: all 0.3s ease;
    
    .user-info {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 0.4rem;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid rgba(139, 0, 0, 0.1);
    }
    
    .asset-items-container {
      display: flex;
      width: 100%;
    }
    
    .asset-item {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-3px);
      }
      
      .asset-icon {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-bottom: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    
      
      .asset-info {
        text-align: center;
        
        .asset-label {
          font-size: 0.28rem;
          color: #6c757d;
        }
        
        .asset-value {
          font-size: 0.38rem;
          color: #8B0000;
          font-weight: 600;
          animation: numberGlow 2s ease-in-out infinite;
        }
      }
    }
  }
}

.quick-actions {
  margin: 0.2rem 0.3rem;
  animation: cardSlideIn 0.8s ease-out 0.4s both;
  
  .action-card {
    display: flex;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(139, 0, 0, 0.1);
    border: 1px solid rgba(139, 0, 0, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(139, 0, 0, 0.2);
    }
    
    .action-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.4rem 0;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s;
      }
      
      &:hover {
        transform: translateY(-5px) scale(1.05);
        
        &::before {
          left: 100%;
        }
      }
      
      .action-icon {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-bottom: 0.1rem;
        transition: all 0.3s ease;
        animation: iconFloat 3s ease-in-out infinite;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      
      .withdraw-icon { 
        animation-delay: 0s;
      }
      .recharge-icon { 
        animation-delay: 1.5s;
      }
      
      .action-text {
        font-size: 0.32rem;
        color: #495057;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      
      &:hover .action-icon {
        transform: rotate(360deg) scale(1.2);
      }
      
      &:hover .action-text {
        
      }
    }
  }
}

.menu-section {
  margin: 0.2rem 0.3rem 0.6rem 0.3rem;
  animation: cardSlideIn 0.8s ease-out 0.6s both;
  
  .menu-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(139, 0, 0, 0.1);
    border: 1px solid rgba(139, 0, 0, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(139, 0, 0, 0.2);
    }
    
          .menu-item {
        display: flex;
        align-items: center;
        padding: 0.38rem 0.2rem;
        border-bottom: 1px solid rgba(139, 0, 0, 0.2);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        transition: width 0.3s ease;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: translateX(5px);
        
        &::after {
          width: 100%;
        }
      }
      
      .menu-icon {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin-right: 0.28rem;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      
      .account-icon { 
        animation-delay: 0s;
      }
      .history-icon { 
        background: #b0e57c; 
        animation-delay: 0.5s;
      }
      .capital-icon { 
        background: #ffb3b3; 
        animation-delay: 1s;
      }
      .share-icon { 
        background: #8B0000; 
        animation-delay: 1.5s;
      }
      
      .menu-text {
        flex: 1;
        font-size: 0.36rem;
        color: #495057;
        transition: all 0.3s ease;
        text-align: left;
      }
      
      .menu-arrow {
        width: 0.4rem;
        height: 0.6rem;
        border-radius: 2px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      
      &:hover .menu-icon {
        transform: scale(1.2) rotate(15deg);
      }
      
      &:hover .menu-text {
        color: #8B0000;
        text-shadow: 0 0 8px rgba(139, 0, 0, 0.3);
      }
      
      &:hover .menu-arrow {
        transform: translateX(3px); 
      }
    }
    
    .menu-item:last-child {
      border-bottom: none;
    }
  }
}

.bg-icon-setting {
  background: url("../assets/image/shezhi.png");
  background-size: 60%;
  width: 1.35rem;
  height: 1.35rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(180deg);
  }
}

.bg-icon {
  width: 0.68rem;
  height: 0.68rem;
  margin-left: 0.1rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.scroll-area {
  min-height: calc(100vh - 2.2rem);
  max-height: calc(100vh - 2.2rem);
  overflow-y: auto;
  box-sizing: border-box;
}

// 动画关键帧
@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes textFadeIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes avatarFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes borderRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes vipPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes iconSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes iconBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes numberGlow {
  0%, 100% {
    text-shadow: 0 0 5px rgba(139, 0, 0, 0.3);
  }
  50% {
    text-shadow: 0 0 15px rgba(139, 0, 0, 0.6);
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

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes statusBlink {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>