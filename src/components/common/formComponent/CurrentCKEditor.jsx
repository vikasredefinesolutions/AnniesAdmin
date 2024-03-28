import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";

const CurrentCKEditor = ({
  name,
  onChange,
  defaultValue,
  type,
  loading = false,
  readOnly,
  value,
  ...rest
}) => {
  const [editor, setEditor] = useState(null);

  /* Function to set component with updated values */
  useEffect(() => {
    if (true) {
      let editor1 = (
        <CKEditor
          id={"description"}
          name={"description"}
          // onInstanceReady={(editor) => { setckdata(editor.editor); }}
          initData={defaultValue || value}
          // value={editorText}
          config={{
            // toolbar: [
            //     ['Source'],
            //     ['Styles'],
            //     ['Insert'],
            //     ['Bold', 'Italic', 'Underline'],
            //     ['NumberedList','BulletedList'],
            //     ['List', 'Indent', 'Blocks', 'Align'],

            // ],
            extraPlugins: "embed,autoembed,image2,iframe",
            removePlugins: ["image"],
            extraAllowedContent: "div(*)",
            allowedContent: true,
          }}
          onChange={({ event, editor }) => {
            onChange(editor.getData());
          }}
        />
      );
      setEditor(editor1);
    }
  }, []);

  return (
    <>
      {editor}
    </>
  );
};

export default CurrentCKEditor;
