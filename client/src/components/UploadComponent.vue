<template>
  <div>
    <div>
      <input type="file" @change="handleFile" />
      <button @click="uploadFile" :disabled="loading">
        {{ loading ? "Processing..." : "Upload" }}
      </button>
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="ocrText">
      <h3>Extracted Text</h3>
      <pre>{{ ocrText }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import API from "../services/api";

const file = ref(null);
const documentId = ref(null);
const ocrText = ref("");
const error = ref("");
const loading = ref(false);

const handleFile = (e) => {
  file.value = e.target.files[0];
  error.value = "";
  ocrText.value = "";
};

const uploadFile = async () => {
  if (!file.value) {
    error.value = "Please select a file first.";
    return;
  }

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
</script>

<style scoped>
.error {
  color: #c00;
  background: #fee;
  border: 1px solid #fcc;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}
</style>
