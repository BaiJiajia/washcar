<template>
  <div class="home">
    <mt-search v-model.lazy="searchKey" class="search"></mt-search>
    <div class="select">
      <div class="address" @click="showCity = true">
        {{ myAddresscounty }}<i class="arrow"></i>
      </div>
      <div class="provider" @click="showProvider = true">
        {{ provider }}<i class="arrow"></i>
      </div>
    </div>
    <div class="list-wrapper" ref="scroll">
      <div class="list">
        <div
          class="loan-item"
          @click="todetail(shop)"
          v-for="(shop, index) in shopList"
          :key="index"
        >
          <img :src="shop.img" alt="" />
          <div class="loan-box">
            <div class="loan-name">
              <span>{{ shop.name }}</span
              ><i class="arrow right" />
            </div>
            <div class="loan-info">
              <div class="loan-left">
                <div>{{ shop.address }}</div>
              </div>
              <div class="loan-right">
                <div>
                  {{
                    getFlatternDistance(
                      point.lat,
                      point.lng,
                      shop.lat,
                      shop.lng
                    ).toFixed(1)
                  }}km
                </div>
              </div>
            </div>
            <div class="icons">
              <img
                src="../assets/img/icon1.jpg"
                alt=""
                v-if="shop.channelId === 'CDD'"
              />
              <img
                src="../assets/img/car.jpg"
                alt=""
                v-if="shop.channelId === 'sd'"
              />
              <img
                src="../assets/img/icon3.png"
                alt=""
                v-if="shop.channelId === 'SJHT'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w_picker"
      v-show="showCity || showProvider"
      @click="hidePicker"
      ref="picker"
    >
      <div class="picker_header">
        <p style="color: #999">取消</p>
        <h5>{{ showCity ? "选择位置" : "选择服务商" }}</h5>
        <p style="color: #4774d0">确定</p>
      </div>
      <mt-picker
        class="city_picker"
        @click.stop.native=""
        :slots="myAddressSlots"
        @change="onValuesChange"
        v-show="showCity"
      ></mt-picker>
      <mt-picker
        class="city_picker"
        @click.stop.native=""
        :slots="providerList"
        @change="onProviderChange"
        v-show="showProvider"
      ></mt-picker>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
export default {
  name: "home",
  components: {},
  data() {
    return {
      searchKey: "",
      page: 1,
      loadover: false,
      showCity: false,
      showProvider: false,
      provider: "服务商",
      cityList: [],
      nDistrict: [],
      nChannel: [],
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: [], //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      providerList: [
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: "slot6",
          textAlign: "center"
        }
      ],
      myAddressProvince: "",
      myAddressCity: "",
      myAddresscounty: "",
      pageSize: 20,
      shopList: []
    };
  },
  methods: {
    hidePicker() {
      this.showCity = this.showProvider = false;
      this.getDate();
    },
    todetail(shop) {
      this.$router.push({
        path: "/about",
        query: {
          ...shop,
          distance: this.getFlatternDistance(
            this.point.lat,
            this.point.lng,
            shop.lat,
            shop.lng
          ).toFixed(1)
        }
      });
    },
    onValuesChange(picker, values) {
      if (this.cityList[values[0]]) {
        //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1, Object.keys(this.cityList[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(
          2,
          this.setIgnore(this.cityList[values[0]][values[1]])
        ); // 区/县数据就是一个数组
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
      }
    },
    setIgnore(districtArr) {
      if (!districtArr) return;
      this.nDistrict = [];
      let newArr = [];
      for (let i of districtArr) {
        if (i[0] === "*") {
          this.nDistrict.push(i.slice(1));
        } else {
          newArr.push(i);
        }
      }
      return newArr;
    },
    setChannel(channelArr) {
      this.nChannel = [];
      let newArr = [];
      for (let i of channelArr) {
        if (i[0] === "*") {
          this.nChannel.push(i.slice(1));
        } else {
          newArr.push(i);
        }
      }
      return newArr;
    },
    onProviderChange(picker, values) {
      this.provider = values[0];
    },
    getDate(push = false) {
      if (!push) {
        this.page = 1;
        this.loadover = false;
      } else {
        this.page++;
      }
      this.$request("/washStore/query1", {
        province: this.myAddressProvince,
        city: this.myAddressCity,
        district: this.myAddresscounty === "全部" ? "" : this.myAddresscounty,
        name: this.searchKey,
        page: this.page,
        size: this.pageSize,
        nDistrict: this.nDistrict.join(","),
        nChannel: this.nChannel.join(","),
        channelId: this.formatProvider
      }).then(res => {
        if (push) {
          if (res.records.length === 0) {
            this.loadover = true;
          } else {
            for (let i of res.records) {
              this.shopList.push(i);
            }
          }
        } else {
          this.shopList = res.records;
        }
      });
    },
    getRad(d) {
      var PI = Math.PI;
      return (d * PI) / 180.0;
    },
    getFlatternDistance(lat1, lng1, lat2, lng2) {
      var EARTH_RADIUS = 6378137.0; //单位M
      var f = this.getRad((lat1 + lat2) / 2);
      var g = this.getRad((lat1 - lat2) / 2);
      var l = this.getRad((lng1 - lng2) / 2);

      var sg = Math.sin(g);
      var sl = Math.sin(l);
      var sf = Math.sin(f);

      var s, c, w, r, d, h1, h2;
      var a = EARTH_RADIUS;
      var fl = 1 / 298.257;

      sg = sg * sg;
      sl = sl * sl;
      sf = sf * sf;

      s = sg * (1 - sl) + (1 - sf) * sl;
      c = (1 - sg) * (1 - sl) + sf * sl;

      w = Math.atan(Math.sqrt(s / c));
      r = Math.sqrt(s * c) / w;
      d = 2 * w * a;
      h1 = (3 * r - 1) / 2 / c;
      h2 = (3 * r + 1) / 2 / s;

      return (d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))) / 1000;
    }
  },
  computed: {
    ...mapState({
      city: store => {
        return store.city;
      },
      province: store => {
        return store.province;
      },
      district: store => {
        return store.district;
      },
      point: store => {
        return store.point;
      }
    }),
    formatProvider() {
      switch (this.provider) {
        case "全部":
          return "";
        case "车点点":
          return "CDD";
        case "盛大":
          return "sd";
        case "小兔子":
          return "SJHT";
        default:
          return "";
      }
    }
  },
  watch: {
    city(newVal) {
      this.myAddressCity = newVal;
    },
    province(newVal) {
      this.myAddressProvince = newVal;
    },
    district(newVal) {
      this.myAddresscounty = newVal;
      this.$nextTick(() => {
        for (let i in Object.keys(this.cityList)) {
          if (Object.keys(this.cityList)[i] === this.province) {
            this.myAddressSlots[0].defaultIndex = +i;
            for (let j in Object.keys(this.cityList[this.province])) {
              if (Object.keys(this.cityList[this.province])[j] === this.city) {
                this.myAddressSlots[2].defaultIndex = +j;
                let districtArr = this.setIgnore(
                  this.cityList[this.province][this.city]
                );
                for (let k in districtArr) {
                  if (districtArr[k] === this.district) {
                    this.myAddressSlots[4].defaultIndex = +k;
                  }
                }
              }
            }
          }
        }
        this.getDate();
      });
    },
    searchKey() {
      this.getDate();
    }
  },
  activated() {},
  created() {
    let providerArr
    this.$getJson(`./${this.$route.query.location || 'city'}.json`).then(data => {
      this.cityList = data.data
      this.$getJson(`./${this.$route.query.channel || 'provider'}.json`).then(data => {
        providerArr = data.data
        this.myAddressSlots[0].values = Object.keys(this.cityList);
        this.providerList = [
          {
            flex: 1,
            defaultIndex: 0,
            values: this.setChannel(providerArr),
            className: "slot6",
            textAlign: "center"
          }
        ];
      })
    })
  },
  mounted() {
    if (this.district && this.city && this.province) {
      this.myAddressCity = this.city;
      this.myAddressProvince = this.province;
      this.myAddresscounty = this.district;
      this.$nextTick(() => {
        for (let i in Object.keys(this.cityList)) {
          if (Object.keys(this.cityList)[i] === this.province) {
            this.myAddressSlots[0].defaultIndex = +i;
            for (let j in Object.keys(this.cityList[this.province])) {
              if (Object.keys(this.cityList[this.province])[j] === this.city) {
                this.myAddressSlots[2].defaultIndex = +j;
                let districtArr = this.setIgnore(
                  this.cityList[this.province][this.city]
                );
                for (let k in districtArr) {
                  if (districtArr[k] === this.district) {
                    this.myAddressSlots[4].defaultIndex = +k;
                  }
                }
              }
            }
          }
        }
        this.getDate();
      });
    }
    this.$refs.picker.addEventListener(
      "touchmove",
      e => {
        e.preventDefault();
      },
      false
    );
    this.$refs.scroll.addEventListener("scroll", e => {
      if (
        e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop >
        50
      ) {
        if (this.loadover) return;
        this.getDate(true);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.vux-x-input {
  background: #f1f1f1;
  .weui-cell__bd {
    background: #ffffff;
    padding: 0 10px;
    font-size: 0.28rem;
  }
}
.home {
  width: 100%;
  height: 100%;
  .select {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    display: flex;
    text-align: center;
    border-top: 0.5px solid #d9d9d9;
    border-bottom: 0.5px solid #d9d9d9;
    background: #fff;
    .address {
      width: 50%;
      height: 100%;
      font-weight: 600;
      font-size: 14px;
      position: relative;
      &::after {
        content: "";
        width: 0.5px;
        height: 60%;
        right: 0;
        top: 20%;
        background: #d9d9d9;
        position: absolute;
      }
    }
    .provider {
      position: relative;
      width: 50%;
      height: 100%;
      font-weight: 600;
      font-size: 14px;
    }
  }
  .arrow {
    width: 0.15rem;
    height: 0.15rem;
    display: inline-block;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 0.15rem;
      height: 0.15rem;
      border-width: 1px 1px 0 0;
      border-color: #575757;
      border-style: solid;
      transform: rotate(135deg);
      transform-origin: 0.15rem 0.05rem;
    }
    &.right::after {
      transform: rotate(45deg);
    }
  }
  .w_picker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
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
.list-wrapper {
  width: 100%;
  height: calc(100% - 53px - 1rem);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.loan-item {
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
  overflow: hidden;
  background-color: #fff;
  > img {
    float: left;
    width: 1.8rem;
    height: 1.8rem;
  }
  .loan-box {
    margin-left: 2rem;
    .loan-name {
      width: 98%;
      font-size: 16px;
      color: #333333;
      text-align: left;
      line-height: 0.5rem;
      font-weight: bold;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }
    .loan-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 14px;
      line-height: 1.2;
      margin: 0.2rem 0;
      color: #888888;
      .loan-left {
        text-align: left;
      }
      .loan-right {
        text-align: right;
        span {
          color: #ff983f;
        }
      }
    }
    .icons {
      text-align: left;
      font: initial;
      height: 0.4rem;
      img {
        height: 100%;
      }
    }
  }
}
</style>
