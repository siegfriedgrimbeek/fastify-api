#!/usr/bin/env node
/**
 * This is readonly file
 */
const inquirer = require('inquirer');
const fs = require('fs');
const shell = require('shelljs');

const projectDir = process.cwd();
const srcDir = `${projectDir}/src/`;
const templateCrudDir = `${projectDir}/bin/templates/crud/`;
const templateNewDir = `${projectDir}/bin/templates/new/`;
const routeDir = `${srcDir}routes/`;

/**
 * generatingFolders item format
 * {
 *  name: string
 * }
 * 
 * generatingFiles item format
 * {
 *  name: string
 * }
 */
let todoList = {
  generatingFiles: {
    controller: null,
    model: null,
    route: null,
    schema: null
  }
};

let notification = {
  added: [],
  modified: []
};

let dataForGenerating = {
  controllerName: '',
  modelName: '',
  routeName: '',
  url: '',
  folderName: '',
  isUncountable: false
};

const INQUIRER_STEPS = {
  model: {
    name: 'name',
    type: 'input',
    message: 'Enter model name:',
    validate: function (input) {
      if (/^[a-z]+(-[a-z]+)*$/g.test(input)) {
        return true;
      } else {
        return 'Model name may only include lower letters or kebab-case.';
      }
    }
  },
  controller: {
    name: 'name',
    type: 'input',
    message: 'Enter your controller:',
    validate: function (input) {
      if (/^([a-z]+(-[a-z]+)*)+(\/([a-z]+(-[a-z]+)*))*$/g.test(input)) {
        return true;
      } else {
        return 'Controller name may only include lower letters or kebab-case.';
      }
    }
  },
  route: (name) => {
    return {
      name: 'name',
      type: 'list',
      message: 'Choise the right route?',
      choices: [`${name}s`, name]
    }
  }
};

const CREATING_MODEL_STEPS = [
  INQUIRER_STEPS.model,
  {
    name: 'hasAction',
    type: 'confirm',
    message: 'Init CRUD actions and routing?'
  }
];

const CREATING_CONTROLLER_STEPS = [
  INQUIRER_STEPS.controller
];

newFileObj = (type, fileName) => {
  let folderOfType = `${type}s`;
  let objName = fileName;
  if (type === 'schema') {
    folderOfType = `routes/documentation`;
    objName = kebabToCamel(fileName);
  } else if (type === 'route') {
    // objName = dataForGenerating.routeName
  }
  return {
    dir: `${srcDir}${folderOfType}/${dataForGenerating.folderName}`,
    fileName: `${fileName}.${type}.js`,
    templateDir: dataForGenerating.templateDir || templateCrudDir,
    name: objName,
    type: type
  }
};

newActions = (hasAction) => {
  let newFiles = {
    controller: newFileObj('controller', dataForGenerating.controllerName),
    route: newFileObj('route', dataForGenerating.controllerName),
    schema: newFileObj('schema', dataForGenerating.controllerName)
  };
  todoList.generatingFiles = { ...todoList.generatingFiles, ...newFiles };
}

generatingModel = async () => {
  await inquirer.prompt(CREATING_MODEL_STEPS).then(async(model) => {
    const modelName = model['model'];
    // define data to create model file
    todoList.generatingFiles.model = newObj('model', modelName);
    if (model['hasAction']) {
      const QUESTIONS = [
        INQUIRER_STEPS.route(modelName)
      ];
      await inquirer.prompt(QUESTIONS).then((choices) => {
        // define data to create controller file
        dataForGenerating.controllerName = modelName;
        // define data to create route file
        dataForGenerating.routeName = modelName;
        // define data to create schema file
        dataForGenerating.schemaName = modelName;
        newActions();
        processFiles();
      });
    }
  });
  // do main duty
}

generatingController = async () => {
  await inquirer.prompt(CREATING_CONTROLLER_STEPS).then(async(controller) => {
    const controllerName = controller['name'];
    processController(controllerName);
    const QUESTIONS = [
      INQUIRER_STEPS.route(controllerName),
      {
        name: 'hasAction',
        type: 'confirm',
        message: 'Init CRUD actions?',
        default: false
      }
    ];
    await inquirer.prompt(QUESTIONS).then(async(route) => {
      dataForGenerating.isUncountable = route['name'] === controllerName;
      dataForGenerating.routeName = route['name'];
      if (route['hasAction']) {
        await inquirer.prompt(INQUIRER_STEPS.model).then(async(model) => {
          dataForGenerating.modelName = model['name'];
        });
      }
    });
  });
  validateToCreateFiles();
}

generatingController();
// generatingModel();

/**
 * this function only use for creating controller action
 */
validateToCreateFiles = () => {
  let basedTemplate = '';
  if (dataForGenerating.modelName) {
    dataForGenerating.templateDir = templateCrudDir;
  } else {
    dataForGenerating.templateDir = templateNewDir;
  }
  newActions();
  processFiles();
}

processController = (str) => {
  let hasFolder = false;
  let arr = str.split('/');
  let length = arr.length;
  let folderName = '';
  if (length === 1) {
    dataForGenerating.controllerName = arr[0];
  } else {
    hasFolder = true;
    dataForGenerating.controllerName = arr[length - 1];
    dataForGenerating.folderName = str.replace(`/${dataForGenerating.controllerName}`, '');
  }
}

processFiles = () => {
  let target = {};
  for (let key in todoList.generatingFiles) {
    target = todoList.generatingFiles[key];
    if (target) {
      createDirectoryContents(target);
    }
  }
}

createDirectoryContents = (target) => {
  if (!fs.existsSync(target['dir'])) {
    shell.mkdir('-p', target['dir']);
  }
  const origFilePath = `${target['templateDir']}${target['type']}.js`;
  const stats = fs.statSync(origFilePath);
  let fileCreated = '';
  if (stats.isFile()) {
    const writePath = `${target['dir']}/${target['fileName']}`;
    if (fs.existsSync(writePath)) {
      // console.log(`${writePath} file already exists.`);
    } else {
      let contents = fs.readFileSync(origFilePath, 'utf8');
      contents = contents.replace(/__MODEL__/g, target['name']);
      contents = contents.replace(/'__ISUNCOUNTABLE__'/g, target['isUncountable'] ? ', true' : '');
      fs.writeFileSync(writePath, contents, 'utf8');
      fileCreated = writePath;
    }
  }
  return fileCreated;
}

changeRouteIndex = (model) => {
  const indexRoutes = `${routeDir}index.js`;
  let contents = fs.readFileSync(`${indexRoutes}`, 'utf8');
  regex = /(module\.exports = \[)(.|\n)*(\])/g;
  checkLastLine = /.+[,].*\n\]$/g;
  checkLastLineNoCmt = /[\.a-z]+\n*\]/g;
  checkBreakline = /\n*(?=(module\.exports = \[)(.|\n)*(\]))/g;
  checkModuleNull = /(module\.exports = \[)(\n)*(\])/g;
  findModuleToInsertImport = /\n(?=\nmodule\.exports)/g;
  let namefile = 'abc';
  if(regex.test(contents) ) {
    const routeName = `${model}Route`;
    let importcontents = `\n\t...${routeName}\n]`;
    switch (true) {
      case checkModuleNull.test(contents):
        break;
      case checkLastLineNoCmt.test(contents):
        importcontents = `,${importcontents}`;
        break
      case checkLastLine.test(contents):
        break
      default:
        contents = contents.replace(/\s(?=\/\/.*\n*\])/g, `, `);
    }
    // import route name
    contents = contents.replace(/\n*\]/g, importcontents);
    const requiredcontents = `const ${routeName} = require('./${model}.route')`;
    contents = contents.replace(checkBreakline, '\n');
    // require route
    contents = contents.replace(findModuleToInsertImport, `\n${requiredcontents}\n`);
  } else {
    console.log('Can not import new route. Please do it manually!');
  }
  fs.writeFileSync(`${indexRoutes}`, contents, 'utf8');
  return `${indexRoutes}`;
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
