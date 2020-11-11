import { timeStamp } from 'console'
import { parseReference } from '../src/theme/ReferenceCodeBlock/index'

test('should parse GitHub reference properly', () => {
    expect(parseReference('https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx'))
        .toMatchSnapshot()
    expect(parseReference('https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx#L105-L108'))
        .toMatchSnapshot()
})
