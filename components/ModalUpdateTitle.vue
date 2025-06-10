<script setup lang="ts">
// const { updateTodoTitle } = useTodo();

const emit = defineEmits<{
  updated: [newTitle: string];
}>();

const props = defineProps<{
  headerTitle: string;
  previousTitle: string;
  placeholder: string;
}>();

const title = ref(props.previousTitle);
const open = ref(false);

function onUpdated() {
  emit('updated', title.value);
  open.value = false;
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="props.headerTitle"
    :ui="{ content: 'max-w-sm' }"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
  >
    <slot />
    <template #body>
      <form @submit.prevent="onUpdated()">
        <div class="flex gap-1">
          <UInput
            v-model="title"
            class="w-full"
            :placeholder="props.placeholder"
          />
          <UButton type="submit">Update</UButton>
        </div>
      </form>
    </template>
  </UModal>
</template>
