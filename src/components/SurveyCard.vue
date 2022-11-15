<script setup>
const props = defineProps({
  survey: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["deleteSurvey"]);

const deleteSurvey = () => emit("deleteSurvey", props.survey.id);
</script>

<template>
  <div class="card">
    <img :src="survey.image" class="card-img-top" :alt="survey.title" />
    <div class="card-body">
      <h5 class="card-title">{{ survey.title }}</h5>
      <p class="card-text">{{ survey.description }}</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <router-link
        class="btn btn-outline-primary btn-sm"
        :to="{ name: 'surveys.view', params: { id: survey.id } }"
        >Edit</router-link
      >
      <div class="d-flex justify-content-between">
        <a
          :href="`/public/surveys/${survey.slug}`"
          target="_blank"
          class="btn btn-outline-secondary btn-sm me-2"
          >View</a
        >
        <button
          type="button"
          @click="deleteSurvey"
          class="btn btn-outline-danger btn-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
