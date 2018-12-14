const inquirer = require('inquirer');
const fs = require('fs');

const projectDir = process.cwd();
const srcDir = `${projectDir}/src/`;
const templateDir = `${srcDir}core/generator/templates/`;

const targetDirs = {
  model: `${srcDir}models`,
  controller: `${srcDir}controllers`,
  route: `${srcDir}routes`
};

const TEMPLATES = fs.readdirSync(`${templateDir}`);

const QUESTIONS = [
  {
    name: 'project-name',
    type: 'input',
    message: 'Enter your model:',
    validate: function (input) {
      if (/^([A-Za-z])+$/.test(input)) {
        return true;
      } else {
        return 'Project name may only include letters.';
      }
    }
  }
];

const CURR_DIR = projectDir;

inquirer.prompt(QUESTIONS)
  .then((answers) => {
    const model = answers['model'];
    const targets = {
      model: {
        dir: `${srcDir}models`,
        fileName: `${model}.model.js`,
      },
      controller: {
        dir: `${srcDir}controllers`,
        fileName: `${model}.controller.js`,
      },
      route: {
        dir: `${srcDir}models`,
        fileName: `${model}.route.js`,
      }
    };
    for (let key in targets) {
      createDirectoryContents(key, targets[key]);
    };
    // fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    // createDirectoryContents(templatePath, projectName);
});

function createDirectoryContents (fileName, targetDirs) {
  const origFilePath = `${templateDir}${fileName}.js`;
  const stats = fs.statSync(origFilePath);

  if (stats.isFile()) {
    const contents = fs.readFileSync(origFilePath, 'utf8');
    const writePath = `${targetDirs['dir']}/${targetDirs['fileName']}`;
    fs.writeFileSync(writePath, contents, 'utf8');
  } else if (stats.isDirectory()) {
    // fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
    // // recursive call
    // createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
  }
}

// function createDirectoryContents (templatePath, newProjectPath) {
//   const filesToCreate = fs.readdirSync(templatePath);
  
//   filesToCreate.forEach(file => {
//     const origFilePath = `${templatePath}/${file}`;
//     // get stats about the current file
//     const stats = fs.statSync(origFilePath);

//     if (stats.isFile()) {
//       const contents = fs.readFileSync(origFilePath, 'utf8');
      
//       const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
//       fs.writeFileSync(writePath, contents, 'utf8');
//     } else if (stats.isDirectory()) {
//       fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
//       // recursive call
//       createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
//     }
//   });
// }