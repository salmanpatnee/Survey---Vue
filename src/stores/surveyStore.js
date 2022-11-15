import http from "@/services/HttpService";
import { defineStore, acceptHMRUpdate } from "pinia";
const surveys = [
  {
    id: 1,
    title: "Survey 1",
    slug: "survey-1",
    status: "draft",
    image: "https://placeimg.com/400/400/tech",
    description: "Description goes here.",
    created_at: "2021-11-10 13:22:57",
    updated_at: "2021-11-10 13:24:34",
    expire_date: "2021-11-20 13:22:57",
    questions: [
      {
        id: 1,
        type: "select",
        question: "Question 1",
        description: null,
        data: {
          options: [
            {
              uuid: "f1cd02c9-a8ef-470b-a553-600b71183728",
              text: "USA",
            },
            {
              uuid: "2970284e-ae09-4f53-a1fe-c1135643ef0d",
              text: "UK",
            },
            {
              uuid: "2d56f750-ea39-4ff4-951b-e32fcb9a488d",
              text: "Pakistan",
            },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "Question 2",
        description: "Description goes here.",
        data: {
          options: [
            {
              uuid: "74ef5bd3-c3e9-4ae6-80c9-6d4326ebdf5d",
              text: "HTML",
            },
            {
              uuid: "3edfe558-b18a-43d1-91fd-2bb0f220211d",
              text: "CSS",
            },
            {
              uuid: "0c6d6d49-acd2-48ac-a7f9-7efc6ff82abe",
              text: "JavaScript",
            },
          ],
        },
      },
      {
        id: 3,
        type: "radio",
        question: "Question 3",
        description: "Description goes here.",
        data: {
          options: [
            {
              uuid: "f4202bf8-3294-4b19-b1a9-a77764e9173d",
              text: "Laravel",
            },
            {
              uuid: "4a0a989f-2b87-4748-883a-b9ff76612ea5",
              text: "Codeigniter",
            },
            {
              uuid: "2b6ddf75-a5e3-497e-aaa6-b1cdbd577452",
              text: "Cake",
            },
          ],
        },
      },
      {
        id: 4,
        type: "text",
        question: "Question 4",
        description: "Description goes here.",
        data: {},
      },
      {
        id: 5,
        type: "textarea",
        question: "Question 5",
        description: "Description goes here.",
        data: {},
      },
    ],
  },
  {
    id: 2,
    title: "Survey 2",
    slug: "survey-2",
    status: "active",
    image: "https://placeimg.com/400/400/tech",
    description: "Description goes here.",
    created_at: "2021-11-10 13:22:57",
    updated_at: "2021-11-10 13:24:34",
    expire_date: "2021-11-20 13:22:57",
    questions: [
      {
        id: 1,
        type: "select",
        question: "Question 1",
        description: null,
        data: {
          options: [
            {
              uuid: "f1cd02c9-a8ef-470b-a553-600b71183728",
              text: "USA",
            },
            {
              uuid: "2970284e-ae09-4f53-a1fe-c1135643ef0d",
              text: "UK",
            },
            {
              uuid: "2d56f750-ea39-4ff4-951b-e32fcb9a488d",
              text: "Pakistan",
            },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "Question 2",
        description: "Description goes here.",
        data: {
          options: [
            {
              uuid: "74ef5bd3-c3e9-4ae6-80c9-6d4326ebdf5d",
              text: "HTML",
            },
            {
              uuid: "3edfe558-b18a-43d1-91fd-2bb0f220211d",
              text: "CSS",
            },
            {
              uuid: "0c6d6d49-acd2-48ac-a7f9-7efc6ff82abe",
              text: "JavaScript",
            },
          ],
        },
      },
      {
        id: 3,
        type: "radio",
        question: "Question 3",
        description: "Description goes here.",
        data: {
          options: [
            {
              uuid: "f4202bf8-3294-4b19-b1a9-a77764e9173d",
              text: "Laravel",
            },
            {
              uuid: "4a0a989f-2b87-4748-883a-b9ff76612ea5",
              text: "Codeigniter",
            },
            {
              uuid: "2b6ddf75-a5e3-497e-aaa6-b1cdbd577452",
              text: "Cake",
            },
          ],
        },
      },
      {
        id: 4,
        type: "text",
        question: "Question 4",
        description: "Description goes here.",
        data: {},
      },
      {
        id: 5,
        type: "textarea",
        question: "Question 5",
        description: "Description goes here.",
        data: {},
      },
    ],
  },
  {
    id: 3,
    title: "Survey 3",
    slug: "survey-3",
    status: "active",
    image: "https://placeimg.com/400/400/tech",
    description: "Description goes here.",
    created_at: "2021-11-10 13:22:57",
    updated_at: "2021-11-10 13:24:34",
    expire_date: "2021-11-20 13:22:57",
    questions: [
      {
        id: 1,
        type: "select",
        question: "Question 1",
        description: null,
        data: {
          options: [
            {
              uuid: "f1cd02c9-a8ef-470b-a553-600b71183728",
              text: "USA",
            },
            {
              uuid: "2970284e-ae09-4f53-a1fe-c1135643ef0d",
              text: "UK",
            },
            {
              uuid: "2d56f750-ea39-4ff4-951b-e32fcb9a488d",
              text: "Pakistan",
            },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "Question 2",
        description: "Description goes here.",
        data: {
          options: [
            {
              uuid: "74ef5bd3-c3e9-4ae6-80c9-6d4326ebdf5d",
              text: "HTML",
            },
            {
              uuid: "3edfe558-b18a-43d1-91fd-2bb0f220211d",
              text: "CSS",
            },
            {
              uuid: "0c6d6d49-acd2-48ac-a7f9-7efc6ff82abe",
              text: "JavaScript",
            },
          ],
        },
      },
      {
        id: 3,
        type: "radio",
        question: "Question 3",
        description: "Description goes here.",
        data: {
          options: [
            {
              uuid: "f4202bf8-3294-4b19-b1a9-a77764e9173d",
              text: "Laravel",
            },
            {
              uuid: "4a0a989f-2b87-4748-883a-b9ff76612ea5",
              text: "Codeigniter",
            },
            {
              uuid: "2b6ddf75-a5e3-497e-aaa6-b1cdbd577452",
              text: "Cake",
            },
          ],
        },
      },
      {
        id: 4,
        type: "text",
        question: "Question 4",
        description: "Description goes here.",
        data: {},
      },
      {
        id: 5,
        type: "textarea",
        question: "Question 5",
        description: "Description goes here.",
        data: {},
      },
    ],
  },
];

export const useSurveyStore = defineStore("surveyStore", {
  state: () => {
    return {
      surveys: {
        isLoading: false,
        data: [],
      },
      questionTypes: ["text", "textarea", "select", "radio", "checkbox"],
      currentSurvey: {
        isLoading: false,
        data: {},
      },
    };
  },
  actions: {
    async addSurvey(survey) {
      let response;
      if (survey.id) {
        response = await http.put(`/api/surveys/${survey.id}`, survey);
        this.surveys.data = this.data.map((s) => {
          if (s.id === response.data.data.id) {
            return response.data.data;
          }
          return s;
        });
      } else {
        response = await http.post(`/api/surveys`, survey);
        this.surveys.data = [...this.surveys.data, response.data.data];
      }
      return response;
    },
    async getSurveys() {
      try {
        this.surveys.isLoading = true;
        const { data } = await http.get(`/api/surveys`);
        this.surveys.data = data.data;
        this.surveys.isLoading = false;
      } catch (error) {
        console.log({ error });
        this.currentSurvey.isLoading = false;
      }
    },
    async getSurvey(id) {
      try {
        this.currentSurvey.isLoading = true;
        const { data } = await http.get(`/api/surveys/${id}`);
        this.currentSurvey.data = data.data;
        this.currentSurvey.isLoading = false;
      } catch (error) {
        console.log({ error });
        this.currentSurvey.isLoading = false;
      }
    },
    async getSurveyBySlug(slug) {
      try {
        this.currentSurvey.isLoading = true;
        const { data } = await http.get(`/api/survey-by-slug/${slug}`);
        this.currentSurvey.data = data.data;
        this.currentSurvey.isLoading = false;
      } catch (error) {
        console.log({ error });
        this.currentSurvey.isLoading = false;
      }
    },
    async deleteSurvey(id) {
      try {
        return await http.delete(`/api/surveys/${id}`);
      } catch (error) {
        console.log({ error });
      }
    },
    async saveSurveyAnswer(surveyId, answers) {
      return http.post(`/api/survey/${surveyId}/answers`, {answers: answers})
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSurveyStore, import.meta.hot));
}
