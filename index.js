import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

inquirer
  .prompt([
    {
      type: "input",
      name: "website",
      message: "What website do you want to QR?",
    },
  ])
  .then((answers) => {
    const url = answers.website;

    const qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("qr_image.png"));

    fs.writeFile("qr_text.txt", url, (err) => {
      if (err) throw err;
      console.log("File has been created!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
