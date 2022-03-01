"use strict";
// import { Widget } from "./widget";
/**
 * Стиль кнопки
 *
 * @param {Color} backgroundColor цвет фона
 * @param {string} foregroundColor цвет текста и иконки
 * @param {string} foregroundColor цвет состояний focused, hovered, pressed.
 */
export class ElevatedButtonStyle {
    constructor({
        backgroundColor, 
        foregroundColor, 
        overlayColor, 
        shadowColor, 
        elevation, 
        padding, 
        minimumSize, //Size
        maximumSize, //Size
        fixedSize, //Size
        side, //BorderSide
        shape, //OutlinedBorder
        mouseCursor, //MouseCursor
        visualDensity, //VisualDensity
        animationDuration, //Duration
        alignment, //AlignmentGeometry
        fontFamily,
        fontWeight,
        fontSize,
}={}) {
        this.backgroundColor = backgroundColor; 
        this.foregroundColor = foregroundColor; 
        this.overlayColor = overlayColor; 
        this.shadowColor = shadowColor; 
        this.elevation = elevation; 
        this.padding = padding; 
        this.minimumSize = minimumSize; //Size
        this.maximumSize = maximumSize; //Size
        this.fixedSize = fixedSize; //Size
        this.side = side; //BorderSide
        this.shape = shape; //OutlinedBorder
        this.mouseCursor = mouseCursor; //MouseCursor
        this.visualDensity = visualDensity; //VisualDensity
        this.animationDuration = animationDuration; //Duration
        this.alignment = alignment; //AlignmentGeometry
        this.fontFamily = fontFamily;
        this.fontWeight = fontWeight;
        this.fontSize = fontSize;
    }
}