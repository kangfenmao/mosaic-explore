const HISTORY_KEY = 'explore-history-v1'
const HISTORY_FILE = 'explore-history.json'
const FAVORITES_KEY = 'explore-favorites-v1'
const MAX_HISTORY = 100
const MAX_FAVORITES = 12
const MAX_CARDS = 6

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
    thinking: '正在生成答案与探索卡片…',
    cardsPending: '答案已生成，正在准备探索卡片和趣味知识…',
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
    addedFavorite: '已加入收藏',
    removedFavorite: '已取消收藏',
    exploreAction: (title) => `继续探索：${title}`,
    invalidQuery: '请输入想探索的内容。',
    noModel: '当前没有可用的 AI 模型，请先在 Cherry Studio 中配置默认模型。',
    invalidResponse: 'AI 没有返回可识别的探索内容，请重试或换一种问法。',
    cancelled: '探索已停止。',
    unavailable: 'AI 暂时不可用，请稍后重试。',
    rateLimited: '请求过于频繁，请稍后再试。',
    genericError: '探索失败，请稍后重试。',
    suggestions: [
      '为什么天空是蓝色的？',
      '穿越到唐朝的一天',
      '爵士乐为什么迷人？',
      '黑洞里会发生什么？',
      '如果月球突然消失会怎样？',
      '恐龙真的会吼叫吗？',
      '世界上最奇怪的节日',
      '魔术师如何欺骗大脑？',
      '海底最不可思议的生物',
      '电子游戏里的物理是真的吗？',
      '咖啡如何改变了世界？',
      '梦为什么那么离奇？',
      '人类能住在火星吗？',
      '一首歌为什么会洗脑？',
      '古人如何预测天气？',
      '时间旅行有哪些悖论？',
      '城市里藏着哪些野生动物？',
      '电影里最常见的科学误区',
      '为什么我们会觉得时间变快？',
      '如果动物也建立城市'
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
    thinking: 'Creating an answer and exploration cards…',
    cardsPending: 'The answer is ready. Preparing cards and surprising facts…',
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
    addedFavorite: 'Added to favorites',
    removedFavorite: 'Removed from favorites',
    exploreAction: (title) => `Explore: ${title}`,
    invalidQuery: 'Enter something to explore.',
    noModel: 'No AI model is available. Configure a default model in Cherry Studio first.',
    invalidResponse: 'The AI did not return recognizable exploration content. Retry or ask differently.',
    cancelled: 'Exploration stopped.',
    unavailable: 'The AI is temporarily unavailable. Try again later.',
    rateLimited: 'Too many requests. Please wait and try again.',
    genericError: 'Exploration failed. Please try again later.',
    suggestions: [
      'Why is the sky blue?',
      'A day in ancient Rome',
      'Why is jazz captivating?',
      'What happens inside a black hole?',
      'What if the Moon suddenly vanished?',
      'Did dinosaurs really roar?',
      "The world's strangest festivals",
      'How do magicians fool the brain?',
      "The ocean's most unbelievable creatures",
      'Is video game physics realistic?',
      'How did coffee change the world?',
      'Why are dreams so strange?',
      'Could humans live on Mars?',
      'Why do songs get stuck in your head?',
      'How did ancient people predict weather?',
      'What are the paradoxes of time travel?',
      'Which wild animals hide in cities?',
      "Cinema's most common science myths",
      'Why does time seem to speed up?',
      'What if animals built cities?'
    ],
    systemLanguage: 'English'
  }
}

const state = {
  locale: 'zh-CN',
  history: [],
  favorites: [],
  activeQuery: '',
  activeGeneration: null,
  activeCallIds: [],
  latest: null,
  toastTimer: null,
  suggestionOffset: null
}

const elements = {}

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
    'search-progress',
    'progress-message',
    'loading-view',
    'cancel-search',
    'error-view',
    'error-message',
    'retry-search',
    'result-content',
    'answer-text',
    'favorite-toggle',
    'result-count',
    'cards-loading',
    'explore-cards',
    'facts-section',
    'facts-list',
    'related-section',
    'related-queries',
    'toast'
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
  renderSuggestions()
  renderSavedLists()
  if (state.latest) renderResult(state.latest)
}

function createButton(className, text, onClick) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = className
  button.textContent = text
  button.addEventListener('click', onClick)
  return button
}

function renderSuggestions(refresh = false) {
  const suggestions = t('suggestions')
  if (state.suggestionOffset === null) state.suggestionOffset = Math.floor(Math.random() * suggestions.length)
  else if (refresh) state.suggestionOffset = (state.suggestionOffset + 4) % suggestions.length

  elements.suggestions.replaceChildren()
  for (let index = 0; index < Math.min(4, suggestions.length); index += 1) {
    const suggestion = suggestions[(state.suggestionOffset + index) % suggestions.length]
    elements.suggestions.append(createButton('suggestion-chip', suggestion, () => runSearch(suggestion)))
  }
}

function formatHistoryTime(timestamp) {
  try {
    return new Intl.DateTimeFormat(state.locale, { month: 'numeric', day: 'numeric' }).format(timestamp)
  } catch {
    return ''
  }
}

function renderSavedItem(item, favorite = false) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'history-item'

  const icon = document.createElement('span')
  icon.className = 'saved-icon'
  icon.textContent = favorite ? '★' : '◷'
  icon.setAttribute('aria-hidden', 'true')

  const query = document.createElement('span')
  query.className = 'history-query'
  query.textContent = item.query

  const time = document.createElement('span')
  time.className = 'history-time'
  time.textContent = formatHistoryTime(item.timestamp)

  button.append(icon, query, time)
  button.addEventListener('click', () => showCachedResult(item))
  return button
}

function renderSavedLists() {
  elements['favorites-list'].replaceChildren()
  elements['favorites-section'].hidden = state.favorites.length === 0
  for (const item of state.favorites) elements['favorites-list'].append(renderSavedItem(item, true))

  elements['history-list'].replaceChildren()
  elements['history-section'].hidden = state.history.length === 0
  for (const item of state.history) elements['history-list'].append(renderSavedItem(item))
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
  const [history, favorites] = await Promise.all([loadHistory(), loadStorageCollection(FAVORITES_KEY, MAX_FAVORITES)])
  state.history = history
  state.favorites = favorites
}

async function saveHistory(history = state.history) {
  await cherry.file.save(HISTORY_FILE, encodeBase64(JSON.stringify(history)))
}

async function saveState() {
  await Promise.allSettled([saveHistory(), cherry.storage.set(FAVORITES_KEY, JSON.stringify(state.favorites))])
}

function showHome(refreshSuggestions = true) {
  elements['results-header'].hidden = true
  elements['results-view'].hidden = true
  elements['home-view'].hidden = false
  elements['home-input'].value = ''
  elements['results-input'].value = ''
  if (refreshSuggestions) renderSuggestions(true)
  renderSavedLists()
  requestAnimationFrame(() => elements['home-input'].focus())
}

function showResultsShell(query) {
  elements['home-view'].hidden = true
  elements['results-header'].hidden = false
  elements['results-view'].hidden = false
  elements['home-input'].value = query
  elements['results-input'].value = query
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function showLoading(query) {
  showResultsShell(query)
  elements['status-line'].textContent = ''
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
  elements['explore-cards'].replaceChildren()
  elements['facts-section'].hidden = true
  elements['related-section'].hidden = true
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
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
  try {
    return normalizeStructured(JSON.parse(cleaned))
  } catch (error) {
    if (error?.message === 'invalid-response') throw error
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start < 0 || end <= start) throw new Error('invalid-response')
    try {
      return normalizeStructured(JSON.parse(cleaned.slice(start, end + 1)))
    } catch {
      throw new Error('invalid-response')
    }
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

function errorMessage(error) {
  if (error?.message === 'invalid-response') return t('invalidResponse')
  if (error?.name === 'Cancelled') return t('cancelled')
  if (error?.name === 'Unavailable') return t('unavailable')
  if (error?.name === 'RateLimited') return t('rateLimited')
  return t('genericError')
}

async function runSearch(rawQuery) {
  const query = String(rawQuery ?? '')
    .trim()
    .slice(0, 240)
  if (!query) {
    showToast(t('invalidQuery'))
    return
  }

  if (state.activeCallIds.length > 0) await cancelActiveSearch()
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
  let rawStructured = ''
  showStreaming()

  try {
    const answerRequest = cherry.ai
      .chat(
        {
          model: 'default',
          reasoning: capabilities.reasoning ? 'on' : 'off',
          messages: [
            { role: 'system', content: createAnswerPrompt(query) },
            { role: 'user', content: query }
          ]
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

    const cardsRequest = cherry.ai.chat(
      {
        model: 'default',
        reasoning: 'off',
        messages: [
          { role: 'system', content: createStructuredPrompt(query) },
          { role: 'user', content: query }
        ]
      },
      { callId: cardsCallId, onChunk: (chunk) => (rawStructured += chunk) }
    )

    await Promise.all([answerRequest, cardsRequest])
    if (state.activeGeneration !== generation) return

    const normalizedAnswer = normalizeText(answer, 8000)
    if (!normalizedAnswer) throw new Error('invalid-response')
    const structured = parseStructuredResponse(rawStructured)
    const item = { query, timestamp: Date.now(), data: { answer: normalizedAnswer, ...structured } }
    state.latest = item
    state.history = [item, ...state.history.filter((entry) => entry.query.toLowerCase() !== query.toLowerCase())].slice(
      0,
      MAX_HISTORY
    )
    await saveState()
    renderResult(item)
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
  elements['favorite-toggle'].textContent = favorite ? `★ ${t('favorited')}` : `☆ ${t('favorite')}`
  elements['favorite-toggle'].setAttribute('aria-pressed', String(favorite))
}

function createExploreCard(card, index) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'explore-card'
  button.style.setProperty('--card-index', String(index))
  button.setAttribute('aria-label', t('exploreAction', card.title))

  const top = document.createElement('span')
  top.className = 'explore-card-top'
  const category = document.createElement('span')
  category.className = 'explore-category'
  category.textContent = card.category
  const arrow = document.createElement('span')
  arrow.className = 'explore-arrow'
  arrow.textContent = '↗'
  arrow.setAttribute('aria-hidden', 'true')
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
  elements['loading-view'].hidden = true
  elements['search-progress'].hidden = true
  elements['error-view'].hidden = true
  elements['result-content'].hidden = false
  elements['cards-loading'].hidden = true
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
  elements['result-count'].textContent = t('resultCount', item.data.cards.length)
  item.data.cards.forEach((card, index) => elements['explore-cards'].append(createExploreCard(card, index)))

  renderFacts(item)

  elements['related-queries'].replaceChildren()
  elements['related-section'].hidden = item.data.relatedQueries.length === 0
  for (const query of item.data.relatedQueries) {
    elements['related-queries'].append(createButton('related-query', query, () => runSearch(query)))
  }
  renderSavedLists()
}

async function toggleFavorite() {
  if (!state.latest) return
  const query = state.latest.query.toLowerCase()
  const index = state.favorites.findIndex((item) => item.query.toLowerCase() === query)
  if (index >= 0) {
    state.favorites.splice(index, 1)
    showToast(t('removedFavorite'))
  } else {
    state.favorites = [state.latest, ...state.favorites].slice(0, MAX_FAVORITES)
    showToast(t('addedFavorite'))
  }
  await saveState()
  renderFavoriteButton()
  renderSavedLists()
}

function showCachedResult(item) {
  state.activeQuery = item.query
  renderResult(item)
}

async function cancelActiveSearch() {
  const callIds = state.activeCallIds
  state.activeGeneration = null
  state.activeCallIds = []
  await Promise.allSettled(callIds.map((callId) => cherry.ai.cancel(callId)))
}

function showToast(message) {
  clearTimeout(state.toastTimer)
  elements.toast.textContent = message
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
  elements['brand-button'].addEventListener('click', () => showHome())
  elements['favorite-toggle'].addEventListener('click', toggleFavorite)
  elements['cancel-search'].addEventListener('click', async () => {
    await cancelActiveSearch()
    showError(t('cancelled'))
  })
  elements['retry-search'].addEventListener('click', () => runSearch(state.activeQuery))
  elements['clear-history'].addEventListener('click', async () => {
    state.history = []
    await saveState()
    renderSavedLists()
  })

  cherry.on('app.localeChange', ({ locale }) => {
    state.locale = locale
    applyTranslations()
  })
  cherry.on('app.visibilityChange', ({ visible }) => {
    if (!visible) void saveState()
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
