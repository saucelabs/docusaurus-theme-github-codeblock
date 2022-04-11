Docusaurus Theme GitHub Codeblock ![Test Changes](https://github.com/saucelabs/docusaurus-theme-github-codeblock/workflows/Test%20Changes/badge.svg?branch=main)
=================================

A Docusaurus v2 plugin that supports referencing code examples from public GitHub repositories.

> Note: this theme plugin requires [Docusaurus v2](https://v2.docusaurus.io/)

## Install

First, add the theme plugin to your dependencies:

```sh
npm install @saucelabs/theme-github-codeblock
```

## Usage

Add the theme plugin to your list of themes in the `docusaurus.config.js`:

```js
    // ...
    themes: [
        '@saucelabs/theme-github-codeblock'
    ],
    // ...
```

In order to reference GitHub snippets in your markdown, create code blocks with a `reference` attached to the language meta string and put the link to your GitHub reference in the code block, e.g.:

    ```js reference
    https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx#L105-L108
    ```

You can also set a custom title:

    ```js reference title="Example"
    https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx#L105-L108
    ```

The plugin will download the code and display the desired lines:

![Plugin Example](https://github.com/saucelabs/docusaurus-theme-github-codeblock/raw/main/.github/assets/example.png 'Plugin Example')


You can also set some fallback text if the plugin fails to find your codeblock:

    ```js reference title="Code with fallback"
    https://github.com/saucelabs/docusaurus-theme-github-codeblock
    This is some fallback text that will be displayed
    It can be multiline
    ```

    ```js reference title="If you dont have a fallback and the URL fails to load, it will show a message in your code block"
    https://github.com/saucelabs/docusaurus-theme-github-codeblock
    ```

---

If you are interested contributing to this project, see [CONTRIBUTING.md](CONTRIBUTING.md).
