import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SmartTable from 'vuejs-smart-table'

createApp(App)
  .use(store)
  .use(router)
  .use(SmartTable)
  .mount('#app')
