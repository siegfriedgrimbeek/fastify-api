#!/usr/bin/env node
/**
 * This is readonly file
 */
const inquirer = require('inquirer');
const fs = require('fs');

const projectDir = process.cwd();
const srcDir = `${projectDir}/src/`;
const templateDir = `${srcDir}core/generator/templates/`;
const routeDir = `${srcDir}routes/`;

const STEPS = [
  {
    name: 'model',
    type: 'input',
    message: 'Enter your model:',
    validate: function (input) {
      if (/^[a-z]+-?[a-z]+$/.test(input)) {
        return true;
      } else {
        return 'Model name may only include lower letters.';
      }
    }
  },
  {
    name: 'hasRouting',
    type: 'confirm',
    message: 'Creating CRUD?'
  }
];

generatingModel = () => {
  inquirer.prompt(STEPS).then((answers) => {
    const modelName = answers['model'];
    if (answers['hasRouting']) {
      const QUESTIONS = [
        {
          name: 'route',
          type: 'list',
          message: 'Choise the right route?',
          choices: [`${modelName}s`, modelName]
        }
      ];
      inquirer.prompt(QUESTIONS).then((choices) => {
        processFiles(modelName, choices['route'])
      });
    }
  });
}

generatingModel();

processFiles = (model, route) => {
  const isCountable = model === route;
  let msgs = [];
  const modelName = kebabToUpperCamel(model);
  const schemaName = kebabToCamel(model);
  const targets = {
    model: {
      dir: `${srcDir}models`,
      fileName: `${model}.model.js`,
      name: modelName
    },
    controller: {
      dir: `${srcDir}controllers`,
      fileName: `${model}.controller.js`,
      name: model
    },
    route: {
      dir: `${srcDir}routes`,
      fileName: `${model}.route.js`,
      name: model,
      isUncountable: model === route
    },
    schema: {
      dir: `${srcDir}routes/documentation`,
      fileName: `${model}.schema.js`,
      name: schemaName
    }
  };
  msgs.push(`
  \nCompleted!!!
  \nFiles Added:
  `);
  let changedFile = '';
  for (let key in targets) {
    const newFile = createDirectoryContents(key, targets[key]);
    msgs.push(newFile);
    if (key === 'route') {
      console.log('hahahahahahaha')
      // change route index
      changedFile = changeRouteIndex();
    }
  }; 
  msgs.push(`------------------------------------
  \nFiles Changed:
  `);
  msgs.push(changedFile);
  console.log(msgs.join('\n'));
}

createDirectoryContents = (fileName, targetDirs) => {
  const origFilePath = `${templateDir}${fileName}.js`;
  const stats = fs.statSync(origFilePath);

  if (stats.isFile()) {
    const writePath = `${targetDirs['dir']}/${targetDirs['fileName']}`;
    if (fs.existsSync(writePath)) {
      console.log(`${writePath} file already exists.`);
    } else {
      let contents = fs.readFileSync(origFilePath, 'utf8');
      contents = contents.replace(/__MODEL__/g, targetDirs['name']);
      contents = contents.replace(/'__ISUNCOUNTABLE__'/g, targetDirs['isUncountable'] ? ', true' : '');
      fs.writeFileSync(writePath, contents, 'utf8');
      return writePath;
    }
  } else if (stats.isDirectory()) {
    // fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
    // // recursive call
    // createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
  }
}

changeRouteIndex = () => {
  const indexRoutes = `${routeDir}index.js`;
  let contents = fs.readFileSync(`${indexRoutes}`, 'utf8');
  // let contents = `
  // import { date } from './src'
  
  // module.exports = [
  //  ...date, // comment1
  //  ...input, // comment2
  //  ...select // comment3
  // ]`
  regex = /(module\.exports = \[)(.|\n)+(\])/g
  checkLastLine = /.+[,].*\n\]$/g
  checkLastLineNoCmt = /[\.a-z]+\n\]/g
  checkBreakline = /\n\n*(?=(module\.exports = \[)(.|\n)+(\]))/g
  const needUpdate = regex.test(contents)
  if (needUpdate) {
    const isLastLineNoCmt = checkLastLineNoCmt.test(contents)
    const isLastLine = checkLastLine.test(contents)
    if (isLastLineNoCmt) {
      contents = contents.replace(/\n\]$/g, ',\n]')
    } else if(isLastLine) {
      //
    } else {
      contents = contents.replace(/\s(?=\/\/.*\n\]$)/g, ', ')
    }
    contents = contents.replace(/\]$/g, ' ...expand\n]')
    contents = contents.replace(/\n*(?=(module\.exports = \[)(.|\n)+(\]))/g, '\n')
  } else{
    console.log(`${indexRoutes} file is invalid.`);
  }
  fs.writeFileSync(`${indexRoutes}`, contents, 'utf8');
  return `${indexRoutes}`;
}

// inquirer.prompt(STEPS)
//   .then((answers) => {
//     let msgs = [];
//     const model = answers['model'];
//     const modelName = kebabToUpperCamel(model);
//     const targets = {
//       model: {
//         dir: `${srcDir}models`,
//         fileName: `${modelName}.js`,
//         name: modelName
//       },
//       controller: {
//         dir: `${srcDir}controllers`,
//         fileName: `${model}.controller.js`,
//         name: modelName
//       },
//       route: {
//         dir: `${srcDir}routes`,
//         fileName: `${model}.routes.js`,
//         name: model
//       }
//     };
//     msgs.push(`
//     \nCompleted!!!
//     \nFile Added:
//     `);
//     for (let key in targets) {
//       const newFile = createDirectoryContents(key, targets[key]);
//       msgs.push(newFile);
//     }; 
//     // change route index
//     const changedFile = changeRouteIndex();
//     msgs.push(`------------------------------------
//     \nFile Changeds:
//     `);
//     msgs.push(changedFile);
//     console.log(msgs.join('\n'));
//   }
// );

kebabToCamel = (string) => {
  return string = string.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase(); 
  });
};

kebabToUpperCamel = (string) => {
  string = string.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase(); 
  });
  return string.replace(/\b\w/g, (l) => l.toUpperCase());
};

changeRouteIndexBackup = () => {
  const routes = fs.readdirSync(routeDir);
  let partOfFile = [];
  let routeName = '';
  let routeFile = '';
  let contentRequires = [];
  let contentRoutes = [];
  routes.forEach((file) => {
    const origFilePath = `${routeDir}${file}`;
    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    if (stats.isFile() && file !== 'index.js') {
      partOfFile = file.split('.');
      routeName = kebabToCamel(`${partOfFile[0]}-${partOfFile[1]}`);
      routeFile = `${partOfFile[0]}.${partOfFile[1]}`;
      contentRequires.push(`const ${routeName} = require('./${routeFile}')`);
      contentRoutes.push(`...${routeName}`);
    }
  });
  let contents = fs.readFileSync(`${templateDir}routes.js`, 'utf8');
  contents = contents.replace(/__REQUIRES__/g, contentRequires.join('\n'));
  contents = contents.replace(/__ROUTES__/g, contentRoutes.join(',\n'));
  fs.writeFileSync(`${routeDir}index.js`, contents, 'utf8');
  return `${routeDir}index.js`;
} 
