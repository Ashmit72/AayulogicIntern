import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import colors from "vuetify/lib/util/colors";
import "vuetify/styles";

export default createVuetify({
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: "light",
        variations: {
            colors: ["primary", "secondary", "error", "info", "success", "warning"],
            lighten: 5,
            darken: 5,
        },
        themes: {
            dark: {
                dark: true,
                colors: {
                    primary: "#1976D2",
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
            light: {
                dark: false,
                colors: {
                    primary: "#1976D2",
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },
    defaults: {
        VBtn: {
            class: "text-none",
        },
    },
});
//  console.log(createVuetify().theme.themes.value.light.dark);