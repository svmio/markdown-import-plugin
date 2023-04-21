import React from 'react'
import {Tabs} from "antd";
import Code from "./code";

export default function Wrap(props){
  return <Tabs items={[{
    key: 'live',
    label: '代码演示效果',
    children: props.children
  },{
    key: 'code',
    label: '源代码',
    children: (<Code content={props.content}/>)
  }]}/>
}
