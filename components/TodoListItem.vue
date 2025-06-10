<script setup lang="ts">
const { getTodo } = useTodo();
const props = defineProps<{
  todo: TodoList;
}>();

const currentTodo = getTodo(props.todo.id);

function onToggleItem(id: string, value: boolean | 'indeterminate') {
  if (value === 'indeterminate') {
    return;
  }

  if (value) {
    currentTodo.markItemDone(id);
  } else {
    currentTodo.markItemUndone(id);
  }
}

function onTodoItemUpdated(id: string, newTitle: string) {
  currentTodo.updateItemTitle(id, newTitle);
}
</script>

<template>
  <ul class="flex flex-col gap-2">
    <li
      v-for="item in currentTodo.todo.items"
      :key="item.id"
    >
      <div class="flex items-center gap-1">
        <UCheckbox
          :model-value="item.done"
          :label="item.title"
          @update:model-value="onToggleItem(item.id, $event)"
        >
          <template #label>
            <span :class="{ 'line-through text-gray-400': item.done }">{{
              item.title
            }}</span>
          </template>
        </UCheckbox>
        <ButtonUpdateModal
          header-title="Update title item"
          :previous-title="item.title"
          placeholder="Enter a new title item"
          @updated="onTodoItemUpdated(item.id, $event)"
        >
          <Icon
            name="material-symbols:edit"
            class="cursor-pointer text-blue-600"
            size="1.2em"
          ></Icon>
        </ButtonUpdateModal>

        <Icon
          name="material-symbols:delete-forever"
          class="cursor-pointer text-red-600"
          size="1.2em"
        ></Icon>
      </div>
    </li>
  </ul>
</template>
