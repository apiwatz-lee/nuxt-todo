<script setup lang="ts">
const emit = defineEmits<{
  confirm: [];
}>();

const props = defineProps<{
  title: string;
  description?: string;
  confirmColor?:
    | 'Primary'
    | 'neutral'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error';
}>();

const open = ref(false);

function onConfirm() {
  emit('confirm');
  open.value = false;
}
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{ content: 'max-w-sm' }"
  >
    <slot />
    <template #content>
      <div class="p-4">
        <h2 class="font-bold mb-1">
          {{ title }}
        </h2>

        <p v-if="description">{{ description }}</p>

        <div class="flex justify-end gap-2">
          <UButton
            :color="confirmColor"
            @click="onConfirm()"
            >Confirm</UButton
          >
          <UButton
            color="secondary"
            @click="open = false"
            >Cancel</UButton
          >
        </div>
      </div>
    </template>
  </UModal>
</template>
