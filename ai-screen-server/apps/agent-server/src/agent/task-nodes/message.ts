import { SystemMessage, HumanMessage } from '@langchain/core/messages'
import { createChatModel } from '../../ai/model.js'

export const handleMessageTask = async state => {
  const model = createChatModel()
  const { page, selectedNodeIds, messages, schema } = state

  const { nodes, canvas } = page
  const { material, canvas: canvasSchema } = schema
  const _messages = [...messages]
  // 注意，这里取出最后一条消息，是因为我们需要组装提示词
  const lastMessage = _messages.pop()

  const result = await model.invoke([
    new SystemMessage('你是一个 AI 大屏设计器助手，根据用户提供的消息进行回答'),
    ..._messages,
    new HumanMessage(`
    用户问题：${lastMessage.text}

    以下内容是编辑器的状态：

    ${JSON.stringify({ nodes, selectedNodeIds, canvas }, null, 2)}

    其中：
    - nodes：当前页面的全部节点。
    - selectedNodeIds：用户当前选中的节点，是 nodes 的子集。
    - canvas：当前画布的状态。

    以下是canvas画布的 schema定义：
    ${JSON.stringify(canvasSchema, null, 2)}
    以下是所有可用的物料的 schema定义：
    ${JSON.stringify(material, null, 2)}
  `),
  ])

  return {
    // 注意，这个节点返回的 messages 会和 state.messages 自动合并，而不是覆盖。
    messages: result,
  }
}
