import store from '../../store'
if (navigator.geolocation) {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            GetLocation(r.point.lng, r.point.lat);
        }
        else {
            // alert('failed'+this.getStatus());
        }
    }, { enableHighAccuracy: true })

    function GetLocation(lng, lat) {
        var point = new BMap.Point(lng, lat);
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function (rs) {
            store.commit('setPosition', rs)
            // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
        });
    }
}