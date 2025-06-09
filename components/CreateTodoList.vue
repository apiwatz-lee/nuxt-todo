<script setup lang="ts">
const title = ref('');
</script>

<template>
  <form>
    <UInput v-model="title" />
  </form>
</template>
