// 图标物料

import ChartMaterial from './component.vue'
import { barMaterial } from './bar'
import { areaMaterial } from './area'
import { lineMaterial } from './line'
import { pieMaterial } from './pie'

const chartsMaterials = [barMaterial, areaMaterial, lineMaterial, pieMaterial]

export function install(register) {
  chartsMaterials.forEach((material) => {
    // 注册图表物料
    register(material, ChartMaterial)
  })
}
