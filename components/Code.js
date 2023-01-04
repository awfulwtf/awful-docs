import SyntaxHighlighter from 'react-syntax-highlighter'

export const Code = ({ language, codez }) => {

    return (
        <SyntaxHighlighter language={language}> 
            {codez}
        </SyntaxHighlighter>
    )

    // return (
    //     <pre>
    //         <code className={`hljs language-json`}>
    //         <span className="hljs-built_in">
    //             {codez}
    //         </span>
    //         </code>
    //     </pre>
    // )
}