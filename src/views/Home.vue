<template>
  <div class="home">
    <x-input placeholder="搜索"></x-input>
    <div class="list">
      <div class="loan-item" @click="todetail(1)">
        <img src="../assets/i-grid.png" alt="">
        <div class="loan-box">
            <div class="loan-name"><span>洗车店</span><x-icon type="ios-arrow-forward" size="20"></x-icon></div>
            <div class="loan-info">
                <div class="loan-left">
                    <div>杭州市江干区城星路333号</div>
                </div>
                <div class="loan-right">
                    <div>0.9km</div>
                </div>
            </div>
            <div class="icons">
              <img src="../assets/img/icon1.jpg" alt="">
              <img src="../assets/img/car.jpg" alt="">
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { XInput } from 'vux'
export default {
  name: 'home',
  components: {
    XInput
  },
  methods:{
    todetail(itemId){
      this.$router.push({path: '/about',query:{itemId}},)
    }
  } 
}
</script>
<style lang="less">
.vux-x-input{
  background: #f1f1f1;
  .weui-cell__bd{
    background:#ffffff;
    padding: 0 10px;
    font-size: 0.28rem;
  }
}
.loan-item{
    border-bottom: 1px solid #e5e5e5;
    padding: 10px;
    overflow: hidden;
    background-color: #fff;
    >img{
        float: left;
        width: 1.5rem;
        height:1.5rem;
    }
    .loan-box{
        margin-left: 1.8rem;
        .loan-name{
            font-size: 0.34rem;
            color: #333333;
            text-align: left;
            line-height: 0.5rem;
            font-weight: bold;
            .vux-x-icon{
              float: right;
              fill: #888888;
            }
        }
        .loan-info{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 0.26rem;
            line-height: 0.5rem;
            color: #888888;
            .loan-left{
                text-align: left;
            }
            .loan-right{
                text-align: right;
                span{
                    color: #FF983F;
                }
            }
        }
        .icons{
          text-align: left;
          font: initial;
          line-height: 0.5rem;
          img{
            width: 0.26rem;
            height: 0.26rem;
          }
        }
    }
}
</style>

