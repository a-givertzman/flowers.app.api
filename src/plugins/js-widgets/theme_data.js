"use strict";
/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2021 Anton Lobanov

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { TextStyle } from "./text_style.js";
import { FontWeight } from "./font_weight.js";
import { ButtonStyle } from "./button_style.js";
import { ElevatedButtonStyle } from "./elevated_button_style.js";

export class ThemeData {
    constructor({
        accentColor = '#FF7800',
        onAccentColor = 'rgba(255, 255, 255, 1.0)',
        secondary = 'rgba(41, 73, 127, 1.0)',
        onSecondary = 'rgba(255, 255, 255, 1.0)',
        onSurface = 'rgba(255, 255, 255, 1.0)',
        onBackground = 'rgba(255, 255, 255, 1.0)',
        shadowColor = 'rgba(25, 25, 25, 0.7)',
        primaryFontFamily = 'Roboto',
        secondaryFontFamily = 'Rubik',
        baseFontSize = 14,
        backgroundColor, scaffoldBackgroundColor, textSelectionTheme, 
        dialogTheme, colorScheme, elevatedButtonTheme, textButtonTheme, 
        appBarTheme, textTheme, 
    }={}) {
        this.backgroundColor = backgroundColor ? backgroundColor : '#ffffff';
        this.scaffoldBackgroundColor = scaffoldBackgroundColor ? scaffoldBackgroundColor : '#ffffff';
        this.textSelectionTheme = textSelectionTheme? textSelectionTheme : new TextSelectionThemeData({
            cursorColor: '#000000',
            selectionColor: accentColor,
            selectionHandleColor: accentColor,
        });
        this.dialogTheme = dialogTheme ? dialogTheme : new DialogTheme({
            backgroundColor: secondary,
            titleTextStyle: new TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize + 6.0,
                fontWeight: FontWeight.w500,
                color: onSecondary,
            }),
            contentTextStyle: new TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize,
                fontWeight: FontWeight.normal,
                color: onSecondary,
            }),
        });
        this.colorScheme = colorScheme ? colorScheme : new ColorScheme({
            primary: primary,
            onPrimary: onPrimary,
            primaryContainer: primaryContainer, 
            onPrimaryContainer: onPrimaryContainer,
            secondary: secondary,
            onSecondary: onSecondary,
            secondaryContainer: secondaryContainer,
            onSecondaryContainer: onSecondaryContainer,
            tertiary: accentColor,
            onTertiary: onAccentColor,
            tertiaryContainer: accentContainerColor,
            onTertiaryContainer: onAccentContainerColor,
            surface: surface,
            onSurface: onSurface,
            background: background,
            onBackground: onBackground,
            error: error,
            onError: onError,
            brightness: Brightness.light,
        });
        this.elevatedButtonTheme = elevatedButtonTheme ? elevatedButtonTheme : new ElevatedButtonThemeData({
            style: new ElevatedButtonStyle({
                primary: accentColor,
                onPrimary: onAccentColor,
                onSurface: onSurface,
                shadowColor: shadowColor,
            }),
        });
        this.textButtonTheme = textButtonTheme ? textButtonTheme : new TextButtonThemeData({
            style: new ButtonStyle({
                primary: onAccentColor,
                backgroundColor: accentColor,
            }),
        });
        this.appBarTheme = appBarTheme ? appBarTheme : new AppBarTheme({
            titleTextStyle: new ButtonStyle({
                fontFamily: secondaryFontFamily,
                fontWeight: FontWeight.normal,
                fontSize: baseFontSize * 1.2,
                color: onSecondary,
            }),
        }),
        this.textTheme = textTheme ? textTheme : new TextTheme({
            headline1: new TextStyle({
                fontFamily: primaryFontFamily,
                fontSize: baseFontSize + 18.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            headline2: new TextStyle({
                fontFamily: primaryFontFamily,
                fontSize: baseFontSize + 16.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            headline3: new TextStyle({
                fontFamily: primaryFontFamily,
                fontSize: baseFontSize + 12.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            headline4: new TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize + 6.0,     //18
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            // headline5
            headline6: new TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize + 4.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            subtitle1: new TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize + 2.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            subtitle2: new TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize + 2.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            bodyText1: new TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize,
                fontWeight: FontWeight.normal,
                color: onBackground,
                height: 1.5,
            }),
            bodyText2: new TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize,
                fontWeight: FontWeight.normal,
                color: onBackground,
                height: 1.5,
            }),
            // caption
            // button
            // overline
        });
    }
}

export const Brightness = {
    dark: 0,
    light: 1,
}

export class TextSelectionThemeData {
    constructor({}={}) {

    }
}

export class DialogTheme {
    constructor({}={}) {

    }
}

export class ColorScheme {
    constructor({
        primary: primary,
        onPrimary: onPrimary,
        primaryContainer: primaryContainer, 
        onPrimaryContainer: onPrimaryContainer,
        secondary: secondary,
        onSecondary: onSecondary,
        secondaryContainer: secondaryContainer,
        onSecondaryContainer: onSecondaryContainer,
        tertiary: accentColor,
        onTertiary: onAccentColor,
        tertiaryContainer: accentContainerColor,
        onTertiaryContainer: onAccentContainerColor,
        surface: surface,
        onSurface: onSurface,
        background: background,
        onBackground: onBackground,
        error: error,
        onError: onError,
        brightness: brightness,
    }={}) {
       this.primary = primary;
       this.onPrimary = onPrimary;
       this.primaryContainer = primaryContainer;
       this.onPrimaryContainer = onPrimaryContainer;
       this.secondary = secondary;
       this.onSecondary = onSecondary;
       this.secondaryContainer = secondaryContainer;
       this.onSecondaryContainer = onSecondaryContainer;
       this.tertiary = accentColor;
       this.onTertiary = onAccentColor;
       this.tertiaryContainer = accentContainerColor;
       this.onTertiaryContainer = onAccentContainerColor;
       this.surface = surface;
       this.onSurface = onSurface;
       this.background = background;
       this.onBackground = onBackground;
       this.error = error;
       this.onError = onError;
       this.brightness = brightness;
    }
}

export class AppBarTheme {
    constructor({}={}) {

    }
}

export class TextTheme {
    constructor({
        displayLarge,
        displayMedium,
        displaySmall,
        headlineLarge,
        headlineMedium,
        headlineSmall,
        titleLarge,
        titleMedium,
        titleSmall,
        bodyLarge,
        bodyMedium,
        bodySmall,
        labelLarge,
        labelMedium,
        labelSmall,
        headline1,
        headline2,
        headline3,
        headline4,
        headline5,
        headline6,
        subtitle1,
        subtitle2,
        bodyText1,
        bodyText2,
        caption,
        button,
        overline,        
    }={}) {
        this.displayLarge = displayLarge ? displayLarge : new TextStyle();
        this.displayMedium = displayMedium ? displayMedium : new TextStyle();
        this.displaySmall = displaySmall ? displaySmall : new TextStyle();
        this.headlineLarge = headlineLarge ? headlineLarge : new TextStyle();
        this.headlineMedium = headlineMedium ? headlineMedium : new TextStyle();
        this.headlineSmall = headlineSmall ? headlineSmall : new TextStyle();
        this.titleLarge = titleLarge ? titleLarge : new TextStyle();
        this.titleMedium = titleMedium ? titleMedium : new TextStyle();
        this.titleSmall = titleSmall ? titleSmall : new TextStyle();
        this.bodyLarge = bodyLarge ? bodyLarge : new TextStyle();
        this.bodyMedium = bodyMedium ? bodyMedium : new TextStyle();
        this.bodySmall = bodySmall ? bodySmall : new TextStyle();
        this.labelLarge = labelLarge ? labelLarge : new TextStyle();
        this.labelMedium = labelMedium ? labelMedium : new TextStyle();
        this.labelSmall = labelSmall ? labelSmall : new TextStyle();
        this.headline1 = headline1 ? headline1 : new TextStyle();
        this.headline2 = headline2 ? headline2 : new TextStyle();
        this.headline3 = headline3 ? headline3 : new TextStyle();
        this.headline4 = headline4 ? headline4 : new TextStyle();
        this.headline5 = headline5 ? headline5 : new TextStyle();
        this.headline6 = headline6 ? headline6 : new TextStyle();
        this.subtitle1 = subtitle1 ? subtitle1 : new TextStyle();
        this.subtitle2 = subtitle2 ? subtitle2 : new TextStyle();
        this.bodyText1 = bodyText1 ? bodyText1 : new TextStyle();
        this.bodyText2 = bodyText2 ? bodyText2 : new TextStyle();
        this.caption = caption ? caption : new TextStyle();
        this.button = button ? button : new TextStyle();
        this.overline = overline ? overline : new TextStyle();
    }
}

export class TextButtonThemeData {
    constructor({}={}) {

    }
}

export class ElevatedButtonThemeData {
    constructor({}={}) {

    }
}
