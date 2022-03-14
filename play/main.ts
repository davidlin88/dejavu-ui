import { createApp } from 'vue';
import App from './src/App.vue';
import 'ant-design-vue/es/style';

import Antdv from 'ant-design-vue';

const app = createApp(App);
app.use(Antdv);

app.mount('#play');
