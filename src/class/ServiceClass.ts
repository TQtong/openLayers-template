import TileLayer from 'ol/layer/Tile.js'
import TileWMS from 'ol/source/TileWMS.js'

import WMTS from 'ol/source/WMTS.js'
import WMTSTileGrid from 'ol/tilegrid/WMTS.js'

import type { Map } from 'ol'

/**
 * @description: 自定义服务类
 */
export default class ServiceClass {
  _map: Map // 地图对象
  layer!: TileLayer // 图层对象

  constructor(map: Map) {
    this._map = map
  }

  /**
   * @description:  添加wms服务
   * @param {*} url 服务地址
   * @param {*} params 参数
   * @return {*}
   */
  addWMSService(url: string, params: object) {
    const wms = new TileWMS({
      url,
      params,
    })
    const layer = new TileLayer({
      source: wms,
    })
    this._map.addLayer(layer)
    this.layer = layer
  }

  addWMTService(params: any) {
    const wmts = new WMTS({
      url: params.url,
      layer: params.layer,
      matrixSet: params.matrixSet,
      format: params.format,
      projection: params.projection,
      style: params.style,
      wrapX: params.wrapX,
      tileGrid: new WMTSTileGrid({
        tileSize: params.tileSize,
        extent: params.extent,
        origin: params.origin,
        resolutions: params.resolutions,
        matrixIds: params.matrixIds,
      }),
    })
    const layer = new TileLayer({
      source: wmts,
      opacity: 1,
    })

    this._map.addLayer(layer)
    this.layer = layer
  }

  /**
   * @description: 移除服务
   * @return {*}
   */
  removeService() {
    this._map.removeLayer(this.layer)
  }
}
