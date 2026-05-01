<template>
  <div>
    <input type="file" @change="handleFile" />
    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import API from "../services/api";

const file = ref(null);

const handleFile = (e) => {
  file.value = e.target.files[0];
};

const uploadFile = async () => {
  const formData = new FormData();
  formData.append("file", file.value);

  const res = await API.post("/documents/upload", formData);
  console.log(res.data);
};
</script>