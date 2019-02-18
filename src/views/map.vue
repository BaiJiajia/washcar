<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>
<script>

import AMap from 'AMap'
import { debug } from 'util';
export default {
    data () {
        return {
             map: null,
            /* 当前位置 */
            thisPosition: {
                location: '',
                lng: '',
                lat: ''
            },
            driving:null
        }
    },
    components:{
    },
    mounted(){
        this.map = new AMap.Map('map', {
            resizeEnable: true,
            zoom: 15,
            viewMode: '2D',
            zooms: [4, 18]
        })
        //构造路线导航类
        debugger
        this.driving = new AMap.Driving({
            map: this.map,
            panel: "panel"
        }); 
         // 根据起终点经纬度规划驾车导航路线
        this.driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function(status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
                log.success('绘制驾车路线完成')
            } else {
                log.error('获取驾车数据失败：' + result)
            }
        });
    }
}
</script>
<style lang="less">
.map,#map{
    width: 100%;
    height: 700px;
}
</style>

