<script setup lang="ts">
const { todos, updateTodoTitle } = useTodo();

function onTodoUpdated(id: string, newTitle: string) {
  updateTodoTitle(id, newTitle);
}
</script>

<template>
  <div>
    <ul
      v-if="todos.length > 0"
      class="flex flex-col gap-5"
    >
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="border border-gray-300 p-2 rounded-md"
      >
        <!-- List main-->
        <header class="flex justify-between">
          <span>{{ todo.title }}</span>
          <div class="flex gap-1">
            <ButtonUpdateModal
              header-title="Update title"
              :previous-title="todo.title"
              placeholder="Enter a new title"
              @updated="onTodoUpdated(todo.id, $event)"
            >
              <UButton
                size="xs"
                color="secondary"
                >Update Title
              </UButton>
            </ButtonUpdateModal>
            <ButtonRemoveTodoList :todo="todo" />
          </div>
        </header>

        <!-- List Sub-->
        <main class="mt-4">
          <TodoListItem :todo="todo" />

          <div class="mt-4">
            <FormCreateTodoListItem :todo-id="todo.id" />
          </div>
        </main>
      </li>
    </ul>

    <p v-else>No todo found</p>

    <!-- Form create list main-->
    <div class="bg-gray-100 p-4 rounded mt-6">
      <h2 class="font-bold text-lg mb-2">Create Todo List</h2>
      <FormCreateTodoList />
    </div>
  </div>
</template>
