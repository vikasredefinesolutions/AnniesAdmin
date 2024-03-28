import { useSelector } from "react-redux";

export default function TableLoading({ className, ...rest }) {
  const GlobalLoadingHowMany = useSelector((store) => store?.GlobalLoaderReducer?.howMany);
  const Auth = useSelector((store) => store?.auth);

  return (
    <>
      <button id={`focousEmptyButton`} className="absolute" type="button"></button>
      {(!Auth || GlobalLoadingHowMany > 0) ?
        <div className="absolute w-full min-h-screen h-auto max-h-screen scrollbar-none bg-[#f1f5f9] opacity-75 z-50 overflow-hidden flex justify-center align-middle animate-pulse">
          <div className={`text-center z-60 w-full items-center flex justify-center align-middle ${className ? className : ""}`}>
            <div className="loadingio-spinner-spinner-xe2hhkdtzbj">
              <div className="ldio-yoj2w479tp">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div> : <></>
      }
    </>
  );
}
