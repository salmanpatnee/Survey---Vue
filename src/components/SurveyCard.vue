<script setup>
const {survey} = defineProps({
  survey: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["deleteSurvey"]);

</script>

<template>
  <div class="card">
    <img v-if="survey.image" :src="survey.image" class="card-img-top" :alt="survey.title" />
    <img v-else src="//via.placeholder.com/640x640" class="card-img-top" :alt="survey.title" />
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
          @click="$emit('deleteSurvey', survey.id)"
          class="btn btn-outline-danger btn-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
