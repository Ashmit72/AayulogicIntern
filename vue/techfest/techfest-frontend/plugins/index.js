// import "@/plugins/vee-validate";
import router from "@/router";
// import pinia from "@/store";
// import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
// import "@mux/mux-player";
// import "@mux/mux-player/themes/gerwig";
// import { QuillEditor } from "@vueup/vue-quill";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";
import vuetify from "./vuetify";

// const vuetify = createVuetify({
//     autoImport: true
// })

export default function registerPlugins(app) {
    app
        // .component("QuillEditor", QuillEditor)
        .use(vuetify)
        .use(router)
    // .use(pinia)
    // .use(autoAnimatePlugin);
}