import { parseCustomization, parseReference, codeReducer } from '../src/theme/ReferenceCodeBlock/index'

test('should parse GitHub reference properly', () => {
    expect(parseReference('https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx'))
        .toMatchSnapshot()
    expect(parseReference('https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx#L105-L108'))
        .toMatchSnapshot()
})

test('should use custom reference link text', () => {
    expect(parseCustomization('https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx?referenceLinkText="Sample text"'))
        .toMatchSnapshot()
    expect(parseCustomization('https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx?referenceLinkText="Sample text"&title="Sample title"'))
        .toMatchSnapshot()
    expect(parseCustomization('https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx?referenceLinkText="Sample text"&title="Sample title"&customStyling'))
        .toMatchSnapshot()
})

test('codeReducer', () => {
    const prevState = { foo: 'bar' }
    expect(codeReducer(prevState, { type: 'reset', value: '' })).toMatchSnapshot()
    expect(codeReducer(prevState, { type: 'loading', value: '' })).toMatchSnapshot()
    expect(codeReducer(prevState, { type: 'loaded', value: 'foobar' })).toMatchSnapshot()
    expect(codeReducer(prevState, { type: 'error', value: 'ups' })).toMatchSnapshot()
    // @ts-expect-error
    expect(codeReducer(prevState, { type: 'unknown', value: '' })).toEqual(prevState)
})

