<template>
  <div class="m-nav-wrapper" :class="{ 'is-scrolled': isScrolled }" ref="containerRef">
    <!-- 顶部搜索与导航 -->
    <header class="m-nav-header">
      <div class="m-nav-search-wrapper">
        <input
          v-model="searchInput"
          type="text"
          placeholder="搜索站点标题、描述或分类..."
          class="m-nav-input"
        />
        <span class="search-icon">🔍</span>
      </div>

      <nav class="m-nav-tags" v-if="!searchInput">
        <button
          v-for="group in navData"
          :key="group.category"
          :class="['m-nav-tag', { active: activeCategory === group.category }]"
          @click="scrollToCategory(group.category)"
        >
          {{ group.category }}
        </button>
      </nav>
    </header>

    <!-- 内容区 -->
    <main class="m-nav-main">
      <TransitionGroup name="stagger">
        <section
          v-for="group in filteredData"
          :key="group.category"
          :id="'cat-' + group.category"
          class="m-nav-group"
        >
          <h2 class="m-nav-group-title">{{ group.category }}</h2>
          <div class="m-nav-links">
            <a
              v-for="(item, idx) in group.items"
              :key="item.id || (item.url + idx)"
              :href="item.url"
              target="_blank"
              rel="noopener"
              class="m-nav-card"
            >
              <div
                class="m-nav-icon-box"
                :class="{ 'has-border': item.showIconBorder !== false }"
              >
                <span
                  v-if="item.iconType === 'iconify'"
                  class="iconify"
                  :data-icon="item.icon"
                ></span>
                <img
                  v-else-if="item.iconType === 'image'"
                  :src="item.icon"
                  :alt="item.title"
                  loading="lazy"
                  decoding="async"
                  width="32"
                  height="32"
                  @load="el => el.target.classList.add('is-loaded')"
                  @error="onImgError"
                />
                <div v-else class="m-nav-icon-placeholder">#</div>
              </div>

              <div class="m-nav-info">
                <div class="m-nav-name">{{ item.title }}</div>
                <div class="m-nav-desc" :title="item.description">
                  {{ item.description || '暂无描述' }}
                </div>
              </div>
            </a>
          </div>
        </section>
      </TransitionGroup>

      <div v-if="filteredData.length === 0" class="m-nav-empty">
        未找到相关内容 😅
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, shallowRef, watch, nextTick } from 'vue'
import { navData as rawNavData } from '../../nav/data.js'

// --- 配置 ---
const ICONIFY_LIB = 'https://code.iconify.design/2/2.1.2/iconify.min.js'
const EMPTY_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23888' d='M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0 1.1-.9-2-2-2h-8l-2-2z'/%3E%3C/svg%3E"

// --- 状态 ---
const containerRef = ref(null)
const navData = shallowRef(rawNavData)
const searchInput = ref('')
const debouncedQuery = ref('')
const activeCategory = ref('')
const isScrolled = ref(false)

let observer = null
let debounceTimer = null
let ticking = false

// --- 搜索防抖 ---
watch(searchInput, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedQuery.value = (val || '').trim().toLowerCase()
  }, 200)
})

// --- 过滤（保持和原来接近） ---
const filteredData = computed(() => {
  const query = debouncedQuery.value
  if (!query) return navData.value

  return navData.value
    .map(group => {
      const items = group.items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      )
      return items.length ? { ...group, items } : null
    })
    .filter(Boolean)
})

// --- 滚动优化 ---
const handleScroll = () => {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(() => {
    isScrolled.value = window.scrollY > 40
    ticking = false
  })
}

const scrollToCategory = (cat) => {
  activeCategory.value = cat
  nextTick(() => {
    const el = document.getElementById(`cat-${cat}`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  })
}

// --- Iconify（优化监听范围） ---
const initIconifyObserver = () => {
  if (observer) return
  observer = new MutationObserver((mutations) => {
    if (mutations.some(m => m.addedNodes.length > 0) && window.Iconify) {
      window.Iconify.scan(containerRef.value)
    }
  })
  if (containerRef.value) {
    observer.observe(containerRef.value, { childList: true, subtree: false })
  }
}

const loadIconifyScript = () => {
  if (window.Iconify) {
    initIconifyObserver()
    return
  }
  if (document.querySelector(`script[src="${ICONIFY_LIB}"]`)) return

  const s = document.createElement('script')
  s.src = ICONIFY_LIB
  s.async = true
  s.onload = () => {
    initIconifyObserver()
    window.Iconify?.scan(containerRef.value)
  }
  document.head.appendChild(s)
}

const onImgError = (e) => {
  e.target.src = EMPTY_IMG
}

// --- 生命周期 ---
onMounted(() => {
  loadIconifyScript()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  observer?.disconnect()
  if (debounceTimer) clearTimeout(debounceTimer)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 样式保持和你原来几乎一致，仅增加关键性能样式 */
.m-nav-wrapper {
  --nav-primary: var(--vp-c-brand-1);
  --nav-bg: var(--vp-c-bg);
  --nav-header-top: var(--vp-nav-height);
  padding-bottom: 40px;
}

.m-nav-header {
  position: sticky;
  top: var(--nav-header-top);
  z-index: 1;
  background: var(--nav-bg);
  padding: 0.8rem 1.5rem 0.6rem;
  border-bottom: 1px solid var(--vp-c-divider);
  backdrop-filter: blur(12px);
  transition: top 0.25s ease-in-out;
}

@media (max-width: 960px) {
  .is-scrolled .m-nav-header { top: 0; }
  .m-nav-header { padding: 0.6rem 1rem 0.5rem; }
}

.m-nav-search-wrapper { position: relative; max-width: 480px; margin: 0 auto 0.5rem; }
.m-nav-input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.2rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  outline: none;
  font-size: 0.85rem;
}
.m-nav-input:focus { border-color: var(--nav-primary); }
.search-icon {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  opacity: 0.5;
}

.m-nav-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.m-nav-tag {
  padding: 2px 8px;
  font-size: 0.7rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}
.m-nav-tag.active {
  background: var(--nav-primary);
  color: #fff;
}

.m-nav-main {
  padding: 1rem 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
}

.m-nav-group { margin-bottom: 2rem; scroll-margin-top: calc(var(--vp-nav-height) + 100px); }
.m-nav-group-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
}
.m-nav-group-title::before {
  content: '';
  width: 3px;
  height: 1rem;
  background: var(--nav-primary);
  margin-right: 8px;
  border-radius: 2px;
}

.m-nav-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

/* 性能关键优化 */
.m-nav-card {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  contain: content;
  content-visibility: auto;
}

.m-nav-card:hover {
  border-color: var(--nav-primary);
  transform: translateY(-2px);
  background: var(--vp-c-bg);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.m-nav-icon-box {
  width: 48px;
  height: 48px;
  margin-right: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-mute);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid transparent;
  contain: strict;
}
.m-nav-icon-box.has-border { border: 1px solid var(--vp-c-divider); }

.m-nav-icon-box .iconify,
.m-nav-icon-box img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.m-nav-icon-box img { opacity: 0; transition: opacity 0.3s; }
.m-nav-icon-box img.is-loaded { opacity: 1; }

.m-nav-info { overflow: hidden; }
.m-nav-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  margin-bottom: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.m-nav-desc {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
}

.stagger-enter-active { transition: all 0.3s ease; }
.stagger-enter-from { opacity: 0; transform: translateY(10px); }

.m-nav-empty { text-align: center; padding: 4rem; color: var(--vp-c-text-3); font-size: 0.9rem; }

@media (max-width: 768px) {
  .m-nav-main { padding: 0.8rem; }
  .m-nav-links { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .m-nav-tags { display: none; }
}
</style>