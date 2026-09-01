// 图标物料

import ChartMaterial from './component.vue'
import MapMaterial from './mapComponent.vue'
import WordCloudComponent from './wordCloudComponent.vue'
import { barMaterial } from './bar'
import { areaMaterial } from './area'
import { lineMaterial } from './line'
import { pieMaterial } from './pie'
import { radarMaterial } from './radar'
import { gaugeMaterial } from './gauge'
import { scatterMaterial } from './scatter'
import { funnelMaterial } from './funnel'
import { ringMaterial } from './ring'
import { roseMaterial } from './rose'
import { waterPoloMaterial } from './waterPolo'
import { wordCloudMaterial } from './wordCloud'
import { mapMaterial } from './map'

const chartsMaterials = [
  barMaterial,
  areaMaterial,
  lineMaterial,
  pieMaterial,
  ringMaterial,
  roseMaterial,
  radarMaterial,
  gaugeMaterial,
  scatterMaterial,
  funnelMaterial,
  waterPoloMaterial,
  wordCloudMaterial,
  mapMaterial,
]

export function install(register) {
  chartsMaterials.forEach((material) => {
    // 地图/词云使用独立渲染组件；其余图表统一 ChartMaterial
    const type = material.schema.type
    const component = type === 'map-chart' ? MapMaterial : type === 'word-cloud' ? WordCloudComponent : ChartMaterial
    register(material, component)
  })
}
