"use strict";
/**
 * Корневой класс страницы, весь ее контент
 * в качестве параметра принимает массив объектов,
 * имеющих метод render(), возвращающий html element
*/
export class ContentOfPage {
    constructor(arrayOfHmlSections = []) {
        console.log('[ContentOfPage.constructor]');
        arrayOfHmlSections.forEach(htmlSection => {
            this[htmlSection.name] = htmlSection.obj;
        });
    }
    render() {
        console.log('[ContentOfPage.render]');
        this.arrayOfHmlSections.forEach(htmlSection => {
            htmlSection.render();
        });
        return 0;
    }
}