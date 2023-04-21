This is a test page for react

```jsx
import React from 'react';
import { DatePicker, Space } from 'antd';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
export default function (){
    return (
      <Space direction="vertical">
        <DatePicker onChange={onChange} />
        <DatePicker onChange={onChange} picker="week" />
        <DatePicker onChange={onChange} picker="month" />
        <DatePicker onChange={onChange} picker="quarter" />
        <DatePicker onChange={onChange} picker="year" />
      </Space>
    )
}
```
