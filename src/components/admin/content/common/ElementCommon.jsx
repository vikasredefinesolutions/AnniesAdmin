import * as ThemeVariable from "components/admin/content/helper/ThemeVariables";
import Select from "components/common/formComponent/Select";
import SliderCustom from "../common/SliderCustom";
import ToggleButton from 'components/admin/content/common/ToggleButton';
import ColorPicker from "../common/ColorPicker";

export const ButtonLinkComponent = ({ defaultValue, onChange, Options }) => {
    return (
        <>
            <div className="mb-4 last:mb-0">
                <label for="" className="mb-1 block text-sm">Button Link</label>
                <div className="flex flex-wrap">
                    <Select
                        className="grow h-9 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        options={Options}
                        // onChange={onChange}
                        name="ButtonLink"
                        // defaultValue={defaultValue}
                        isClearable={false}
                    />
                </div>
            </div>
        </>
    )
}

export const LoadingEffectComponent = ({ title, onChange, value }) => {
    return (
        <>
            <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                    <div className="">{title}</div>
                </div>
                <div className="text-center relative overflow-hidden">
                    <select onChange={onChange} value={value} className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white">
                        <option value="">None</option>
                        {ThemeVariable.aosEffect.map((value, index) => (
                            <option key={index} value={value.value} className={value.value}>{value.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

export const HeaderTagsComponent = ({ title, onChange, value }) => {
    return (
        <>
            <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                    <div className="">{title}</div>
                </div>
                <div className="text-center relative overflow-hidden">
                    <select onChange={onChange}
                        value={value}
                        className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white">
                        <option value="">None</option>
                        <option value="H1">H1</option>
                        <option value="H2">H2</option>
                        <option value="H3">H3</option>
                        <option value="H4">H4</option>
                        <option value="H5">H5</option>
                        <option value="H6">H6</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export const ShadowOffsetComponent = ({ title, valueX, onChangeX, valueY, onChangeY }) => {
    return (
        <>
            <div className="mb-3 last:mb-0">
                <div className="flex justify-between items-center mb-1">
                    <div>{title}</div>
                </div>
                <div className="flex flex-wrap -mx-1.5">
                    <div className="w-1/2 px-1.5">
                        <div className="relative flex">
                            <button type='button' className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0">
                                <span className="font-semibold">X</span>
                            </button>
                            <select onChange={onChangeX}
                                value={valueX} className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none">
                                <option value="">Select</option>
                                {Array(100).fill(null).map((value, index) => {
                                    return <option key={index} value={index}>{index}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="w-1/2 px-1.5">
                        <div className="relative flex">
                            <button type='button' className="w-11 grow px-2 py-1 inline-flex items-center justify-center text-sm bg-[#F1F5F9] border border-neutral-300 border-r-0 outline-none focus:ring-0">
                                <span className="font-semibold">Y</span>
                            </button>
                            <select onChange={onChangeY} value={valueY} className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none">
                                <option value="">Select</option>
                                {Array(100).fill(null).map((value, index) => {
                                    return <option key={index} value={index}>{index}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const SelectBlurComponent = ({ title, defaultValue, onSliderChange }) => {
    return (
        <>
            <div className="mb-3 last:mb-0">
                <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                        <div className="mb-1">{title}</div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className='w-full px-3'>
                            <SliderCustom dots={false} min={0} max={100} step={1}
                                defaultValue={defaultValue}
                                onSliderChange={onSliderChange}
                                marks={[{ value: 0, label: '0' }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100, label: '100' }]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const ShadowOpacityComponent = ({ title, defaultValue, onSliderChange }) => {
    return (
        <>
            <div className="mb-3 last:mb-0">
                <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                        <div className="mb-1">{title}</div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className='w-full mx-auto px-3'>
                            <SliderCustom dots={false} min={0} max={1} step={0.1}
                                defaultValue={defaultValue}
                                onSliderChange={onSliderChange}
                                marks={[{ value: "0.1" },
                                { value: "0.2" },
                                { value: "0.3" },
                                { value: "0.4" },
                                { value: "0.5", label: "0.5" },
                                { value: "0.6" },
                                { value: "0.7" },
                                { value: "0.8" },
                                { value: "0.9" },
                                { value: "1", label: "1" },
                                ]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const ShadowColorComponent = ({ title, value, changeHeadlineShadowColor }) => {
    return (
        <>
            <div className="mb-4 last:mb-0">
                <label htmlFor="" className="mb-1 block text-sm">{title}</label>
                <div className="flex flex-wrap">
                    <ColorPicker changeBackgroundColor={changeHeadlineShadowColor} value={value} />
                </div>
            </div>
        </>
    )
}

export const ButtonSizeDropdown = ({ title, value, onChange, options }) => {
    return (
        <>
            <div className="mb-4 last:mb-0 hidden">
                <label for="" className="mb-1 block text-sm">{title}</label>
                <div className="flex flex-wrap">
                    <Select
                        className="grow h-9 px-2 py-1 text-sm bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        options={options}
                        onChange={onChange}
                        name="ButtonLink"
                        defaultValue={value}
                        isClearable={false}
                    />
                </div>
            </div>
        </>
    )
}

export const SingleToggleButtonComponent = ({ IconName, id, nameToShow, name, defaultValue, onChange }) => {
    return (
        <>
            <div className="mb-3 mt-3 last:mb-0">
                <div className="mb-3">
                    <div className="flex items-center justify-between">
                        <div className='flex items-center justify-between'>
                            <div className="bg-[#F1F5F9] rounded p-1 block h-8 w-9 text-center mr-1">
                                <span className="material-symbols-outlined">{IconName}</span>
                            </div>
                            <div>{nameToShow}</div>
                        </div>
                        <div className="flex items-center" x-data="{ checked: true }">
                            <div className="w-16 relative">
                                <ToggleButton
                                    id={id}
                                    defaultValue={defaultValue}
                                    onChange={onChange}
                                    name={name}
                                    on={"On"}
                                    off={"Off"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}