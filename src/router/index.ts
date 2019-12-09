import Vue from 'vue';
import VueRouter from 'vue-router';
import TheTasksTab from '@/tabs/TheTasksTab.vue';
import ThePlaceholderTab from '@/tabs/ThePlaceholderTab.vue';
import TheActivityTab from '@/tabs/TheActivityTab.vue';
import PageNotFound from '@/tabs/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/tasks' },
  { path: '/tasks', component: TheTasksTab },
  { path: '/kanban', component: ThePlaceholderTab },
  { path: '/activity', component: TheActivityTab },
  { path: '/calendar', component: ThePlaceholderTab },
  { path: '/files', component: ThePlaceholderTab },
  { path: '*', component: PageNotFound },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
