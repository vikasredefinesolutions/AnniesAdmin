import { useEffect, useState } from "react";

const ElementScrollingArrows = (props) => {
  let bgPropertyName = props.variable;
  const [showHide, setShowHide] = useState(false);

  const selectedObj = props.componentHtml.filter((obj) => obj.uid === props.currentComponent);

  const [scrollingArrow, setScrollingArrow] = useState('center');
  /* Function to set component with updated attributes values */

  useEffect(() => {
    if (selectedObj.length > 0 && !props.noPropupdate) {
      if (selectedObj[0].selected_Values !== undefined && Object.keys(selectedObj[0].selected_Values).length > 0) {
        let tmpScrollingArrow;
        //console.log("SA", selectedObj[0].selected_Values);
        Object.entries(selectedObj[0].selected_Values).forEach(([key, value]) => {
          if (key === bgPropertyName + "_scrolling_arrow") {
            setScrollingArrow(value.value);
          }
        });
      } else {
        //setHeadline('');
        //updateProperty({[bgPropertyName]: imageURL});
      }
    }
  }, [props.currentComponent]);

  const changeScrollingArrow = (event) => {
    setScrollingArrow(event.target.value);
    props.updateProperty(
      { type: "scrollingarrow", value: event.target.value },
      bgPropertyName + "_scrolling_arrow"
    );
  };

  const showHideProperties = () => {
    if (showHide === true) {
      setShowHide(false);
    } else {
      const allWithClass = Array.from(
        document.querySelectorAll('div.property-content')
      );
      allWithClass.forEach(element => {
        element.classList.add("hidden");
      });
      setShowHide(true);
    }
  }

  return (
    <>
      <div className="relative border-b border-neutral-00">
        <button onClick={() => { showHideProperties() }}
          className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-bold">
          <span >{props.compprop.title ?? "Image"}</span>
          <span className="material-icons-outlined">expand_more</span>
        </button>
        <div className={`property-content bg-white border-y border-b-0 border-neutral-200 ${showHide ? "" : "hidden"}`}>
          <div className="mx-2 text-sm">
            <div className="py-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <div>Arrow Type</div>
                </div>
                <div className="flex flex-wrap">
                  <select
                    onChange={changeScrollingArrow}
                    value={scrollingArrow}
                    className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                  >
                    <option value="">Select Arrow Position</option>
                    <option value="center">Center of the Section</option>
                    <option value="topright">Top Right</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElementScrollingArrows;
