import { Map, View } from 'ol'
import { fromLonLat } from 'ol/proj.js'
import { OverviewMap, defaults as defaultControls } from 'ol/control.js'

import BaseLayerClass from './BaseLayerClass'
import ServiceClass from './ServiceClass'

export default class MapClass {
  map: Map
  view: View
  baseLayer: BaseLayerClass
  overviewLayer!: BaseLayerClass
  serviceClass: ServiceClass

  constructor() {
    this.baseLayer = new BaseLayerClass()
    this.baseLayer.addBaseLayerOptions()

    // 创建视图
    this.view = new View({
      center: fromLonLat([114.418, 30.466]),
      zoom: 10,
    })
    // 创建地图
    this.map = new Map({
      controls: defaultControls().extend([this._addOverviewMap()]),
      target: 'map',
      layers: this.baseLayer.layers,
      view: this.view,
    })

    this.serviceClass = new ServiceClass(this.map)
  }

  /**
   * @description: 添加鹰眼
   * @return {*}
   */
  _addOverviewMap() {
    this.overviewLayer = new BaseLayerClass()
    const overviewMapControl = new OverviewMap({
      layers: this.overviewLayer.layers,
    })
    return overviewMapControl
  }
}
