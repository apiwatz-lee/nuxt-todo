<script setup lang="ts">
const input = ref({
  name: '',
  email: '',
  password: '',
});

const toast = useToast();

async function onSignUp() {
  const { data, error } = await authClient.signUp.email({ ...input.value });

  if (error) {
    toast.add({ title: error.message || 'Unknown error', color: 'error' });
    return;
  }

  toast.add({
    title: `Sign up successfull! You can now login with ${data.user.email}`,
    color: 'success',
  });
}
</script>

<template>
  <div class="max-w-xs mx-auto">
    <h1 class="font-bold text-center text-2xl mb-4">Sign Up</h1>
    <form @submit.prevent="onSignUp()">
      <div class="flex flex-col gap-2">
        <UFormField label="Fullname">
          <UInput
            v-model="input.name"
            placeholder="Fullname"
            class="w-full"
            name="fullname"
          ></UInput>
        </UFormField>

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
