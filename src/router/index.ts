import Vue from 'vue';
import VueRouter from 'vue-router';
import TheTasksTab from '@/tabs/TheTasksTab.vue';
import TheKanbanTab from '@/tabs/TheKanbanTab.vue';
import TheActivityTab from '@/tabs/TheActivityTab.vue';
import TheFilesTab from '@/tabs/TheFilesTab.vue';
import PageNotFound from '@/tabs/PageNotFound.vue';
import TheCalendarTab from '@/tabs/TheCalendarTab.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/tasks', component: TheTasksTab },
  { path: '/kanban', component: TheKanbanTab },
  { path: '/activity', component: TheActivityTab },
  { path: '/calendar', component: TheCalendarTab },
  { path: '/files', component: TheFilesTab },
  { path: '*', component: PageNotFound },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
