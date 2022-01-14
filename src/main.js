"use strict";
window.addEventListener('load', (event) => {                       // ON LOAD WINDOW
    var menuLeftColumnItems = [
        'Клиенты', 'Продукты', 'Закупки', 'Состав закупок', 'Заказы', 'Транзакции',
    ];
    var menuRightColumnItems = [
        'Отчет по клиенту', 'Перевод оплаты по закупкам', 'Перевод денег'
    ];
    var menuLeftColumnActions = [
        onClientsPressed,           // Клиенты
        onProductsPressed,          // Продукты
        onPurchasesPressed,         // Закупки
        onPurchaseContentPressed,   // Состав закупок
        onOrdersPressed,            // Заказы
        onTransactionsPressed,      // Транзакции
    ];
    var menuRightColumnActions = [
        onClientReportPressed,      // Отчет по клиенту
        onPaymentPressed,           // Перевод оплаты по закупкам
        onNewTransactionPressed,    // Перевод денег (транзакция)
    ];
    var app = new App({
        child: new Container({
            child: new MainMenu({
                user: {},
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
                                                    `heder item 1`,{
                                                    style: new TextStyle({
                                                        color: '#ffffff',
                                                        overflow: Text
                                                    }),
                                                }),
                                                border: Border.all({width: 4, color: '#ff2020'}),
                                            }),
                                            color: '#35C0CD', //'transparent',//,
                                            width: 100,
                                            height: 32,
                                            // padding: 4,
                                            // margin: 8,
                                        }),
                                        new Container({
                                            child: new Center({
                                                child: new Text(
                                                    `heder item 2`,{
                                                    style: new TextStyle({
                                                        color: '#ffffff',
                                                    }),
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
                                                    `heder item 3`,{
                                                    style: new TextStyle({
                                                        color: '#ffffff',
                                                    }),
                                                }),
                                            }),
                                            color: 'transparent',
                                            width: 100,
                                            height: 32,
                                            // padding: 4,
                                            // margin: 8,
                                        }),
                                    ],
                                }),
                                color: '#29497F',
                                // width: Number.POSITIVE_INFINITY,
                                height: 64,
                            }),
                            new SizedBox({height: Number.POSITIVE_INFINITY}),
                            new Row({
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                    // new SizedBox({width: Number.POSITIVE_INFINITY}),
                                    new ListView({
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        crossAxisAlignment: CrossAxisAlignment.end,
                                        children: menuLeftColumnItems,
                                        itemBuilder: (index) => {
                                            return new Container ({
                                                child: new TextButton({
                                                    child: new Text(`${menuLeftColumnItems[index]}`),
                                                    style: new ButtonStyle({
                                                        backgroundColor: '#FF9B40',
                                                        foregroundColor: '#ffffff',
                                                    }),
                                                    onPressed: menuLeftColumnActions[index],
                                                }),
                                                width: 250,
                                                padding: 5,
                                            });
                                        },
                                    }),
                                    // new SizedBox({width: 10}),
                                    new ListView({
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: menuRightColumnItems,
                                        itemBuilder: (index) => {
                                            return new Container ({
                                                child: new TextButton({
                                                    child: new Text(`${menuRightColumnItems[index]}`),
                                                    style: new ButtonStyle({
                                                        backgroundColor: '#FF9B40',
                                                        foregroundColor: '#ffffff',
                                                    }),
                                                    onPressed: menuRightColumnActions[index],
                                                }),
                                                width: 250,
                                                padding: 5,
                                            });
                                        },
                                    }),
                                    // new SizedBox({width: Number.POSITIVE_INFINITY}),
                                ],
                            }),
                            new SizedBox({height: Number.POSITIVE_INFINITY, width: Number.POSITIVE_INFINITY}),
                            new Container({
                                    child: new Center({
                                        child: new Text(`footer`),
                                    }),
                                color: '#1E6D74',
                                width: Number.POSITIVE_INFINITY,
                                height: 128,
                                // padding: 10,
                                // margin: 8,
                            }),
                        ],
                    }),
                }),
            }),
            color: '#29497F',
            // height: Number.POSITIVE_INFINITY,
        }),
    });
    app.run();
});

function onClientsPressed(e) {
    console.log('event onClientsPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/1upSq5wiEWr2uxuuTFrT3umHOFTDILxHtpOXqDPXP7cU/edit?usp=sharing');
}
function onProductsPressed(e) {
    console.log('event onProductsPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/1KLYTlaEv3Ujfp5GT0zZoDBJuLGucCqnMZ9EBDBGrxHs/edit?usp=sharing');
}
function onPurchasesPressed(e) {
    console.log('event onPurchasesPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/1TeSwNyv76Rbhug5ouEUmWMs8ij0nGklIBY3uTK1L83M/edit?usp=sharing');
}
function onOrdersPressed(e) {
    console.log('event onOrdersPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/1goc22OHI7d7UfFlWU8DqtgY0c4-D30qBiJlVamcaZWM/edit?usp=sharing');
}
function onPurchaseContentPressed(e) {
    console.log('event onPurchaseContentPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/12dfDYDNL7ch2PBxppSjnb6aurovn-pydtdCn2uxwmwg/edit?usp=sharing');
}
function onTransactionsPressed(e) {
    console.log('event onTransactionsPressed: ', e);
    window.open('https://docs.google.com/spreadsheets/d/11MkKtzftMKyr7ARtCwxn9LSSEMQcqUlwznfun086VTo/edit?usp=sharing');
}
function onClientReportPressed(e) {
    console.log('event onClientReportPressed: ', e);
    window.open('https://u1489690.isp.regruhosting.ru');
}
function onPaymentPressed(e) {
    console.log('event onPaymentPressed: ', e);
    window.open('https://u1489690.isp.regruhosting.ru/payment');
}
function onNewTransactionPressed(e) {
    console.log('event onNewTransactionPressed: ', e);
    alert('Добавление транзакций в разработке');
    // window.open('');
}
