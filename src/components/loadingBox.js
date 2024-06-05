import React from 'react'
import { Alert, Spin } from 'antd';

function LoadingBox() {
    return (
        <Spin tip="Loading...">
        <Alert message="Loading Workspace Details" type="info" />
      </Spin>
    )
}

export default LoadingBox