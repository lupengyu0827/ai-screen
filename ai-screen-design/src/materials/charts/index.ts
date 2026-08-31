// 图标物料

import ChartMaterial from './component.vue'
import { barMaterial } from './bar'
import { areaMaterial } from './area'
import { lineMaterial } from './line'
import { pieMaterial } from './pie'
import { radarMaterial } from './radar'
import { gaugeMaterial } from './gauge'

const chartsMaterials = [
  barMaterial,
  areaMaterial,
  lineMaterial,
  pieMaterial,
  radarMaterial,
  gaugeMaterial,
]

export function install(register) {
  chartsMaterials.forEach((material) => {
    // 注册图表物料
    register(material, ChartMaterial)
  })
}
