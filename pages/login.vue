<script setup lang="ts">
const input = ref({
  email: '',
  password: '',
});

const { login } = useUser();

const toast = useToast();

async function onLogin() {
  try {
    const data = await login(input.value.email, input.value.password);
    toast.add({
      title: `Login successfull on email ${data.user.email}`,
      color: 'success',
    });

    await navigateTo('/');
  } catch (error) {
    toast.add({
      title: (error as Error)?.message || 'Unknown error',
      color: 'error',
    });
    return;
  }
}
</script>

<template>
  <div class="max-w-xs mx-auto">
    <h1 class="font-bold text-center text-2xl mb-4">Log in</h1>
    <form @submit.prevent="onLogin()">
      <div class="flex flex-col gap-2">
        <UFormField label="email">
          <UInput
            v-model="input.email"
            placeholder="Email"
            type="email"
            class="w-full"
            name="email"
          ></UInput>
        </UFormField>

        <UFormField label="password">
          <UInput
            v-model="input.password"
            placeholder="Password"
            type="password"
            class="w-full"
            name="password"
          ></UInput>
        </UFormField>
        <UButton
          type="submit"
          class="mt-2 text-center"
          >Submit</UButton
        >
      </div>
    </form>
  </div>
</template>
