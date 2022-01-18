"use strict";
/**
 * Стиль текста
 *
 */
class TextStyle {
    constructor({inherit = true, color, backgroundColor, fontSize, fontWeight, fontStyle, letterSpacing, wordSpacing, textBaseline, height, leadingDistribution, locale, foreground, background, shadows, fontFeatures, decoration, decorationColor, decorationStyle, decorationThickness, debugLabel, fontFamily, fontFamilyFallback, overflow}={}) {
        this.inherit = inherit, 
        this.color = color;
        this.backgroundColor = backgroundColor;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.fontStyle = fontStyle;
        this.letterSpacing = letterSpacing;
        this.wordSpacing = wordSpacing;
        this.textBaseline = textBaseline;
        this.height = height;
        this.leadingDistribution = leadingDistribution;
        this.locale = locale;
        this.foreground = foreground;
        this.background = background;
        this.shadows = shadows;
        this.fontFeatures = fontFeatures;
        this.decoration = decoration;
        this.decorationColor = decorationColor;
        this.decorationStyle = decorationStyle;
        this.decorationThickness = decorationThickness;
        this.debugLabel = debugLabel;
        this.fontFamily = fontFamily;
        this.fontFamilyFallback = fontFamilyFallback;
        this.overflow = overflow;
    }
    static all({color, width}={}) {
        return new Border({
            color: color,
            width: width,
            radius: 0,
        });
    }
    build() {
        return `${this.width}px solid ${this.color}
        `;
    }
}
