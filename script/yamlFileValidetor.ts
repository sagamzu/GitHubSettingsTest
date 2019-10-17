import { devOps, cli } from '@azure/avocado';
const YamlValidator = require('yaml-validator');



const main = async () => {
  let retCode = 0;
  
  const config = cli.defaultConfig();
  //config.env
  const pr = await devOps.createPullRequestProperties(config);
  if (pr === undefined) {
     console.log(`!!!!!!!!!!!!!!!!!! pr is undefined `);
    return ;
  }

  const changedJsonFiles1 = await pr.structuralDiff().toArray();
  console.log(changedJsonFiles1.length);
  const changedJsonFiles=  changedJsonFiles1.filter(filePath => filePath.endsWith('.yaml') && filePath.includes('TestFolder'));
  
  
  if (changedJsonFiles.length === 0) {
    console.log("No changed spec json file");
    return 0;
  }


  //let retCode = 0;
  const validator = new YamlValidator();
    validator.validate(changedJsonFiles);
    validator.report();
    return retCode;
}


main().then(retCode => {
  if (retCode !== 0) {
    console.log(`!!!!!!!!!!!!!!!!!!  ERROR `);
  }
  process.exit(retCode);
});

