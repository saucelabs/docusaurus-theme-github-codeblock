import { timeStamp } from 'console'
import { parseReference, codeReducer } from '../src/theme/ReferenceCodeBlock/index'

test('should parse GitHub reference properly', () => {
    expect(parseReference('https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx'))
        .toMatchSnapshot()
    expect(parseReference('https://github.com/saucelabs/docusaurus-theme-github-codeblock/blob/main/src/theme/ReferenceCodeBlock/index.tsx#L105-L108'))
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

// export function codeReducer (prevState: any, { type, value }: DispatchMessage) {
//     switch (type) {
//         case 'reset': {
//         return initialFetchResultState;
//         }
//         case 'loading': {
//         return {...prevState, loading: true};
//         }
//         case 'loaded': {
//         return {...prevState, code: value, loading: false};
//         }
//         case 'error': {
//         return {...prevState, error: value, loading: false};
//         }
//         default:
//         return prevState;
//     }
// }
