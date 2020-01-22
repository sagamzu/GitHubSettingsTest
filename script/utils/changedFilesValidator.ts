import { defineExecuteCommand, Exec } from './childProcess';
import { GetDiffFiles } from './gitWrapper'
import { ExitCode } from './exitCode';
import * as logger from './logger';


export type CheckContext = {
  exec: Exec;
};
export type CheckOptions = {
  onExecError(result: any): Promise<unknown>;
  onCheckFile(filePath: string, context?: CheckContext): Promise<number>;
  onFinalFailed(context: CheckContext): Promise<unknown>;
}


async function changedFilesValidator(checkOptions: CheckOptions){

  const exec = defineExecuteCommand();
  const context: CheckContext = { exec };
  
  const changedFiles = await GetDiffFiles();
  if (changedFiles === undefined) {
      return;
  }

  let retCode = ExitCode.SUCCESS;

  for (const jsonFile of changedFiles) {
    try{
      const validationResultCode = await checkOptions.onCheckFile(jsonFile, context);
      if (validationResultCode !== ExitCode.SUCCESS) {
        retCode = ExitCode.ERROR;
      }
    } catch (e){
      await checkOptions.onExecError(e);
      retCode = ExitCode.ERROR;
    }
    
  }

  if (retCode !== ExitCode.SUCCESS) {
    await checkOptions.onFinalFailed(context);
  }

  process.exit(retCode);
}


export function runCheckOverChangedFiles(options: CheckOptions){
    changedFilesValidator(options)
    .catch(e => {
        console.error(e); //???
        logger.logError(`Fatal Error. Please report to AzureSentinel@microsoft.com`);
        process.exit(-1);
  });
}
