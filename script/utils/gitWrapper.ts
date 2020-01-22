import { cli, devOps } from '@azure/avocado';//??
import * as logger from './logger';

export async function GetDiffFiles(){
    const config = cli.defaultConfig();
    const pr = await devOps.createPullRequestProperties(config);
  
    if (pr === undefined) {
      console.log("undifined PR");
      return;
    }
  
     let changedFiles = await pr.diff();
    console.log(`${changedFiles.length} files changed in current pr`);

    const filterChangedFiles = changedFiles
      .filter(change => change.kind !== 'Deleted')
      .map(change => change.path)
      .filter(filePath => filePath.endsWith('.json') && filePath.startsWith('specification/')); //???
    
    if (filterChangedFiles.length === 0) {
      logger.logWarning("No changed spec json file"); //???
      return;
    }

    console.log(`${filterChangedFiles.length} changed files after filter`);
  
    return changedFiles;
  }
