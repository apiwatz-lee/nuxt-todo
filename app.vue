<script setup lang="ts">
if (import.meta.client) {
  await callOnce(() => {
    const { loadTodoFromLocalStorage } = useTodo();
    loadTodoFromLocalStorage();
  });
}
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
