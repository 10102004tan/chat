#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const { existsSync, mkdirSync, writeFile } = require("fs");

//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
program.version("1.0.0").description("CLI for chat app");

/**
 * Create a new model
 */
program
    .command("make:model <modelName>")
    .description("Create a new model")
    .action((modelName) => {
        const modelFileName = `${modelName.toLowerCase()}.model.js`;
        const modelDir = "./src/v1/models";
        const modelPath = `${modelDir}/${modelFileName}`;

        if (!existsSync(modelDir)) {
            mkdirSync(modelDir, { recursive: true });
        }

        // if model file exists
        if (existsSync(modelPath)) {
            console.log(chalk.red(`❌ Model '${modelName}' already exists!`));
            return;
        }

        const modelTemplate = `'use strict';

const {model,Schema} = require('mongoose');

const ${modelName.toLowerCase()}Schema = new Schema({
},{timestamps:true});

module.exports = model('${modelName.toUpperCase()}',${modelName.toLowerCase()}Schema);`;
        // write model file
        writeFile(modelPath, modelTemplate, (err) => {
            if (err) {
                console.log(chalk.red(`❌ Error creating model: ${err.message}`));
            } else {
                console.log(chalk.green(`✅ Model '${modelName}' created successfully at ${modelPath}`));
            }
        });
    });


/**
 * Create a new controller
 */
program
    .command("make:controller <controllerName>")
    .description("Create a new controller")
    .action((controllerName) => {
        const controllerFileName = `${controllerName.toLowerCase()}.controller.js`;
        const controllerDir = "./src/v1/controllers";
        const controllerPath = `${controllerDir}/${controllerFileName}`;

        if (!existsSync(controllerDir)) {
            mkdirSync(controllerDir, { recursive: true });
        }

        // if controller file exists
        if (existsSync(controllerPath)) {
            console.log(chalk.red(`❌ Controller '${controllerName}' already exists!`));
            return;
        }

        const controllerTemplate = `'use strict'
        class ${capitalizeFirstLetter(controllerName)}Controller {
            // add controller methods here
        }
        module.exports = new ${capitalizeFirstLetter(controllerName)}Controller();`;
        ;
        // write controller file
        writeFile(controllerPath, controllerTemplate, (err) => {
            if (err) {
                console.log(chalk.red(`❌ Error creating controller: ${err.message}`));
            } else {
                console.log(chalk.green(`✅ Controller '${controllerName}' created successfully at ${controllerPath}`));
            }
        });
    });


/**
 * Seed database
 */
program
    .command("seed")
    .description("Seed database")
    .option("-n, --name <seedName>", "Seed name")
    .action(({name})=>{
        if (name){
            // run file name.seed.js in seeds directory
            const seedFilePath = `./src/v1/seeds/${name.toLowerCase()}.seed.js`;
            if (existsSync(seedFilePath)){
                require(seedFilePath);
                console.log(chalk.green(`✅ Seed file '${name.toLowerCase()}.seed.js' executed successfully`));
            }
            else{
                console.log(chalk.red(`❌ Seed file '${name.toLowerCase()}.seed.js' not found`));
            }
            process.exit(0);
            return;
        }

        // run all seed files in seeds directory
        const seedDir = "./src/v1/seeds";
        const seedFiles = require("fs").readdirSync(seedDir);
        if (seedFiles.length === 0){
            console.log(chalk.red(`❌ No seed files found in ${seedDir}`));
        }
        seedFiles.forEach((seedFile)=>{
            require(`${seedDir}/${seedFile}`);
            console.log(chalk.green(`✅ Seed file '${seedFile}' executed successfully`));
        });

});


program.parse(process.argv);
