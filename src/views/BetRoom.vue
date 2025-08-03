<template>
  <div class="betRoom">
      <div class="trend-chart-fixed">
          <div class="trend-chart-button" @click="openTrendChart">
            <img src="https://hx28.bi/static/images/pc28/zs.png" alt="走势图" class="trend-icon" />
            <span class="trend-text">走势图</span>
          </div>
        </div>
    <header>
      <div class="g-header">
        <div class="left" @click="changego">
          <van-icon name="arrow-left" color="#fff" size="20px" />
        </div>
        <div class="middle fs-18">
          <van-notice-bar :scrollable="false" color="#fff">
            <van-swipe
              vertical
              class="notice-swipe"
              :autoplay="3000"
              :duration="1000"
              :show-indicators="false"
            >
              <van-swipe-item>{{ name }}</van-swipe-item>
              <van-swipe-item>{{ title }}</van-swipe-item>
              <!-- <van-swipe-item>内容 3</van-swipe-item> -->
            </van-swipe>
          </van-notice-bar>
        </div>
        <div class="right" @click="showPopoverChange">
          <van-icon
            name="plus"
            class="icon-arrow-bottom"
            :class="showPopover ? 'angleRote' : ''"
            color="#fff"
            size="20px"
          />
        </div>
      </div>
    </header>
    <div class="g-content">
      <!-- <div class="bet-head f-a-c">
        <div class="left">
          <p class="cut-off">
            {{ $t("juli") }} {{ issue.issue }} {{ $t("lunjiezhi") }}
          </p>
          <template v-if="game_status == 1 && !whether_close">
            <van-count-down :time="time">
              <template #default="timeData">
                <span class="block">{{ timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </van-count-down>
          </template>
          <template v-else-if="game_status == 1 && whether_close"
            ><p class="stopBet">{{ $t("yifengpan") }}</p></template
          >
          <template v-else
            ><p class="stopBet">{{ $t("yiguanb") }}</p></template
          >
        </div>
        <div class="right">
          <van-loading type="spinner" v-if="user_quantityShow" />
          <div v-else @click="heart(), (user_quantityShow = true)">
            <div class="jine f-a-c">
              <span @click="aa">{{ $t("zongzichan") }}</span>
              <img
                src="@/assets/image/yuanbao.png"
                class="icon icon-gold"
                alt=""
              />
              <span>{{ user_quantity.money }}</span>
            </div>
            <div class="caijin f-a-c">
              <span>{{ $t("chucunjin") }}</span>
              <img
                src="@/assets/image/cunchu.png"
                class="icon icon-gold"
                alt=""
              />
              <span>{{ user_quantity.score }}</span>
            </div>
          </div>
        </div>
      </div> -->
      <!-- 新组件 -->
      <div>
        <!-- 当前期数信息卡片 -->
        <div class="current-issue-card">
          <div class="card-top">
            <div class="issue-number">{{ issue.issue }}</div>
            <div class="calculation">
              <span class="number-circle">{{ last_issue ? last_issue.site_1 : '0' }}</span>
              <span class="operator">+</span>
              <span class="number-circle">{{ last_issue ? last_issue.site_2 : '0' }}</span>
              <span class="operator">+</span>
              <span class="number-circle">{{ last_issue ? last_issue.site_3 : '0' }}</span>
              <span class="operator">=</span>
              <span class="number-circle">{{ last_issue ? last_issue.code : '0' }}</span>
            </div>
          </div>
          <div class="card-divider"></div>
                      <div class="card-bottom">
              <div class="game-info">
                <div class="game-title">{{ name }}</div>
                <div class="game-distance">{{ $t("juli") }} {{ issue.issue }}</div>
              </div>
              <div class="right-section">
                <div class="betting-status">
                  <span class="status-btn" :class="{ 'active': game_status == 1 && !whether_close }">
                    {{ game_status == 1 && !whether_close ? $t("xiaduzhong") : $t("yifengpan") }}
                  </span>
                </div>
                <div class="timer-container">
                  <!-- <span class="timer-label">{{ $t("lunjiezhi") }}</span> -->
                  <div class="timer-display">
                    <span class="timer-block">{{ formatTimeMinutes(time) }}</span>
                    <span class="timer-colon">:</span>
                    <span class="timer-block">{{ formatTimeSeconds(time) }}</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
        
        <!-- <div class="previousList">
          <div
            v-if="last_issue"
            class="pre-item Pc28"
            @click="(showIssue = !showIssue), showIssueChange()"
          >
            <p class="issue">
              {{ $t("di") }}<span class="c_fe5050">{{ last_issue.issue }}</span
              >{{ $t("qi") }}
            </p>
            <div class="result">
              <span>{{ last_issue.site_1 }}</span>
              <span class="fs-16">+</span>
              <span>{{ last_issue.site_2 }}</span>
              <span class="fs-16">+</span>
              <span>{{ last_issue.site_3 }}</span>
              <span class="fs-16">=</span>
              <span>{{ last_issue.code }}</span>
            </div>
            <p>
              {{ "(" + $t(last_issue.base[0]) + "," + $t(last_issue.base[1]) + ")" }}
            </p>
            <van-icon
              name="arrow-down"
              color="#fff"
              size="16px"
              :class="showIssue ? 'angleRotestow' : 'icon-arrow-bottoms'"
            />
          </div>
        </div> -->
      </div>
      <div class="scroll-thead">
        <span>{{ $t("yonghu") }}</span>
        <span>{{ $t("lunshu") }}</span>
        <span>{{ $t("jiaoyipinglei") }}</span>
        <span>{{ $t("danlunjiaoyi") }}</span>
        <span style="flex: none; width: 15%">{{ $t("caozuo") }}</span>
      </div>
      <div class="swiper-container scroller-box" id="swiperBox" ref="swiperBox">
        <!--  :class="transformSwiper" -->
        <div class="swiper-wrapper">
          <div
            class="swiper-slide slide-text"
            id="liswiper"
            style="transition-duration: 2000ms"
            :style="transformSwiper"
          >
            <!-- :style="transformSwiper" -->

            <ul class="msg-box fs-12" ref="swipercontant">
              <li class="msg-item">
                <div class="msg-type_1">
                  <div>
                    <span v-if="game_status == 1">{{ $t("pljoin") }}</span>
                    <span v-else>{{ $t("pltingshou") }}</span>
                  </div>
                </div>
              </li>

              <li
                class="msg-item"
                v-for="(item, index) in message"
                :key="index"
              >
                <div class="bet-card">
                  <div class="user-profile">
                    <img 
                      :src="`https://hx28.bi/static/images/safeCenter/avatar${(index % 9) + 1}.png`" 
                      class="user-avatar" 
                      alt="avatar"
                    />
                    <div class="user-info">
                      <div class="username">{{ item.nickname }}</div>
                     <!-- <div class="block-info">{{ item.issue }} {{ $t("qukuai") }}</div>-->
                    </div>
                  </div>
                  <div class="bet-details">
                    <div class="bet-row">
                      <span class="bet-type">{{ $t(item.play_method) }}</span>
                      <span class="bet-amount">{{ item.quantity }}U</span>
                    </div>
                  <!--  <div class="bet-row">
                      <span class="bet-type">{{ $t("duizi") }}</span>
                      <span class="bet-amount">{{ Math.floor(item.quantity * 0.3) }}U</span>
                    </div>
                    <div class="bet-row">
                      <span class="bet-type">{{ $t("dadan") }}</span>
                      <span class="bet-amount">{{ Math.floor(item.quantity * 0.2) }}U</span>
                    </div>
                    <div class="bet-row">
                      <span class="bet-type">{{ $t("dashuang") }}</span>
                      <span class="bet-amount">{{ Math.floor(item.quantity * 0.2) }}U</span>
                    </div>
                    <div class="bet-summary">
                      <span class="summary-text">{{ $t("zhudan") }} 4 {{ $t("tiao") }}, {{ $t("zongji") }}: {{ item.quantity }}U</span>
                    </div>-->
                  </div>
                  <div class="follow-button" @click="showFollowPayFun(item)">
                    {{ $t("gengou") }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div style="width:100px;"></div>
        
      
      </div>
      <div class="footer-chat">
        <!-- 快速选择按钮行 -->
        <!-- <div class="quick-select-row">
          <div class="quick-btn" @click="setBetAmount(1)">1</div>
          <div class="quick-btn" @click="setBetAmount(10)">10</div>
          <div class="quick-btn" @click="setBetAmount(100)">100</div>
          <div class="quick-btn" @click="setBetAmount(500)">500</div>
          <div class="quick-btn" @click="setBetAmount(1000)">1000</div>
          <div class="edit-btn" @click="showCustomInput">
            <div class="edit-icon">✏️</div>
          </div>
        </div> -->
        
        <!-- 余额和投注信息行 -->
        <div class="info-row">
          <div class="balance-info">
            <span class="info-label">{{ $t("zongzichan") }}:</span>
            <span class="balance-amount">{{ user_quantity ? user_quantity.money : '49950' }}</span>
            <span class="currency-highlight">USDT</span>
          </div>
          <div class="bet-info">
            <span class="info-label">投注:</span>
            <span class="bet-amount">{{ currentBet || '0' }}</span>
            <span class="currency-highlight">USDT</span>
          </div>
        </div>
        
        <!-- 操作按钮行 -->
        <div class="action-row">
          <div class="wallet-action" @click="openWallet">
            <div class="action-icon">💳</div>
          </div>
          <div class="bet-action" @click="changeShowPay">
            <span class="action-text">{{ $t("lijitouzhu") }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 右上角遮罩层 -->
    <van-overlay
      v-model:show="showPopover"
      @click="showPopover = false"
      style="z-index: 2005"
    >
      <div class="head-menu">
        <ul>
          <li class="boderBottom" @click="changeRecharge">
            <img src="@/assets/image/tab1.png" alt="" />
            <span>{{$t('lijicunru')}}</span>
          </li>
          <li class="boderBottom" @click="changeDetail">
            <img src="@/assets/image/jieguo.png" alt="" />
            <span>{{$t('kaihaojieguo')}}</span>
          </li>
          <li class="boderBottom" @click="changeTrendChart">
            <img src="@/assets/image/qushi.png" alt="" />
            <span>{{$t('kaihaoqushi')}}</span>
          </li>
          <li class="boderBottom" @click="changeLotteryExplain">
            <img src="@/assets/image/chanpin.png" alt="" />
            <span>{{$t('chanpingshuoming')}}</span>
          </li>
          <li class="boderBottom" @click="changebetRecord">
            <img src="@/assets/image/lishi.png" alt="" />
            <span>{{$t('lishizhangdan')}}</span>
          </li>
          <li class="boderBottom" @click="changehuancun">
            <img src="@/assets/image/huancun.png" alt="" />
            <span>{{$t('qingchuhuancun')}}</span>
          </li>
        </ul>
      </div>
    </van-overlay>
    <!-- 前几期遮罩层 -->
    <van-overlay v-model:show="showIssue" @click="showIssue = false">
      <div class="issuecontant">
        <div class="previousList">
          <template v-if="issueList">
            <div
              class="pre-item Pc28"
              @click="showIssue = !showIssue"
              v-for="(item, index) in issueList"
              :key="index"
            >
              <p class="issue">
                {{$t('di')}}<span>{{ item.issue }}</span
                >{{$t('qi')}}
              </p>
              <div class="result">
                <span>{{ item.site_1 }}</span>
                <span class="fs-16">+</span>
                <span>{{ item.site_2 }}</span>
                <span class="fs-16">+</span>
                <span>{{ item.site_3 }}</span>
                <span class="fs-16">=</span>
                <span>{{ item.code }}</span>
              </div>
              <p>
                {{ "(" + $t(item.base[0]) + "," + $t(item.base[1]) + ")" }}
              </p>
            </div>
          </template>
        </div>
      </div>
    </van-overlay>
    
    <!-- 走势图弹窗 -->
    <div v-if="showTrendChart" class="trend-overlay" @click="closeTrendChart">
      <div class="trend-chart-modal" @click.stop>
        <div class="trend-chart-header">
          <div class="trend-tabs">
            <div 
              class="trend-tab" 
              :class="{ active: activeTrendTab === 'data' }"
              @click="switchTrendTab('data')"
            >
              数据分析
            </div>
            <div 
              class="trend-tab" 
              :class="{ active: activeTrendTab === 'results' }"
              @click="switchTrendTab('results')"
            >
              开奖结果
            </div>
          </div>
          <div class="trend-close" @click="closeTrendChart">
            <van-icon name="cross" color="#FFD700" size="20px" />
          </div>
        </div>
        <div class="trend-chart-content">
          <!-- 数据分析tab内容 -->
          <div v-if="activeTrendTab === 'data'" class="trend-table">
            <div class="trend-table-header">
              <div class="trend-th">期号</div>
              <div class="trend-th">值</div>
              <div class="trend-th">大</div>
              <div class="trend-th">小</div>
              <div class="trend-th">单</div>
              <div class="trend-th">双</div>
              <div class="trend-th">极大</div>
              <div class="trend-th">极小</div>
            </div>
            <div class="trend-table-body">
              <div 
                class="trend-table-row" 
                v-for="(item, index) in trendData" 
                :key="index"
              >
                <div class="trend-td">{{ item.issue }}</div>
                <div class="trend-td">{{ item.code }}</div>
                <div class="trend-td">
                  <span v-if="item.code > 13">大</span>
                  <span v-else>小</span>
                </div>
                <div class="trend-td">
                  <span v-if="item.code % 2 === 1">单</span>
                  <span v-else>双</span>
                </div>
                <div class="trend-td">
                  <span v-if="item.code >= 22">极大</span>
                </div>
                <div class="trend-td">
                  <span v-if="item.code <= 5">极小</span>
                </div>
                <div class="trend-td">
                  <span v-if="item.code > 13 && item.code % 2 === 1">大单</span>
                </div>
                <div class="trend-td">
                  <span v-if="item.code <= 13 && item.code % 2 === 0">小双</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 开奖结果tab内容 -->
          <div v-if="activeTrendTab === 'results'" class="lottery-results">
            <div class="results-container">
              <div 
                class="result-item" 
                v-for="(item, index) in lotteryResults" 
                :key="index"
              >
                <div class="result-header">
                  <span class="issue-number">{{ $t("di") }}{{ item.issue }}{{ $t("lun") }}</span>
                </div>
                <div class="result-content">
                  <div class="ball ball-orange">{{ item.site_1 }}</div>
                  <span class="operator">+</span>
                  <div class="ball ball-orange">{{ item.site_2 }}</div>
                  <span class="operator">+</span>
                  <div class="ball ball-orange">{{ item.site_3 }}</div>
                  <span class="operator">=</span>
                  <div class="ball ball-orange">{{ item.code }}</div>
                </div>
                <div class="result-info">
                  <span class="result-text">{{ "(" + $t(item.base[0]) + "," + $t(item.base[1]) + ")" }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 购入键盘 -->
    <div style="z-index: 2003 !important">
      <van-popup
        v-model:show="showPay"
        position="bottom"
        :style="{ height: '60%', width: '100%' }"
      >
        <div class="bet-panel">
          <div class="panel-head">
            <ul class="category">
              <li
                class="category-item"
                :class="swiperKeySlide == 0 ? 'PayActive' : ''"
                @click="(swiperKeySlide = 0), changeTabPay(0)"
              >
                {{$t('changgui')}}
              </li>
              <li
                class="category-item"
                :class="swiperKeySlide == 1 ? 'PayActive' : ''"
                @click="(swiperKeySlide = 1), changeTabPay(1)"
              >
                {{$t('shuzi')}}
              </li>
              <!-- <li
                class="category-item"
                :class="swiperKeySlide == 2 ? 'PayActive' : ''"
                @click="(swiperKeySlide = 2), changeTabPay(2)"
              >
                特殊
              </li> -->
            </ul>
          </div>
          <div class="panel-body">
            <div class="oddsExplain">
              <div class="tips" v-if="num_code">
                {{$t('yinglihezhi')}}:{{
                  oddsList.num_code[num_code]
                    ? oddsList.num_code[num_code]
                    : num_code
                }}
              </div>
              <div class="odds">
                <img src="@/assets/image/deng.png" alt="" />
                <span>{{$t('shouyijieshao')}}</span>
              </div>
            </div>
            <div class="swiper-container" id="PaySwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide" style="overflow-y: auto">
                  <ul class="clear select-list">
                    <li
                      class="item"
                      :class="activePay == index ? 'active' : ''"
                      @click="
                        (activePay = index),
                          changeShowPayInput(item.class, item.class_name)
                      "
                      v-for="(item, index) in oddsList.rule_base"
                      :key="index"
                    >
                      <div class="square">
                        <div class="text">{{ $t(item.class_name) }}</div>
                        <div class="oddsPay">{{ item.odds }}</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="swiper-slide" style="overflow-y: auto">
                  <ul class="clear select-list">
                    <li
                      class="item"
                      :class="activePay == index ? 'active' : ''"
                      @click="
                        (activePay = index),
                          changeShowPayInput(item.class, item.class_name)
                      "
                      v-for="(item, index) in oddsList.rule_num"
                      :key="index"
                    >
                      <div class="square">
                        <div class="text">{{ item.class_name }}</div>
                        <div class="oddsPay">{{ item.odds }}</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-foot">
            <div class="leftCount">
              <div class="icon-cart">
                <img src="@/assets/image/payu.png" alt="" />
              </div>
              <div class="bet-status">{{$t('zanweigouru')}}</div>
            </div>
            <div class="rightBetButton">
              <div>1u{{$t('qigou')}}</div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 购买列表里的遮罩层，最后输入的数量 -->
    <div style="z-index: 2004 !important">
      <van-popup
        v-model:show="showPayInput"
        position="bottom"
        :style="{ height: '18%', width: '100%' }"
      >
        <div class="bet-sub-panel">
          <ul>
            <li
              :class="betselect == 0 ? 'betactive' : ''"
              @click="(betselect = 0), InputValeue(0)"
            >
              <img src="@/assets/image/bet5.png" alt="" />
            </li>
            <li
              :class="betselect == 1 ? 'betactive' : ''"
              @click="(betselect = 1), InputValeue(1)"
            >
              <img src="@/assets/image/bet10.png" alt="" />
            </li>
            <li
              :class="betselect == 2 ? 'betactive' : ''"
              @click="(betselect = 2), InputValeue(2)"
            >
              <img src="@/assets/image/bet50.png" alt="" />
            </li>
            <li
              :class="betselect == 3 ? 'betactive' : ''"
              @click="(betselect = 3), InputValeue(3)"
            >
              <img src="@/assets/image/bet300.png" alt="" />
            </li>
            <li
              :class="betselect == 4 ? 'betactive' : ''"
              @click="(betselect = 4), InputValeue(4)"
            >
              <img src="@/assets/image/bet500.png" alt="" />
            </li>
            <li
              :class="betselect == 5 ? 'betactive' : ''"
              @click="(betselect = 5), InputValeue(5)"
            >
              <img src="@/assets/image/betall.png" alt="" />
            </li>
          </ul>
          <div class="bottom-form">
            <span class="c_a0a0a0">{{$t('gourushuliang')}}：</span>
            <input type="number" v-model="sendValue" class="" />
            <div class="ripple bet-btn" @click="playOrder">{{$t('gouru')}}</div>
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 跟购-->
    <van-overlay
      v-model:show="showFollowPay"
      @click="showFollowPay = false"
      style="z-index: 2005"
    >
      <div class="bet fs-12">
        <div class="bet-title fs-14">{{$t('quedinggengou')}}?</div>
        <div class="bet-content">
          <div>
            <span class="c_a0a0a0">{{$t('wanjia')}}：</span>
            <span>{{ FollPayItem.nickname }}</span>
          </div>
          <div>
            <span class="c_a0a0a0">{{$t('lunshu')}}：</span>
            <span>{{ FollPayItem.issue }}</span>
          </div>
          <div class="c_a0a0a0">
            <span>{{$t('leibe')}}</span>
            <span>{{$t('jine')}}</span>
          </div>
          <ul>
            <li>
              <span>{{ $t(item.FollPayItem.play_method) }}</span>
              <span>{{ FollPayItem.quantity }}</span>
            </li>
          </ul>
        </div>
        <div class="bet-footer">
          <van-button
            type="primary"
            class="btn-confirm"
            size="small"
            round
            @click="FollmePay(FollPayItem)"
            >{{$t('queren')}}</van-button
          >
          <van-button type="primary" class="btn-canle" size="small" round
            >{{$t('quxiao')}}</van-button
          >
        </div>
      </div>
    </van-overlay>
    <alert-pop
      :alertType="alertType"
      :Tips="TipsTxt"
      v-if="PopAlert"
      @showAletfalse="showAletfalse"
    ></alert-pop>
    
    <!-- 自定义金额输入弹窗 -->
    <van-popup
      v-model:show="showCustomInputDialog"
      position="center"
      :style="{ width: '80%', borderRadius: '12px' }"
      round
    >
      <div class="custom-input-dialog">
        <div class="dialog-header">
          <h3>自定义投注金额</h3>
        </div>
        <div class="dialog-content">
          <div class="input-group">
            <label>请输入金额：</label>
            <van-field
              v-model="customAmount"
              type="number"
              placeholder="请输入投注金额"
              :border="false"
              class="custom-input"
              style="color: #8B0000 !important;"
            />
          </div>
          <div class="quick-amounts">
            <span class="quick-amount" @click="customAmount = '50'">50</span>
            <span class="quick-amount" @click="customAmount = '200'">200</span>
            <span class="quick-amount" @click="customAmount = '500'">500</span>
            <span class="quick-amount" @click="customAmount = '1000'">1000</span>
          </div>
        </div>
        <div class="dialog-footer">
          <van-button 
            type="default" 
            size="large" 
            @click="cancelCustomInput"
            class="cancel-btn"
          >
            取消
          </van-button>
          <van-button 
            type="primary" 
            size="large" 
            @click="confirmCustomAmount"
            class="confirm-btn"
          >
            确认
          </van-button>
        </div>
      </div>
    </van-popup>
    <!-- 中奖消息 -->
    <div
      class="Xwarp"
      id="xwarpdonghua"
      v-if="Myprize.length != 0 && donghuaShow"
      :style="transformXwarp"
      ref="boxdonghua"
    >
      <div>
        {{$t('gongxi')}}{{ Myprize[0].nickname }}{{$t('zai')}}{{ Myprize[0].game_name }}{{$t('yingli')}}{{
          Myprize[0].profit
        }}U
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import homeApi from "@/api/home";
import AlertPop from "@/components/alert/AlertPop.vue";
export default {
  name: "BetRoom",
  components: { AlertPop },
  data() {
    return {
      time: "",
      showPopover: false,
      showIssue: false,
      TopPX: 0,
      transformSwiper: "transform:translate3d(0px, -" + 0 + "px, 0px)",
      showPay: false,
      activePay: null,
      showPayInput: false,
      swiperKeySlide: 0,
      PaySwiperexample: null,
      betselect: null,
      id: null,
      game_id: null,
      oddsList: null,
      num_code: null,
      sendValue: "",
      last_issue: "",
      issueList: null,
      issue: "",
      name: "",
      title: "",
      TouchStart: false,
      showFollowPay: false,
      message: [],
      game_status: 1,
      PopAlert: false,
      TipsTxt: "",
      alertType: 1,
      user_quantity: "",
      user_quantityShow: true,
      class: "",
      FollPayItem: "",
      whether_close: null,
      timeDataFun: null,
      daodibu: false,
      Myprize: [],
      NOprize: [],
      preizeIsPush: false,
      issuePreize: "",
      timedonghua: null,
      transformXwarp: "translate3d(0, 0px, 0px);",
      currentBet: 0,
      donghuaShow: true,
      showCustomInputDialog: false,
      customAmount: '',
              // 控制hit_notice渲染次数
        hitNoticeCallCount: 0,
        hitNoticeRenderInterval: 20, // 每20次调用渲染一次（60秒）
      lastIssuePreize: "",
      showTrendChart: false,
      trendData: [],
      activeTrendTab: 'data',
      lotteryResults: [],
    };
  },
  watch: {
    issuePreize(newv, old) {
      if (newv != old) {
        this.preizeIsPush = false;
        // transform: translate3d(0, 0px, 0px);
      }
    },
    // donghuaShow() {
    //   let that=this
    //   setInterval(() => {
    //     that.donghuaShow = false;
    //     console.log(that.donghuaShow)
    //   }, 5000);
    // },
  },
  computed: {
    money() {
      return this.$store.state.money;
    },
    currentUserId() {
      return this.$store.state.currentUserId;
    },
  },
  methods: {
    InputValeue(type) {
      if (type == 0) {
        this.sendValue = 5;
      } else if (type == 1) {
        this.sendValue = 10;
      } else if (type == 2) {
        this.sendValue = 50;
      } else if (type == 3) {
        this.sendValue = 300;
      } else if (type == 4) {
        this.sendValue = 500;
      } else {
        // 全下
        this.sendValue = this.user_quantity.money * 1 - 1;
      }
    },
    // 下注接口
    playOrder() {
      // if (this.sendValue * 1 > this.user_quantity.money * 1) {
      //   this.$toast("您的资产不足请存入");
      //   return;
      // }
      this.$toast.loading({
        message: this.$t('jiazaizhong'),
        forbidClick: true,
        duration: 0,
      });
      homeApi
        .playOrder(
          this.issue.issue,
          this.id,
          this.game_id,
          this.class,
          this.sendValue
        )
        .then((data) => {
          this.$toast.clear();
          this.showPay = false;
          this.showPayInput = false;
          this.num_code = null;
          this.message.push(data.data);
          this.daodibu = false;
          this.$refs.swiperBox.scrollTop = 99999;
          this.$toast(this.$t('xiadanchenggong'));
          //  localStorage.setItem("money", (this.user_quantity.money*1)- ( this.sendValue*1));
          this.user_quantity.money = data.data.after_quantity;
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast.fail(err.msg);
        });
    },
    changego() {
      this.$router.go(-1);
    },
    showFollowPayFun(item) {
      if (this.game_status != 1 || this.whether_close) {
        this.TipsTxt = this.$t('guanbitg');
        this.PopAlert = true;
        return;
      }
      if (item.issue == this.issue.issue) {
        this.FollPayItem = item;
        this.showFollowPay = true;
      } else {
        this.TipsTxt = this.$t('xiangoudl');
        this.PopAlert = true;
      }
    },
    showAletfalse() {
      this.PopAlert = false;
    },
    changeDetail() {
      this.$router.push({
        path: "/lotteryDetail",
        query: {
          game_id: this.game_id,
          name: this.name,
        },
      });
    },
    changeRecharge() {
      this.$router.push({
        path: "/recharge",
      });
    },
    changebetRecord() {
      this.$router.push({
        path: "/betRecord",
      });
    },
    changeLotteryExplain() {
      this.$router.push({
        path: "/lotteryExplain",
      });
    },
    changeTrendChart() {
      this.$router.push({
        path: "/trendChart",
        query: {
          game_id: this.game_id,
          name: this.name,
        },
      });
    },
    showPopoverChange() {
      if (!this.showIssue) {
        this.showPopover = !this.showPopover;
      } else {
        this.showIssue = false;
      }
    },
    showIssueChange() {
      homeApi
        .issueList(this.game_id)
        .then((data) => {
          let list = data.data.slice(1, 5);
          this.issueList = list;
        })
        .catch((err) => {
          this.$toast.fail(err.msg);
        });
    },
    changeShowPay() {
      if (this.game_status == 1 && !this.whether_close) {
        this.showPay = true;
      } else {
        this.TipsTxt = this.$t('guanbitg');
        this.PopAlert = true;
      }
      let that = this;
      setTimeout(() => {
        that.PaySwiperexample = new Swiper("#PaySwiper", {
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          // 如果需要分页器
          pagination: ".swiper-pagination",
          // 如果需要前进后退按钮
          nextButton: ".swiper-button-next",
          prevButton: ".swiper-button-prev",
          onSlideChangeEnd: function (swiper) {
            swiper.activeIndex;
            that.swiperKeySlide = swiper.activeIndex;
            that.activePay = null;
            that.num_code = null;
            that.class = "";
            that.sendValue = "";
          },
        });
      }, 3000); // 改为3秒，减少接口调用频率
    },
    changeShowPayInput(classname, itemName) {
      this.class = classname;
      this.betselect = null;
      this.num_code = itemName;
      this.showPayInput = true;
      this.sendValue = "";
    },
    changeTabPay(index) {
      this.sendValue = "";
      this.activePay = null;
      this.class = "";
      this.num_code = null;
      this.PaySwiperexample.slideTo(index, 300, false);
    },
    heart() {
      homeApi
        .heart(this.id, this.game_id)
        .then((data) => {
          this.last_issue = data.data.last_issue;
          this.issue = data.data.issue;
          this.game_status = data.data.game_status;
          this.user_quantity = data.data.user_quantity;
          this.time = data.data.issue.openTime1 * 1000;
          this.whether_close = data.data.issue.whether_close;
          this.user_quantityShow = false;
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast.fail(err.msg);
        });
    },
    difference(aArray, bArray) {
      const bArraySet = new Set(bArray);
      const resultArray = aArray.filter((item) => !bArraySet.has(item));
      return Array.from(resultArray);
    },
    getResultArray(key, aArray, bArray) {
      const aArraySimple = aArray.map((i) => i[key]); // 根据唯一标识对象数组转换为简单数组
      const bArraySimple = bArray.map((i) => i[key]);
      const allData = [...aArray, ...bArray];
      const resultArraySimple = Array.from(
        this.difference(aArraySimple, bArraySimple)
      ); 
      return resultArraySimple.map((i) => allData.find((j) => j[key] === i));
    },
    getDifferenceSet(arr1, arr2) {
      return arr1
        .map(JSON.stringify)
        .concat(arr2.map(JSON.stringify))
        .filter((v, i, arr) => {
          return arr.indexOf(v) === arr.lastIndexOf(v);
        })
        .map(JSON.parse);
    },
    FollmePay(item) {
      homeApi
        .playOrder(
          item.issue,
          this.id,
          this.game_id,
          item.play_type,
          item.quantity
        )
        .then((data) => {
          this.$toast.clear();
          this.message.push(data.data);
          this.$toast(this.$t('xiadanchenggong'));
          this.user_quantity.money = this.user_quantity.money =
            data.data.after_quantity;
          this.$refs.swiperBox.scrollTop = 99999;
          this.daodibu = false;
        })
        .catch((err) => {
          this.$toast.fail(err.msg);
        });
    },
    ChatTps() {
      this.$toast(this.$t('lttip'));
    },
    changehuancun(){
         location.reload();
    },
    openWallet() {
      this.$toast(this.$t('qianbao') + ' - ' + this.$t('gongnengkai'));
    },
    openChase() {
      this.$toast(this.$t('zhuihao') + ' - ' + this.$t('gongnengkai'));
    },
    setBetAmount(amount) {
      this.currentBet = amount;
    },
    showCustomInput() {
      this.showCustomInputDialog = true;
    },
    confirmCustomAmount() {
      if (this.customAmount && this.customAmount > 0) {
        this.currentBet = parseFloat(this.customAmount);
        this.showCustomInputDialog = false;
        this.customAmount = '';
        this.$toast.success('投注金额已设置');
      } else {
        this.$toast.fail('请输入有效金额');
      }
    },
    cancelCustomInput() {
      this.showCustomInputDialog = false;
      this.customAmount = '';
    },
    formatTime(time) {
      if (!time) return '00:00:00';
      const totalSeconds = Math.floor(time / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    formatTimeMinutes(time) {
      if (!time) return '00';
      const totalSeconds = Math.floor(time / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      return minutes.toString().padStart(2, '0');
    },
    formatTimeSeconds(time) {
      if (!time) return '00';
      const totalSeconds = Math.floor(time / 1000);
      const seconds = totalSeconds % 60;
      return seconds.toString().padStart(2, '0');
    },
    async openTrendChart() {
      console.log('点击走势图按钮');
      await this.loadTrendData();
      await this.loadLotteryResults();
      this.showTrendChart = true;
    },
    async loadTrendData() {
      try {
        this.$toast.loading({
          message: this.$t('jiazaizhong'),
          forbidClick: true,
          duration: 0,
        });
        const response = await homeApi.issueList(this.game_id);
        this.trendData = (response.data || []).slice(0, 100); // 只取前100条
        this.$toast.clear();
      } catch (error) {
        this.$toast.clear();
        this.$toast.fail('加载数据失败');
      }
    },
    async loadLotteryResults() {
      try {
        const response = await homeApi.issueList(this.game_id);
        this.lotteryResults = response.data || [];
      } catch (error) {
        console.error('加载开奖结果失败:', error);
      }
    },
    switchTrendTab(tab) {
      this.activeTrendTab = tab;
    },
    closeTrendChart() {
      this.showTrendChart = false;
    },
  },

  mounted() {
    // let that = this;
    // new Swiper("#listSwiper", {
    //   //竖屏滚动
    //   direction: "vertical",
    //   // 如果需要分页器
    //   pagination: ".swiper-pagination",
    //   // 如果需要前进后退按钮
    //   nextButton: ".swiper-button-next",
    //   prevButton: ".swiper-button-prev",
    //   speed: 300, //滚动速度
    // onTouchStart() {
    //   if (
    //     that.$refs.liRef.offsetHeight >
    //     that.$refs.swiperWapperRef.offsetHeight
    //   ) {
    //     that.TouchStart = true;
    //     console.log(that.$refs.liRef.style.transform)
    //     console.log("滚动了");
    //   }
    // },
    // });

    // if (this.Myprize) {
    //   that.donghuaShow = true;
    //   setInterval(() => {
    //     that.Myprize.shift();
    //   }, 5000);
    // }
  },
  onUpdated() {},
  unmounted() {
    clearInterval(this.timeDataFun);
    this.timeDataFun = null;
  },
  created() {
    let that = this;
    this.$toast.loading({
      message: this.$t('jiazaizhong'),
      forbidClick: true,
      duration: 0,
    });

    this.id = this.$route.query.id;
    this.game_id = this.$route.query.game_id;
    this.name = this.$route.query.name;
    this.title = this.$t(this.$route.query.title);
    homeApi
      .oddsList(this.id)
      .then((data) => {
        this.oddsList = data.data;
        this.$toast.clear();
      })
      .catch((err) => {
        this.$toast.clear();
        this.$toast.fail(err.msg);
      });
    this.heart();
    that.$nextTick(() => {
      this.timeDataFun = setInterval(() => {
        // 对接口就是轮询后有新数据就进行滚动
        //需要定时执行的代码
        homeApi
          .heart(this.id, this.game_id)
          .then((data) => {
            // this.Myprize = [];
            // this.NOprize = [];
            this.last_issue = data.data.last_issue;
            // 控制hit_notice渲染频率 - 使用调用次数
            this.hitNoticeCallCount++;
            const shouldRenderHitNotice = this.hitNoticeCallCount === 1 || 
              (this.hitNoticeCallCount % this.hitNoticeRenderInterval === 0);
            
            if (!this.preizeIsPush && data.data.hit_notice && shouldRenderHitNotice) {
              this.Myprize = [];
              this.Myprize.push(...data.data.hit_notice);
              this.preizeIsPush = true;
            }
            if (that.message.length != 0) {
              this.game_status = data.data.game_status;
              this.time = data.data.issue.openTime1 * 1000;
              this.issue = data.data.issue;
              this.issuePreize = data.data.issue.issue;
              this.user_quantity = data.data.user_quantity;
              this.whether_close = data.data.issue.whether_close;

              // 检测是否是新期数，如果是则重置hit_notice渲染时间
              if (this.issuePreize !== this.lastIssuePreize) {
                this.hitNoticeCallCount = 0; // 重置调用次数
                this.preizeIsPush = false; // 重置推送状态
                this.lastIssuePreize = this.issuePreize;
              }

              if (data.data.message.length != 0 && data.data.message) {
                // let newlist = that.getResultArray(
                //   "id",
                //   that.message,
                //   data.data.message
                // );
                let newlist = that.getDifferenceSet(
                  that.message,
                  data.data.message
                );
                if (newlist.length != 0) {
                  //  取相差有问题
                  if(that.message.length>300){
                    that.message.splice(1,30)  
                  }
                  that.message.push(...newlist);
                  that.daodibu = false;
                }
              }
            } else {
              if (
                that.message.length == 0 &&
                data.data.message.length != 0 &&
                data.data.message
              ) {
                that.message = data.data.message;
              }
            }

            this.$toast.clear();
          })
          .catch(() => {
            this.$toast.clear();
            // this.$toast.fail(err.msg);
          });
        // 判断元素高度是不是大于容器高度
        if (
          that.$refs.swiperBox.offsetHeight <
            that.$refs.swipercontant.offsetHeight &&
          !that.daodibu
        ) {
         
          that.TopPX = that.TopPX + 50;

          that.transformSwiper =
            "transform:translate3d(0px, -" + that.TopPX + "px, 0px)";
        }
      }, 3000); // 改为3秒，减少接口调用频率
      document
        .querySelector("#swiperBox")
        .addEventListener("scroll", function () {
          // if (
          //   parseInt(this.scrollHeight - that.$refs.swiperBox.scrollTop - 5) <
          //   this.clientHeight
          // ) {
          //   console.log("到底部了");
          //   that.daodibu=true
          // }else{
          that.daodibu = true;
          // }
        });
    });
  },
};
</script>
<style lang="less" scoped>
.betRoom {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
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
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  box-shadow: 0 2px 8px rgba(178, 34, 34, 0.3);
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
  }
}

@keyframes headerGlow {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(178, 34, 34, 0.3);
  }
  50% {
    box-shadow: 0 2px 15px rgba(178, 34, 34, 0.5);
  }
}

.van-notice-bar {
  background: none;
  overflow: hidden;
}
.bet-head {
  overflow: hidden;
  text-align: center;
  background: #1a243f;
  padding: 0.4rem;
  margin-bottom: 0.2rem;
  font-size: 0.35rem;
  z-index: 2003;
  .left {
    flex: 1;
    position: relative;
  }
  .left ::after {
    content: "";
    display: block;
    width: 1px;
    height: 0.8rem;
    position: absolute;
    background-color: #e5e5e5;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .right {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-left: 0.25rem;
    font-size: 0.4rem;
    position: relative;
  }
}
.cut-off {
  margin-bottom: 0.2rem;
}
.colon {
  color: #fff;
  font-size: 14px;
  line-height: 20px;
}
.block {
  width: 0.52rem;
  height: 0.52rem;
  line-height: 0.52rem;
  background-color: #30385d;
  border-radius: 5px;
  color: #fff;
  margin: 0 0.08rem;
  display: inline-block;
  padding-top: 0.02rem;
  border: 1px solid #3d5179;
}
.icon-gold {
  width: 0.3rem;
  height: 0.3rem;
  margin: 0 0.2rem;
}
.caijin {
  margin-top: 0.2rem;
}
.pre-item {
  background-color: #1a243f;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0.3rem;
  font-size: 0.35rem;
  position: relative;
  z-index: 2003;
}
p .issue {
  white-space: nowrap;
}
.result {
  min-width: 1.44rem;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 0 0.4rem;
}
.pre-item:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #3d5179;
  color: #3d5179;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.scroll-thead {
  display: flex;
  padding: 0.2rem 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.95);
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  span {
    flex: 1;
    font-size: 0.35rem;
    color: #495057;
  }
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-bottom: 1px solid rgba(178, 34, 34, 0.2);
}
.scroller-box {
  overflow-y: auto;
  height: 100%;
  margin: 0 0.2rem;
  padding: 0.3rem;
  background: rgba(178, 34, 34, 0.1);
  border-radius: 0.16rem;
  border: 1px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 4px 16px rgba(178, 34, 34, 0.1);
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Webkit浏览器隐藏滚动条 */
.scroller-box::-webkit-scrollbar {
  display: none;
}

/* 隐藏所有滚动条 */
.swiper-container::-webkit-scrollbar,
.swiper-wrapper::-webkit-scrollbar,
.msg-box::-webkit-scrollbar {
  display: none;
}

.msg-box {
  // min-height: calc(100% + 1px);
}
.msg-item {
}
.bet-msg {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  text-align: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: 1rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(178, 34, 34, 0.1);
  color: #495057;
}
.flex1 {
  flex: 1;
  word-break: break-all;
}
.footer-chat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.25rem 0.3rem;
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  border-top: 2px solid #FFD700;
  padding-bottom: calc(0.1rem + constant(safe-area-inset-bottom));
  box-shadow: 0 -4px 20px rgba(178, 34, 34, 0.4);
  position: relative;
  overflow: hidden;
}

.footer-chat::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

/* 快速选择按钮行 */
.quick-select-row {
  display: flex;
  gap: 0.15rem;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.15rem;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  margin-bottom: 0.1rem;
}

.quick-btn {
  flex: 1;
  height: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #CD5C5C, #B22222);
  border: 1px solid #FFD700;
  border-radius: 8px;
  color: #FFD700;
  font-size: 0.32rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(178, 34, 34, 0.3);
}

.quick-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border-color: #FFD700;
  color: #B22222;
}

.quick-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.edit-btn {
  flex: 1;
  height: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #CD5C5C, #B22222);
  border: 1px solid #FFD700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(178, 34, 34, 0.3);
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border-color: #FFD700;
}

.edit-icon {
  font-size: 0.28rem;
  color: #FFD700;
  filter: drop-shadow(0 1px 2px rgba(139, 0, 0, 0.5));
}

/* 信息行 */
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.15rem 0;
}

.balance-info, .bet-info {
  display: flex;
  align-items: center;
  gap: 0.1rem;
}

.info-label {
  color: #FFD700;
  font-size: 0.28rem;
  font-weight: 500;
}

.balance-amount, .bet-amount {
  color: #FFFFFF;
  font-size: 0.36rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(178, 34, 34, 0.5);
}

.currency-highlight {
  color: #FFD700;
  font-size: 0.28rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(178, 34, 34, 0.3);
}

/* 操作按钮行 */
.action-row {
  display: flex;
  gap: 0.2rem;
  align-items: center;
}

.wallet-action {
  width: 0.9rem;
  height: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #CD5C5C, #B22222);
  border: 1px solid #FFD700;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(178, 34, 34, 0.3);
}

.wallet-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border-color: #FFD700;
}

.action-icon {
  font-size: 0.36rem;
  color: #FFD700;
  filter: drop-shadow(0 1px 2px rgba(178, 34, 34, 0.5));
}

.chase-action {
  flex: 1;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  background: linear-gradient(145deg, #CD5C5C, #B22222);
  border: 1px solid #FFD700;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(178, 34, 34, 0.3);
}

.chase-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border-color: #FFD700;
}

.action-text {
  color: #FFD700;
  font-size: 0.26rem;
  font-weight: 500;
}

.bet-action {
  flex: 2.5;
  height: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border: 2px solid #FFD700;
  border-radius: 8px;
  color: #8B0000;
  font-size: 0.32rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
  text-shadow: 0 1px 2px rgba(139, 0, 0, 0.3);
}

.bet-action .action-text {
  color: #B22222;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
}

@keyframes betButtonPulse {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6);
    transform: scale(1.05);
  }
}

 

.bet-action:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}
.icon-arrow-bottom {
  transition: transform 0.3s;
}
.angleRote {
  transform: rotate(135deg);
  transition: transform 0.3s;
}
.head-menu {
  position: absolute;
  right: 0.2rem;
  top: 1.18rem;
  li:active {
    background: linear-gradient(135deg, #1e1e2e 0%, #2d2d3a 100%);
  }
  ul {
    background: linear-gradient(135deg, #1e1e2e 0%, #2d2d3a 100%);
    padding: 0.1rem 0.16rem;
    border-radius: 0.1rem;
    li {
      padding: 0.3rem 0.2rem;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      font-size: 0.35rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.2rem;
      }
    }
  }
}

.head-menu::before {
  display: block;
  content: "";
  width: 0px;
  height: 0px;
  border-width: 0.2rem;
  border-bottom-width: 0.32rem;
  border-style: solid;
  margin-left: 66%;
  border-color: transparent transparent #2d2d3a transparent;
}
.boderBottom {
  position: relative;
}
.boderBottom:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #3d5179;
  color: #3d5179;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.g-content {
  flex: 1;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: hidden;
}
.swiper-container {
  margin: 0 auto;
  width: 100%;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  position: relative;
}
.scroller-box {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: calc(100% - 0.4rem);
  overflow: auto;
  margin: 0 0.2rem;
  padding: 0.3rem;
  background: rgba(139, 0, 0, 0.1);
  border-radius: 0.16rem;
  border: 1px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 4px 16px rgba(139, 0, 0, 0.1);
}
.swiper-slide {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  -o-transition-property: transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  transition-property: transform, -webkit-transform;
}
.slide-text {
  height: auto;
}
.swiper-slide-active {
  pointer-events: auto;
}
.issuecontant {
  top: 4.49rem;
  position: absolute;
  width: 100%;
  background: linear-gradient(135deg, #1e1e2e 0%, #2d2d3a 100%);
}
.angleRotestow {
  transform: rotate(180deg);
  transition: transform 0.3s, -webkit-transform 0.3s;
}
.icon-arrow-bottoms {
  transform: rotate(0);
  transition: transform 0.3s;
}
.bet-panel {
  font-size: 0.24rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -8px 32px rgba(139, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.bet-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);
  animation: shimmer 2s ease-in-out infinite;
}
.panel-head {
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  padding: 0.4rem 0.3rem;
  border-bottom: 2px solid #FFD700;
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(178, 34, 34, 0.3);
}

.panel-head::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
}
.category {
  display: flex;
  -ms-flex-flow: wrap;
  flex-flow: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.category-item {
  width: 21%;
  text-align: center;
  color: #FFD700;
  line-height: 2;
  font-size: 0.35rem;
  font-weight: 600;
  padding: 0.2rem 0.1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.category-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
  transition: left 0.5s ease;
}

.category-item:hover::before {
  left: 100%;
}

.PayActive {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #8B0000;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  transform: translateY(-2px);
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(139, 0, 0, 0.3);
}
.panel-body {
  flex: 1;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: auto;
}
.oddsExplain {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.3rem;
  overflow-x: hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 8px;
  margin: 0.2rem;
  box-shadow: 0 2px 8px rgba(178, 34, 34, 0.1);
  border: 1px solid rgba(178, 34, 34, 0.1);
  
  .tips {
    color: #B22222;
    font-weight: 600;
    font-size: 0.32rem;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
.odds {
  margin-left: auto;
  display: flex;
  align-items: center;
  min-width: 1.6rem;
  padding: 0.15rem 0.25rem;
  background: linear-gradient(135deg, #B22222, #CD5C5C);
  border-radius: 15px;
  border: 1px solid #FFD700;
  box-shadow: 0 2px 6px rgba(178, 34, 34, 0.3);
  
  img {
    width: 0.32rem;
    height: 0.32rem;
    margin-right: 0.1rem;
    filter: drop-shadow(0 1px 2px rgba(255, 215, 0, 0.5));
  }
  
  span {
    color: #FFD700;
    font-weight: 600;
    font-size: 0.28rem;
    text-shadow: 0 1px 2px rgba(178, 34, 34, 0.5);
  }
}
.panel-body {
  flex: 1;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: auto;
}
.swiperKey {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
  width: 100%;
}
.select-list {
  padding: 0 0.12rem;
}
.item {
  width: 25%;
  float: left;
  text-align: center;
  margin-bottom: 0.4rem;
}
.square {
  width: 1.3rem;
  height: 1.3rem;
  margin: 0 auto;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border: 2px solid rgba(178, 34, 34, 0.2);
  box-shadow: 0 4px 12px rgba(178, 34, 34, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.square::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.square:hover::before {
  opacity: 1;
}

.square:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(178, 34, 34, 0.2);
  border-color: #FFD700;
}

.square .text {
  font-size: 0.36rem;
  color: #B22222;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.1rem;
  position: relative;
  z-index: 1;
}

.square .oddsPay {
  color: #FF7D20;
  font-size: 0.28rem;
  font-weight: 700;
  text-align: center;
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(255, 125, 32, 0.3);
}
.select-list .item.active .square {
  border: 3px solid #FFD700;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
  transform: translateY(-3px) scale(1.05);
  animation: activeGlow 1.5s ease-in-out infinite;
}

.select-list .item.active .square .text {
  color: #B22222;
  font-weight: 700;
}

.select-list .item.active .square .oddsPay {
  color: #B22222;
  font-weight: 700;
}
.panel-foot {
  height: 1.18rem;
  display: flex;
  justify-content: space-between;
  color: #fff;
  margin-top: 0.2rem;
  padding: 0.2rem;
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  border-top: 2px solid #FFD700;
  position: relative;
  z-index: 1;
  box-shadow: 0 -2px 8px rgba(178, 34, 34, 0.3);
}

.panel-foot::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
}
.leftCount {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  flex: 1;
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(178, 34, 34, 0.2);
  box-shadow: 0 2px 8px rgba(178, 34, 34, 0.1);
  margin-right: 0.2rem;
  display: flex;
  align-items: center;
  padding: 0.2rem;
}
.rightBetButton {
  div {
    height: 100%;
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    padding: 0 0.3rem;
    min-width: 1.6rem;
    text-align: center;
    border-radius: 8px;
    color: #B22222;
    font-weight: 700;
    font-size: 0.32rem;
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
    border: 2px solid #FFD700;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  div:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 215, 0, 0.5);
    background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
  }
}
.icon-cart {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.2rem;
  filter: drop-shadow(0 2px 4px rgba(178, 34, 34, 0.3));
}

.bet-status {
  color: #B22222;
  font-size: 0.32rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(178, 34, 34, 0.2);
}
.bet-sub-panel {
  padding: 0.4rem 0.3rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -8px 32px rgba(178, 34, 34, 0.15);
  position: relative;
  overflow: hidden;
}

.bet-sub-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);
  animation: shimmer 2s ease-in-out infinite;
}

.bet-sub-panel ul {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.2rem;
  margin-bottom: 0.3rem;
}

.bet-sub-panel ul li {
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.bet-sub-panel ul li img {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(178, 34, 34, 0.2);
  box-shadow: 0 4px 12px rgba(178, 34, 34, 0.1);
  transition: all 0.3s ease;
}

.bet-sub-panel ul li:hover img {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 20px rgba(178, 34, 34, 0.2);
  border-color: #FFD700;
}
.bottom-form {
  display: flex;
  align-items: center;
  margin-top: 0.4rem;
  font-size: 0.4rem;
  justify-content: space-between;
  height: 1.2rem;
  gap: 0.2rem;
  padding: 0.2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 12px;
  border: 1px solid rgba(178, 34, 34, 0.2);
  box-shadow: 0 2px 8px rgba(178, 34, 34, 0.1);
  
  .c_a0a0a0 {
    color: #B22222;
    font-weight: 600;
    font-size: 0.32rem;
    white-space: nowrap;
  }
  
  input {
    flex: 1;
    height: 100%;
    padding: 0.3rem;
    border-radius: 8px;
    border: 2px solid rgba(178, 34, 34, 0.2);
    background: #f8f9fa;
    color: #B22222;
    font-size: 0.36rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(178, 34, 34, 0.1);
  }
  
  input:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1), inset 0 2px 4px rgba(178, 34, 34, 0.1);
    transform: scale(1.02);
  }
  
  .ripple.bet-btn {
    background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
    width: 2rem;
    border: 2px solid #FFD700;
    border-radius: 8px;
    color: #FFD700;
    font-weight: 700;
    font-size: 0.32rem;
    box-shadow: 0 4px 12px rgba(178, 34, 34, 0.3);
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .ripple.bet-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(178, 34, 34, 0.4);
    background: linear-gradient(135deg, #CD5C5C 0%, #B22222 100%);
  }
  
  .ripple.bet-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(178, 34, 34, 0.3);
  }
}
.betactive {
  top: -10px;
}

.bet-sub-panel ul li.betactive img {
  border: 3px solid #FFD700;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
  transform: translateY(-5px) scale(1.15);
  animation: betActiveGlow 1.5s ease-in-out infinite;
}

@keyframes betActiveGlow {
  0%, 100% {
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
  }
  50% {
    box-shadow: 0 12px 30px rgba(255, 215, 0, 0.6);
  }
}
.msg-type_1 {
  div {
    background: linear-gradient(135deg, #1e1e2e 0%, #2d2d3a 100%);
    width: 50%;
    margin: 0.2rem auto;
    padding: 0.1rem;
    text-align: center;
    border-radius: 3px;
    min-height: 0.8rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
}
.bet {
  width: 7rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  overflow: hidden;
  top: 35%;
  position: absolute;
  left: 15%;
  box-shadow: 0 8px 32px rgba(178, 34, 34, 0.2);
  border: 2px solid #FFD700;
  animation: betSlideIn 0.4s ease-out;
}

@keyframes betSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.bet-title {
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  text-align: center;
  color: #FFD700;
  font-size: 0.35rem;
  line-height: 0.8rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(178, 34, 34, 0.5);
  border-bottom: 2px solid #FFD700;
  position: relative;
}

.bet-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
}
.bet-content {
  padding: 0.3rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
}

.bet-content div:nth-child(-n + 2) {
  padding: 0.2rem;
  border-bottom: 1px solid rgba(178, 34, 34, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #B22222;
  font-weight: 500;
}

.bet-content div:nth-child(3) {
  padding: 0.2rem 0;
  border-bottom: 1px solid rgba(178, 34, 34, 0.2);
  color: #B22222;
  font-weight: 600;
}

.bet-content div:nth-child(3) span {
  display: inline-block;
  width: 50%;
  text-align: center;
  color: #B22222;
  font-weight: 600;
}
.bet-content ul li {
  padding: 0.15rem 0;
  color: #B22222;
  font-weight: 500;
}

.bet-footer {
  padding: 0.3rem;
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  border-top: 2px solid #FFD700;
}
.bet-content ul li span {
  display: inline-block;
  width: 50%;
  text-align: center;
  color: #B22222;
  font-weight: 500;
}

.btn-confirm {
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

.btn-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 215, 0, 0.5);
  background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
}

.btn-canle {
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

.btn-canle:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(108, 117, 125, 0.4);
  background: linear-gradient(135deg, #5a6268 0%, #6c757d 100%);
}
.follow-btn {
  background: linear-gradient(145deg, #B22222, #CD5C5C);

  width: 1.2rem;
  padding: 0.1rem 0.1rem;
  border-radius: 0.3rem;
  color: #fff;
  flex: none;
  width: 15%;
}
.stopBet {
  height: 0.48rem;
  font-size: 0.4rem;
  color: #ff4f5b;
}
.Xwarp {
  background: url(../assets/image/xi.png);
  width: 100%;
  height: 2.92rem;
  position: absolute;
  top: 6rem;
  z-index: 999;
  transform: translate3d(0, 0px, 0px);
  transition-duration: 2000ms;
  animation: righttoleftpiaopping 5s linear both;
  background-size: 100% 100%;
  div {
    margin-top: 1.6rem;
    font-size: 0.35rem;
    margin-left: 2.35rem;
    width: 7.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
@keyframes righttoleftpiaopping {
  /*设置内容由显示变为隐藏*/
  0% {
    transform: translate3d(-300px, 0px, 0px);
    opacity: 1;
  }
  50% {
    transform: translate3d(0, 0px, 0px);
    opacity: 1;
  }
  50% {
    transform: translate3d(200px, 0px, 0px);
    opacity: 1;
  }
  100% {
    transform: translate3d(500px, 0px, 0px);
    opacity: 0;
  }
}

/* 新组件样式 */
.current-issue-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 8px;
  margin: 0.2rem;
  padding: 0.3rem;
  box-shadow: 0 2px 8px rgba(178, 34, 34, 0.1);
  padding-bottom: 0.05rem;
  border: 1px solid rgba(178, 34, 34, 0.2);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}

.issue-number {
  color: #B22222;
  font-size: 0.4rem;
  font-weight: bold;
}

.calculation {
  display: flex;
  align-items: center;
  gap: 0.1rem;
}

.number-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.8rem;
  height: 0.8rem;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9));
  border: 1px solid rgba(178, 34, 34, 0.3);
  border-radius: 50%;
  color: #B22222;
  font-size: 0.4rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(178, 34, 34, 0.2);
}

.operator {
  color: #495057;
  font-size: 0.3rem;
  margin: 0 0.05rem;
}

.card-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(178, 34, 34, 0.3), transparent);
  margin: 0.2rem 0;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.3rem;
  align-items: center;
}

.game-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.3rem;
}

.game-title {
  color: #B22222;
  font-size: 0.4rem;
  font-weight: 600;
  text-align: left;
  margin-bottom: 0.1rem;
}

.game-distance {
  color: #6c757d;
  font-size: 0.3rem;
  text-align: left;
}

.right-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
}

.deadline {
  color: #6c757d;
}

.timer-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
}

.timer-label {
  color: #6c757d;
  font-size: 0.3rem;
  font-weight: 500;
}

.timer-display {
  display: flex;
  align-items: center;
  gap: 0.1rem;
}

.timer-block {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0.8rem;
  height: 0.6rem;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9));
  border: 1px solid rgba(178, 34, 34, 0.3);
  border-radius: 6px;
  color: #B22222;
  font-size: 0.35rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(178, 34, 34, 0.2);
  padding: 0 0.1rem;
}

.timer-colon {
  color: #495057;
  font-size: 0.35rem;
  font-weight: bold;
  margin: 0 0.05rem;
}

.betting-status {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.status-btn {
  padding: 0.15rem 0.3rem;
  border: 1px solid #4CAF50;
  border-radius: 15px;
  color: #4CAF50;
  font-size: 0.25rem;
  font-weight: 500;
  background: transparent;
  transition: all 0.3s ease;
  min-width: 1rem;
  text-align: center;
}

.status-btn.active {
  background: #4CAF50;
  color: #fff;
}

/* 炫酷动画效果 */

/* 从上到下依次出现动画 */
.current-issue-card {
  transition: all 0.3s ease;
}

.scroll-thead {
  animation: slideInFromTop 0.8s ease-out 0.4s both;
}

.msg-box {
  animation: slideInFromTop 0.8s ease-out 0.6s both;
}



 

/* 投注面板元素依次出现 */
.bet-panel {
  animation: slideInFromBottom 0.6s ease-out both;
}

.panel-head {
  animation: slideInFromTop 0.5s ease-out 0.1s both;
}

.panel-body {
  animation: slideInFromTop 0.5s ease-out 0.2s both;
}

.panel-foot {
  animation: slideInFromTop 0.5s ease-out 0.3s both;
}

@keyframes slideInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 当前期数卡片悬浮动画 */
.current-issue-card {
  transition: all 0.3s ease;
}

 

@keyframes cardFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* 数字圆圈脉冲动画 */
.number-circle {
  animation: slideInFromTop 0.5s ease-out both, numberPulse 2s ease-in-out infinite 1s;
  transition: all 0.3s ease;
}

.number-circle:nth-child(1) { animation-delay: 0.3s, 1s; }
.number-circle:nth-child(3) { animation-delay: 0.4s, 1s; }
.number-circle:nth-child(5) { animation-delay: 0.5s, 1s; }
.number-circle:nth-child(7) { animation-delay: 0.6s, 1s; }

/* 卡片内部元素依次出现 */
.card-top {
  animation: slideInFromTop 0.6s ease-out 0.3s both;
}

.card-bottom {
  animation: slideInFromTop 0.6s ease-out 0.5s both;
}

.game-info {
  animation: slideInFromLeft 0.6s ease-out 0.6s both;
}

.right-section {
  animation: slideInFromRight 0.6s ease-out 0.6s both;
}

@keyframes slideInFromRight {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.number-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

@keyframes numberPulse {
  0%, 100% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  }
}

/* 计时器发光动画 */
.timer-block {
  animation: timerGlow 1s ease-in-out infinite;
}

@keyframes timerGlow {
  0%, 100% {
    box-shadow: 0 2px 4px rgba(178, 34, 34, 0.2);
  }
  50% {
    box-shadow: 0 4px 12px rgba(178, 34, 34, 0.4);
  }
}

/* 投注按钮脉冲动画 */
.bet-action {
  transition: all 0.3s ease;
}

/* 资产信息依次出现 */
.quick-select-row {
  animation: slideInFromLeft 0.6s ease-out 0.9s both;
}

.info-row {
  animation: slideInFromLeft 0.6s ease-out 0.9s both;
}

@keyframes slideInFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}





/* 消息列表滑入动画 */
.msg-item {
  animation: messageSlideIn 0.5s ease-out;
  transition: all 0.3s ease;
}
 

@keyframes messageSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 资产金额发光动画 */
.balance-amount, .bet-amount {
  animation: moneyGlow 2s ease-in-out infinite;
}

@keyframes moneyGlow {
  0%, 100% {
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  }
  50% {
    text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
  }
}

/* 状态按钮激活动画 */
.status-btn.active {
  animation: statusActive 2s ease-in-out infinite;
}

@keyframes statusActive {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
  }
  50% {
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.5);
  }
}

/* 弹出菜单滑入动画 */
.head-menu {
  animation: menuSlideIn 0.3s ease-out;
}

@keyframes menuSlideIn {
  0% {
    opacity: 0;
    transform: translateY(-10px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 投注面板滑入动画 */
.bet-panel {
  animation: panelSlideUp 0.4s ease-out;
}

/* 投注金额选择弹窗动画 */
.bet-sub-panel {
  animation: subPanelSlideUp 0.3s ease-out;
}

@keyframes subPanelSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 投注选项网格动画 */
.select-list {
  animation: gridFadeIn 0.6s ease-out 0.2s both;
}

@keyframes gridFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 投注金额按钮脉冲动画 */
.bet-sub-panel ul li {
  animation: buttonPulse 2s ease-in-out infinite;
}

.bet-sub-panel ul li:nth-child(1) { animation-delay: 0s; }
.bet-sub-panel ul li:nth-child(2) { animation-delay: 0.2s; }
.bet-sub-panel ul li:nth-child(3) { animation-delay: 0.4s; }
.bet-sub-panel ul li:nth-child(4) { animation-delay: 0.6s; }
.bet-sub-panel ul li:nth-child(5) { animation-delay: 0.8s; }
.bet-sub-panel ul li:nth-child(6) { animation-delay: 1s; }

@keyframes buttonPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes panelSlideUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 选择项悬浮动画 */
.item {
  transition: all 0.3s ease;
  animation: slideInFromTop 0.5s ease-out both;
  position: relative;
  overflow: hidden;
}

.item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  transition: left 0.5s ease;
}

.item:hover::before {
  left: 100%;
}

.item:nth-child(1) { animation-delay: 0.3s; }
.item:nth-child(2) { animation-delay: 0.4s; }
.item:nth-child(3) { animation-delay: 0.5s; }
.item:nth-child(4) { animation-delay: 0.6s; }
.item:nth-child(5) { animation-delay: 0.7s; }
.item:nth-child(6) { animation-delay: 0.8s; }
.item:nth-child(7) { animation-delay: 0.9s; }
.item:nth-child(8) { animation-delay: 1.0s; }

.item:hover {
  transform: scale(1.05);
}

.item.active .square {
  animation: activeGlow 1s ease-in-out infinite;
}

@keyframes activeGlow {
  0%, 100% {
    border-color: orange;
    box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
  }
  50% {
    border-color: #FFD700;
    box-shadow: 0 4px 15px rgba(255, 165, 0, 0.5);
  }
}

/* 跟购按钮脉冲动画 */
.follow-btn {
  transition: all 0.3s ease;
  animation: followPulse 2s ease-in-out infinite;
}

.follow-btn:hover {
  transform: scale(1.1);
  background: linear-gradient(145deg, #B22222, #CD5C5C);
}

@keyframes followPulse {
  0%, 100% {
    box-shadow: 0 2px 8px rgba(125, 88, 198, 0.3);
  }
  50% {
    box-shadow: 0 4px 15px rgba(125, 88, 198, 0.5);
  }
}

/* 滚动条美化 */
.scroller-box::-webkit-scrollbar,
.panel-body::-webkit-scrollbar {
  width: 6px;
}

.scroller-box::-webkit-scrollbar-track,
.panel-body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.scroller-box::-webkit-scrollbar-thumb,
.panel-body::-webkit-scrollbar-thumb {
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border-radius: 3px;
}

.scroller-box::-webkit-scrollbar-thumb:hover,
.panel-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(145deg, #FFA500, #FFD700);
}

/* 投注面板内容区域美化 */
.panel-body {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 0 0 8px 8px;
}

/* 投注选项容器美化 */
.select-list {
  padding: 0.2rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  margin: 0.1rem;
}

/* 图标悬浮动画 */
.van-icon {
  transition: all 0.3s ease;
}

.van-icon:hover {
  transform: scale(1.2);
}

/* 触摸优化 */
@media (hover: none) and (pointer: coarse) {
  .square:hover,
  .category-item:hover,
  .item:hover,
  .bet-sub-panel ul li:hover img {
    transform: none;
  }
  
  .square:active,
  .category-item:active,
  .item:active {
    transform: scale(0.95);
  }
  
  .bet-sub-panel ul li:active img {
    transform: scale(0.9);
  }
}

/* 响应式设计 */
@media (max-width: 375px) {
  .square {
    width: 1.1rem;
    height: 1.1rem;
  }
  
  .square .text {
    font-size: 0.32rem;
  }
  
  .square .oddsPay {
    font-size: 0.24rem;
  }
  
  .category-item {
    font-size: 0.32rem;
    padding: 0.15rem 0.05rem;
  }
  
  .bet-sub-panel ul li img {
    width: 1rem;
    height: 1rem;
  }
}

/* 高分辨率屏幕优化 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .square,
  .category-item,
  .bet-sub-panel ul li img {
    border-width: 1px;
  }
}

/* 输入框聚焦动画 */
input {
  transition: all 0.3s ease;
}

input:focus {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

/* 卡片分割线发光动画 */
.card-divider {
  animation: dividerGlow 3s ease-in-out infinite;
}

@keyframes dividerGlow {
  0%, 100% {
    background: linear-gradient(90deg, transparent, rgba(178, 34, 34, 0.3), transparent);
  }
  50% {
    background: linear-gradient(90deg, transparent, #B22222, transparent);
  }
}

/* 自定义金额输入弹窗样式 */
.custom-input-dialog {
  padding: 0.4rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.dialog-header {
  text-align: center;
  margin-bottom: 0.4rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(139, 0, 0, 0.1);
}

.dialog-header h3 {
  color: #B22222;
  font-size: 0.4rem;
  font-weight: 600;
  margin: 0;
}

.dialog-content {
  margin-bottom: 0.4rem;
}

.input-group {
  margin-bottom: 0.3rem;
}

.input-group label {
  display: block;
  color: #495057;
  font-size: 0.32rem;
  margin-bottom: 0.2rem;
  font-weight: 500;
}

.custom-input {
  background: #f8f9fa;
  border: 1px solid rgba(178, 34, 34, 0.2);
  border-radius: 8px;
  padding: 0.2rem;
  font-size: 0.36rem;
  color: #B22222 !important;
}

.custom-input input {
  color: #B22222 !important;
}

.custom-input .van-field__control {
  color: #B22222 !important;
}

.custom-input .van-field__value {
  color: #B22222 !important;
}

/* 全局覆盖Vant输入框样式 */
.custom-input-dialog .van-field__control {
  color: #B22222 !important;
}

.custom-input-dialog .van-field__value {
  color: #B22222 !important;
}

.custom-input-dialog input {
  color: #B22222 !important;
}

/* 更具体的选择器 */
.custom-input-dialog .van-field .van-field__control {
  color: #B22222 !important;
}

.custom-input-dialog .van-field .van-field__value {
  color: #B22222 !important;
}

/* 使用深度选择器 */
:deep(.custom-input-dialog .van-field__control) {
  color: #B22222 !important;
}

:deep(.custom-input-dialog .van-field__value) {
  color: #B22222 !important;
}

.custom-input:focus {
  border-color: #B22222;
  box-shadow: 0 0 0 2px rgba(178, 34, 34, 0.1);
}

.quick-amounts {
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
  margin-top: 0.3rem;
}

.quick-amount {
  flex: 1;
  min-width: 1.5rem;
  padding: 0.2rem 0.3rem;
  background: linear-gradient(145deg, #CD5C5C, #B22222);
  border: 1px solid #FFD700;
  border-radius: 6px;
  color: #FFD700;
  font-size: 0.28rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(178, 34, 34, 0.2);
}

.quick-amount:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  background: linear-gradient(145deg, #FFD700, #FFA500);
  color: #B22222;
}

.quick-amount:active {
  transform: translateY(0);
}

.dialog-footer {
  display: flex;
  gap: 0.2rem;
  margin-top: 0.4rem;
}

.cancel-btn {
  flex: 1;
  background: #6c757d;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 0.32rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

.confirm-btn {
  flex: 1;
  background: linear-gradient(145deg, #B22222, #CD5C5C);
  border: none;
  border-radius: 8px;
  color: #FFD700;
  font-size: 0.32rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(178, 34, 34, 0.3);
}

.confirm-btn:hover {
  background: linear-gradient(145deg, #CD5C5C, #B22222);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(178, 34, 34, 0.4);
}

/* 新的卡片布局样式 */
.bet-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 0.16rem;
  margin-bottom: 0.3rem;
  padding: 0.4rem;
  box-shadow: 0 8px 32px rgba(178, 34, 34, 0.15);
  border: 2px solid rgba(178, 34, 34, 0.3);
  position: relative;
  overflow: hidden;
  animation: cardSlideIn 0.6s ease-out;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(178, 34, 34, 0.05), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(178, 34, 34, 0.25);
    border-color: rgba(178, 34, 34, 0.5);

    &::before {
      left: 100%;
    }
  }
}

@keyframes cardSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-profile {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
  gap: 0.2rem;
}

.user-avatar {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 2px solid rgba(178, 34, 34, 0.3);
  object-fit: cover;
  animation: avatarPulse 2s ease-in-out infinite;
}

@keyframes avatarPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.user-info {
  flex: 1;
  text-align: left;
}

.username {
  color: #B22222;
  font-size: 0.36rem;
  font-weight: 600;
  margin-bottom: 0.1rem;
  text-shadow: 0 1px 2px rgba(178, 34, 34, 0.2);
}

.block-info {
  color: #6c757d;
  font-size: 0.28rem;
  font-weight: 400;
}

.bet-details {
  background: rgba(178, 34, 34, 0.05);
  border-radius: 0.12rem;
  padding: 0.3rem;
  margin-bottom: 0.3rem;
  border: 1px solid rgba(178, 34, 34, 0.15);
}

.bet-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.15rem;
  padding: 0.1rem 0;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
}

.bet-type {
  color: #495057;
  font-size: 0.32rem;
  font-weight: 500;
}

.bet-amount {
  color: #B22222;
  font-size: 0.32rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(178, 34, 34, 0.2);
}

.bet-summary {
  margin-top: 0.2rem;
  padding-top: 0.2rem; 
}

.summary-text {
  color: #6c757d;
  font-size: 0.28rem;
  font-weight: 400;
}

.follow-button {
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  color: #FFD700;
  border: none;
  border-radius: 0.08rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.32rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(178, 34, 34, 0.3);
  text-align: center;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(178, 34, 34, 0.4);
    background: linear-gradient(135deg, #CD5C5C 0%, #B22222 100%);
  }

  &:active {
    transform: translateY(0);
  }
}

/* 隐藏原有的表格头部 */
.scroll-thead {
  display: none;
}

/* 调整消息列表容器 */
.msg-box {
  padding: 0.2rem;
}

.msg-item {
  margin-bottom: 0.3rem;
}

/* 保持原有的消息类型样式 */
.msg-type_1 {
  text-align: center;
  padding: 0.3rem;
  background: linear-gradient(135deg, rgba(178, 34, 34, 0.1) 0%, rgba(205, 92, 92, 0.1) 100%);
  border-radius: 0.12rem;
  color: #B22222;
  font-weight: 600;
  border: 1px solid rgba(178, 34, 34, 0.2);
  margin-bottom: 0.3rem;
}

/* 走势图按钮固定定位 */
.trend-chart-fixed {
  position: fixed;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  z-index:20;
  pointer-events: auto;
}

.trend-chart-button {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 0.12rem;
  padding: 0.1rem 0.1rem;
  color: #FFD700;
  font-size: 0.26rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.2rem;
  box-shadow: 0 4px 16px rgba(178, 34, 34, 0.3);
  flex-direction: column; 

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(178, 34, 34, 0.4);
    background: linear-gradient(135deg, #CD5C5C 0%, #B22222 100%);
    border-color: rgba(255, 215, 0, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
}

.trend-icon {
  width: 0.8rem;
  height: 0.8rem;
  object-fit: contain;
}

.trend-text {
  color: #FFD700;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(178, 34, 34, 0.5);
}

/* 走势图弹窗样式 */
.trend-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2005;
  display: flex;
  align-items: flex-end;
  animation: fadeIn 0.3s ease-out;
}

.trend-chart-modal {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80vh;
  background: linear-gradient(135deg, #1e1e2e 0%, #2d2d3a 100%);
  border-radius: 0.24rem 0.24rem 0 0;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.5);
  z-index: 2006;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
  touch-action: auto;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.trend-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.3rem;
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  border-bottom: 2px solid #FFD700;
  border-radius: 0.24rem 0.24rem 0 0;
  position: relative;
}

.trend-chart-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
}

.trend-tabs {
  display: flex;
  gap: 0.2rem;
}

.trend-tab {
  padding: 0.2rem 0.4rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.28rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0.08rem;
  position: relative;
}

.trend-tab.active {
  color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
  border-bottom: 2px solid #FFD700;
}

.trend-close {
  padding: 0.1rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.trend-close:hover {
  background: rgba(255, 215, 0, 0.1);
}

.trend-chart-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  touch-action: auto;
}

.trend-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.trend-table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1px;
  background: linear-gradient(135deg, #B22222 0%, #CD5C5C 100%);
  border-bottom: 2px solid #FFD700;
  position: sticky;
  top: 0;
  z-index: 10;
}

.trend-th {
  padding: 0.3rem 0.2rem;
  color: #FFD700;
  font-size: 0.26rem;
  font-weight: 600;
  text-align: center;
  background: transparent;
  border-right: 1px solid rgba(255, 215, 0, 0.3);
}

.trend-th:last-child {
  border-right: none;
}

.trend-table-body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  touch-action: pan-y;
  position: relative;
}

.trend-table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  background: rgba(178, 34, 34, 0.1);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.trend-table-row:hover {
  background: rgba(255, 215, 0, 0.05);
}

.trend-td {
  padding: 0.25rem 0.2rem;
  color: #ffffff;
  font-size: 0.24rem;
  text-align: center;
  border-right: 1px solid rgba(255, 215, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0.8rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.trend-td:last-child {
  border-right: none;
}

.trend-td.highlight {
  color: #FFD700;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(139, 0, 0, 0.5);
  animation: highlightPulse 2s ease-in-out infinite;
}

@keyframes highlightPulse {
  0%, 100% {
    text-shadow: 0 1px 2px rgba(178, 34, 34, 0.5);
  }
  50% {
    text-shadow: 0 1px 8px rgba(255, 215, 0, 0.8);
  }
}

/* 自定义滚动条 */
.trend-table-body::-webkit-scrollbar {
  width: 4px;
}

.trend-table-body::-webkit-scrollbar-track {
  background: rgba(255, 215, 0, 0.1);
  border-radius: 2px;
}

.trend-table-body::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.3);
  border-radius: 2px;
}

.trend-table-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 215, 0, 0.5);
}

/* 开奖结果样式 */
.lottery-results {
  flex: 1;
  overflow-y: auto;
  padding: 0.2rem;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  touch-action: pan-y;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.result-item {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.95) 100%);
  border-radius: 0.16rem;
  padding: 0.4rem;
  border: 1px solid rgba(178, 34, 34, 0.2);
  box-shadow: 0 4px 16px rgba(178, 34, 34, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: resultSlideIn 0.6s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(178, 34, 34, 0.2);
    border-color: rgba(255, 215, 0, 0.3);

    &::before {
      left: 100%;
    }
  }
}

@keyframes resultSlideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-header {
  margin-bottom: 0.3rem;
  text-align: center;
}

.issue-number {
  color: #B22222;
  font-size: 0.32rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(178, 34, 34, 0.2);
}

.result-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  margin-bottom: 0.2rem;
}

.ball {
  display: inline-block;
  border-radius: 50%;
  width: 0.8rem;
  height: 0.8rem;
  text-align: center;
  line-height: 0.8rem;
  color: #fff;
  font-size: 0.36rem;
  font-weight: 600;
  position: relative;
  z-index: 1;
  animation: ballPulse 2s ease-in-out infinite;
  transition: all 0.3s ease;
}

.ball-orange {
  background: linear-gradient(135deg, #ffb658 0%, #ff6045 100%);
  box-shadow: 0 4px 16px rgba(255, 182, 88, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.8);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(255, 182, 88, 0.4);
  }
}

@keyframes ballPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.operator {
  color: #B22222;
  font-size: 0.32rem;
  font-weight: 600;
  margin: 0 0.1rem;
  text-shadow: 0 1px 2px rgba(178, 34, 34, 0.2);
}

.result-info {
  text-align: center;
}

.result-text {
  color: #6c757d;
  font-size: 0.28rem;
  font-weight: 500;
  background: linear-gradient(135deg, rgba(178, 34, 34, 0.1) 0%, rgba(205, 92, 92, 0.1) 100%);
  padding: 0.1rem 0.2rem;
  border-radius: 0.08rem;
  border: 1px solid rgba(178, 34, 34, 0.2);
}

/* 开奖结果滚动条样式 */
.lottery-results::-webkit-scrollbar {
  width: 4px;
}

.lottery-results::-webkit-scrollbar-track {
  background: rgba(255, 215, 0, 0.1);
  border-radius: 2px;
}

.lottery-results::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.3);
  border-radius: 2px;
}

.lottery-results::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 215, 0, 0.5);
}
</style>