import type { Props } from '@theme-init/CodeBlock'

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

export interface CustomizedLinkOptions {
    title: string | null
    linkText: string | null
    noteStyling: React.CSSProperties
    useCustomStyling: boolean
}