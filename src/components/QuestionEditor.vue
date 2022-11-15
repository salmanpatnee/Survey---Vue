<script setup>
import { v4 as uuidv4 } from "uuid";
import { useSurveyStore } from "@/stores/surveyStore.js";
import { ref, computed } from "vue";

const props = defineProps({
  question: Object,
  index: Number,
});

const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

const model = ref(JSON.parse(JSON.stringify(props.question)));
// const model = ref(props.question);
// const question = ref(props.question);

const surveyStore = useSurveyStore();
const questionTypes = computed(() => surveyStore.questionTypes);

const shouldHaveOptions = () => {
  //Checking if the specific values exists in the model
  //php in_array equivalent
  return ["radio", "checkbox", "select"].includes(model.value.type);
};

const addOption = () => {
  setOptions([...getOptions(), { uuid: uuidv4(), text: "" }]);
  dataChange();
};

const removeOption = (option) => {
  setOptions(getOptions().filter((op) => op !== option));
  dataChange();
};

const addQuestion = () => emit("addQuestion", props.index + 1);
const deleteQuestion = () => emit("deleteQuestion", props.question);

const dataChange = () => {
  const data = JSON.parse(JSON.stringify(model.value));
  if (!shouldHaveOptions()) {
    delete data.data.options;
  }
  emit("change", data);
};
const getOptions = () => {
  return model.value.data.options;
};
const setOptions = (options) => {
  model.value.data.options = options;
};
const typeChange = () => {
  if (shouldHaveOptions()) {
    setOptions(getOptions() || []);
  }
  dataChange();
};
</script>
<template>
  <div class="mb-4">
    <!-- Add Delete Question Buttons -->
    <div class="mb-3 d-flex justify-content-between align-content-center">
      <h4>{{ index + 1 }} . {{ model.question }}</h4>
      <div class="d-flex align-items-center justify-content-between">
        <button
          type="button"
          class="btn btn-outline-info btn-sm me-2"
          @click="addQuestion()"
        >
          Add
        </button>
        <button
          type="button"
          class="btn btn-outline-danger btn-sm"
          @click="deleteQuestion()"
        >
          Delete
        </button>
      </div>
    </div>
    <!-- /Add Delete Question Buttons -->

    <div class="row">
      <div class="col-9">
        <div class="mb-3">
          <label :for="`question_text_${model.id}`" class="form-label"
            >Question Text</label
          >
          <input
            type="text"
            :name="`question_text_${model.id}`"
            v-model="model.question"
            @change="dataChange"
            :id="`question_text_${model.id}`"
            class="form-control"
          />
        </div>
      </div>
      <div class="col-3">
        <div class="">
          <label for="question_type" class="form-label"
            >Select Question Type</label
          >
          <select
            id="question_type"
            name="question_type"
            class="form-select text-capitalize"
            v-model="model.type"
            @change="typeChange"
          >
            <option
              v-for="questionType in questionTypes"
              :value="questionType"
              :key="questionType"
            >
              {{ questionType }}</option
            >
          </select>
        </div>
      </div>
    </div>
    <!-- Start question description -->
    <div class="row mb-4">
      <div class="col">
        <label :for="`question_description_${model.id}`" class="form-label"
          >Description</label
        >
        <textarea
          class="form-control"
          :id="`question_description_${model.id}`"
          :name="`question_description_${model.id}`"
          v-model="model.description"
          @change="dataChange"
        >
        </textarea>
      </div>
    </div>
    <!-- End question description -->

    <!-- Start question data -->
    <div class="row" v-if="shouldHaveOptions()">
      <div class="col d-flex justify-content-between mb-4">
        <h5>Options</h5>
        <button
          type="button"
          @click="addOption()"
          class="btn btn sm btn-outline-secondary"
        >
          Add Option
        </button>
      </div>
      <div v-if="!model.data.options.length">
        <p class="text-center text-muted">You Do not Have Any Options</p>
      </div>
      <!-- Start option list -->
      <div
        v-for="(option, index) in model.data.options"
        :key="option.uuid"
        class="d-flex align-content-center"
      >
        <span class="me-3">{{ index + 1 }}</span>
        <input
          type="text"
          v-model="option.text"
          @change="dataChange"
          class="form-control mb-3 me-3"
        />
        <button
          type="button"
          @click="removeOption(option)"
          class="btn btn-sm btn-outline-danger mb-3"
        >
          Delete
        </button>
      </div>
      <!-- End option list -->
    </div>
    <!-- End question data -->

    <div></div>
  </div>
</template>
