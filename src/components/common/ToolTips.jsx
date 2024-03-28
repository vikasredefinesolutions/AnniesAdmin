import React from "react";
import ReactTooltip from "react-tooltip";

const ToolTips = ({ message, id, className, btnCls, msgBoxCls }) => {

  const handlerComma = (message) => {
    if (message) {
      const SentenceArray = message.split("\n");
      return SentenceArray.map((Sentence, index) => {
        return <li key={index}>{Sentence}</li>
      })
    } else {
      return ""
    }
  };
  return (
    <div className={`ml-2 ${className}`}>
      <button
        className={`block`}
        aria-haspopup="true"
        data-tip=""
        data-for={id}
        type="button"
      >
        <svg
          className={`fill-current text-slate-400 w-4 h-4 ${btnCls ? btnCls : ""}`}
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
        </svg>
      </button>

      <ReactTooltip id={id} backgroundColor="bg-slate-800">
        <div className={`min-w-56 max-w-8xl bg-slate-800 p-2 rounded overflow-hidden select-none ${msgBoxCls ? msgBoxCls : ""}`}>
          <ul className="text-xs text-slate-200 list-disc list-inside	">{handlerComma(message)}</ul>
        </div>
      </ReactTooltip>
    </div>
  );
};

export default ToolTips;
