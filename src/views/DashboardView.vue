<script setup>
import { useSurveyStore } from "@/stores/surveyStore.js";
import { computed, onMounted } from "vue";

const surveyStore = useSurveyStore();

const data = computed(() => surveyStore.dashboard.data);
const isLoading = computed(() => surveyStore.dashboard.isLoading);

const isSurveyActiveDisplay = computed(() => {
  return data.value.latestSurvey.status ? 'Active' : "Inactive"
});

surveyStore.getDashboardData();
</script>

<template>
  <AppPanel>
    <template #header>
      <h2>Dashboard</h2>
    </template>
    <div v-if="isLoading">Loading...</div>
    <div v-else>

      <div class="row">
        <div class="col">
          <div class="shadow-sm p-3 mb-5 bg-white rounded text-center">
            <h6>Total Surveys</h6>
            <h3>{{ data.totalSurveys }}</h3>
          </div>
        </div>
        <div class="col">
          <div class="shadow-sm p-3 mb-5 bg-white rounded text-center">
            <h6>Latest Surveys</h6>
            <!-- <pre>{{data.latestSurvey.title}}</pre> -->
            <img
              v-if="data.latestSurvey.image"
              :src="data.latestSurvey.image"
              class="img-thumbnail w-25 rounded-circle"
            />
            <p class="mb-1">
              <b>{{ data.latestSurvey.title }}</b>
            </p>
            <p class="mb-1">
              Start at: <b>{{ data.latestSurvey.created_at }}</b>
            </p>
            <p class="mb-1">
              Expire at: <b>{{ data.latestSurvey.expire_date }}</b>
            </p>
            <p class="mb-1">
              Status: <b>{{ isSurveyActiveDisplay  }}</b>
            </p>
            <p class="mb-1">
              Total Questions: <b>{{ data.latestSurvey.no_of_questions }}</b>
            </p>
            <p class="mb-1">
              Total Answers: <b>{{ data.latestSurvey.no_of_answers }}</b>
            </p>
            <div class="d-flex justify-content-between">
              <router-link
                class="btn btn-sm btn-outline-secondary"
                :to="{
                  name: 'surveys.view',
                  params: { id: data.latestSurvey.id },
                }"
                >Edit</router-link
              >
              <a
                target="_blank"
                class="btn btn-sm btn-outline-info"
                :href="`/public/surveys/${data.latestSurvey.slug}`"
                >View</a
              >
            </div>
          </div>
        </div>

        <div class="col">
          <div class="shadow-sm p-3 mb-5 bg-white rounded text-center">
            <h6>Latest Answers</h6>
            <div
              class="text-start"
              v-for="answer in data.latestAnswers"
              :key="answer.id"
            >
              <p class="mb-0">
                <b>{{ answer.survey.title }}</b>
              </p>
              <p>
                <small>Answer made at: {{ answer.end_date }}</small>
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="shadow-sm p-3 mb-5 bg-white rounded text-center">
            <h6>Total Answers</h6>
            <h3>{{ data.totalAnswers }}</h3>
          </div>
        </div>
      </div>
    </div>
  </AppPanel>
</template>
