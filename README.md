Docusaurus Theme GitHub Codeblock
=================================

A Docusaurus v2 plugin that supports referencing code examples from public GitHub repositories.

> Note: this theme plugin requires [Docusaurus v2](https://v2.docusaurus.io/)

## Install

First, add the theme plugin to your dependencies:

```sh
npm install @saucelabs/theme-github-codeblock
```

## Usage

In order to reference GitHub snippets in your markdown, create code blocks with a `reference` attached to the language meta string and put the link to your GitHub reference in the code block, e.g.:

    ```js reference
    https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx#L105-L108
    ```

The plugin will download the code and display the desired lines:

![Plugin Example](./.github/assets/example.png 'Plugin Example')

---

If you are interested contributing to this project, see [CONTRIBUTING.md](CONTRIBUTING.md).
