<template>
  <div class="about">
    <div class="imgbox"><img src="../assets/img/shop.jpg" alt=""></div>
    <div class="detailbox">
      <div class="infobox o_hidden border_b">
        <div class="f_left">
          <div class="shopname color_000">洗车店名称</div>
          <div class="shopaddress color_888">杭州市江干区城星路333号</div>
        </div>
        <div class="f_right guidebox">
          <img src="../assets/img/guide.jpg" alt="">
          <div class="distance color_888">0.9km</div>
        </div>
      </div>
      <div class="phone border_b o_hidden">
        <img class="f_left" src="../assets/img/phone.jpg" alt="">
        <div class="color_000 f_left">13243333333</div>
        
        <x-icon class="f_right" type="ios-arrow-forward" size="20"></x-icon>
      </div>
      <div class="icons o_hidden border_b">
        <img class="f_left" src="../assets/img/shopicon.jpg" alt="">
        <div class="f_left">
          <img src="../assets/img/icon1.jpg" alt="">
          <img src="../assets/img/car.jpg" alt="">  
        </div>
        
      </div>
      <div class="serves">
        <div class="color_000">服务内容</div>
        <div class="o_hidden">
          <div class="f_left color_888">洗车</div><div class="f_left color_888">打蜡</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components:{
  }
}
</script>
<style lang="less">
.imgbox{
  height: 6rem;
  width: 100%;
  img{
    width: 100%;
    height: 100%;
  }
}
.detailbox{
  font-size: 14px;
  .infobox{
    padding: 20px 12px;
    .shopname{
      font-size: 18px;
      margin-bottom: 14px;
    }
    .guidebox{
      text-align: center;
      border-left: 1px solid #f1f1f1;
      padding-left: 12px;
      img{
        width: 16px;
        height: 16px;
      }
      div{
        margin-top: 12px;
      }
    }
  }
  .phone{
    padding: 12px;
    img{
      width: 16px;
      height:16px;
    }
    div{
      line-height: 16px;
      margin-left: 20px;
    }
  }
  .icons{
    padding:12px;
    margin-bottom: 10px;
    >img{
      width: 16px;
      height:16px;

    }
    div{
      margin-left: 20px;
      img{
        width: 22px;
        height: 22px;
      }
    }
  }
}
.o_hidden{
  overflow: hidden;
}
.f_left{
  float: left;
}
.f_right{
  float: right;
}
.color_888{
  color: #888888;
}
.color_000{
  color:#000000;
}
.border_b{
  border-bottom: 1px solid #f1f1f1;
}
</style>

