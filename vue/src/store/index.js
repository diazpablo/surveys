import { createStore } from 'vuex';
import axiosClient from '../axios';

const tmpSurveys = [
  {
    id: 100,
    title: 'Survey 1',
    slug: 'survey-1',
    statue: 'draft',
    image: 'https://via.placeholder.com/150',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    created_at: '2020-01-01 00:00:00',
    updated_at: '2020-01-01 00:00:00',
    expire_date: '2022-05-01 00:00:00',
    questions: [
      {
        id: 1,
        type: 'select',
        survey_id: 100,
        question: 'Question 1',
        description: null,
        data: {
          options: [
            {
              uuid: 'f8b8f8b8-f8b8-f8b8-f8b8-f8b8f8b8f8b8',
              text: "Option 1",
            },
            {
              uuid: '201f1f1f-1f1f-1f1f-1f1f-1f1f1f1f1f1f',
              text: "Option 2",
            },
            {
              uuid: 'a8b8f8b8-f8b8-f8b8-f8b8-f8b8f8b8f8b8',
              text: "Option 3",
            },
          ],
        },
      },
    ],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
  },
  mutations: {
    logout: state => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },
  },
  actions: {
    register({ commit }, user) {
      return axiosClient.post('/register', user)
        .then(({ data }) => {
          commit('setUser', data);
          return data;
        });
    },
    login({ commit }, user) {
      return axiosClient.post('/login', user)
        .then(({ data }) => {
          commit('setUser', data);
          return data;
        });
    },
    logout({ commit }) {
      return axiosClient.post('/logout')
        .then(({ data }) => {
          commit('logout');
          return data;
        });
    },
  },
  getters: {},
  modules: {},
});

export default store;
