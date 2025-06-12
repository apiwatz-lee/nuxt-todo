<script setup lang="ts">
if (import.meta.client) {
  await callOnce(() => {
    const { loadTodoFromLocalStorage } = useTodo();
    loadTodoFromLocalStorage();
  });
}

await callOnce(async () => {
  const { getCurrentUser } = useUser();
  await getCurrentUser();
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
