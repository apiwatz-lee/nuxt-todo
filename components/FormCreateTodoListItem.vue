<script setup lang="ts">
const { getTodo } = useTodo();
const title = ref('');

const props = defineProps<{
  todoId: string;
}>();

const currentTodo = getTodo(props.todoId);

function onSubmit() {
  currentTodo.addItem(title.value);
  title.value = '';
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex gap-1">
      <UInput
        v-model="title"
        class="w-full"
        placeholder="Enter a title"
      />
      <UButton type="submit">Submit</UButton>
    </div>
  </form>
</template>
