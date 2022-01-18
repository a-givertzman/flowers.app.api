const Brightness = {
    dark: 0,
    light: 1,
}

class TextSelectionThemeData {
    constructor({}={}) {

    }
}

class DialogTheme {
    constructor({}={}) {

    }
}

class ColorScheme {
    constructor({}={}) {

    }
}

class AppBarTheme {
    constructor({}={}) {

    }
}

class TextTheme {
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

class TextButtonThemeData {
    constructor({}={}) {

    }
}

class ElevatedButtonThemeData {
    constructor({}={}) {

    }
}

class TemeData {
    constructor({
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
        this.elevatedButtonTheme = elevatedButtonTheme ? elevatedButtonTheme : ElevatedButtonThemeData({
            style: ElevatedButton.styleFrom({
                primary: accentColor,
                onPrimary: onAccentColor,
                onSurface: onSurface,
                shadowColor: shadowColor,
            }),
        });
        this.textButtonTheme = textButtonTheme ? textButtonTheme : TextButtonThemeData({
            style: new ButtonStyle({
                primary: onAccentColor,
                backgroundColor: accentColor,
            }),
        });
        this.appBarTheme = appBarTheme ? appBarTheme : new AppBarTheme({
            titleTextStyle: ButtonStyle({
                fontFamily: secondaryFontFamily,
                fontWeight: FontWeight.normal,
                fontSize: baseFontSize * 1.2,
                color: onSecondary,
            }),
        }),
        this.textTheme = textTheme ? textTheme : new TextTheme({
            // headline1
            headline2: TextStyle({
                fontFamily: primaryFontFamily,
                fontSize: baseFontSize + 12.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            headline3: TextStyle({
                fontFamily: primaryFontFamily,
                fontSize: baseFontSize + 12.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            headline4: TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize + 6.0,     //18
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            // headline5
            // headline6
            subtitle1: TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize + 2.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            subtitle2: TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize + 2.0,
                fontWeight: FontWeight.normal,
                color: onBackground,
            }),
            bodyText1: TextStyle({
                fontFamily: secondaryFontFamily,
                fontSize: baseFontSize,
                fontWeight: FontWeight.normal,
                color: onBackground,
                height: 1.5,
            }),
            bodyText2: TextStyle({
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

