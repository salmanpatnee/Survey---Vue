<script setup>
import { useAuthUserStore } from "@/stores/authUserStore.js";
import Form from "vform";
import { useRouter } from "vue-router";
import { ref } from "vue";

const authUserStore = useAuthUserStore();
const router = useRouter();

const form = ref(
  new Form({
    email: "",
    password: "",
  })
);

const handleLogin = async () => {
  try {
    const { data } = await form.value.post(`/api/login`);
    authUserStore.setUser(data);
    router.push({ name: "dashboard" });
  } catch (error) {
  }
};
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-3"></div>
      <div class="col">
        <div class="text-center">
          <h1>Login to your account</h1>
          <p>
            Don't have an account?
            <router-link :to="{ name: 'register' }">Register now</router-link>
          </p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="form.email"
              required
            />
            <HasError :form="form" field="email" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="form.password"
              required
            />
            <HasError :form="form" field="password" />
          </div>
          <Button :form="form" class="btn btn-primary">
            Login
          </Button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
