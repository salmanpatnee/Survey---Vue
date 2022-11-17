import http from "@/services/HttpService";
import { defineStore, acceptHMRUpdate } from "pinia";

export const tokenKey = "TOKEN";
export const userKey = "USER";

export const useAuthUserStore = defineStore("authUserStore", {
  state: () => {
    return {
      user: {
        data: JSON.parse(sessionStorage.getItem(userKey)),
        token: sessionStorage.getItem(tokenKey),
      },
    };
  },
  actions: {
    setUser(data) {
      this.user.data = data.user;
      this.user.token = data.token;
      sessionStorage.setItem(tokenKey, data.token);
      sessionStorage.setItem(userKey, JSON.stringify(data.user));
    },
    async logout() {
      const response = await http.post(`/api/logout`);

      if(response.status === 200){
        this.user.data = {};
        this.user.token = null;
        sessionStorage.removeItem(tokenKey);
        sessionStorage.removeItem(userKey);
        return response;
      }

    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot));
}
