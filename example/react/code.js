import React, {useEffect, useRef} from "react";
import hljs from 'highlight.js'
import 'highlight.js/styles/lightfair.css'

export default function Code(props){

  const refCode = useRef(null)

  useEffect(()=>{
    hljs.highlightElement(refCode.current);
  }, [])

  return (
    <pre><code ref={refCode}>{props.content}</code></pre>
  )
}
