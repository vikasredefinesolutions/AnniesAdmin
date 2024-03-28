/*Component Name: DescriptionField
Component Functional Details: User can create or update DescriptionField master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useLayoutEffect, useState } from 'react';
import CKEditor from "components/common/formComponent/CKEditor";
import { useFormikContext } from 'formik';

const DescriptionField = () => {
    const { values, setFieldValue } = useFormikContext();

    const [ckEditorState, setckEditorState] = useState({
        toShow: false,
        description: values.description
    })

    useLayoutEffect(() => {
        const ckEditorTimeOut = setTimeout(() => {
            setckEditorState({
                toShow: true,
                description: values.description
            })
        }, 500)
        return () => { clearTimeout(ckEditorTimeOut) }
    }, [values.description]);

    return (
        <>
            <div className="px-5 py-4 bg-white mb-6">

                <div className='flex'>
                    <h4 className="flex items-center justify-between w-full group mb-1">
                        <div className="text-lg text-gray-800 font-bold">Description</div>
                    </h4>

                </div>

                <div>
                    {
                        ckEditorState.toShow && <CKEditor
                            id="description"
                            name={"description"}
                            defaultValue={ckEditorState.description}
                            onChange={(value) => {
                                setFieldValue("description", value);
                            }}
                            readOnly={false}
                        />
                    }

                </div>
            </div>
        </>
    );
};

export default DescriptionField;
