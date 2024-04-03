import { PDFDocument } from 'pdf-lib';
import { downloadFile } from './file';

async function fillPdfForm(input) {
  try {
    // const response = await axios.get(input, {
    //   responseType: 'arraybuffer',
    // });
    const pdfBytes = input;
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    // Get the form fields by their names.
    const nameField = form.getTextField('CharacterName 2');
    const ageField = form.getTextField('Age');
    const heightField = form.getTextField('Height');
    const weightField = form.getTextField('Weight');
    const eyesField = form.getTextField('Eyes');
    const skinField = form.getTextField('Skin');
    const hairField = form.getTextField('Hair');
    const alliesField = form.getTextField('Allies');
    const factionField = form.getTextField('FactionName');
    const backstoryField = form.getTextField('Backstory');
    const traitsField = form.getTextField('Feat+Traits');
    const treasureField = form.getTextField('Treasure');

    // Set the values for the form fields.
    nameField.setText('Template');
    ageField.setText('24 years');
    heightField.setText(`5' 1"`);
    weightField.setText('196 lbs');
    eyesField.setText('blue');
    skinField.setText('white');
    hairField.setText('brown');
    alliesField.setText(
      [
        `Allies:`,
        `  • Princess Daisy`,
        `  • Princess Peach`,
        `  • Rosalina`,
        `  • Geno`,
        `  • Luigi`,
        `  • Donkey Kong`,
        `  • Yoshi`,
        `  • Diddy Kong`,
        ``,
        `Organizations:`,
        `  • Italian Plumbers Association`,
      ].join('\n'),
    );

    factionField.setText(`Mario's Emblem`);
    backstoryField.setText(
      [
        `Mario is a fictional character in the Mario video game franchise,`,
        `owned by Nintendo and created by Japanese video game designer Shigeru`,
        `Miyamoto. Serving as the company's mascot and the eponymous`,
        `protagonist of the series, Mario has appeared in over 200 video games`,
        `since his creation. Depicted as a short, pudgy, Italian plumber who`,
        `resides in the Mushroom Kingdom, his adventures generally center`,
        `upon rescuing Princess Peach from the Koopa villain Bowser. His`,
        `younger brother and sidekick is Luigi.`,
      ].join('\n'),
    );
    traitsField.setText(
      [
        `Mario can use three basic power-ups:`,
        `  • Super Mushroom: makes Mario grow larger`,
        `  • Fire Flower: allows Mario to throw fireballs`,
        `  • Starman: grants temporary invincibility`,
      ].join('\n'),
    );
    treasureField.setText(['• Gold coins', '• Treasure chests'].join('\n'));

    return pdfDoc;
  } catch (err) {
    console.error('Error:', err);
  }
}

async function saveFilledForm(pdfDoc, output) {
  try {
    const filledFormBytes = await pdfDoc.save();
    downloadFile(filledFormBytes, output);
    console.log('Filled form saved successfully!');
  } catch (err) {
    console.error('Error saving filled form:', err);
  }
}

export async function fillOutPdfAndSave(input, output) {
  //input = 'https://pdf-lib.js.org/assets/dod_character.pdf';
  output = 'output.pdf';

  const pdfDoc = await fillPdfForm(input);
  await saveFilledForm(pdfDoc, output);
}
