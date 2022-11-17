import http from "@/services/HttpService";
import { defineStore, acceptHMRUpdate } from "pinia";

export const useSurveyStore = defineStore("surveyStore", {
  state: () => {
    return {
      questionTypes: ["text", "textarea", "select", "radio", "checkbox"],
      surveys: {
        isLoading: false,
        data: [],
      },
      currentSurvey: {
        isLoading: false,
        data: {},
      },
      dashboard: {
        isLoading: false,
        data: {},
      },
    };
  },
  actions: {
    async getDashboardData() {
      try {
        this.dashboard.isLoading = true;
        const { data } = await http.get(`/api/dashboard`);
        this.dashboard.data = data;
        this.dashboard.isLoading = false;
      } catch (error) {
        console.log({ error });
        this.dashboard.isLoading = false;
      }
    },
    // async addSurvey(survey) {
    //   let response;
    //   if (survey.id) {
    //     response = await http.put(`/api/surveys/${survey.id}`, survey);
    //     this.surveys.data = this.data.map((s) => {
    //       if (s.id === response.data.data.id) {
    //         return response.data.data;
    //       }
    //       return s;
    //     });
    //   } else {
    //     response = await http.post(`/api/surveys`, survey);
    //     this.surveys.data = [...this.surveys.data, response.data.data];
    //   }
    //   return response;
    // },
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
      return http.post(`/api/survey/${surveyId}/answers`, { answers: answers });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSurveyStore, import.meta.hot));
}
