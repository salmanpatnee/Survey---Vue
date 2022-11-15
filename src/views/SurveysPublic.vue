<script setup>
import { v4 as uuidv4 } from "uuid";
import { useRoute, useRouter } from "vue-router";
import { useSurveyStore } from "@/stores/surveyStore.js";
import QuestionViewer from "@/components/QuestionViewer.vue";
import { ref, watch, computed, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const surveyStore = useSurveyStore();

const isLoading = computed(() => surveyStore.currentSurvey.isLoading);
const survey = computed(() => surveyStore.currentSurvey.data);
const answers = ref({});
const surveyFinished = ref(false);

const submitSurvey = async () => {
  const response = await surveyStore.saveSurveyAnswer(
    survey.value.id,
    answers.value
  );

  if (response.status === 201) {
    surveyFinished.value = true;
    answers.value = {};
  }
};

const sendAnotherResponse = () => {
  surveyFinished.value = false;
  answers.value = {};
};

if (route.params.slug) {
  surveyStore.getSurveyBySlug(route.params.slug);
}
</script>

<template>
  <div class="container py-5">
    <AppPanel>
      <template #header>
        <h2>{{ isLoading ? "Loading..." : survey.title }}</h2>
      </template>
      <div v-if="isLoading" class="text-center">Loading...</div>
      <div v-else>
        <form @submit.prevent="submitSurvey">
          <div class="row d-flex align-items-center justify-content-between">
            <div class="col-5">
              <img
                :src="survey.image"
                class="img-thumbnail w-50 rounded-circle"
              />
            </div>
            <div class="col-7">
              <h4>{{ survey.title }}</h4>
              <p class="lead">{{ survey.description }}</p>
            </div>
          </div>
          <div class="py-3 text-center" v-if="surveyFinished">
            <h3 class="text-success mb-3">Survey Completed</h3>
            <button
              @click="sendAnotherResponse"
              type="button"
              class="btn btn-outline-success"
            >
              Send another response
            </button>
          </div>
          <div class="py-3" v-else>
            <div
              v-for="(question, index) in survey.questions"
              :key="question.id"
            >
              <QuestionViewer
                :question="question"
                :index="index"
                v-model="answers[question.id]"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-lg btn-outline-primary">
            Submit
          </button>
        </form>
      </div>
    </AppPanel>
  </div>
</template>
