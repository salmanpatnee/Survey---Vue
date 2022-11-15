<script setup>
import { useSurveyStore } from "@/stores/surveyStore.js";
import { computed, onMounted } from "vue";
import SurveyCard from "../components/SurveyCard.vue";
const surveyStore = useSurveyStore();

const surveys = computed(() => surveyStore.surveys.data);

const isLoading = computed(() => surveyStore.surveys.isLoading);

const handleDeleteSurvey = async (id) => {
  if (confirm("Are you sure")) {
    try {
      await surveyStore.deleteSurvey(id);
      await  surveyStore.getSurveys();
    } catch (error) {
      console.log({ error });
    }
  }
};

onMounted(async () => {
  await surveyStore.getSurveys();
});
</script>

<template>
  <AppPanel>
    <template #header>
      <h2>Surveys</h2>
      <router-link class="btn btn-secondary" :to="{ name: 'surveys.create' }"
        >Add Survey</router-link
      >
    </template>
    <div class="d-flex justify-content-center" v-if="isLoading">Loading...</div>

    <div v-else class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="survey in surveys" :key="survey.id">
        <survey-card :survey="survey" @deleteSurvey="handleDeleteSurvey"/>
      </div>
    </div>
  </AppPanel>
</template>
