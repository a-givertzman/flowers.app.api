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

const accentColor = '#FCCA55';
const onAccentColor = '#000000';
const accentContainerColor = '#FF8040';
const onAccentContainerColor = '#000000';

const primary = '#FFFFFF';
const onPrimary = '#1F2B3F';
const primaryContainer = '#DFE4E5';
const onPrimaryContainer = '#000000';
const secondary = '#DFE4E5';
const onSecondary = '#242527';
const secondaryContainer = '#DFE4E5';
const onSecondaryContainer = '#242527';
const surface = '#FDEABF';
const onSurface = '#242527';
const background = '#CBCBCB';
const onBackground = '#1F2B3F';
const error = '#9E001A';
const onError = '#F5EADD';
const shadowColor = '#000000';

const primaryFontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Rubik,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
const secondaryFontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';

const baseFontSize = 14.0;

const appThemeData = new TemeData({
    backgroundColor: background,
    scaffoldBackgroundColor: background,    
    textSelectionTheme: new TextSelectionThemeData({
        cursorColor: '#000000',
        selectionColor: accentColor,
        selectionHandleColor: accentColor,
    }),
    dialogTheme: new DialogTheme({
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
    }),
    colorScheme: new ColorScheme({
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
    }),
    elevatedButtonTheme: new ElevatedButtonThemeData({
        style: new ButtonStyle({
            primary: accentColor,
            onPrimary: onAccentColor,
            onSurface: onSurface,
            shadowColor: shadowColor,
        }),
    }),
    textButtonTheme: new TextButtonThemeData({
        style: new ButtonStyle({
            primary: onAccentColor,
            backgroundColor: accentColor,
        }),
    }),
    appBarTheme: new AppBarTheme({
        titleTextStyle: new TextStyle({
            fontFamily: secondaryFontFamily,
            fontWeight: FontWeight.normal,
            fontSize: baseFontSize * 1.2,
            color: onSecondary,
        }),
    }),
    textTheme: new TextTheme({
        // headline1
        headline2: new TextStyle({
            fontFamily: primaryFontFamily,
            fontSize: baseFontSize + 12.0,
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
        // headline6
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
      }),
});
