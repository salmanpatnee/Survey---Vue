<script setup>
import { useSurveyStore } from "@/stores/surveyStore.js";
import { ref } from "vue";

const { question, index, modelValue } = defineProps({
  question: Object,
  index: Number,
  modelValue: [String, Array],
});

const emit = defineEmits(["update:modelValue"]);

let model;
if (question.type === "checkbox") {
  model = ref({});
}

const surveyStore = useSurveyStore();

const handleChecboxChange = () => {
  const selectedOptions = [];
  for(let text in model.value){
    if(model.value[text]){
      selectedOptions.push(text)
    }
  }
  emit("update:modelValue", selectedOptions)
}

</script>
<template>
  <fieldset class="mb-4">
    <div>
      <legend>{{ index + 1 }}. {{ question.question }}</legend>
      <p class="lead">{{ question.description }}</p>
    </div>
    <div class="mt-3">
      <div v-if="question.type === 'select'">
        <select
          class="form-select"
          :value="modelValue"
          @change="emit('update:modelValue', $event.target.value)"
        >
          <option value="">--Select--</option>
          <option
            v-for="option in question.data.options"
            :key="option.uuid"
            :value="option.text"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div v-else-if="question.type === 'radio'">
        <div
          class="form-check"
          v-for="option in question.data.options"
          :key="option.uuid"
        >
          <input
            class="form-check-input"
            type="radio"
            :value="option.text"
            :id="option.uuid"
            name="questionTypeRadio"
            @change="emit('update:modelValue', $event.target.value)"
          />
          <label class="form-check-label" :for="option.uuid">
            {{ option.text }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'checkbox'">
        <div class="form-check form-check-inline">
          <div
            class=""
            v-for="option in question.data.options"
            :key="option.uuid"
          >
            <input
              class="form-check-input"
              type="checkbox"
              v-model="model[option.text]"
              @change="handleChecboxChange"
              :id="option.uuid"
            />
            <label class="form-check-label" :for="option.uuid">
              {{ option.text }}
            </label>
          </div>
        </div>
      </div>
      <div v-else-if="question.type === 'text'">
        <div class="mb-3">
          <label :for="question.id" class="form-label">{{
            question.question
          }}</label>
          <input
            type="text"
            class="form-control"
            :id="question.id"
            :value="modelValue"
            @change="emit('update:modelValue', $event.target.value)"
          />
        </div>
      </div>
      <div v-else-if="question.type === 'textarea'">
        <div class="mb-3">
          <label :for="question.id" class="form-label">{{
            question.question
          }}</label>
          <textarea
            class="form-control"
            :id="question.id"
            :value="modelValue"
            @change="emit('update:modelValue', $event.target.value)"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  </fieldset>
  <hr />
</template>
