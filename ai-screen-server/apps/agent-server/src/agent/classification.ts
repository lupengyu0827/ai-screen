import { z } from 'zod'
import { SystemMessage } from '@langchain/core/messages'
import { createChatModel } from '../ai/model.js'
import { getLastUserMessage } from '../utils/index.js'

export const ClassificationSchema = z.object({
  task: z
    .enum(['message', 'page', 'edit'])
    .describe(
      '识别用户意图的任务分类，message = 普通问答，page = 创建页面，edit = 修改页面'
    ),
})

// 根据用户输入的内容，对用户意图进行分类，返回对应的任务分类
export async function classifyTask(state) {
  const chatModel = createChatModel({
    disableStreaming: true,
  })

  const model = chatModel.withStructuredOutput(ClassificationSchema, {
    name: 'task_classification',
    method: 'jsonSchema',
  })

  const response = await model.invoke(
    [
      new SystemMessage(`
        你是一个 AI 大屏设计器助手，根据用户提示词进行意图识别。
        分类结果只能是 message、page、edit：
        - message：普通问答，尤其是询问当前页面、节点或数据源事实。用户只是想问一些问题，或者获取一些信息
        - page：创建一个完整页面或大屏。用户想使用一句话或者一段综合的描述，直接生成一个大屏。
        - edit：修改当前页面。用户想修改当前页面的配置，或者调整一些组件的属性，或者新增一个节点。
      `),
      getLastUserMessage(state.messages),
    ],
    {
      tags: ['nostream'],
    }
  )

  const { task } = response

  return {
    classification: {
      task,
    },
  }
}
