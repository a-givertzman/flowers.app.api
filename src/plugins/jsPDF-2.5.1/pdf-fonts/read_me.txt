follow this link to ganerate font file for jsPDF
    https://peckconsulting.s3.amazonaws.com/fontconverter/fontconverter.html

follow this instruction to add custom font to jsPDF
    https://github.com/parallax/jsPDF/issues/2968#issuecomment-796507870


1 create custom font ( use this : https://www.devlinpeck.com/tutorials/jspdf-custom-font#:~:text=Adding%20Custom%20Fonts%20to%20jsPDF,of%20your%20desired%20font%20file.&text=Once%20you%20have%20your%20.,to%20this%20jsPDF%20Font%20Converter )

2 add font to project : for example to the folder /assets/

3 import this font to js:
    import '../plugins/jsPDF-2.5.1/pdf-fonts/Roboto-Regular-normal.js';

4 add font to pdf doc.:
    const pdfDoc = jspdf.jsPDF('p', 'pt', 'a4');
    pdfDoc.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular-normal", "normal");
    pdfDoc.setFont("Roboto-Regular-normal");
    pdfDoc.setFontSize(10);
    pdfDoc.text(`Отчет ${now.toString()}`, 10, 10);
