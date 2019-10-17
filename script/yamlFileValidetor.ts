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

  const changedJsonFiles1 = await pr.structuralDiff();
  console.log(changedJsonFiles1);
  const changedJsonFiles=  changedJsonFiles1.filter(filePath => filePath.endsWith('.yaml') && filePath.includes('TestFolder'))
    .toArray();
  
  
  if (changedJsonFiles1.length === 0) {
    console.log("No changed spec json file");
    return 0;
  }

  const options = {
    onWarning: function (error:any, filepath:any) {
      retCode = 1;
      console.log(filepath + ' has error: ' + error);
    }
  };

  //let retCode = 0;
  const validator = new YamlValidator(options);
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

