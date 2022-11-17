<script setup>
import { useAuthUserStore } from "@/stores/authUserStore.js";
import Form from "vform";
import { useRouter } from "vue-router";
import { ref } from "vue";

const authUserStore = useAuthUserStore();
const router = useRouter();

const form = ref(
  new Form({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
);

const handleRegister = async () => {
  try {
    const { data } = await form.value.post(`/api/register`);
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
          <h1>Register</h1>
          <p>
            Already have an account?
            <router-link :to="{ name: 'login' }">Login now</router-link>
          </p>
        </div>

        <form @submit.prevent="handleRegister">
          <AlertError :form="form" />
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="form.name"
              required
            />
            <HasError :form="form" field="name" />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              name="email"
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
              name="password"
              class="form-control"
              id="password"
              v-model="form.password"
              required
            />
            <HasError :form="form" field="password" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label"
              >Password Confirmation</label
            >
            <input
              type="password"
              name="password_confirmation"
              class="form-control"
              id="password_confirmation"
              v-model="form.password_confirmation"
              required
            />
          </div>
          <Button :form="form" class="btn btn-primary">
            Sign Up
          </Button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
