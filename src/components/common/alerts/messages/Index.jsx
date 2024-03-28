import React from 'react';
import Danger from './Danger';
import Info from './Info';
import Success from './Success';
import Warning from './Warning';
import { useSelector } from "react-redux";
const Index = (props) => {
    const { type, ...rest } = props;
    const messageInfo = useSelector((state) => state.alertMessage);

    switch (messageInfo.type) {
        case 'danger': return <Danger {...rest} />;
        case 'info': return <Info {...rest} />;
        case 'success': return <Success {...rest} />;
        case 'warning': return <Warning {...rest} />;
        default: return ''
    }
}

export default Index