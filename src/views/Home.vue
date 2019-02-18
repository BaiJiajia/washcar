<template>
  <div class="home">
      <mt-search v-model="searchKey" class="search"></mt-search>
      <div class="select">
        <div class="address" @click="showCity = true">{{myAddresscounty}}<i class="arrow"></i></div>
          <div class="provider" @click="showProvider = true">{{provider}}<i class="arrow"></i></div>
      </div>
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
      <div class="w_picker" v-show="showCity || showProvider" @click="hidePicker" ref="picker">
          <div class="picker_header"><p style="color: #999">取消</p><h5>选择位置</h5><p style="color: #4774d0">确定</p></div>
          <mt-picker class="city_picker" @click.stop.native="" :slots="myAddressSlots" @change="onValuesChange" v-show="showCity"></mt-picker>
          <mt-picker class="city_picker" @click.stop.native="" :slots="providerList" @change="onProviderChange" v-show="showProvider"></mt-picker>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import city from '@/assets/city.json'
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
        searchKey: '',
        showCity: false,
        showProvider: false,
        provider: '服务商',
        myAddressSlots: [
            {
                flex: 1,
                defaultIndex: 1,
                values: Object.keys(city),  //省份数组
                className: 'slot1',
                textAlign: 'center'
            }, {
                divider: true,
                content: '-',
                className: 'slot2'
            }, {
                flex: 1,
                values: [],
                className: 'slot3',
                textAlign: 'center'
            },
            {
                divider: true,
                content: '-',
                className: 'slot4'
            },
            {
                flex: 1,
                values: [],
                className: 'slot5',
                textAlign: 'center'
            }
        ],
        providerList: [
            {
                flex: 1,
                defaultIndex: 0,
                values: ["车点点", '盛大', 'SJHT'],
                className: 'slot6',
                textAlign: 'center'
            }
        ],
        myAddressProvince:'',
        myAddressCity:'',
        myAddresscounty:'',
    }
  },
  methods:{
      hidePicker() {
        this.showCity = this.showProvider = false
      },
    todetail(itemId){
      this.$router.push({path: '/about',query:{itemId}},)
    },
    onValuesChange(picker, values) {
        if(city[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
            picker.setSlotValues(1,Object.keys(city[values[0]])); // Object.keys()会返回一个数组，当前省的数组
            picker.setSlotValues(2,city[values[0]][values[1]]); // 区/县数据就是一个数组
            this.myAddressProvince = values[0];
            this.myAddressCity = values[1];
            this.myAddresscounty = values[2];
        }
    },
    onProviderChange(picker, values) {
        this.provider = values[0]
    }
  },
  mounted() {
      this.$refs.picker.addEventListener('touchmove', (e) => {
          e.preventDefault()
      }, false)
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
          this.myAddressSlots[0].defaultIndex = 0
      })
  }
}
</script>
<style lang="less" scoped>
    .search {
        height: 100%;
    }
.vux-x-input{
  background: #f1f1f1;
  .weui-cell__bd{
    background:#ffffff;
    padding: 0 10px;
    font-size: 0.28rem;
  }
}
.home {
    .select {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        text-align: center;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        .address {
            width: 50%;
            height: 100%;
        }
        .provider {
            width: 50%;
            height: 100%;
        }
    }
    .arrow {
        width: .15rem;
        height: .15rem;
        display: inline-block;
        position: relative;
        &::after{
            content: '';
            position: absolute;
            width: .15rem;
            height: .15rem;
            border-width: 1px 1px 0 0;
            border-color: #000;
            border-style: solid;
            transform: rotate(135deg);
            transform-origin: .15rem .05rem;
        }
    }
    .w_picker {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        z-index: 999;
        overflow: hidden;
        .picker_header {
            position: absolute;
            bottom: 180px;
            left: 0;
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            display: flex;
            background: #ddd;
            flex-flow: row nowrap;
            justify-content: space-around;
            h5 {
                width: 60%;
                text-align: center;
                font-size: 16px;
                font-weight: 400;
            }
            p {
                width: 20%;
                font-size: 14px;
                text-align: center;
            }
        }
        .city_picker {
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            background: #fff;
        }
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

