<template>
  <div class="map">
    <div id="container"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
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
    computed:{
        ...mapState({
            point: store => {return store.point}
        })
    },
    methods: {
        drawMap() {
            this.map = new BMap.Map("container");   
            this.map.centerAndZoom(new BMap.Point(this.$route.query.lat, this.$route.query.lng), 11);  
            this.map.addControl(new BMap.NavigationControl());    
            this.map.addControl(new BMap.ScaleControl());    
            this.map.addControl(new BMap.OverviewMapControl());    
            this.map.addControl(new BMap.MapTypeControl());  
            var geolocation = new BMap.Geolocation();
            let _that = this
            if(this.point) {
                this.driving = new BMap.DrivingRoute(this.map, {renderOptions: {map: this.map, panel: "r-result", autoViewport: true}});
                let p1 = new BMap.Point(this.point.lng, this.point.lat)
                let p2 = new BMap.Point(this.$route.query.lng, this.$route.query.lat)
                this.driving.search(p1, p2);
            }
        }
    },
    activated() {
        this.drawMap()
    },
    watch:{
        point: {
            handler: function(newVal) {
                this.driving = new BMap.DrivingRoute(this.map, {renderOptions: {map: this.map, panel: "r-result", autoViewport: true}});
                let p1 = new BMap.Point(this.point.lng, this.point.lat)
                let p2 = new BMap.Point(this.$route.query.lng, this.$route.query.lat)
                this.driving.search(p1, p2);
            },
            deep: true,
        }
    }
}
</script>
<style lang="less">
.map,#container{
    width: 100%;
    height: 100%;
}
</style>

