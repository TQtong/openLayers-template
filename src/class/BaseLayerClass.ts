import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import XYZ from 'ol/source/XYZ'
import { BaseLayerEnum } from '../enums/MapConfigEnum'
import { useBaseMapStore } from '../stores/baseMap'
import BingMaps from 'ol/source/BingMaps.js'

import type { Store } from 'pinia'

let baseMapStore: Store<'baseMapStore', any>

export default class BaseLayerClass {
  layers: TileLayer[]

  constructor() {
    this.layers = []
    baseMapStore = useBaseMapStore()
    this.addGaoDeNormal()
    this.addOSMNormal()
    this.addBingRoad()
    this.addBingRoadDark()
    this.addBingAerial()
    this.addBingAerialWithLabels()
  }

  /**
   * @description: 添加高德矢量地图
   * @return {*}
   */
  private addGaoDeNormal() {
    const layer = new TileLayer({
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
      }),
    })
    this.layers.push(layer)
  }

  /**
   * @description: 添加OSM地图
   * @return {*}
   */
  private addOSMNormal() {
    const layer = new TileLayer({
      visible: false,
      source: new OSM(),
    })
    this.layers.push(layer)
  }

  /**
   * @description: 添加Bing路网地图
   * @return {*}
   */
  private addBingRoad() {
    const layer = new TileLayer({
      visible: false,
      preload: Infinity,
      source: new BingMaps({
        key: 'AoxpksnsMrcuA4DvoMx_aDvyCJbxL-6wBqH1RYUjZOUpFMhtt-IF1boIIbf4ad2V',
        imagerySet: 'RoadOnDemand',
      }),
    })
    this.layers.push(layer)
  }

  /**
   * @description: 添加Bing路网地图(Dark)
   * @return {*}
   */
  private addBingRoadDark() {
    const layer = new TileLayer({
      visible: false,
      preload: Infinity,
      source: new BingMaps({
        key: 'AoxpksnsMrcuA4DvoMx_aDvyCJbxL-6wBqH1RYUjZOUpFMhtt-IF1boIIbf4ad2V',
        imagerySet: 'CanvasDark',
      }),
    })
    this.layers.push(layer)
  }

  /**
   * @description: 添加Bing影像地图
   * @return {*}
   */
  private addBingAerial() {
    const layer = new TileLayer({
      visible: false,
      preload: Infinity,
      source: new BingMaps({
        key: 'AoxpksnsMrcuA4DvoMx_aDvyCJbxL-6wBqH1RYUjZOUpFMhtt-IF1boIIbf4ad2V',
        imagerySet: 'Aerial',
      }),
    })
    this.layers.push(layer)
  }

  /**
   * @description: 添加Bing影像地图(带注释)
   * @return {*}
   */
  private addBingAerialWithLabels() {
    const layer = new TileLayer({
      visible: false,
      preload: Infinity,
      source: new BingMaps({
        key: 'AoxpksnsMrcuA4DvoMx_aDvyCJbxL-6wBqH1RYUjZOUpFMhtt-IF1boIIbf4ad2V',
        imagerySet: 'AerialWithLabelsOnDemand',
      }),
    })
    this.layers.push(layer)
  }

  /**
   * @description: 添加底图的下拉选项
   * @return {*}
   */
  addBaseLayerOptions() {
    baseMapStore.setBaseLayers([
      BaseLayerEnum.GaoDeNormal,
      BaseLayerEnum.OSMNormal,
      BaseLayerEnum.BingRoad,
      BaseLayerEnum.BingRoadDark,
      BaseLayerEnum.BingAerial,
      BaseLayerEnum.BingAerialWithLabels,
    ])
  }
}
