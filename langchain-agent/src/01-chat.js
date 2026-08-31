import { config } from 'dotenv'
import { input } from '@inquirer/prompts'

import { createModel } from './utils/index'

// 加载环境变量
config()

const chartModel = createModel()

console.log(result.content) // 看到模型叽里呱啦的输出
