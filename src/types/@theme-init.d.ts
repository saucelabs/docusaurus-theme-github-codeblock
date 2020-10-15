declare module '@theme-init/CodeBlock' {
    export type Props = {
      readonly children: string;
      readonly className?: string;
      readonly metastring?: string;
    };

    const CodeBlock: (props: Props) => JSX.Element;
    export default CodeBlock;
  }
