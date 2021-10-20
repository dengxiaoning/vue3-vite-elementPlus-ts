<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import * as Cesium from 'cesium'
// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token from your ion account
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYzkwZWEwYy1mMmIwLTQwYjctOWJlOC00OWU4ZWU1YTZhOTkiLCJpZCI6MTIxODIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjA0OTUyNDN9.wagvw7GxUjxvHXO6m2jjX5Jh9lN0UyTJhNGEcSm2pgE'
let buildingTileset
export default {
  name: 'HelloWorld',
  setup() {
    initCesiumVisual()
    onUnmounted(() => {
      buildingTileset = null
    })
    return {}
  },
}
function initCesiumVisual() {
  onMounted(() => {
    // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain(),
    })
    // Add Cesium OSM Buildings, a global 3D buildings layer.
    buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings())
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      },
    })
  })
}
</script>
<style scoped>
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>