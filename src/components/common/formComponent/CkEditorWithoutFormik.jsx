import React, { Fragment, useEffect, useRef } from 'react'
import { CKEditor } from "ckeditor4-react";

const CkEditorWithoutFormik = ({ defaultValue, onChange, setEditorData, EditorData, ...rest }) => {
    const CkEditorData = useRef(null);

    const onChangeHandler = (editor) => {
        if (onChange instanceof Function) {
            onChange(editor.getData());
        } else if (setEditorData instanceof Function) {
            setEditorData(editor.getData());
        }
    };

    useEffect(() => {
        if (CkEditorData.current && CkEditorData.current.setData && !EditorData) {
            CkEditorData.current.setData("");
        }
        if (CkEditorData.current && EditorData) {
            CkEditorData.current.setData(EditorData);
        }
    }, [EditorData]);

    return (
        <Fragment>
            <CKEditor
                id={"description1"}
                name={"description1"}
                onInstanceReady={(editor) => {
                    CkEditorData.current = editor.editor;
                }}
                initData={defaultValue}
                config={{
                    extraPlugins: 'embed,autoembed,image2',
                    removePlugins: ['image'],
                    extraAllowedContent: 'div(*)',
                    allowedContent: true
                }}

                onChange={({ editor }) => onChangeHandler(editor)}
                {...rest}
            />
        </Fragment>
    )
}

export default CkEditorWithoutFormik