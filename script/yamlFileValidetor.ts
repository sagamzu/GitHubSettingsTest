import { runCheckOverChangedFiles } from './utils/changedFilesValidator';
import {ExitCode } from './utils/exitCode';
import yaml from 'js-yaml';
import fs from 'fs';

export async function IsValidYamlFile(filePath:string): Promise<number> {
        yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
        return ExitCode.SUCCESS;
}

let fileTypeSuffixes = ["yaml","yml"];
let CheckOptions = {
  onCheckFile: (filePath: string) => {
      console.log(filePath);
      return IsValidYamlFile(filePath);
  },
  onExecError:async(e:any) => {
      console.log(`ERROR: incorrect yaml files  ${e.message}`);
    }, 
  onFinalFailed: async () => {
    console.log('ERROR: incorrect yaml files');
  }
}


runCheckOverChangedFiles(CheckOptions, fileTypeSuffixes);
