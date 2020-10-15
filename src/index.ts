/**
 * Copyright (c) Sauce Labs, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path'

export default () => ({
    name: 'docusaurus-theme-github-codeblock',

    getThemePath() {
        return path.resolve(__dirname, './theme')
    }
})
