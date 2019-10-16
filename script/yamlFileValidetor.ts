import { devOps, cli } from '@azure/avocado';
const YamlValidator = require('yaml-validator');

const main = async () => {
  const config = cli.defaultConfig();
  const pr = await devOps.createPullRequestProperties(config);
  if (pr === undefined) {
    logWarn("Not in CI environment. Run against all the spec json.");
    return verboseExec(`???????????????????`);
  }

  const changedJsonFiles = await pr.structuralDiff()
    .filter(filePath => filePath.endsWith('.yml') && filePath.startsWith('TestFolder/'))
    .toArray();
  if (changedJsonFiles.length === 0) {
    logWarn("No changed spec json file");
    return 0;
  }

  let retCode = 0;
  const validator = new YamlValidator();
    validator.validate(changedJsonFiles);
    validator.report();
}


main().then(retCode => {
  if (retCode !== 0) {
    logError('Please fix the error or add words to ./custom-words.txt');
  }
  process.exit(retCode);
});
