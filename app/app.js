const HISTORY_KEY = 'explore-history-v1'
const HISTORY_FILE = 'explore-history.json'
const FAVORITES_KEY = 'explore-favorites-v1'
const DISCOVERY_KEY = 'explore-discovery-v2'
const EXPORT_FILE = 'mosaic-explore-share.txt'
const MAX_HISTORY = 100
const MAX_FAVORITES = 12
const MAX_CARDS = 6
const MAX_DISCOVERY_BATCHES = 3
const MAX_SEEN_DISCOVERY_TOPICS = 120
const DISCOVERY_REFRESH_INTERVAL = 30 * 60 * 1000
const DISCOVERY_COUNTS = { featured: 4, fresh: 6, whatIf: 5, connections: 5 }

const translations = {
  zh: {
    name: '万象探索',
    shortName: '万象',
    tagline: '从一个问题出发，发现知识里的意外分支',
    search: '探索',
    placeholder: '输入一个想探索的问题或主题',
    homeDisclaimer: '内容由 AI 基于已有知识生成，不代表实时信息。',
    favorites: '我的收藏',
    recent: '最近探索',
    clear: '清除',
    suggestionsAria: '推荐探索主题',
    backHome: '返回首页',
    discovery: '探索',
    discoveryMore: '探索更多',
    discoveryTitle: '今天想探索什么？',
    discoveryDescription: '从熟悉的世界拐个弯，看看知识还能通向哪里。',
    discoveryFrequency: '每半小时更新',
    discoveryBrowse: '浏览分类',
    discoveryRefreshHint: '先显示已有内容，后台更新完成后会在下次进入时展示。',
    discoveryFeatured: '本期焦点',
    discoveryFresh: '新鲜发现',
    discoveryWhatIf: '脑洞实验室',
    discoveryConnections: '意外连接',
    discoveryDisclaimer: '内容由 AI 基于已有知识生成，不代表实时信息。',
    discoveryTopicAction: (title) => `探索：${title}`,
    cacheFound: '已显示上次保存的结果，不会消耗 AI。',
    keepCached: '继续查看',
    regenerate: '重新生成',
    thinking: '正在生成答案与探索卡片…',
    cardsPending: '答案已生成，正在准备探索卡片和趣味知识…',
    cardsFailed: '探索内容暂时没有生成出来，直接答案仍然可以使用。',
    retryCards: '重试探索内容',
    cancel: '停止',
    searchFailed: '这次探索没有完成',
    retry: '重试',
    directAnswer: '直接答案',
    aiGenerated: 'AI 生成',
    answerDisclaimer: '内容基于模型已有知识。涉及新闻、价格或状态时，请进一步核实。',
    exploreCards: '探索卡片',
    exploreDescription: '选择一个方向继续深入，每次都会生成新的答案和分支。',
    facts: '你可能不知道',
    factsDescription: '三个容易被忽略、但值得记住的有趣细节。',
    related: '下一站',
    resultCount: (count) => `${count} 个方向`,
    generatedAt: (time) => `基于模型已有知识 · ${time}`,
    favorite: '收藏',
    favorited: '已收藏',
    exportResult: '导出分享',
    exporting: '正在导出…',
    exported: '探索结果已导出',
    exportCancelled: '已取消导出',
    exportPermissionDenied: '请在小程序详情页开启“导出文件”权限。',
    exportFailed: '导出失败，请稍后重试。',
    addedFavorite: '已加入收藏',
    removedFavorite: '已取消收藏',
    removeHistory: '删除这条历史',
    removeFavorite: '取消收藏',
    addFavorite: '加入收藏',
    historyDeleted: '已删除这条历史',
    historyCleared: '已清除历史记录',
    undo: '撤销',
    followUp: '继续追问',
    followUpDescription: 'AI 会结合当前答案理解你的下一步问题。',
    followUpPlaceholder: '例如：这和普通人的生活有什么关系？',
    sendFollowUp: '追问',
    shareAnswer: '直接答案',
    shareCards: '探索方向',
    shareFacts: '你可能不知道',
    shareFooter: '由万象探索基于 AI 已有知识生成，不代表实时信息。',
    exploreAction: (title) => `继续探索：${title}`,
    invalidQuery: '请输入想探索的内容。',
    noModel: '当前没有可用的 AI 模型，请先在 Cherry Studio 中配置默认模型。',
    invalidResponse: 'AI 没有返回可识别的探索内容，请重试或换一种问法。',
    cancelled: '探索已停止。',
    unavailable: 'AI 暂时不可用，请稍后重试。',
    rateLimited: '请求过于频繁，请稍后再试。',
    genericError: '探索失败，请稍后重试。',
    saveFailed: '保存失败，本次内容可能不会保留。',
    categoryLabels: {
      science: '科学',
      history: '历史',
      culture: '文化',
      cosmos: '宇宙',
      'what-if': '脑洞',
      mind: '心理'
    },
    discoveryFallbackTopics: [
      {
        category: 'science',
        title: '为什么周末补觉越睡越累，“睡眠债”真的能一次还清吗？',
        summary: '睡眠时长、作息节律和刚醒时的迟钝感，其实是三个不同的问题。'
      },
      {
        category: 'history',
        title: '古代没有冰箱，皇宫夏天用的冰从哪里来，普通人吃得到吗？',
        summary: '从冬季藏冰到民间冰食，一块冰背后是一整套古代供应链。'
      },
      {
        category: 'culture',
        title: '为什么一些上映时被骂的电影，多年后反而会被重新评价？',
        summary: '作品没有改变，改变的可能是观众、时代语境和评价它的标准。'
      },
      {
        category: 'cosmos',
        title: '宇宙中几乎听不到声音，科幻电影里的爆炸声应该怎样理解？',
        summary: '真实物理与观影体验之间的取舍，比简单判断“对不对”更有意思。'
      },
      {
        category: 'what-if',
        title: '如果人类从此不需要睡觉，最先被改写的是工作制度还是家庭关系？',
        summary: '每天突然多出八小时，未必只意味着生产力提高。'
      },
      {
        category: 'science',
        title: '恐龙的叫声从未被录下，科学家凭什么推测它们如何发声？',
        summary: '化石、头骨结构和现存近亲，能把消失的声音拼回到什么程度？'
      },
      {
        category: 'culture',
        title: '同一段笑话翻译后不好笑了，幽默究竟丢在了哪里？',
        summary: '双关、节奏和共同经验，都会让笑点在跨语言时发生损耗。'
      },
      {
        category: 'mind',
        title: '魔术师明明没有遮住动作，为什么观众仍会“看不见”？',
        summary: '注意力并不是摄像机，大脑只会保留它认为重要的那部分现场。'
      },
      {
        category: 'science',
        title: '深海动物长得像“怪物”，是人类审美偏见还是环境真的更残酷？',
        summary: '黑暗、高压和稀缺食物，塑造了与陆地完全不同的生存答案。'
      },
      {
        category: 'culture',
        title: '游戏经常违反物理规律，为什么玩家反而觉得操作更“真实”？',
        summary: '可控、及时和符合预期，有时比严格模拟现实更能制造真实感。'
      },
      {
        category: 'history',
        title: '咖啡馆为什么曾成为思想、革命和商业信息的集散地？',
        summary: '一种饮料与一种公共空间结合后，意外改变了人们交换信息的方式。'
      },
      {
        category: 'mind',
        title: '如果梦能被完整录下来，人会更了解自己还是更容易误解自己？',
        summary: '梦境并不是内心的透明录像，记录下来也不等于能够正确解读。'
      },
      {
        category: 'cosmos',
        title: '火星看起来最像地球，为什么它可能仍不是最适合移居的星球？',
        summary: '熟悉的地貌容易让人忽略辐射、资源和长期生存成本。'
      },
      {
        category: 'mind',
        title: '一首歌只听几遍就会“洗脑”，大脑究竟记住了什么？',
        summary: '重复只是表面，旋律对预期的满足与打破才是记忆的抓手。'
      },
      {
        category: 'history',
        title: '没有天气预报的古人，哪些观天经验有效，哪些只是巧合？',
        summary: '长期经验里既有可验证的规律，也混杂着事后解释和选择性记忆。'
      },
      {
        category: 'cosmos',
        title: '时间旅行最难解决的不是技术，而是因果关系吗？',
        summary: '机器能否造出来是一回事，过去被改变后逻辑能否自洽是另一回事。'
      },
      {
        category: 'science',
        title: '城市看似远离自然，为什么反而成了某些野生动物的理想栖息地？',
        summary: '稳定食物、人造庇护所和较少天敌，让城市形成了新的生态位。'
      },
      {
        category: 'culture',
        title: '电影里的科学错误人人都知道，为什么创作者还在反复使用？',
        summary: '视觉冲击、叙事速度和观众习惯，常常比准确性更影响创作选择。'
      },
      {
        category: 'mind',
        title: '如果一个人永远不会遗忘，他会更聪明还是更痛苦？',
        summary: '遗忘不只是记忆失效，它也帮助大脑抽象规律并放下无关细节。'
      },
      {
        category: 'what-if',
        title: '如果动物拥有和人类相同的语言能力，法律首先要改哪一条？',
        summary: '能够表达意愿之后，权利、责任与所有权的边界都要重新划定。'
      }
    ],
    suggestions: [
      { category: 'science', query: '为什么天空是蓝色的？' },
      { category: 'history', query: '穿越到唐朝的一天' },
      { category: 'culture', query: '爵士乐为什么迷人？' },
      { category: 'cosmos', query: '黑洞里会发生什么？' },
      { category: 'what-if', query: '如果月球突然消失会怎样？' },
      { category: 'science', query: '恐龙真的会吼叫吗？' },
      { category: 'culture', query: '世界上最奇怪的节日' },
      { category: 'mind', query: '魔术师如何欺骗大脑？' },
      { category: 'science', query: '海底最不可思议的生物' },
      { category: 'culture', query: '电子游戏里的物理是真的吗？' },
      { category: 'history', query: '咖啡如何改变了世界？' },
      { category: 'mind', query: '梦为什么那么离奇？' },
      { category: 'cosmos', query: '人类能住在火星吗？' },
      { category: 'mind', query: '一首歌为什么会洗脑？' },
      { category: 'history', query: '古人如何预测天气？' },
      { category: 'cosmos', query: '时间旅行有哪些悖论？' },
      { category: 'science', query: '城市里藏着哪些野生动物？' },
      { category: 'culture', query: '电影里最常见的科学误区' },
      { category: 'mind', query: '为什么我们会觉得时间变快？' },
      { category: 'what-if', query: '如果动物也建立城市' }
    ],
    systemLanguage: 'Simplified Chinese'
  },
  en: {
    name: 'Mosaic Explore',
    shortName: 'Mosaic',
    tagline: 'Start with one question and discover unexpected paths',
    search: 'Explore',
    placeholder: 'Enter a question or topic to explore',
    homeDisclaimer: 'Content comes from existing AI knowledge and is not real-time.',
    favorites: 'Favorites',
    recent: 'Recent explorations',
    clear: 'Clear',
    suggestionsAria: 'Suggested topics to explore',
    backHome: 'Back to home',
    discovery: 'Discover',
    discoveryMore: 'Discover more',
    discoveryTitle: 'What will you discover today?',
    discoveryDescription: 'Take a turn away from the familiar and see where knowledge leads.',
    discoveryFrequency: 'Updated every 30 minutes',
    discoveryBrowse: 'Browse sections',
    discoveryRefreshHint: 'Existing topics appear first. New content is shown on your next visit after it refreshes.',
    discoveryFeatured: 'In focus',
    discoveryFresh: 'Fresh discoveries',
    discoveryWhatIf: 'What-if lab',
    discoveryConnections: 'Unexpected connections',
    discoveryDisclaimer: 'Content comes from existing AI knowledge and is not real-time.',
    discoveryTopicAction: (title) => `Explore: ${title}`,
    cacheFound: 'Showing the saved result without using AI.',
    keepCached: 'Keep viewing',
    regenerate: 'Regenerate',
    thinking: 'Creating an answer and exploration cards…',
    cardsPending: 'The answer is ready. Preparing cards and surprising facts…',
    cardsFailed: 'Exploration content could not be generated. The direct answer is still available.',
    retryCards: 'Retry exploration content',
    cancel: 'Stop',
    searchFailed: 'This exploration could not be completed',
    retry: 'Retry',
    directAnswer: 'Direct answer',
    aiGenerated: 'AI generated',
    answerDisclaimer: 'Content comes from existing model knowledge. Verify news, prices, and changing facts.',
    exploreCards: 'Exploration cards',
    exploreDescription: 'Choose a path to go deeper and generate a fresh answer with new branches.',
    facts: 'You might not know',
    factsDescription: 'Three overlooked details worth remembering.',
    related: 'Where next?',
    resultCount: (count) => `${count} path${count === 1 ? '' : 's'}`,
    generatedAt: (time) => `Based on existing model knowledge · ${time}`,
    favorite: 'Favorite',
    favorited: 'Favorited',
    exportResult: 'Export to share',
    exporting: 'Exporting…',
    exported: 'Exploration exported',
    exportCancelled: 'Export cancelled',
    exportPermissionDenied: 'Enable the Export files permission in the MiniApp details.',
    exportFailed: 'Export failed. Please try again.',
    addedFavorite: 'Added to favorites',
    removedFavorite: 'Removed from favorites',
    removeHistory: 'Delete this history item',
    removeFavorite: 'Remove from favorites',
    addFavorite: 'Add to favorites',
    historyDeleted: 'History item deleted',
    historyCleared: 'History cleared',
    undo: 'Undo',
    followUp: 'Ask a follow-up',
    followUpDescription: 'AI will use the current answer to understand your next question.',
    followUpPlaceholder: 'For example: How does this affect everyday life?',
    sendFollowUp: 'Ask',
    shareAnswer: 'Direct answer',
    shareCards: 'Exploration paths',
    shareFacts: 'You might not know',
    shareFooter: 'Generated by Mosaic Explore from existing AI knowledge. This is not real-time information.',
    exploreAction: (title) => `Explore: ${title}`,
    invalidQuery: 'Enter something to explore.',
    noModel: 'No AI model is available. Configure a default model in Cherry Studio first.',
    invalidResponse: 'The AI did not return recognizable exploration content. Retry or ask differently.',
    cancelled: 'Exploration stopped.',
    unavailable: 'The AI is temporarily unavailable. Try again later.',
    rateLimited: 'Too many requests. Please wait and try again.',
    genericError: 'Exploration failed. Please try again later.',
    saveFailed: 'Saving failed. This exploration might not be retained.',
    categoryLabels: {
      science: 'Science',
      history: 'History',
      culture: 'Culture',
      cosmos: 'Cosmos',
      'what-if': 'What if',
      mind: 'Mind'
    },
    discoveryFallbackTopics: [
      {
        category: 'science',
        title: 'Why can sleeping late on weekends leave you more tired, and can sleep debt really be repaid at once?',
        summary: 'Sleep duration, body-clock timing, and grogginess after waking are three different problems.'
      },
      {
        category: 'history',
        title: 'Without refrigerators, where did imperial courts get summer ice, and could ordinary people afford it?',
        summary: 'From winter ice houses to street desserts, a block of ice depended on an entire ancient supply chain.'
      },
      {
        category: 'culture',
        title: 'Why are some films dismissed on release but reconsidered as classics years later?',
        summary: 'The work stays the same while its audience, historical context, and standards of judgment change.'
      },
      {
        category: 'cosmos',
        title: 'If space is almost silent, how should we think about explosions in science-fiction films?',
        summary: 'The trade-off between physical accuracy and cinematic experience is more interesting than a simple verdict.'
      },
      {
        category: 'what-if',
        title: 'If humans no longer needed sleep, would work or family life change first?',
        summary: 'Adding eight hours to every day would reshape much more than productivity.'
      },
      {
        category: 'science',
        title: 'No one recorded a dinosaur. How can scientists infer what one sounded like?',
        summary: 'Fossils, skull anatomy, and living relatives reveal how much of a vanished sound can be reconstructed.'
      },
      {
        category: 'culture',
        title: 'When a joke stops being funny after translation, where did the humor go?',
        summary: 'Wordplay, timing, and shared experience can all disappear when a joke crosses languages.'
      },
      {
        category: 'mind',
        title: 'A magician does not hide the move, so why do spectators still fail to see it?',
        summary: 'Attention is not a camera; the brain keeps only the parts it decides are important.'
      },
      {
        category: 'science',
        title: 'Do deep-sea animals look monstrous because of human bias, or because their environment is truly harsher?',
        summary: 'Darkness, pressure, and scarce food produce survival strategies unlike anything on land.'
      },
      {
        category: 'culture',
        title: 'Video games often break physics, so why can their controls feel more realistic?',
        summary: 'Control, responsiveness, and predictable feedback can feel more real than strict simulation.'
      },
      {
        category: 'history',
        title: 'Why did coffeehouses become hubs for ideas, revolutions, and commercial information?',
        summary: 'A drink combined with a public meeting place changed how people exchanged information.'
      },
      {
        category: 'mind',
        title: 'If dreams could be recorded perfectly, would we understand ourselves better or misread ourselves more?',
        summary: 'A dream is not a transparent recording of the mind, even when every detail can be replayed.'
      },
      {
        category: 'cosmos',
        title: 'Mars looks most like Earth, so why might it still be a poor place for human settlement?',
        summary: 'Familiar landscapes can distract from radiation, scarce resources, and long-term survival costs.'
      },
      {
        category: 'mind',
        title: 'When a song gets stuck after only a few plays, what exactly has the brain remembered?',
        summary: 'Repetition helps, but the real hook is how a melody satisfies and disrupts expectation.'
      },
      {
        category: 'history',
        title: 'Before forecasts, which signs of weather were useful and which were coincidence?',
        summary: 'Accumulated experience mixed testable patterns with hindsight and selective memory.'
      },
      {
        category: 'cosmos',
        title: 'Is causality a harder problem for time travel than the technology itself?',
        summary: 'Building a machine is one challenge; keeping logic consistent after changing the past is another.'
      },
      {
        category: 'science',
        title: 'Cities seem far from nature, so why are they ideal habitats for some wild animals?',
        summary: 'Reliable food, artificial shelter, and fewer predators create entirely new urban niches.'
      },
      {
        category: 'culture',
        title: 'If everyone knows the science in films is wrong, why do creators keep repeating the same errors?',
        summary: 'Visual impact, narrative speed, and audience expectations often outweigh accuracy.'
      },
      {
        category: 'mind',
        title: 'If a person could never forget anything, would they become smarter or suffer more?',
        summary: 'Forgetting is not merely failure; it helps the brain abstract patterns and release irrelevant detail.'
      },
      {
        category: 'what-if',
        title: 'If animals could speak like humans, which law would need to change first?',
        summary: 'Once animals can state their wishes, rights, responsibility, and ownership all need new boundaries.'
      }
    ],
    suggestions: [
      { category: 'science', query: 'Why is the sky blue?' },
      { category: 'history', query: 'A day in ancient Rome' },
      { category: 'culture', query: 'Why is jazz captivating?' },
      { category: 'cosmos', query: 'What happens inside a black hole?' },
      { category: 'what-if', query: 'What if the Moon suddenly vanished?' },
      { category: 'science', query: 'Did dinosaurs really roar?' },
      { category: 'culture', query: "The world's strangest festivals" },
      { category: 'mind', query: 'How do magicians fool the brain?' },
      { category: 'science', query: "The ocean's most unbelievable creatures" },
      { category: 'culture', query: 'Is video game physics realistic?' },
      { category: 'history', query: 'How did coffee change the world?' },
      { category: 'mind', query: 'Why are dreams so strange?' },
      { category: 'cosmos', query: 'Could humans live on Mars?' },
      { category: 'mind', query: 'Why do songs get stuck in your head?' },
      { category: 'history', query: 'How did ancient people predict weather?' },
      { category: 'cosmos', query: 'What are the paradoxes of time travel?' },
      { category: 'science', query: 'Which wild animals hide in cities?' },
      { category: 'culture', query: "Cinema's most common science myths" },
      { category: 'mind', query: 'Why does time seem to speed up?' },
      { category: 'what-if', query: 'What if animals built cities?' }
    ],
    systemLanguage: 'English'
  }
}

const state = {
  locale: 'zh-CN',
  history: [],
  favorites: [],
  discoveryBatches: [],
  seenDiscoveryTopics: [],
  discoveryLastAttempt: 0,
  discoveryBatch: null,
  discoveryScrollY: 0,
  currentView: 'home',
  resultReturnView: 'home',
  activeQuery: '',
  activeGeneration: null,
  activeCallIds: [],
  latest: null,
  toastTimer: null,
  suggestionOffset: null,
  exporting: false
}

const elements = {}
const iconMarkup = {
  arrowRight: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  arrowUpRight: '<path d="M8 16 16 8M9 8h7v7"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5v4.8l3.2 1.8"/>',
  compass: '<circle cx="12" cy="12" r="8"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z"/>',
  export: '<path d="M12 15V4m0 0L8 8m4-4 4 4M5 13v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/>',
  star: '<path d="m12 3.75 2.55 5.15 5.7.83-4.12 4.02.97 5.68L12 16.75 6.9 19.43l.97-5.68-4.12-4.02 5.7-.83L12 3.75Z"/>',
  x: '<path d="m8 8 8 8M16 8l-8 8"/>'
}

function languageKey(locale = state.locale) {
  return locale.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

function t(key, ...args) {
  const value = translations[languageKey()][key]
  return typeof value === 'function' ? value(...args) : value
}

function cacheElements() {
  for (const id of [
    'results-header',
    'brand-button',
    'discovery-header',
    'discovery-brand-button',
    'discovery-view',
    'discovery-featured',
    'discovery-fresh',
    'discovery-what-if',
    'discovery-connections',
    'home-view',
    'results-view',
    'home-input',
    'home-search',
    'results-input',
    'results-search',
    'suggestions',
    'favorites-section',
    'favorites-list',
    'history-section',
    'history-list',
    'clear-history',
    'status-line',
    'cache-notice',
    'keep-cached',
    'regenerate',
    'search-progress',
    'progress-message',
    'loading-view',
    'cancel-search',
    'error-view',
    'error-message',
    'retry-search',
    'result-content',
    'answer-text',
    'export-result',
    'favorite-toggle',
    'result-count',
    'cards-loading',
    'cards-error',
    'retry-cards',
    'explore-cards',
    'facts-section',
    'facts-list',
    'related-section',
    'related-queries',
    'follow-up-section',
    'follow-up-form',
    'follow-up-input',
    'toast',
    'toast-message',
    'toast-action'
  ]) {
    elements[id] = document.getElementById(id)
  }
}

function applyTranslations() {
  document.documentElement.lang = state.locale
  document.title = t('name')
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n)
  })
  document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
    node.setAttribute('aria-label', t(node.dataset.i18nAria))
    node.setAttribute('title', t(node.dataset.i18nAria))
  })
  elements['home-input'].placeholder = t('placeholder')
  elements['results-input'].placeholder = t('placeholder')
  elements.suggestions.setAttribute('aria-label', t('suggestionsAria'))
  elements['follow-up-input'].placeholder = t('followUpPlaceholder')
  renderExportButton()
  renderSuggestions()
  renderSavedLists()
  if (state.currentView === 'results' && state.latest) renderResult(state.latest)
  if (state.currentView === 'discovery' && state.discoveryBatch) renderDiscovery(state.discoveryBatch)
}

function createButton(className, text, onClick) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = className
  button.textContent = text
  button.addEventListener('click', onClick)
  return button
}

function createIcon(name, filled = false) {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  icon.setAttribute('viewBox', '0 0 24 24')
  icon.setAttribute('aria-hidden', 'true')
  icon.classList.add('ui-icon')
  if (filled) icon.classList.add('ui-icon-filled')
  icon.innerHTML = iconMarkup[name]
  return icon
}

function renderLabeledIconButton(button, iconName, label, filled = false) {
  const text = document.createElement('span')
  text.textContent = label
  button.replaceChildren(createIcon(iconName, filled), text)
}

function renderExportButton() {
  renderLabeledIconButton(elements['export-result'], 'export', t(state.exporting ? 'exporting' : 'exportResult'))
}

function queryKey(query) {
  return String(query).trim().toLowerCase()
}

function selectSuggestions(suggestions) {
  const explored = new Set(state.history.map((item) => queryKey(item.query)))
  const unseen = suggestions.filter((item) => !explored.has(queryKey(item.query)))
  const pool = unseen.length >= 5 ? unseen : suggestions
  const categories = [...new Set(pool.map((item) => item.category))]
  const selected = []

  for (let index = 0; index < categories.length && selected.length < 5; index += 1) {
    const category = categories[(state.suggestionOffset + index) % categories.length]
    const categoryItems = pool.filter((item) => item.category === category)
    selected.push(categoryItems[(state.suggestionOffset + index) % categoryItems.length])
  }

  for (let index = 0; selected.length < 5 && index < pool.length; index += 1) {
    const candidate = pool[(state.suggestionOffset + index) % pool.length]
    if (!selected.includes(candidate)) selected.push(candidate)
  }
  return selected
}

function renderSuggestions(refresh = false) {
  const suggestions = t('suggestions')
  if (state.suggestionOffset === null) state.suggestionOffset = Math.floor(Math.random() * suggestions.length)
  else if (refresh) state.suggestionOffset = (state.suggestionOffset + 1) % suggestions.length

  elements.suggestions.replaceChildren()
  for (const suggestion of selectSuggestions(suggestions)) {
    elements.suggestions.append(createButton('suggestion-chip', suggestion.query, () => runSearch(suggestion.query)))
  }
  const discoveryEntry = createButton('suggestion-chip discovery-entry', '', () => showDiscovery())
  discoveryEntry.setAttribute('aria-label', t('discoveryMore'))
  discoveryEntry.append(createIcon('compass'), document.createTextNode(t('discoveryMore')), createIcon('arrowRight'))
  elements.suggestions.append(discoveryEntry)
}

function formatHistoryTime(timestamp) {
  try {
    return new Intl.DateTimeFormat(state.locale, { month: 'numeric', day: 'numeric' }).format(timestamp)
  } catch {
    return ''
  }
}

function createHistoryAction(label, iconName, onClick, pressed, filled = false) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'history-action'
  button.append(createIcon(iconName, filled))
  button.setAttribute('aria-label', label)
  button.setAttribute('title', label)
  if (pressed !== undefined) button.setAttribute('aria-pressed', String(pressed))
  button.addEventListener('click', onClick)
  return button
}

function renderSavedItem(item, favorite = false, index = 0) {
  const row = document.createElement('div')
  row.className = 'history-row'

  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'history-item'

  const icon = document.createElement('span')
  icon.className = 'saved-icon'
  icon.append(createIcon(favorite ? 'star' : 'clock', favorite))
  icon.setAttribute('aria-hidden', 'true')

  const query = document.createElement('span')
  query.className = 'history-query'
  query.textContent = item.query

  const time = document.createElement('span')
  time.className = 'history-time'
  time.textContent = formatHistoryTime(item.timestamp)

  button.append(icon, query, time)
  button.addEventListener('click', () => showCachedResult(item))

  const actions = document.createElement('div')
  actions.className = 'history-actions'
  if (favorite) {
    actions.append(createHistoryAction(t('removeFavorite'), 'star', () => setFavorite(item, false), true, true))
  } else {
    const saved = isFavorite(item.query)
    actions.append(
      createHistoryAction(
        saved ? t('removeFavorite') : t('addFavorite'),
        'star',
        () => setFavorite(item, !saved),
        saved,
        saved
      ),
      createHistoryAction(t('removeHistory'), 'x', () => deleteHistoryItem(item, index))
    )
  }
  row.append(button, actions)
  return row
}

function renderSavedLists() {
  elements['favorites-list'].replaceChildren()
  elements['favorites-section'].hidden = state.favorites.length === 0
  state.favorites.forEach((item, index) => elements['favorites-list'].append(renderSavedItem(item, true, index)))

  elements['history-list'].replaceChildren()
  elements['history-section'].hidden = state.history.length === 0
  state.history.forEach((item, index) => elements['history-list'].append(renderSavedItem(item, false, index)))
}

function isDiscoveryTopic(value) {
  return (
    value &&
    typeof value.category === 'string' &&
    typeof value.title === 'string' &&
    typeof value.summary === 'string' &&
    typeof value.prompt === 'string'
  )
}

function isDiscoveryBatch(value) {
  return (
    value &&
    typeof value.timestamp === 'number' &&
    (value.locale === 'zh' || value.locale === 'en') &&
    value.sections &&
    Object.keys(DISCOVERY_COUNTS).every(
      (section) => Array.isArray(value.sections[section]) && value.sections[section].every(isDiscoveryTopic)
    )
  )
}

function parseDiscoveryState(value) {
  try {
    const parsed = value ? JSON.parse(value) : {}
    return {
      batches: Array.isArray(parsed.batches)
        ? parsed.batches.filter(isDiscoveryBatch).slice(0, MAX_DISCOVERY_BATCHES)
        : [],
      seenTopics: Array.isArray(parsed.seenTopics)
        ? parsed.seenTopics.filter((title) => typeof title === 'string').slice(0, MAX_SEEN_DISCOVERY_TOPICS)
        : [],
      lastAttempt: typeof parsed.lastAttempt === 'number' ? parsed.lastAttempt : 0
    }
  } catch {
    return { batches: [], seenTopics: [], lastAttempt: 0 }
  }
}

async function loadDiscoveryState() {
  try {
    const { value } = await cherry.storage.get(DISCOVERY_KEY)
    return parseDiscoveryState(value)
  } catch {
    return { batches: [], seenTopics: [], lastAttempt: 0 }
  }
}

function saveDiscoveryState() {
  return cherry.storage.set(
    DISCOVERY_KEY,
    JSON.stringify({
      batches: state.discoveryBatches,
      seenTopics: state.seenDiscoveryTopics,
      lastAttempt: state.discoveryLastAttempt
    })
  )
}

function latestDiscoveryBatch() {
  return state.discoveryBatches.find((batch) => batch.locale === languageKey())
}

function createFallbackDiscoveryBatch() {
  const topics = t('discoveryFallbackTopics')
  const labels = t('categoryLabels')
  const topic = (index) => {
    const candidate = topics[index]
    return {
      category: labels[candidate.category] || candidate.category,
      title: candidate.title,
      summary: candidate.summary,
      prompt: candidate.title
    }
  }
  const indexes = {
    featured: [3, 5, 8, 15],
    fresh: [0, 1, 6, 12, 14, 16],
    whatIf: [4, 11, 18, 19, 9],
    connections: [2, 7, 10, 13, 17]
  }
  return {
    timestamp: 0,
    locale: languageKey(),
    sections: Object.fromEntries(Object.entries(indexes).map(([section, values]) => [section, values.map(topic)]))
  }
}

function isStoredExploration(value) {
  return (
    value &&
    typeof value.query === 'string' &&
    typeof value.timestamp === 'number' &&
    value.data &&
    typeof value.data.answer === 'string' &&
    Array.isArray(value.data.cards) &&
    Array.isArray(value.data.facts) &&
    Array.isArray(value.data.relatedQueries)
  )
}

function migrateStoredExploration(value) {
  if (Array.isArray(value?.data?.facts) || !Array.isArray(value?.data?.quiz)) return value
  const facts = value.data.quiz
    .map((question) => ({
      title: normalizeText(question?.question, 120),
      detail: normalizeText(question?.explanation, 360)
    }))
    .filter((fact) => fact.title && fact.detail)
    .slice(0, 3)
  return { ...value, data: { ...value.data, facts } }
}

function parseCollection(value, limit) {
  const parsed = value ? JSON.parse(value) : []
  return Array.isArray(parsed) ? parsed.map(migrateStoredExploration).filter(isStoredExploration).slice(0, limit) : []
}

function encodeBase64(value) {
  const bytes = new TextEncoder().encode(value)
  const chunks = []
  for (let index = 0; index < bytes.length; index += 0x8000) {
    chunks.push(String.fromCharCode(...bytes.subarray(index, index + 0x8000)))
  }
  return btoa(chunks.join(''))
}

function decodeBase64(value) {
  return new TextDecoder().decode(Uint8Array.from(atob(value), (character) => character.charCodeAt(0)))
}

async function loadStorageCollection(key, limit) {
  try {
    const { value } = await cherry.storage.get(key)
    return parseCollection(value, limit)
  } catch {
    return []
  }
}

async function loadHistory() {
  try {
    const { data } = await cherry.file.load(HISTORY_FILE)
    if (data) return parseCollection(decodeBase64(data), MAX_HISTORY)
  } catch {
    // Fall through to the legacy storage key when the cache file is unavailable.
  }

  const legacy = await loadStorageCollection(HISTORY_KEY, MAX_HISTORY)
  if (legacy.length > 0) await Promise.allSettled([saveHistory(legacy)])
  return legacy
}

async function loadState() {
  const [history, favorites, discovery] = await Promise.all([
    loadHistory(),
    loadStorageCollection(FAVORITES_KEY, MAX_FAVORITES),
    loadDiscoveryState()
  ])
  state.history = history
  state.favorites = favorites
  state.discoveryBatches = discovery.batches
  state.seenDiscoveryTopics = discovery.seenTopics
  state.discoveryLastAttempt = discovery.lastAttempt
  state.discoveryBatch = latestDiscoveryBatch() || createFallbackDiscoveryBatch()
}

async function saveHistory(history = state.history) {
  await cherry.file.save(HISTORY_FILE, encodeBase64(JSON.stringify(history)))
}

async function saveWithFeedback(operation) {
  try {
    await operation()
  } catch {
    showToast(t('saveFailed'))
  }
}

function showHome(refreshSuggestions = true) {
  elements['results-header'].hidden = true
  elements['discovery-header'].hidden = true
  elements['results-view'].hidden = true
  elements['discovery-view'].hidden = true
  elements['home-view'].hidden = false
  elements['cache-notice'].hidden = true
  elements['home-input'].value = ''
  elements['results-input'].value = ''
  state.currentView = 'home'
  state.resultReturnView = 'home'
  if (refreshSuggestions) renderSuggestions(true)
  renderSavedLists()
  requestAnimationFrame(() => elements['home-input'].focus())
}

function showDiscovery(options = {}) {
  const restoreScroll = options.restoreScroll === true
  elements['results-header'].hidden = true
  elements['home-view'].hidden = true
  elements['results-view'].hidden = true
  elements['discovery-header'].hidden = false
  elements['discovery-view'].hidden = false
  state.currentView = 'discovery'
  state.discoveryBatch = latestDiscoveryBatch() || createFallbackDiscoveryBatch()
  renderDiscovery(state.discoveryBatch)
  window.scrollTo({ top: restoreScroll ? state.discoveryScrollY : 0, behavior: 'instant' })

  if (options.allowRefresh !== false) void refreshDiscoveryIfNeeded()
}

function showResultsShell(query) {
  elements['home-view'].hidden = true
  elements['discovery-header'].hidden = true
  elements['discovery-view'].hidden = true
  elements['results-header'].hidden = false
  elements['results-view'].hidden = false
  state.currentView = 'results'
  elements['home-input'].value = query
  elements['results-input'].value = query
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function showLoading(query) {
  showResultsShell(query)
  elements['status-line'].textContent = ''
  elements['cache-notice'].hidden = true
  elements['search-progress'].hidden = false
  elements['progress-message'].textContent = t('thinking')
  elements['loading-view'].hidden = false
  elements['error-view'].hidden = true
  elements['result-content'].hidden = true
}

function showError(message) {
  elements['search-progress'].hidden = true
  elements['loading-view'].hidden = true
  elements['result-content'].hidden = true
  elements['error-view'].hidden = false
  elements['error-message'].textContent = message
}

function showStreaming() {
  elements['loading-view'].hidden = true
  elements['error-view'].hidden = true
  elements['result-content'].hidden = false
  elements['answer-text'].replaceChildren()
  elements['favorite-toggle'].hidden = true
  elements['result-count'].textContent = ''
  elements['cards-loading'].hidden = false
  elements['cards-error'].hidden = true
  elements['explore-cards'].replaceChildren()
  elements['facts-section'].hidden = true
  elements['related-section'].hidden = true
  elements['follow-up-section'].hidden = true
}

function renderStreamingAnswer(answer) {
  let paragraph = elements['answer-text'].firstElementChild
  if (!paragraph) {
    paragraph = document.createElement('p')
    paragraph.className = 'streaming-answer'
    elements['answer-text'].append(paragraph)
  }
  paragraph.textContent = answer
}

function splitParagraphs(text) {
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function normalizeText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function parseJsonObject(raw) {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
  try {
    return JSON.parse(cleaned)
  } catch {
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start < 0 || end <= start) throw new Error('invalid-response')
    try {
      return JSON.parse(cleaned.slice(start, end + 1))
    } catch {
      throw new Error('invalid-response')
    }
  }
}

function normalizeDiscoveryTopic(candidate) {
  const category = normalizeText(candidate?.category, 24)
  const title = normalizeText(candidate?.title, 100)
  const summary = normalizeText(candidate?.summary, 260)
  const prompt = normalizeText(candidate?.prompt, 220)
  return category && title && summary && prompt ? { category, title, summary, prompt } : null
}

function normalizeDiscoveryResponse(raw, sectionCounts) {
  const parsed = parseJsonObject(raw)
  const sections = {}
  let topicCount = 0
  for (const [section, count] of Object.entries(sectionCounts)) {
    sections[section] = (Array.isArray(parsed[section]) ? parsed[section] : [])
      .map(normalizeDiscoveryTopic)
      .filter(Boolean)
      .slice(0, count)
    topicCount += sections[section].length
  }
  if (topicCount < 4) throw new Error('invalid-response')
  return sections
}

function mergeDiscoverySections(baseSections, generatedSections) {
  const fallbackSections = createFallbackDiscoveryBatch().sections
  const merged = {}
  const usedTitles = new Set()
  for (const [section, count] of Object.entries(DISCOVERY_COUNTS)) {
    const candidates = [
      ...(generatedSections[section] || []),
      ...(baseSections[section] || []),
      ...(fallbackSections[section] || [])
    ]
    merged[section] = []
    for (const topic of candidates) {
      const key = queryKey(topic.title)
      if (!key || usedTitles.has(key)) continue
      usedTitles.add(key)
      merged[section].push(topic)
      if (merged[section].length >= count) break
    }
  }
  return merged
}

function createDiscoveryPrompt(sectionCounts) {
  const shapes = Object.entries(sectionCounts)
    .map(([section]) => `"${section}":[{"category":"string","title":"string","summary":"string","prompt":"string"}]`)
    .join(',')
  const requirements = Object.entries(sectionCounts)
    .map(([section, count]) => `- ${section}: exactly ${count} topics.`)
    .join('\n')
  const visibleTopics = state.discoveryBatch
    ? Object.values(state.discoveryBatch.sections)
        .flat()
        .map((topic) => topic.title)
    : []
  const avoidedTopics = [
    ...visibleTopics,
    ...state.seenDiscoveryTopics.slice(0, 40),
    ...state.history.slice(0, 12).map((item) => item.query)
  ]
    .map((title) => normalizeText(title, 100))
    .filter(Boolean)
    .join(' | ')
  return [
    'You curate an entertaining discovery page for Mosaic Explore.',
    'Use stable knowledge only. Do not include news, current rankings, prices, or time-sensitive claims.',
    `Write all user-facing text in ${t('systemLanguage')}.`,
    'Return exactly one valid JSON object with no markdown or surrounding text.',
    `Use this exact shape: {${shapes}}`,
    requirements,
    'featured should feel important and memorable. fresh should span science, history, culture, nature, technology, and everyday life.',
    'whatIf should use plausible counterfactuals with concrete consequences. connections should reveal a surprising relationship between different fields.',
    'Write every title as a complete, self-contained question that a knowledgeable community would want to discuss.',
    'Start from a concrete observation, apparent contradiction, real trade-off, disputed claim, or familiar experience, then ask about its mechanism, boundary, consequence, or meaning.',
    'Favor questions that support multiple informed angles while still having a factual core. Make the tension clear inside the title instead of hiding it in the summary.',
    'Avoid bare topics and empty templates such as “What is interesting about…”, “What happens in…”, “Why is X fascinating?”, or vague lists of facts.',
    'Avoid sensational wording, invented premises, celebrity gossip, and more than three titles beginning with a hypothetical “What if”.',
    'Do not mention, imitate, or copy questions from any website or community.',
    'summary must be one specific sentence that explains why the question is worth answering; never use generic invitations to explore.',
    'Every prompt must be a self-contained question suitable for a detailed AI answer.',
    'Do not repeat or lightly rephrase topics within the response.',
    avoidedTopics ? `Avoid these recently shown or explored topics and close variations: ${avoidedTopics}` : ''
  ]
    .filter(Boolean)
    .join('\n')
}

async function requestDiscoverySections(sectionCounts, callId) {
  let response = ''
  await cherry.ai.chat(
    {
      model: 'default',
      reasoning: 'off',
      messages: [
        { role: 'system', content: createDiscoveryPrompt(sectionCounts) },
        { role: 'user', content: 'Generate a fresh collection now.' }
      ]
    },
    { callId, onChunk: (chunk) => (response += chunk) }
  )
  return normalizeDiscoveryResponse(response, sectionCounts)
}

async function refreshDiscoveryIfNeeded() {
  const latest = latestDiscoveryBatch()
  const lastRefresh = Math.max(latest?.timestamp || 0, state.discoveryLastAttempt)
  if (state.activeGeneration || Date.now() - lastRefresh < DISCOVERY_REFRESH_INTERVAL) return

  const generation = `discovery-${Date.now().toString(36)}`
  state.activeGeneration = generation
  state.discoveryLastAttempt = Date.now()

  try {
    await saveWithFeedback(saveDiscoveryState)
    const capabilities = await cherry.ai.getCapabilities({ model: 'default' })
    if (state.activeGeneration !== generation) return
    if (!capabilities.available) return

    const primaryCallId = `${generation}-primary`
    const playfulCallId = `${generation}-playful`
    state.activeCallIds = [primaryCallId, playfulCallId]
    const primaryRequest = requestDiscoverySections({ featured: 4, fresh: 6 }, primaryCallId)
    const playfulRequest = requestDiscoverySections({ whatIf: 5, connections: 5 }, playfulCallId)
    const results = await Promise.allSettled([primaryRequest, playfulRequest])
    if (state.activeGeneration !== generation) return

    const generatedSections = {}
    for (const result of results) {
      if (result.status === 'fulfilled') Object.assign(generatedSections, result.value)
    }
    if (Object.keys(generatedSections).length === 0) return

    const base = latest || state.discoveryBatch || createFallbackDiscoveryBatch()
    const batch = {
      timestamp: Date.now(),
      locale: languageKey(),
      sections: mergeDiscoverySections(base.sections, generatedSections)
    }
    const freshTitles = Object.values(batch.sections)
      .flat()
      .map((topic) => topic.title)
    state.discoveryBatches = [
      batch,
      ...state.discoveryBatches.filter(
        (candidate) => candidate.locale !== batch.locale || candidate.timestamp !== batch.timestamp
      )
    ].slice(0, MAX_DISCOVERY_BATCHES)
    state.seenDiscoveryTopics = [
      ...freshTitles,
      ...state.seenDiscoveryTopics.filter((title) => !freshTitles.some((freshTitle) => queryKey(freshTitle) === queryKey(title)))
    ].slice(0, MAX_SEEN_DISCOVERY_TOPICS)
    await saveWithFeedback(saveDiscoveryState)
  } catch {
    // Keep the existing discovery collection when a silent refresh fails.
  } finally {
    if (state.activeGeneration === generation) {
      state.activeGeneration = null
      state.activeCallIds = []
    }
  }
}

function normalizeStructured(value) {
  const cards = []
  for (const candidate of Array.isArray(value.cards) ? value.cards : []) {
    const category = normalizeText(candidate?.category, 24)
    const title = normalizeText(candidate?.title, 100)
    const summary = normalizeText(candidate?.summary, 320)
    const prompt = normalizeText(candidate?.prompt, 220)
    if (!category || !title || !summary || !prompt) continue
    cards.push({ category, title, summary, prompt })
    if (cards.length >= MAX_CARDS) break
  }

  const facts = []
  for (const candidate of Array.isArray(value.facts) ? value.facts : []) {
    const title = normalizeText(candidate?.title, 120)
    const detail = normalizeText(candidate?.detail, 360)
    if (!title || !detail) continue
    facts.push({ title, detail })
    if (facts.length >= 3) break
  }

  const relatedQueries = (Array.isArray(value.relatedQueries) ? value.relatedQueries : [])
    .map((query) => normalizeText(query, 160))
    .filter(Boolean)
    .slice(0, 5)

  if (cards.length < 3) throw new Error('invalid-response')
  return { cards, facts, relatedQueries }
}

function parseStructuredResponse(raw) {
  try {
    return normalizeStructured(parseJsonObject(raw))
  } catch (error) {
    if (error?.message === 'invalid-response') throw error
    throw new Error('invalid-response')
  }
}

function createAnswerPrompt(query) {
  return [
    'You write the direct answer for Mosaic Explore.',
    'You do not have live web access. Answer only from stable knowledge you already have.',
    `Write all user-facing text in ${t('systemLanguage')}.`,
    'Return only a useful, engaging answer in 2 to 5 short paragraphs separated by blank lines.',
    'Use plain text only, without markdown, headings, citations, or a preamble.',
    'Explain unfamiliar ideas clearly and include one memorable example when useful.',
    'For changing facts, state clearly that the answer is not real-time.',
    `User topic: ${query}`
  ].join('\n')
}

function createStructuredPrompt(query) {
  return [
    'You design interactive exploration content for Mosaic Explore.',
    'You do not have live web access. Use only stable knowledge you already have.',
    `Write all user-facing text in ${t('systemLanguage')}.`,
    'Return exactly one valid JSON object with no markdown and no surrounding text.',
    'Use this exact shape:',
    '{"cards":[{"category":"string","title":"string","summary":"string","prompt":"string"}],"facts":[{"title":"string","detail":"string"}],"relatedQueries":["string"]}',
    'Rules:',
    '- cards: exactly 6 distinct, interesting directions. Mix overview, timeline, people, surprising facts, misconceptions, debate, or a what-if scenario as appropriate.',
    '- category is a short user-facing label. summary is one or two useful sentences.',
    '- prompt is a self-contained question that can be sent to an AI to explore the card.',
    '- facts: exactly 3 accurate, surprising, memorable details that do not duplicate the cards.',
    '- Each fact needs a punchy title and a one-to-three-sentence explanation of why it is interesting.',
    '- relatedQueries: 3 to 5 playful next destinations, not duplicates of the cards.',
    `User topic: ${query}`
  ].join('\n')
}

function createChatMessages(systemPrompt, query, context) {
  const messages = [{ role: 'system', content: systemPrompt }]
  if (context) {
    messages.push(
      { role: 'user', content: context.query },
      { role: 'assistant', content: normalizeText(context.data.answer, 6000) }
    )
  }
  messages.push({ role: 'user', content: query })
  return messages
}

async function requestStructuredContent(query, callId, context) {
  let response = ''
  await cherry.ai.chat(
    {
      model: 'default',
      reasoning: 'off',
      messages: createChatMessages(createStructuredPrompt(query), query, context)
    },
    { callId, onChunk: (chunk) => (response += chunk) }
  )
  return parseStructuredResponse(response)
}

function errorMessage(error) {
  if (error?.message === 'invalid-response') return t('invalidResponse')
  if (error?.name === 'Cancelled') return t('cancelled')
  if (error?.name === 'Unavailable') return t('unavailable')
  if (error?.name === 'RateLimited') return t('rateLimited')
  return t('genericError')
}

function findCachedResult(query) {
  return state.history.find((item) => queryKey(item.query) === queryKey(query))
}

async function runSearch(rawQuery, options = {}) {
  const promptQuery = String(rawQuery ?? '')
    .trim()
    .slice(0, 240)
  if (!promptQuery) {
    showToast(t('invalidQuery'))
    return
  }
  const query = String(options.displayQuery ?? promptQuery)
    .trim()
    .slice(0, 240)

  if (state.currentView !== 'results') state.resultReturnView = state.currentView
  if (state.activeGeneration) await cancelActiveSearch()
  if (!options.force) {
    const cached = findCachedResult(query)
    if (cached) {
      showCachedResult(cached, true)
      return
    }
  }

  state.activeQuery = query
  showLoading(query)

  let capabilities
  try {
    capabilities = await cherry.ai.getCapabilities({ model: 'default' })
  } catch (error) {
    showError(errorMessage(error))
    return
  }
  if (!capabilities.available) {
    showError(t('noModel'))
    return
  }

  const generation = `explore-${Date.now().toString(36)}`
  const answerCallId = `${generation}-answer`
  const cardsCallId = `${generation}-cards`
  state.activeGeneration = generation
  state.activeCallIds = [answerCallId, cardsCallId]
  let answer = ''
  showStreaming()

  try {
    const answerRequest = cherry.ai
      .chat(
        {
          model: 'default',
          reasoning: capabilities.reasoning ? 'on' : 'off',
          messages: createChatMessages(createAnswerPrompt(promptQuery), promptQuery, options.context)
        },
        {
          callId: answerCallId,
          onChunk: (chunk) => {
            if (state.activeGeneration !== generation) return
            answer += chunk
            renderStreamingAnswer(answer)
          }
        }
      )
      .then(() => {
        if (state.activeGeneration === generation) elements['progress-message'].textContent = t('cardsPending')
      })

    const cardsRequest = requestStructuredContent(promptQuery, cardsCallId, options.context)

    const [answerResult, cardsResult] = await Promise.allSettled([answerRequest, cardsRequest])
    if (state.activeGeneration !== generation) return
    if (answerResult.status === 'rejected') throw answerResult.reason

    const normalizedAnswer = normalizeText(answer, 8000)
    if (!normalizedAnswer) throw new Error('invalid-response')
    const structured =
      cardsResult.status === 'fulfilled' ? cardsResult.value : { cards: [], facts: [], relatedQueries: [] }
    const item = { query, timestamp: Date.now(), data: { answer: normalizedAnswer, ...structured } }
    state.latest = item
    state.history = [item, ...state.history.filter((entry) => entry.query.toLowerCase() !== query.toLowerCase())].slice(
      0,
      MAX_HISTORY
    )
    renderResult(item)
    await saveWithFeedback(() => saveHistory())
  } catch (error) {
    if (state.activeGeneration === generation) showError(errorMessage(error))
  } finally {
    if (state.activeGeneration === generation) {
      state.activeGeneration = null
      state.activeCallIds = []
    }
  }
}

function isFavorite(query) {
  return state.favorites.some((item) => item.query.toLowerCase() === query.toLowerCase())
}

function renderFavoriteButton() {
  const favorite = isFavorite(state.latest.query)
  elements['favorite-toggle'].hidden = false
  renderLabeledIconButton(elements['favorite-toggle'], 'star', t(favorite ? 'favorited' : 'favorite'), favorite)
  elements['favorite-toggle'].setAttribute('aria-pressed', String(favorite))
}

function createExploreCard(card) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'explore-card'
  button.setAttribute('aria-label', t('exploreAction', card.title))

  const top = document.createElement('span')
  top.className = 'explore-card-top'
  const category = document.createElement('span')
  category.className = 'explore-category'
  category.textContent = card.category
  const arrow = document.createElement('span')
  arrow.className = 'explore-arrow'
  arrow.append(createIcon('arrowUpRight'))
  top.append(category, arrow)

  const title = document.createElement('strong')
  title.className = 'explore-title'
  title.textContent = card.title
  const summary = document.createElement('span')
  summary.className = 'explore-summary'
  summary.textContent = card.summary
  button.append(top, title, summary)
  button.addEventListener('click', () => runSearch(card.prompt))
  return button
}

function openDiscoveryTopic(topic) {
  state.discoveryScrollY = window.scrollY
  state.resultReturnView = 'discovery'
  void runSearch(topic.prompt, { displayQuery: topic.title })
}

function createDiscoveryCard(topic, section, index) {
  const isLead = section === 'featured' && index === 0
  const button = document.createElement('button')
  button.type = 'button'
  button.className = `discovery-card discovery-card-${section === 'whatIf' ? 'what-if' : section}`
  if (isLead) button.classList.add('discovery-card-lead')
  button.setAttribute('aria-label', t('discoveryTopicAction', topic.title))

  const category = document.createElement('span')
  category.className = 'discovery-card-category'
  category.textContent = topic.category
  const title = document.createElement('strong')
  title.className = 'discovery-card-title'
  title.textContent = topic.title
  const summary = document.createElement('span')
  summary.className = 'discovery-card-summary'
  summary.textContent = topic.summary
  const action = document.createElement('span')
  action.className = 'discovery-card-action'
  action.setAttribute('aria-hidden', 'true')
  action.append(createIcon('arrowRight'))
  button.append(category, title, summary, action)
  button.addEventListener('click', () => openDiscoveryTopic(topic))
  return button
}

function renderDiscovery(batch) {
  const containers = {
    featured: elements['discovery-featured'],
    fresh: elements['discovery-fresh'],
    whatIf: elements['discovery-what-if'],
    connections: elements['discovery-connections']
  }
  for (const [section, container] of Object.entries(containers)) {
    container.replaceChildren()
    batch.sections[section].forEach((topic, index) => container.append(createDiscoveryCard(topic, section, index)))
  }
}

function renderFacts(item) {
  const facts = item.data.facts
  elements['facts-list'].replaceChildren()
  elements['facts-section'].hidden = facts.length === 0
  facts.forEach((fact, index) => {
    const article = document.createElement('article')
    article.className = 'fact-card'

    const number = document.createElement('span')
    number.className = 'fact-number'
    number.textContent = String(index + 1).padStart(2, '0')
    const title = document.createElement('h3')
    title.textContent = fact.title
    const detail = document.createElement('p')
    detail.textContent = fact.detail
    article.append(number, title, detail)
    elements['facts-list'].append(article)
  })
}

function renderResult(item) {
  state.latest = item
  showResultsShell(item.query)
  elements['cache-notice'].hidden = true
  elements['loading-view'].hidden = true
  elements['search-progress'].hidden = true
  elements['error-view'].hidden = true
  elements['result-content'].hidden = false
  elements['cards-loading'].hidden = true
  elements['cards-error'].hidden = item.data.cards.length > 0
  elements['status-line'].textContent = t(
    'generatedAt',
    new Intl.DateTimeFormat(state.locale, { hour: '2-digit', minute: '2-digit' }).format(item.timestamp)
  )

  elements['answer-text'].replaceChildren()
  for (const paragraph of splitParagraphs(item.data.answer)) {
    const node = document.createElement('p')
    node.textContent = paragraph
    elements['answer-text'].append(node)
  }
  renderFavoriteButton()

  elements['explore-cards'].replaceChildren()
  elements['result-count'].textContent = item.data.cards.length ? t('resultCount', item.data.cards.length) : ''
  item.data.cards.forEach((card) => elements['explore-cards'].append(createExploreCard(card)))

  renderFacts(item)

  elements['related-queries'].replaceChildren()
  elements['related-section'].hidden = item.data.relatedQueries.length === 0
  for (const query of item.data.relatedQueries) {
    elements['related-queries'].append(createButton('related-query', query, () => runSearch(query)))
  }
  elements['follow-up-section'].hidden = false
  elements['follow-up-input'].value = ''
  renderSavedLists()
}

async function retryStructuredContent() {
  if (!state.latest) return
  if (state.activeGeneration) await cancelActiveSearch()

  const generation = `explore-${Date.now().toString(36)}-cards`
  const callId = `${generation}-cards`
  const current = state.latest
  state.activeGeneration = generation
  state.activeCallIds = [callId]
  elements['cards-error'].hidden = true
  elements['cards-loading'].hidden = false

  try {
    const structured = await requestStructuredContent(current.query, callId)
    if (state.activeGeneration !== generation) return

    const item = { ...current, timestamp: Date.now(), data: { answer: current.data.answer, ...structured } }
    state.latest = item
    state.history = [
      item,
      ...state.history.filter((entry) => entry.query.toLowerCase() !== item.query.toLowerCase())
    ].slice(0, MAX_HISTORY)
    renderResult(item)
    await saveWithFeedback(() => saveHistory())
  } catch {
    if (state.activeGeneration === generation) {
      elements['cards-loading'].hidden = true
      elements['cards-error'].hidden = false
    }
  } finally {
    if (state.activeGeneration === generation) {
      state.activeGeneration = null
      state.activeCallIds = []
    }
  }
}

async function setFavorite(item, shouldFavorite) {
  const query = queryKey(item.query)
  const index = state.favorites.findIndex((item) => queryKey(item.query) === query)
  if (!shouldFavorite && index >= 0) {
    state.favorites.splice(index, 1)
    showToast(t('removedFavorite'))
  } else if (shouldFavorite && index < 0) {
    state.favorites = [item, ...state.favorites].slice(0, MAX_FAVORITES)
    showToast(t('addedFavorite'))
  }
  await saveWithFeedback(() => cherry.storage.set(FAVORITES_KEY, JSON.stringify(state.favorites)))
  if (state.latest) renderFavoriteButton()
  renderSavedLists()
}

async function toggleFavorite() {
  if (!state.latest) return
  await setFavorite(state.latest, !isFavorite(state.latest.query))
}

async function deleteHistoryItem(item, index) {
  const currentIndex = state.history.indexOf(item)
  if (currentIndex < 0) return
  state.history.splice(currentIndex, 1)
  await saveWithFeedback(() => saveHistory())
  renderSavedLists()
  showToast(t('historyDeleted'), t('undo'), async () => {
    if (findCachedResult(item.query)) return
    state.history.splice(Math.min(index, state.history.length), 0, item)
    state.history = state.history.slice(0, MAX_HISTORY)
    await saveWithFeedback(() => saveHistory())
    renderSavedLists()
  })
}

function showCachedResult(item, fromSearch = false) {
  if (state.currentView !== 'results') state.resultReturnView = state.currentView
  state.activeQuery = item.query
  renderResult(item)
  elements['cache-notice'].hidden = !fromSearch
}

function createExportText(item) {
  const sections = [`${t('name')} · ${item.query}`, '', t('shareAnswer'), item.data.answer]
  if (item.data.cards.length > 0) {
    sections.push('', t('shareCards'))
    item.data.cards.forEach((card, index) => sections.push(`${index + 1}. ${card.title} — ${card.summary}`))
  }
  if (item.data.facts.length > 0) {
    sections.push('', t('shareFacts'))
    item.data.facts.forEach((fact, index) => sections.push(`${index + 1}. ${fact.title} — ${fact.detail}`))
  }
  sections.push('', t('shareFooter'))
  return sections.join('\n')
}

function exportName(query) {
  const topic = normalizeText(query, 80).replace(/[\\/]/g, '-').trim()
  return `${topic && topic !== '.' && topic !== '..' ? topic : t('shortName')}.txt`
}

async function exportResult() {
  if (!state.latest || state.exporting) return
  state.exporting = true
  elements['export-result'].disabled = true
  renderExportButton()
  try {
    const permissions = await cherry.app.getPermissions()
    if (!permissions['file.export']) {
      showToast(t('exportPermissionDenied'))
      return
    }
    await cherry.file.save(EXPORT_FILE, encodeBase64(createExportText(state.latest)))
    const { saved } = await cherry.file.export(EXPORT_FILE, { suggestedName: exportName(state.latest.query) })
    showToast(t(saved ? 'exported' : 'exportCancelled'))
  } catch (error) {
    showToast(t(error?.name === 'PermissionDenied' ? 'exportPermissionDenied' : 'exportFailed'))
  } finally {
    state.exporting = false
    elements['export-result'].disabled = false
    renderExportButton()
  }
}

function submitFollowUp() {
  if (!state.latest) return
  const followUp = normalizeText(elements['follow-up-input'].value, 160)
  if (!followUp) {
    showToast(t('invalidQuery'))
    return
  }
  const context = state.latest
  const displayQuery = `${context.query} · ${followUp}`.slice(0, 240)
  elements['follow-up-input'].value = ''
  void runSearch(followUp, { context, displayQuery, force: true })
}

async function cancelActiveSearch() {
  const callIds = state.activeCallIds
  const cancelledDiscovery = state.activeGeneration?.startsWith('discovery-')
  state.activeGeneration = null
  state.activeCallIds = []
  await Promise.allSettled(callIds.map((callId) => cherry.ai.cancel(callId)))
  if (cancelledDiscovery) {
    state.discoveryLastAttempt = 0
    await saveWithFeedback(saveDiscoveryState)
  }
}

function showToast(message, actionLabel, onAction) {
  clearTimeout(state.toastTimer)
  elements['toast-message'].textContent = message
  elements['toast-action'].onclick = null
  elements['toast-action'].hidden = !actionLabel
  elements['toast-action'].textContent = actionLabel || ''
  if (actionLabel && onAction) {
    elements['toast-action'].onclick = () => {
      elements.toast.hidden = true
      void onAction()
    }
  }
  elements.toast.hidden = false
  state.toastTimer = setTimeout(() => {
    elements.toast.hidden = true
  }, 2600)
}

function bindEvents() {
  elements['home-search'].addEventListener('click', () => runSearch(elements['home-input'].value))
  elements['results-search'].addEventListener('click', () => runSearch(elements['results-input'].value))
  for (const input of [elements['home-input'], elements['results-input']]) {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') void runSearch(input.value)
    })
  }
  elements['brand-button'].addEventListener('click', () => {
    void cancelActiveSearch()
    if (state.resultReturnView === 'discovery') showDiscovery({ allowRefresh: false, restoreScroll: true })
    else showHome()
  })
  elements['discovery-brand-button'].addEventListener('click', () => {
    state.discoveryScrollY = window.scrollY
    showHome()
  })
  document.querySelectorAll('[data-discovery-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.discoveryTarget)
      const reducedMotion =
        typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    })
  })
  elements['favorite-toggle'].addEventListener('click', toggleFavorite)
  elements['export-result'].addEventListener('click', exportResult)
  elements['retry-cards'].addEventListener('click', retryStructuredContent)
  elements['keep-cached'].addEventListener('click', () => {
    elements['cache-notice'].hidden = true
  })
  elements.regenerate.addEventListener('click', () => runSearch(state.activeQuery, { force: true }))
  elements['follow-up-form'].addEventListener('submit', (event) => {
    event.preventDefault()
    submitFollowUp()
  })
  elements['cancel-search'].addEventListener('click', async () => {
    await cancelActiveSearch()
    showError(t('cancelled'))
  })
  elements['retry-search'].addEventListener('click', () => runSearch(state.activeQuery, { force: true }))
  elements['clear-history'].addEventListener('click', async () => {
    const previousHistory = state.history
    state.history = []
    await saveWithFeedback(() => saveHistory())
    renderSavedLists()
    showToast(t('historyCleared'), t('undo'), async () => {
      state.history = previousHistory
      await saveWithFeedback(() => saveHistory())
      renderSavedLists()
    })
  })

  cherry.on('app.localeChange', ({ locale }) => {
    const restartDiscovery = state.currentView === 'discovery' && state.activeGeneration?.startsWith('discovery-')
    state.locale = locale
    if (state.currentView === 'discovery') {
      state.discoveryBatch = latestDiscoveryBatch() || createFallbackDiscoveryBatch()
    }
    applyTranslations()
    if (restartDiscovery) void cancelActiveSearch().then(refreshDiscoveryIfNeeded)
    else if (state.currentView === 'discovery') void refreshDiscoveryIfNeeded()
  })
}

async function init() {
  cacheElements()
  const info = await cherry.app.getInfo()
  state.locale = info.locale || 'zh-CN'
  await loadState()
  bindEvents()
  applyTranslations()
  showHome(false)
}

init().catch(() => {
  document.body.textContent = 'Mosaic Explore could not start.'
})
