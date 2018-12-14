/**
 * This is readonly file
 */
const inquirer = require('inquirer');
const fs = require('fs');

const projectDir = process.cwd();
const srcDir = `${projectDir}/src/`;
const templateDir = `${srcDir}core/generator/templates/`;
const routeDir = `${srcDir}/routes/`;

const STEPS = [
  {
    name: 'model',
    type: 'input',
    message: 'Enter your model:',
    validate: function (input) {
      if (/^([a-z])+$/.test(input)) {
        return true;
      } else {
        return 'Model name may only include letters.';
      }
    }
  }
];

inquirer.prompt(STEPS)
  .then((answers) => {
    const model = answers['model'];
    const modelName = kebabToUpperCamel(model);
    const targets = {
      model: {
        dir: `${srcDir}models`,
        fileName: `${modelName}.js`,
        name: modelName
      },
      controller: {
        dir: `${srcDir}controllers`,
        fileName: `${model}.controller.js`,
        name: modelName
      },
      route: {
        dir: `${srcDir}routes`,
        fileName: `${model}.routes.js`,
        name: model
      }
    };
    for (let key in targets) {
      createDirectoryContents(key, targets[key]);
    };
    // change route index
    changeRouteIndex();
  }
);

changeRouteIndex = () => {
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
} 

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

createDirectoryContents = (fileName, targetDirs) => {
  const origFilePath = `${templateDir}${fileName}.js`;
  const stats = fs.statSync(origFilePath);

  if (stats.isFile()) {
    let contents = fs.readFileSync(origFilePath, 'utf8');
    contents = contents.replace(/__MODEL__/g, targetDirs['name']);
    
    const writePath = `${targetDirs['dir']}/${targetDirs['fileName']}`;
    fs.writeFileSync(writePath, contents, 'utf8');
  } else if (stats.isDirectory()) {
    // fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
    // // recursive call
    // createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
  }
}
