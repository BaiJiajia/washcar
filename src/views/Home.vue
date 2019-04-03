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
    <div class="list-wrapper" ref="scroll" v-show="isActive">
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
                {{ shop.address }}
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
              <span class="name">{{formatProvider(shop.channelId)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nActive" v-show="!isActive">
      <h3>该地区不可用</h3>
    </div>
    <div class="nActive" v-show="emptyData">
      <h3>该地区暂无店铺，请换个地区试试</h3>
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
      emptyData: false,
      searchKey: "",
      page: 1,
      isActive: false,
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
          defaultIndex: 0,
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
          defaultIndex: 0,
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
      pageSize: 300,
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
        picker.setSlotValues(1, Object.keys(this.cityList[values[0]]));
        picker.setSlotValues(
          2,
          this.setIgnore(this.cityList[values[0]][values[1]])
        );
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
        if(values[2]) {
          this.isActive = true
        }
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
          this.nChannel.push(this.formatProvider(i.slice(1)));
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
        this.emptyData = false;
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
        channelId: this.formatProvider(this.provider)
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
          if(!res.records.length) {
            this.emptyData = true
          }
          this.shopList = this.sortByDistance(res.records);
        }
      });
    },
    sortByDistance(arr) {
      return arr.sort((a, b) => {
        return this.getFlatternDistance(this.point.lat, this.point.lng, a.lat, a.lng) - this.getFlatternDistance(this.point.lat, this.point.lng, b.lat, b.lng)
      })
    },
    getRad(d) {
      var PI = Math.PI;
      return (d * PI) / 180.0;
    },
    formatCity(cityJSON) {
      let cityArr = {}
      for(let i of Object.keys(cityJSON)) {
        if(i[0] !== "*") {
          cityArr[i] = {}
          for(let j of Object.keys(cityJSON[i])) {
            if(j[0] !== "*") {
              cityArr[i][j] = cityJSON[i][j]
            }
          }
        }
      }
     return cityArr
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
    },
    formatProvider(data) {
      switch (data) {
        case "全部":
          return "";
        case "车点点":
          return "CDD";
        case "盛大":
          return "sd";
        case "小兔子":
          return "SJHT";
        case "SJHT":
          return "小兔子";
        case "sd":
          return "盛大";
        case "CDD":
          return "车点点";
        default:
          return "";
      }
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
        this.isActive = false
        for (let i in Object.keys(this.cityList)) {
          if (Object.keys(this.cityList)[i] === this.province) {
            for (let j in Object.keys(this.cityList[this.province])) {
              if (Object.keys(this.cityList[this.province])[j] === this.city) {
                let districtArr = this.setIgnore(
                  this.cityList[this.province][this.city]
                );
                for (let k in districtArr) {
                  if (districtArr[k] === this.district) {
                    this.isActive = true
                    this.myAddressSlots[0].defaultIndex = +i;
                    this.myAddressSlots[2].defaultIndex = +j;
                    this.myAddressSlots[4].defaultIndex = +k;
                  }
                }
              }
            }
          }
        }
        if(this.isActive) {
          this.getDate();
        }
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
      this.cityList = this.formatCity(data.data)
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
    font-size: 14px;
  }
}
.nActive {
  position: absolute;
  top: 20%;
  left: 0;
  height: 60%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.home {
  width: 100%;
  height: 100%;
  .select {
    width: 100%;
    height: 38px;
    line-height: 38px;
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
    width: 5px;
    height: 5px;
    display: inline-block;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      border-width: 1px 1px 0 0;
      border-color: #575757;
      border-style: solid;
      transform: rotate(135deg);
      transform-origin: 5px 1px;
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
      height: 38px;
      line-height: 38px;
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
  height: calc(100% - 54px - 38px);
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
    width: 68px;
    height: 68px;
  }
  .loan-box {
    margin-left: 75px;
    .loan-name {
      width: 98%;
      font-size: 16px;
      color: #333333;
      text-align: left;
      line-height: 18px;
      font-weight: bold;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      span {
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .loan-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 14px;
      line-height: 1.2;
      margin: 7.5px 0;
      color: #888888;
      .loan-left {
        text-align: left;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
      height: 15px;
      img {
        height: 100%;
        vertical-align: middle
      }
      .name {
        vertical-align: middle;
        font-size: 14px;
        color: #575757
      }
    }
  }
}
</style>
