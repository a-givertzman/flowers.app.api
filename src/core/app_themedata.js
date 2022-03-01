"use strict";

import { ThemeData, ColorScheme } from "../plugins/js-widgets/theme_data.js";

/**
 * Тема для всего приложения
 */
export const appThemeData = new ThemeData({
    accentColor: '#FF7800',
    colorScheme: new ColorScheme({
        primary: 'rgba(41, 73, 127, 1.0)',
        onPrimary: 'rgba(255, 255, 255, 1.0)',
    })
});