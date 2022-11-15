<script setup>
import { v4 as uuidv4 } from "uuid";
import { useRoute, useRouter } from "vue-router";
import { useSurveyStore } from "@/stores/surveyStore.js";
import QuestionEditor from "@/components/QuestionEditor.vue";
import { ref, watch, computed, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const surveyStore = useSurveyStore();
const editMode = ref(false);

const form = ref({
  id: "",
  title: "",
  status: false,
  description: null,
  image: null,
  expire_date: null,
  questions: [],
});

const addSurvey = async () => {
  try {
    const { data } = await surveyStore.addSurvey(form.value);
    router.push({ name: "surveys.view", params: { id: data.data.id } });
  } catch (error) {
    console.log("Error", error);
  }
};

const addQuestion = (index) => {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: null,
    data: {},
  };
  
  form.value.questions.splice(index, 0, newQuestion);
};

const deleteQuestion = (question) => {
  form.value.questions = form.value.questions.filter(
    (q) => q.id !== question.id
  );
};

const questionChange = (question) => {
  form.value.questions = form.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
};

const uploadFile = (e) => {
  let file = e.target.files[0];
  if (file["size"] <= "2097152") {
    let reader = new FileReader();
    reader.onloadend = (file) => {
      form.value.image = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    //Error
  }
};

watch(
  () => surveyStore.currentSurvey.data,
  (newVal, oldVal) => {
    form.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    };
  }
);

const isLoading = computed(() => surveyStore.currentSurvey.isLoading);

const deleteSurvey = () => {
  if (confirm("Are you sure")) {
    try {
      surveyStore.deleteSurvey(route.params.id);
      router.push({ name: "surveys" });
    } catch (error) {
      console.log({ error });
    }
  }
};

if (route.params.id) {
  surveyStore.getSurvey(route.params.id);
  editMode.value = true;

  //Filling up the existing form with data
  // form.value = surveyStore.data.find(
  //   (survey) => survey.id === parseInt(route.params.id)
  // );
}

</script>

<template>
  <AppPanel>
 
    <template #header>
      <h2>{{ editMode ? form.title : "Add New Survey" }}</h2>

      <router-link
        v-if="!editMode"
        class="btn btn-secondary"
        :to="{ name: 'surveys' }"
        >All Surveys</router-link
      >
      <button
        @click="deleteSurvey"
        v-if="editMode"
        class="btn btn-sm btn-danger"
      >
        Delete
      </button>
    </template>
    <div class="d-flex justify-content-center" v-if="isLoading">Loading...</div>

    <form v-else @submit.prevent="addSurvey">
      <!-- Survey Fields -->
      <div class="mb-3 row d-flex align-items-center">
        <div v-if="form.image" class="col-3">
          <img :src="form.image" class="img-thumbnail w-50 rounded-circle" />
        </div>
        <div class="col">
          <input
            @change="uploadFile"
            class="form-control form-control"
            id="formFileLg"
            type="file"
          />
        </div>
      </div>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="form.title"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          v-model="form.description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="expire_date" class="form-label">Expire Date</label>
        <input
          type="date"
          class="form-control"
          id="expire_date"
          v-model="form.expire_date"
        />
      </div>
      <div class="form-check mb-3">
        <input
          v-model="form.status"
          class="form-check-input"
          type="checkbox"
          value=""
          id="status"
        />
        <label class="form-check-label" for="status">
          Active
        </label>
      </div>
      <!-- /Survey Fields -->

      <!-- Questions -->
      <div class="d-flex justify-content-between mt-4 mb-4">
        <h3>Questions</h3>
        <button
          type="button"
          @click="addQuestion()"
          class="btn btn-outline-secondary"
        >
          Add Question
        </button>
      </div>
      <div class="mb-5">
        <p class="text-center text-muted" v-if="!form.questions.length">
          You Do not Have Any Questions
        </p>
        <div v-for="(question, index) in form.questions" :key="question.id">
          <QuestionEditor
            :question="question"
            :index="index"
            @change="questionChange"
            @addQuestion="addQuestion"
            @deleteQuestion="deleteQuestion"
          />
        </div>
      </div>
      <!-- /Questions -->
      <div class="text-end">
        <button class="btn btn-outline-primary">Save</button>
      </div>
    </form>
  </AppPanel>
</template>
