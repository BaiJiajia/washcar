<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>
<script>

import AMap from 'AMap'
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
    }
}
</script>
<style lang="less">
.map,#map{
    width: 100%;
    height: 100%;
}
</style>

