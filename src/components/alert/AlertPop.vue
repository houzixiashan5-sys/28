<template>
  <div class="alertpop">
    <!-- 弹出框---游客模式弹出 -->
    <van-popup v-model:show="show" v-if="alertType==1" class="morealert">
      <p class="title fs-16">{{ $t('tishi') }}</p>
      <p class="text c_a0a0a0">
     {{Tips}}
      </p>
      <div class="btnWrap">
        <div class="btn-confrim" @click="changEmit">{{ $t('zhidao') }}</div>
      </div>
    </van-popup>
    <!-- 弹出框-转出失败 -->
    <van-popup v-model:show="showerr" v-if="alertType==2" class="morealert">
      <img src="@/assets/image/shibai.png" class="icon" alt="" />
      <p class="title fs-16">{{ $t('zhuanchusb') }}</p>
      <p class="text c_a0a0a0">{{ $t('zhuanchusbs') }}</p>
      <div class="btnWrap">
        <div class="btn-confrim" @click="changEmit">{{ $t('zhidao') }}</div>
      </div>
    </van-popup>
    <!-- 安全吗设置成功 -->
    <van-popup v-model:show="showsucc" v-if="alertType==3" class="morealert">
      <img src="@/assets/image/chenggong.png" class="icon" alt="" />
      <p class="title fs-16">{{Tips}}</p>
      <div class="btnWrap">
        <div class="btn-confrim" @click="changEmit">{{ $t('zhidao') }}</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "Alertpop",
  components: {},
  props: ["alertType","Tips"],
  data() {
    return {
      show: true,
      showerr: true,
      showsucc: true,
    };
  },
  watch: {
    // alertType(newVal) {},
  },
  methods: {
    changEmit(){
      this.$emit('showAletfalse',false)
    }
  },
  mounted() {
  
  },
};
</script>
<style lang="less" scoped>
.alertpop {
  // 覆盖van-popup的默认背景色
  :deep(.van-popup) {
    background: #fff !important;
  }

  :deep(.van-overlay) {
    background-color: rgba(0, 0, 0, 0.4) !important;
  }

  .morealert {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
    border-radius: 0.2rem;
    border: 1px solid rgba(139, 0, 0, 0.2);
    box-shadow: 0 8px 32px rgba(139, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    padding: 0.6rem;
    text-align: center;
    animation: alertSlideIn 0.3s ease-out;
  }

  @keyframes alertSlideIn {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .title {
    color: #8B0000;
    font-weight: 600;
    margin-bottom: 0.3rem;
    text-shadow: 0 1px 2px rgba(139, 0, 0, 0.1);
  }

  .text {
    color: #6c757d;
    line-height: 1.5;
    margin-bottom: 0.4rem;
  }

  .icon {
    width: 2rem;
    height: 2rem;
    margin: 0 auto 0.3rem;
    animation: iconPulse 2s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .btnWrap {
    display: flex;
    justify-content: center;
    margin-top: 0.4rem;
  }

  .btn-confrim {
    background: linear-gradient(135deg, #8B0000 0%, #A52A2A 100%);
    color: #fff;
    padding: 0.3rem 0.8rem;
    border-radius: 0.15rem;
    font-size: 0.32rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
    animation: buttonGlow 2s ease-in-out infinite;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(139, 0, 0, 0.4);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(139, 0, 0, 0.3);
    }
  }

  @keyframes buttonGlow {
    0%, 100% {
      box-shadow: 0 4px 12px rgba(139, 0, 0, 0.3);
    }
    50% {
      box-shadow: 0 4px 16px rgba(139, 0, 0, 0.5);
    }
  }

  // 错误状态特殊样式
  .morealert:has(.icon[src*="shibai"]) {
    border-color: rgba(220, 53, 69, 0.3);
    box-shadow: 0 8px 32px rgba(220, 53, 69, 0.2);

    .title {
      color: #dc3545;
    }

    .btn-confrim {
      background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);

      &:hover {
        box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
      }
    }
  }

  // 成功状态特殊样式
  .morealert:has(.icon[src*="chenggong"]) {
    border-color: rgba(40, 167, 69, 0.3);
    box-shadow: 0 8px 32px rgba(40, 167, 69, 0.2);

    .title {
      color: #28a745;
    }

    .btn-confrim {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);

      &:hover {
        box-shadow: 0 6px 16px rgba(40, 167, 69, 0.4);
      }
    }
  }
}
</style>