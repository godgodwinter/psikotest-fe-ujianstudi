import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import './assets/main.css'
import "./style.css";

// library fixed
import VueGoodTablePlugin from "vue-good-table-next";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import "vue-select/dist/vue-select.css";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// import { VueSelect } from "vue-select";
import vSelect from "vue-select";

// style
import "vue-good-table-next/dist/vue-good-table-next.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueGoodTablePlugin);
app.use(VueQueryPlugin)
// app.use(VueSelect)
app.component("v-select", vSelect);
app.component('QuillEditor', QuillEditor)
app.component('VueDatePicker', VueDatePicker);

app.mount("#app");
