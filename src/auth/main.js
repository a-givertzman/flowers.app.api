"use strict";
import { App } from "../plugins/js-widgets/app.js";
import { ButtonStyle } from "../plugins/js-widgets/button_style.js";
import { TextButton } from "../plugins/js-widgets/text_button.js";
import { MainAxisAlignment, CrossAxisAlignment, TextAlign, TextAlignVertical } from "../plugins/js-widgets/alignment.js";
import { Row } from "../plugins/js-widgets/row.js";
import { Border } from "../plugins/js-widgets/border.js";
import { TextFormField } from "../plugins/js-widgets/text_form_field.js";
import { Text } from "../plugins/js-widgets/text.js";
import { TextStyle } from "../plugins/js-widgets/text_style.js";
import { Center } from "../plugins/js-widgets/center.js";
import { Container } from "../plugins/js-widgets/container.js";
import { SizedBox } from "../plugins/js-widgets/sizedbox.js";
import { Column } from "../plugins/js-widgets/column.js";
import { appThemeData } from "../core/app_themedata.js";

window.addEventListener('load', (event) => {                       // ON LOAD WINDOW
    var app = new App({
        child: new Container({
                child: new Center({
                    child: new Column({
                        children: [
                            new Container({
                                child: new Row({
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                        new Container({
                                            child: new Center({
                                                child: new Text(
                                                    `Flowers<br/>App<br/>Казань`,{
                                                    style: {
                                                        ...appThemeData.textTheme.bodyText1,
                                                        ...{color: '#ffffff'}
                                                    },
                                                }),
                                                border: Border.all({width: 4, color: '#ff2020'}),
                                            }),
                                            width: 128,
                                            height: 64,
                                            // padding: 4,
                                            // margin: 8,
                                        }),
                                        new Container({
                                            child: new Center({
                                                child: new Text(
                                                    `Авторизация`,{
                                                    style: {
                                                        ...appThemeData.textTheme.subtitle1, 
                                                        ...{fontSize: 16, color: '#ffffff'}
                                                    },
                                                }),
                                                // border: Border.all({width: 4, color: '#ff2020'}),
                                            }),
                                            color: 'transparent',
                                            width: Number.POSITIVE_INFINITY,
                                            // height: 16,
                                            // padding: 4,
                                            // margin: 8,
                                        }),
                                        new Container({
                                            child: new Center({
                                                child: new Text(
                                                    ``,{
                                                    style: {
                                                        ...appThemeData.textTheme.subtitle1, 
                                                        ...{textAlign: TextAlign.right, color: '#ffffff'}
                                                    },
                                                }),
                                            }),
                                            width: 256,
                                            height: 64,
                                        }),
                                    ],
                                }),
                                color: '#29497F',
                                // width: Number.POSITIVE_INFINITY,
                                height: 64,
                            }),
                            new SizedBox({height: Number.POSITIVE_INFINITY}),
                            new Column({
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                    new Text('Номер телефона:', {
                                        style: new TextStyle({

                                        })
                                    }),
                                    new TextFormField({
                                        style: new TextStyle({
                                            
                                        }),
                                        onChanged: (value) => {
                                            console.log('Номер телефона: ', value);
                                        },
                                    }),
                                    new SizedBox({height: 24}),
                                    new Text('Пароль:', {
                                        style: new TextStyle({
                                            
                                        })
                                    }),
                                    new TextFormField({
                                        style: new TextStyle({
                                            
                                        }),
                                        onChanged: onPassChanged,
                                    }),
                                    new SizedBox({height: 24}),
                                    new Container ({
                                        child: new TextButton({
                                            child: new Text(
                                                'вход', {
                                                // style: menuButtonsTextStyle,
                                            }),
                                            style: new ButtonStyle({
                                                backgroundColor: '#FF9B40',
                                                foregroundColor: '#ffffff',
                                            }),
                                            onPressed: (e) => {
                                                console.log('TextButton cliced');
                                            },
                                        }),
                                        width: 128,
                                        height: 24,
                                        padding: 4,
                                    })                                ],
                            }),
                            new SizedBox({height: Number.POSITIVE_INFINITY, width: Number.POSITIVE_INFINITY}),
                            new Container({
                                    child: new Center({
                                        child: new Text(`footer`,{
                                            style: {
                                                ...appThemeData.textTheme.bodyText1, 
                                                ...{color: '#ffffff'}
                                            },
                                        }),
                                    }),
                                color: '#323232',
                                width: Number.POSITIVE_INFINITY,
                                height: 128,
                                padding: 4,
                                // margin: 8,
                            }),
                        ],
                    }),
                }),
            }),
            color: '#29497F',
            // height: Number.POSITIVE_INFINITY,
        });
    app.run();
});

function onLoginChanged(value) {
    console.log('Номер телефона: ', value);
}

function onPassChanged(value) {
    console.log('Пароль: ', value);
}