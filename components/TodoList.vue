<script setup lang="ts">
const { todos } = useTodo();
</script>

<template>
  <div>
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
      >
        {{ todo.title }}
      </li>
    </ul>

    <CreateTodoList />
  </div>
</template>
