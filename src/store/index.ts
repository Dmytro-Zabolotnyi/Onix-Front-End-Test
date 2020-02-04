import Vue from 'vue';
import Vuex from 'vuex';
import {
  extractVuexModule, createProxy,
} from 'vuex-class-component';
import createPersistedState from 'vuex-persistedstate';
import TasksStore from '@/store/modules/tasks';
import ActivitiesStore from '@/store/modules/activities';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(TasksStore),
    ...extractVuexModule(ActivitiesStore),
  },
  plugins: [createPersistedState()],
});

export const proxy = {
  tasksStore: createProxy(store, TasksStore),
  activitiesStore: createProxy(store, ActivitiesStore),
};
