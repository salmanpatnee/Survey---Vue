import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/main.css'

import AppPanel from '@/components/commons/AppPanel.vue'

import {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess
} from 'vform/src/components/bootstrap5'

const app = createApp(App)


app.component(Button.name, Button)
app.component(HasError.name, HasError)
app.component(AlertError.name, AlertError)
app.component(AlertErrors.name, AlertErrors)
app.component(AlertSuccess.name, AlertSuccess)
app.component('AppPanel', AppPanel)


app.use(createPinia())
app.use(router)



app.mount('#app')
