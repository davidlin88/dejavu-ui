<template>
  <a-modal v-model:visible="visible" title="title">
    <button @click="openAnother">app.aModal.content</button>
  </a-modal>
  <a-modal v-model:visible="visible2">Another</a-modal>
  <button @click="switchModal">switch</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const visible = ref(true);
const visible2 = ref(false);

const switchModal = () => {
  visible.value = !visible.value;
};
const openAnother = () => {
  visible2.value = true;
};
</script>
