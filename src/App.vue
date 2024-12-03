<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useBaseMapStore } from './stores/baseMap'

import MapClass from './class/MapClass'

const baseMapStore = useBaseMapStore()

const selectMap = ref()
interface IOption {
  value: string
  label: string
}
const options = ref<IOption[]>([])

let mapObj: MapClass

const handleChange = () => {
  // 地图
  mapObj.baseLayer.layers.forEach((layer, index) => {
    layer.setVisible(baseMapStore.getBaseLayers[index] === selectMap.value)
  })

  // 鹰眼地图
  mapObj.overviewLayer.layers.forEach((layer, index) => {
    layer.setVisible(baseMapStore.getBaseLayers[index] === selectMap.value)
  })
}

onMounted(() => {
  mapObj = new MapClass()
  const list = baseMapStore.getBaseLayers
  list.forEach((item) => {
    options.value.push({
      value: item,
      label: item,
    })
  })
  selectMap.value = list[0]
})
</script>

<template>
  <div id="openlayer-container">
    <div id="map"></div>
    <div class="custom-tool">
      <el-select v-model="selectMap" @change="handleChange" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#openlayer-container {
  position: relative;
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
  }
  .custom-tool {
    position: absolute;
    min-width: 160px;
    top: 80px;
    left: 10px;
    background-color: aqua;
  }
}
</style>
