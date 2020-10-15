import type { Props } from '@theme/CodeBlock'

export interface GitHubReference {
    url: string
    fromLine: number
    toLine: number
    title: string
}

export interface ReferenceCodeBlockProps extends Props {
    reference: string
}

export type DispatchTypes = 'reset' | 'loading' | 'loaded' | 'error'

export interface DispatchMessage {
    type: DispatchTypes
    value: string | Error
}
