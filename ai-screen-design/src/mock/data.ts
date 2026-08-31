import Mock from 'mockjs'

Mock.setup({
  timeout: '2000-3000',
})
Mock.mock(/\/api\/data/, 'get', (options) => {
  // GET取参数api?xxx= xxx
  const url = new URL(options.url, location.origin)
  const search = new URLSearchParams(url.search)
  const date = search.get('date')

  const data = Mock.mock({
    'list|12': [
      {
        'label|+1': [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月',
        ],
        'value|100-1000': 100,
        date: date || '2023-01-01',
      },
    ],
  })
  return data.list
})
