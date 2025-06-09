<script setup lang="ts">
const { getTodo } = useTodo();
const props = defineProps<{
  todo: TodoList;
}>();

const currentTodo = getTodo(props.todo.id);
</script>

<template>
  <ul>
    <li
      v-for="item in currentTodo.todo.items"
      :key="item.id"
    >
      <span>{{ item.title }}</span>
      <span>{{ item.done ? '✅' : '❌' }}</span>
    </li>
  </ul>

  <div class="mt-4">
    <FormCreateTodoListItem :todo-id="currentTodo.todo.id" />
  </div>
</template>
