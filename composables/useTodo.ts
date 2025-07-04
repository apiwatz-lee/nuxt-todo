import { v4 as uuid } from 'uuid';

export interface TodoListItem {
  id: string;
  title: string;
  done: boolean;
}

export interface TodoList {
  id: string;
  title: string;
  items: TodoListItem[];
}

let todos: Ref<TodoList[]>;

export function useTodo() {
  //Singleton pattern
  //ทำให้ todos และ watch ถูกสร้างครั้งเดียว ป้องกันปัญหา render ซ้ำ
  if (!todos) {
    todos = useState<TodoList[]>('todos', () => []);
    watch(
      todos,
      (newTodos) => {
        const data = JSON.stringify(newTodos);
        localStorage.setItem('todo', data);
      },
      { deep: true }
    );
  }

  function addTodo(title: string) {
    todos.value.push({
      id: uuid(), //generateId
      title,
      items: [],
    });
  }

  function loadTodoFromLocalStorage() {
    const data = localStorage.getItem('todo');
    if (data) {
      todos.value = JSON.parse(data);
    }
  }

  function updateTodoTitle(id: string, newTitle: string) {
    const todo = todos.value.find((todo) => todo.id === id);

    if (todo) {
      todo.title = newTitle;
    }
  }

  function removeTodo(id: string) {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }

  function getTodo(id: string) {
    const todo = todos.value.find((todo) => todo.id === id);

    if (!todo) {
      throw new Error('Todo not found');
    }

    const addItem = (title: string) => {
      todo.items.push({
        id: uuid(),
        title,
        done: false,
      });
    };

    const updateItemTitle = (id: string, newTitle: string) => {
      const item = todo.items.find((item) => item.id === id);
      if (item) {
        item.title = newTitle;
      }
    };

    const markItemDone = (id: string) => {
      const item = todo.items.find((item) => item.id === id);
      if (item) {
        item.done = true;
      }
    };

    const markItemUndone = (id: string) => {
      const item = todo.items.find((item) => item.id === id);
      if (item) {
        item.done = false;
      }
    };

    const removeItem = (id: string) => {
      todo.items = todo.items.filter((item) => item.id !== id);
    };

    return {
      todo,
      addItem,
      updateItemTitle,
      removeItem,
      markItemDone,
      markItemUndone,
    };
  }

  return {
    todos,
    addTodo,
    updateTodoTitle,
    removeTodo,
    getTodo,
    loadTodoFromLocalStorage,
  };
}
