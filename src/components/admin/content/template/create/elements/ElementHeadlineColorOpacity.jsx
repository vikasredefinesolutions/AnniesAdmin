import ColorPicker from "components/admin/content/common/ColorPicker";
import { useState } from "react";

import SliderCustom from "components/admin/content/common/SliderCustom";
import { useEffect } from "react";

const ElementHeadlineColorOpacity = (props) => {
    const [isTransparent, setIsTransparent] = useState(
        props.hexColor == "" ? true : false,
    );
    const changeTextBackgroundColor = (color) => {
        let obj = color.rgb;
        props.setHexColor(color.hex);
        props.setTextBgColor(obj.r + ", " + obj.g + ", " + obj.b);
    };

    const setTranspgarentBG = (event) => {
        if (event.target.checked) {
            setIsTransparent(true);
            props.setHexColor("");
            props.setTextBgColor("");
        } else {
            setIsTransparent(false);
        }
    };

    useEffect(() => {
        if (props.hexColor == "") setIsTransparent(true);
        else setIsTransparent(false);
    }, [props.hexColor]);

    return (
        <>
            {props.fntDisplay && (
                <div className="mb-4 last:mb-0">
                    <label htmlFor="" className="mb-1 block text-sm">
                        Headline Font Size
                    </label>
                    <div className="flex flex-wrap">
                        <select
                            value={props.fontSize}
                            onChange={(event) => {
                                props.setFontSize(event.target.value);
                            }}
                            className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                        >
                            <option value="text-xs">Extral Small</option>
                            <option value="text-sm">Small</option>
                            <option value="text-base">Normal</option>
                            <option value="text-lg">Large</option>
                            <option value="text-xl">Extra Large</option>
                            <option value="text-2xl">2 XL</option>
                            <option value="text-3xl">3 XL</option>
                        </select>
                    </div>
                </div>
            )}
            {props.hvBox ? (
                <>
                    <div className="mb-3 last:mb-0">
                        <div className="flex justify-between items-center mb-1">
                            <div>Headline Horizontal Position</div>
                        </div>
                        <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                            {props.ThemeVariable.horizontalPosition.map((value, index) => (
                                <button
                                    key={index}
                                    value={value.value}
                                    onClick={(event) => {
                                        props.setTextHPos(event.target.value);
                                    }}
                                    className={`w-1/${props.ThemeVariable.horizontalPosition.length} px-2 py-[5px] inline-flex justify-center items-center text-sm ${value.value === props.textHPos ? "bg-[#F1F5F9]" : "bg-white"}`}
                                    title={value.value}
                                    dangerouslySetInnerHTML={{ __html: value.icon }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-3 last:mb-0">
                        <div className="flex justify-between items-center mb-1">
                            <div>Headline Vertical Position</div>
                        </div>
                        <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                            {props.ThemeVariable.verticalPosition.map((value, index) => (
                                <button
                                    key={index}
                                    value={value.value}
                                    onClick={(event) => {
                                        props.setTextVPos(event.target.value);
                                    }}
                                    className={`w-1/${props.ThemeVariable.verticalPosition.length} px-2 py-[5px] inline-flex justify-center items-center text-sm ${value.value === props.textVPos ? "bg-[#F1F5F9]" : "bg-white"}`}
                                    title={value.value}
                                    dangerouslySetInnerHTML={{ __html: value.icon }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-3 last:mb-0">
                        <div className="mb-3">
                            <div className="flex justify-between items-center mb-1">
                                <div>Max Width</div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                                    <select
                                        onChange={props.changeSectionWidth}
                                        value={props.sectionWidth}
                                        className="w-full grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        <option value="">Select</option>
                                        {props.ThemeVariable.imageSizes.map((value, index) => (
                                            <option key={index} value={value.value}>
                                                {value.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-3 last:mb-0">
                        <div className="flex justify-between items-center mb-1">
                            <div>Headline Horizontal Position</div>
                        </div>
                        <div className="flex flex-wrap divide-x divide-neutral-300 border border-neutral-300 overflow-hidden">
                            {props.ThemeVariable.headlinePosition.map((value, index) => (
                                <button
                                    key={index}
                                    value={value.value}
                                    onClick={(event) => {
                                        props.setTextPos(event.target.value);
                                    }}
                                    className={`w-1/${props.ThemeVariable.headlinePosition.length} px-2 py-[5px] inline-flex justify-center items-center text-sm ${value.value === props.textPos ? "bg-[#F1F5F9]" : "bg-white"}`}
                                    title={value.value}
                                    dangerouslySetInnerHTML={{ __html: value.icon }}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}

            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">
                    Background Color
                </label>
                <div className="flex flex-wrap">
                    <div className="relative">
                        <input
                            id="new-window-link2"
                            x-model="checked"
                            onChange={setTranspgarentBG}
                            type="checkbox"
                            checked={isTransparent ? "checked" : ""}
                        />{" "}
                        <span className="pl-2">Transparent Background</span>
                    </div>
                </div>
                {!isTransparent && (
                    <div className="flex flex-wrap">
                        <ColorPicker
                            changeBackgroundColor={changeTextBackgroundColor}
                            value={props.hexColor}
                        />
                    </div>
                )}
            </div>

            {!isTransparent && (
                <div className="mb-3 last:mb-0">
                    <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                            <div className="mb-1">Background Opacity</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-2/12 px-1.5">
                                <div
                                    className="w-[30px] h-[30px]"
                                    style={{
                                        backgroundColor: props.hexColor ?? "#cccccc",
                                        opacity: props.bgOpacity,
                                    }}
                                ></div>
                            </div>
                            <div className="w-10/12 px-1.5">
                                <div className="w-full">
                                    <SliderCustom
                                        dots={false}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        defaultValue={props.bgOpacity}
                                        onSliderChange={(val) => {
                                            props.setBgOpacity(val);
                                        }}
                                        marks={[
                                            { value: 0, label: "0" },
                                            { value: 0.1 },
                                            { value: 0.2 },
                                            { value: 0.3 },
                                            { value: 0.4 },
                                            { value: 0.5 },
                                            { value: 0.6 },
                                            { value: 0.7 },
                                            { value: 0.8 },
                                            { value: 0.9 },
                                            { value: 1, label: "1" },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ElementHeadlineColorOpacity;
