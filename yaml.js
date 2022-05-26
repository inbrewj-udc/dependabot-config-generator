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
  ignoreUpdatesOfType,
  isTerminalOutput
) => {
  const version = 2;

  // update_schedule needs to be version 2 format
  // Should look like:
  // schedule:
  //     interval: monthly
  //     time: '13:00'
  // To support v1 too (or indeed other package managers)
  // This is a great example of the very first example from Refactoring, _ooh_

  const openPullRequestLimitPerPackageJson = (() => {
    // this is the pull request limit PER package.json in a repo, not
    // per repo
    const numberOfPackageJsons = directory.length;
    switch (numberOfPackageJsons) {
      case 1:
        // For one package.json, we're probably not in a monorepo
        // 6 PRs per month will probably cover it
        return 6;
      case 2:
        // Probably root level package.json and an early monorepo
        // still keep it to 6 PRs
        return 3;
      case 3:
        // Root level package.json and two packages, 2 PRs per is fine
        return 2;
      default:
        // We've probably got a _load_ of packages in the repo
        // keep it to one per package
        return 1;
    }
  })();

  const updates = directory.map((d) => {
    return {
      'package-ecosystem': packageManager,
      directory: d,
      schedule: {
        interval: updateSchedule,
        time: '08:00',
      },
      'open-pull-requests-limit': openPullRequestLimitPerPackageJson,
      'pull-request-branch-name': {
        separator: '-',
      },
      ignore: [
        {
          'dependency-name': '*',
          'update-types': [`version-update:${ignoreUpdatesOfType}`],
        },
      ],
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
