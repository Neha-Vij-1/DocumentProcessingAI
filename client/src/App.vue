<script setup>
import UploadComponent from './components/UploadComponent.vue';
</script>

<template>
  <div class="page">
    <header class="header">
    <div class="brand">
      <div class="logo-mark">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="14" x2="15" y2="14" />
          <line x1="9" y1="18" x2="13" y2="18" />
        </svg>
      </div>
      <span class="brand-name">DocAI</span>
    </div>
    <a class="github-link" href="https://github.com/Neha-Vij-1/DocumentProcessingAI" target="_blank" rel="noopener">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    </a>
  </header>

  <main class="main">
    <div class="hero">
      <span class="tag">AI Document Processing</span>
      <h1>Extract text from any document<br />in seconds.</h1>
      <p class="lede">
        Upload an image or text file and let our OCR pipeline turn it into clean, searchable text.
      </p>
    </div>

    <UploadComponent />
  </main>

    <footer class="footer">
      <span>Built with Vue + Express + MariaDB + Tesseract</span>
    </footer>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo-mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: var(--accent-bg);
  color: var(--accent);
}

.brand-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-h);
  letter-spacing: -0.01em;
}

.github-link {
  color: var(--text);
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}

.github-link:hover {
  background: var(--accent-bg);
  color: var(--accent);
}

.main {
  flex: 1;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem 1.5rem 3rem;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.tag {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  background: var(--accent-bg);
  color: var(--accent);
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1.25rem;
  border: 1px solid var(--accent-border);
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.lede {
  font-size: 1.05rem;
  max-width: 540px;
  margin: 0 auto;
  color: var(--text);
}

.footer {
  border-top: 1px solid var(--border);
  padding: 1.25rem 2rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--text);
}

@media (max-width: 640px) {
  .header { padding: 1rem; }
  .main { padding: 2.5rem 1rem 2rem; }
  .hero { margin-bottom: 2rem; }
}
</style>
