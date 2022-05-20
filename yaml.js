const yaml = require('js-yaml');

const generateConfigFile = async (configObj) => {
  const fs = require('fs');
  const fsPromises = require('fs').promises;
  const process = require('process');
  const path = require('path');

  const dependabotDir = '.github';
  const configFile = 'dependabot.yml';
  const isExists = fs.existsSync(path.join(process.cwd(), dependabotDir));

  if (!isExists) {
    await fsPromises.mkdir(dependabotDir);
  }

  await fsPromises.writeFile(path.join(dependabotDir, configFile), configObj);

  console.log(`Generate config file: ${path.join(dependabotDir, configFile)}`);

  return;
};

module.exports.generate = async (
  packageManager,
  directory,
  updateSchedule,
  updateType,
  isTerminalOutput
) => {
  const version = 2;

  const automerged_updates = [
    {
      match: {
        dependency_type: 'all',
        update_type: updateType,
      },
    },
  ];

  // update_schedule needs to be version 2 format
  // Should look like:
  // schedule:
  //     interval: monthly
  //     time: '13:00'
  // To support v1 too (or indeed other package managers)
  // This is a great example of the very first example from Refactoring, _ooh_
  const updates = directory.map((d) => {
    return {
      'package-ecosystem': packageManager,
      directory: d,
      schedule: {
        interval: updateSchedule,
        time: '08:00',
      },
      'open-pull-requests-limit': 5,
      'pull-request-branch-name': {
        separator: '-',
      },
      labels: [`dependabot:${packageManager}`],
    };
  });

  const configObj = { version, updates };

  if (isTerminalOutput) {
    console.log(yaml.dump(configObj));
  } else {
    await generateConfigFile(yaml.dump(configObj));
  }
};
