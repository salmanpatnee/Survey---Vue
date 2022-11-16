<script setup>
import { useAuthUserStore } from "@/stores/authUserStore.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const authUserStore = useAuthUserStore();
const router = useRouter();
const loading = ref(false);

const data = ref({
  email: "",
  password: "",
});

const errorMsg = ref("");

const handleLogin = async () => {
  loading.value = true;
  try {
    await authUserStore.login(data.value).then((response) => {
      loading.value = false;
      router.push({ name: "dashboard" });
    });
  } catch (error) {
    loading.value = false;
    errorMsg.value = error.response.data.error;
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
        <div
          v-if="errorMsg"
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Error</strong> {{ errorMsg }}
          <button
            @click="errorMsg = ''"
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="data.email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="data.password"
              required
            />
          </div>
          <button class="btn btn-primary" type="submit" :disabled="loading">
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            {{ loading ? "Loging in..." : "Login" }}
          </button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
