import { ExecOptions } from 'child_process';
import { childProcess } from '@azure/avocado';

export type Exec = (commandLine: string, options?: ExecOptions) => Promise<number>;

export function defineExecuteCommand(){

    const exec = async (commandLine: string, options: ExecOptions = {}) => {
        console.log(commandLine);

        let result: any = {};
        result = await childProcess.exec(commandLine, options);
    
        return result.code;
      }

    return exec;

}
