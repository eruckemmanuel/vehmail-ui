import React from 'react'
import { Card } from 'antd';

const Cards = (props) => {
    return (
        <div className="" >
            <Card title={props.subject} bordered={false} style={{ height: '100vh' }}>
                <div dangerouslySetInnerHTML={{__html: props.body}}></div>
            </Card>
        </div>
    );
}

export default Cards
