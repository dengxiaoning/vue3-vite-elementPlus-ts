<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import { onMounted, onUnmounted, defineComponent } from 'vue'
import * as Cesium from 'cesium'
// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token from your ion account
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYzllNDhmYS1kNzE1LTRhOWUtOWIzZS1kMmU4ODhiNGQ2NTEiLCJpZCI6MTIxODIsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjA0OTQ5ODZ9.VJPGTRjjplXV5xPgr6AFOjIN6xy-ymdxoZDsPWc2T0Q'
let buildingTileset
export default defineComponent({
  name: 'v3dpage',
  setup() {
    initCesiumVisual()
    onUnmounted(() => {
      buildingTileset = null
    })
    return {}
  },
})
function initCesiumVisual() {
  onMounted(() => {
    // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false, //动画控件
      timeline: false, //时间线
      fullscreenButton: false, // 全屏按钮
      geocoder: false, //地名查找（依赖google服务）
      homeButton: false, //重置到初始焦点与缩放
      selectionIndicator: false, //
      shadow: true,
      sceneMode: Cesium.SceneMode.SCENE3D,
      infoBox: false, //消息框
      sceneModePicker: false, //场景模式选择
      navigationHelpButton: false, //导航帮助按钮
      projectionPicker: false, //投影方式选择（3D、2D、Columbus）
      baseLayerPicker: false,
      shouldAnimate: true,
      navigation: false,
      showRenderLoopErrors: false,
      terrainProvider: Cesium.createWorldTerrain(),
    })
    //去除版权信息
    viewer._cesiumWidget._creditContainer.style.display = "none";
    viewer.scene.globe.depthTestAgainstTerrain = true; //解决地形遮挡entity问题

    var tileset = new Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(125737),
    });
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