<template>
  <section class="card">
    <div
      class="dropzone"
      :class="{ active: dragging, hasFile: !!file, disabled: loading }"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden-input"
        accept=".png,.jpg,.jpeg,.bmp,.pbm,.tif,.tiff,.webp,.txt"
        @change="handleFile"
      />

      <template v-if="!file">
        <div class="dropzone-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p class="dropzone-title">Drop your file here</p>
        <p class="dropzone-subtitle">or click to browse</p>
        <p class="dropzone-hint">PNG, JPG, BMP, TIFF, WEBP, or TXT</p>
      </template>

      <template v-else>
        <div class="file-preview">
          <div class="file-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div class="file-meta">
            <p class="file-name">{{ file.name }}</p>
            <p class="file-size">{{ formatSize(file.size) }}</p>
          </div>
          <button class="file-clear" @click.stop="clearFile" aria-label="Remove file">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </template>
    </div>

    <button class="btn-primary" :disabled="!file || loading" @click="uploadFile">
      <span v-if="!loading">Extract Text</span>
      <span v-else class="loading-content">
        <span class="spinner"></span>
        Processing...
      </span>
    </button>

    <div v-if="error" class="alert error">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{{ error }}</span>
    </div>

    <div v-if="ocrText" class="result">
      <div class="result-header">
        <h3>Extracted Text</h3>
        <button class="copy-btn" @click="copyText">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {{ copied ? "Copied!" : "Copy" }}
        </button>
      </div>
      <pre class="result-text">{{ ocrText }}</pre>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import API from "../services/api";

const file = ref(null);
const documentId = ref(null);
const ocrText = ref("");
const error = ref("");
const loading = ref(false);
const dragging = ref(false);
const copied = ref(false);
const fileInput = ref(null);

const triggerFileInput = () => {
  if (!loading.value) fileInput.value?.click();
};

const handleFile = (e) => {
  setFile(e.target.files[0]);
};

const handleDrop = (e) => {
  dragging.value = false;
  setFile(e.dataTransfer.files[0]);
};

const setFile = (f) => {
  if (!f) return;
  file.value = f;
  error.value = "";
  ocrText.value = "";
};

const clearFile = () => {
  file.value = null;
  ocrText.value = "";
  error.value = "";
  if (fileInput.value) fileInput.value.value = "";
};

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const uploadFile = async () => {
  if (!file.value) return;
  error.value = "";
  ocrText.value = "";
  loading.value = true;

  try {
    const formData = new FormData();
    formData.append("file", file.value);

    const res = await API.post("/documents/upload", formData);
    documentId.value = res.data.id;

    const processResponse = await API.post(`/documents/${documentId.value}/process`);
    ocrText.value = processResponse.data.extractedText;
  } catch (err) {
    error.value = err.response?.data?.error || err.message || "Something went wrong.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const copyText = async () => {
  await navigator.clipboard.writeText(ocrText.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1800);
};
</script>

<style scoped src="./UploadComponent.css"></style>
