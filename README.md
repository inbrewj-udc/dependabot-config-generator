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

For reasons I don't understand, installing locally does not add the command `dependabot-config-generator` onto the zsh (and maybe bash) $PATH.

To fix this, add an alias in your zshrc/bashrc/whatever shell run commands file:

```
alias dependabot-config-generator="dependabot-config-generator"
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
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: monthly
      time: '08:00'
    open-pull-requests-limit: 6
    pull-request-branch-name:
      separator: '-'
    ignore:
      - dependency-name: '*'
        update-types:
          - 'version-update:semver-major'
    labels:
      - 'dependabot:npm'
```

## Future Plans

Only required items are supported.
I want this tool to be simple, so I'm thinking of implementing the other settings as optional features.
