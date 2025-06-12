<script setup lang="ts">
const { user, logout } = useUser();

const toast = useToast();

async function onLogout() {
  await logout();
  toast.add({ title: 'logout successfull', color: 'success' });
  await navigateTo('/');
}
</script>

<template>
  <div class="p-3 text-gray-700">
    <nav>
      <div class="max-w-md mx-auto bg-gray-100 p-2 rounded-md shadow">
        <ul class="flex">
          <li>
            <NuxtLink
              class="font-bold text-lg text-blue-600 underline"
              to="/"
            >
              Todo List
            </NuxtLink>
          </li>
          <template v-if="!user">
            <li class="ml-auto mr-3">
              <NuxtLink
                class="text-blue underline"
                to="/login"
              >
                Log in
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                class="font-bold text-lg text-white bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-900 duration-500"
                to="/sign-up"
              >
                Sign Up
              </NuxtLink>
            </li>
          </template>
          <template v-else>
            <li class="ml-auto mr-3">
              <span>{{ user.email }}</span>
            </li>
            <li><UButton @click="onLogout()">Logout</UButton></li>
          </template>
        </ul>
      </div>
    </nav>

    <main class="mt-4">
      <div class="max-w-md mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
