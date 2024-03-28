
import React from 'react';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';

const ListingLayoutButton = ({ name ,index}) => {
    const permission = useSelector(store => store.permission);
    const { setFieldValue, values } = useFormikContext();

    return (
        <button style={{height:'180px'}} type='button' disabled={!permission?.isEdit && !permission?.isDelete} className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500   ${values[name] === index ? 'border-blue-500 activeTab' : 'border-gray-300 cursor-pointer'} `} onClick={() => setFieldValue(name, index)}  >
            <img style={{maxWidth: '100%'}} alt="" src={`${process.env.PUBLIC_URL}/images/${name}/preview/${index}.png`} />
        </button>
    );
};

export default ListingLayoutButton;
