import store from '../../store'
// import jsonp from 'jsonp'
// export default function getPosition() {
//     jsonp('https://apis.map.qq.com/ws/location/v1/ip?key=HXNBZ-22Z3G-AIQQS-IUM5J-NQQPO-N2BJA&output=jsonp', {}, (err, data) => {
//         store.commit('setPosition', data.result)
//     })
// }
var geolocation = new qq.maps.Geolocation("HXNBZ-22Z3G-AIQQS-IUM5J-NQQPO-N2BJA", "washcar");
geolocation.getLocation(res => {
    store.commit('setPosition', res)
}, err => {
    console.log(err)
}, {timeout: 9000});

// if (navigator.geolocation) {
//     var geolocation = new BMap.Geolocation();
//     geolocation.getCurrentPosition(function (r) {
//         if (this.getStatus() == BMAP_STATUS_SUCCESS) {
//             GetLocation(r.point.lng, r.point.lat);
//         }
//         else {
//             // alert('failed'+this.getStatus());
//         }
//     }, { enableHighAccuracy: true })

//     function GetLocation(lng, lat) {
//         var point = new BMap.Point(lng, lat);
//         var gc = new BMap.w();
//         gc.getLocation(point, function (rs) {
//         });
//     }
// }