<template>
    <div>
        <section>
            <h3>오시는길</h3>
            <div class="content">    
            </div>
            <div class="map"
            ref="MapContainer"
            />
            <div class="content">
                대전(약 3시간 30분소요)
                대전IC - 경부고속도로 - 당진영덕 고속도로 - 상주IC - 동청송영양TG - 자연생태공원 관리사업소
                <br>
                부산 (약 3시간 30분)
                경부고속도로 포항IC 울진 방면 - 당진영덕 고속도로 - 영양IC - 자연생태공원 관리사업소
            </div>
        </section>
    </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import leaflet from 'leaflet'
export default {
    name: 'Map',
    components: {
    },
    data() {
        return {
            mapContainer: null,
            tileLayer: null,
            center: [36.8295004, 129.2665538],
            mapUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom: 14,
            markPosition: [36.8295, 129.2665],
        }
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap (){
            this.mapContainer = leaflet.map(this.$refs.MapContainer, {
                center: this.center,
                zoom: this.zoom
            })
            this.tileLayer = leaflet.tileLayer(
                this.mapUrl, {
                    maxZoom: 16
                }
            )
            this.tileLayer.addTo(this.mapContainer)
            let placeIcon = leaflet.icon({
                iconUrl: require('@/assets/image/place.png'),
                iconSize: [50, 40],
                iconAnchor: [10, 10],
                popupAnchor: [14, 0]
            })
            leaflet.marker(this.markPosition, {icon: placeIcon}).bindPopup('밤하늘 공원 <br> 경상북도 영양군 수비면 반딧불이로 50' ).openPopup().addTo(this.mapContainer)
        }
    }
}
</script>

<style scoped>
  .map {
      width: 80%;
      height: 500px;
      margin: 0 auto;
  }
</style>