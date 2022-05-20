# dependabot-config-generator

CLI tool for [Dependabot config](https://dependabot.com/docs/config-file/) generate.

This CLI tool requires a Node.js version of 10 or higher.

## Install

```bash
npm install -g dependabot-config-generator
# or
yarn global add dependabot-config-generator
```

## Installing locally via Yarn

NB: you'll need to reinstall after every change to pick up the new index.js in other directories!

```bash
yarn global add "file:$PWD"
```

## Usage

```bash
dependabot-config-generator
```

### GIF

![dependabot-config-generator demo gif](./gif/dependabot-config-generator-demo.gif)

Generate a configuration of "Dependabot".

Example:

```yaml
version: 1
update_configs:
  - package_manager: javascript
    directory: /
    update_schedule: daily
    automerged_updates:
      - match:
          dependency_type: all
          update_type: 'semver:minor'
```

## Future Plans

Only required items are supported.
I want this tool to be simple, so I'm thinking of implementing the other settings as optional features.
