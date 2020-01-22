import { cli, devOps } from '@azure/avocado';//??
import * as logger from './logger';

export async function GetDiffFiles(){
    const config = cli.defaultConfig();
    const pr = await devOps.createPullRequestProperties(config);
  
    if (pr === undefined) {
      console.log("undifined PR");
      return;
    }
  
    const changedFiles = (await pr.diff())
      .filter(change => change.kind !== 'Deleted')
      .map(change => change.path)
      .filter(filePath => filePath.endsWith('.json') && filePath.startsWith('specification/')); //???
    
    if (changedFiles.length === 0) {
      logger.logWarning("No changed spec json file"); //???
      return;
    }
  
    return changedFiles;
  }
