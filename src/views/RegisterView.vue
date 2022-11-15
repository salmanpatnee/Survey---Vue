<script setup>
import { useAuthUserStore } from "@/stores/authUserStore.js";
import { useRouter } from "vue-router";
import {ref} from 'vue'

const authUserStore = useAuthUserStore();
const router = useRouter();

// TODOS: 
// 1 Add v-form
// 2 Show validation errors
const user = ref({
    'name': '', 
    'email': '', 
    'password': '', 
    'password_confirmation': '', 
})

const errorMsg = ref('');

const handleRegister = async () => {
    try {
         await authUserStore.register(user.value).then((response)=>{
            router.push({name: 'dashboard'})
        })
    } catch (error) {
        errorMsg.value = 'Something went wrong.';
    }
}


</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-3"></div>
            <div class="col">
                <div class="text-center">
                    <h1>Register</h1>
                    <p>Already have an account? <router-link :to="{name: 'login'}">Login now</router-link>
                    </p>

                </div>
                <div v-if="errorMsg" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error</strong> {{errorMsg}}
                    <button @click="errorMsg = ''" type="button" class="btn-close" data-bs-dismiss="alert"
                        aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleRegister">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" v-model="user.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" name="email" class="form-control" id="email" v-model="user.email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" id="password"
                            v-model="user.password" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password Confirmation</label>
                        <input type="password" name="password_confirmation" class="form-control"
                            id="password_confirmation" v-model="user.password_confirmation" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Submit</button>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>