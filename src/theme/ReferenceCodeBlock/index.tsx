import React, { useReducer } from 'react'
import CodeBlock from '@theme-init/CodeBlock'

import type { ReferenceCodeBlockProps, GitHubReference, DispatchMessage } from '../types'

const initialFetchResultState = {
    code: 'loading...',
    error: null,
    loading: null,
}

const noteStyle: React.CSSProperties = {
    fontSize: '.9em',
    fontWeight: 600,
    color: '#0E75DD',
    textAlign: 'center',
    paddingBottom: '13px',
    textDecoration: 'underline',
}

/**
 * parses GitHub reference
 * @param {string} ref url to github file
 */
export function parseReference (ref: string): GitHubReference {
    const fullUrl = ref.slice(ref.indexOf('https'), -1)
    const [url, loc] = fullUrl.split('#')

    /**
     * webpack causes failures when it tries to render this page
     */
    const global = globalThis || {}
    if (!global.URL) {
        // @ts-ignore
        global.URL = URL
    }

    const [org, repo, blob, branch, ...pathSeg] = new global.URL(url).pathname.split('/').slice(1)
    const [fromLine, toLine] = loc
        ? loc.split('-').map((lineNr) => parseInt(lineNr.slice(1), 10) - 1)
        : [0, Infinity]

    return {
        url: `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join('/')}`,
        fromLine,
        toLine,
        title: pathSeg.join('/')
    }
}

async function fetchCode ({ url, fromLine, toLine }: GitHubReference, fetchResultStateDispatcher: React.Dispatch<DispatchMessage>) {
    let res: Response

    try {
        res = await fetch(url)
    } catch (err) {
        return fetchResultStateDispatcher({ type: 'error', value: err })
    }

    if (res.status !== 200) {
        const error = await res.text()
        return fetchResultStateDispatcher({ type: 'error', value: error })
    }

    const body = (await res.text()).split('\n').slice(fromLine, (toLine || fromLine) + 1)
    const preceedingSpace = body.reduce((prev: number, line: string) => {
        if (line.length === 0) {
            return prev
        }

        const spaces = line.match(/^\s+/)
        if (spaces) {
            return Math.min(prev, spaces[0].length)
        }

        return 0
    }, Infinity)

    return fetchResultStateDispatcher({
        type: 'loaded',
        value: body.map((line) => line.slice(preceedingSpace)).join('\n')
    })
}

export function codeReducer (prevState: any, { type, value }: DispatchMessage) {
    switch (type) {
        case 'reset': {
        return initialFetchResultState;
        }
        case 'loading': {
        return {...prevState, loading: true};
        }
        case 'loaded': {
        return {...prevState, code: value, loading: false};
        }
        case 'error': {
        return {...prevState, error: value, loading: false};
        }
        default:
        return prevState;
    }
}

function ReferenceCode(props: ReferenceCodeBlockProps) {
    const [fetchResultState, fetchResultStateDispatcher] = useReducer(
        codeReducer,
        initialFetchResultState,
    )

    const codeSnippetDetails = parseReference(props.children)
    if (fetchResultState.loading !== false) {
        fetchCode(codeSnippetDetails, fetchResultStateDispatcher)
    }

    const titleMatch = props.metastring?.match(/title="(?<title>.*)"/);

    const customProps = {
        ...props,
        metastring: titleMatch?.groups?.title
            ? ` title="${titleMatch?.groups?.title}"`
            : ` title="${codeSnippetDetails.title}"`,
        children: initialFetchResultState.code,
    };

    return (
        <div>
            <CodeBlock {...customProps}>{fetchResultState.code}</CodeBlock>
            <div style={noteStyle}><a href={props.children} target="_blank">See full example on GitHub</a></div>
        </div>
    );
}

export default ReferenceCode;
