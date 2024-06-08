import { CopyCodeButton } from "./copy-button"

interface CodeSnippetProps {
  code: string
}

export default function CodeSnippet({ code }: CodeSnippetProps) {
  return (
    <div className={`rounded-lg bg-foreground/20 p-8 font-mono text-sm `}>
      <pre className="relative overflow-x-auto whitespace-pre-wrap">
        <code className="select-text text-[0.6rem] leading-none md:text-sm md:leading-normal">
          {code}
        </code>
        <div className="absolute right-0 top-0 flex justify-end">
          <CopyCodeButton code={code} />
        </div>
      </pre>
    </div>
  )
}
