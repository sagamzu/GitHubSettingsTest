import { runCheckOverChangedFiles } from './utils/changedFilesValidator';
import {ExitCode } from './utils/exitCode';
import yaml from 'js-yaml';
import fs from 'fs';

export async function IsValidYamlFile(filePath:string): Promise<number> {
    try {
        yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
        return ExitCode.SUCCESS;
    }
    catch (e) {
        console.error(`Incorrect yaml file. Tile path: ${filePath}. Error message: ${e.message}`);
        return ExitCode.ERROR;
    }
}


runCheckOverChangedFiles({
    onCheckFile: (filePath) => {
      return IsValidYamlFile(filePath);
    },
    onExecError:async () => {
        console.log('ERROR: incorrect yaml files');
      }, 
    onFinalFailed: async () => {
      console.log('ERROR: incorrect yaml files');
    },
    fileTypeSuffixes: ["yaml","yml"]
  })
