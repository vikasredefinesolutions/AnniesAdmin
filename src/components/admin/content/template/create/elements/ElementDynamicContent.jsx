import { useEffect, useState } from "react";
import ImageFile from 'components/admin/content/common/ImageFile';
import ImageGallery from './../modal/imageGalleryModel/ImageGallery';
import Input from 'components/admin/content/common/Input';
import { randomNumber } from 'components/admin/content/helper/Helper';

const ElementDynamicContent = (props) => {
    const [editBtn, setEditBtn] = useState(false);
    const [addBtn, setAddBtn] = useState(false);
    const [indArr, setIndArr] = useState([]);
    let bgPropertyName = props.variable;
    const [showHide, setShowHide] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [OpenImageModel, setOpenImageModel] = useState(false);
    const selectedObj = props.componentHtml.filter((obj) => obj.uid === props.currentComponent);
    const [contentType, setContentType] = useState('');
    const [dataArr, setDataArr] = useState([]);

    const [pos, setPos] = useState(0);

    /* Function to set component with updated attributes values */

    const onElementImageChange = (url) => {
        setImageURL(url);
    }

    const updateAltTag = (val) => {
        setImageAlt(val);
    }

    const updateLink = (val) => {
        setImageLink(val);
    }


    useEffect(() => {
        if (selectedObj.length > 0 && !props.noPropupdate) {
            if (
                selectedObj[0].selected_Values !== undefined &&
                Object.keys(selectedObj[0].selected_Values).length > 0
            ) {


                //     //console.log("SA", selectedObj[0].selected_Values);
                Object.entries(selectedObj[0].selected_Values).forEach(([key, value]) => {
                    if (key === bgPropertyName + "_manual_content") {
                        setDataArr(value.value);
                    }
                    if (key === bgPropertyName + "_dynamic_content") {
                        setContentType(value.value);
                    }
                });
            } else {
                //setHeadline('');
                //updateProperty({[bgPropertyName]: imageURL});
            }
        }
    }, [props.currentComponent]);

    const changeContentType = (event) => {
        setContentType(event.target.value);
        props.updateProperty(
            { type: "dynamiccontent", value: event.target.value },
            bgPropertyName + "_dynamic_content"
        );
    };

    const saveData = () => {
        let tmpArr = updateDataArray();
        let rndNumber = randomNumber(indArr);
        setIndArr((previous) => [...previous, rndNumber]);
        Object.assign(tmpArr, { "index": rndNumber });
        setDataArr((previous) => [...previous, tmpArr]);

        setImageAlt('');
        setImageURL('');
        setImageLink('');
        setAddBtn(false);
        setEditBtn(false);
    }

    const updateData = () => {
        let tmpVal = dataArr.map((acValue, index) => {

            if (acValue.index === pos) {
                let tmpArr = updateDataArray();
                Object.assign(tmpArr, { "index": pos });
                return tmpArr;
            }
            else {
                return acValue;
            }
        });
        setDataArr(tmpVal);
        setEditBtn(false);
        setAddBtn(true);

        setImageURL('');
        setImageAlt('');
        setImageLink('');
    }

    const editData = (element) => {
        setPos(element.index);
        setEditBtn(true);
        setAddBtn(false);
        setImageURL(element.image);
        setImageAlt(element.image_alt);
        setImageLink(element.image_link);

    }


    const showHideProperties = () => {
        if (showHide === true)
            setShowHide(false);
        else {
            const allWithClass = Array.from(
                document.querySelectorAll('div.property-content')
            );
            allWithClass.forEach(element => {
                element.classList.add("hidden");
            });
            setShowHide(true);
        }
    }

    const updateDataArray = () => {
        let tmpArr = {};
        let rndNumber = randomNumber(indArr);

        setIndArr((previous) => [...previous, rndNumber]);

        Object.assign(tmpArr, { "index": rndNumber });
        Object.assign(tmpArr, { "image": imageURL });
        Object.assign(tmpArr, { "image_alt": imageAlt });
        Object.assign(tmpArr, { "image_link": imageLink });
        return tmpArr;
    }

    const deleteData = (element) => {

        let tmpVal = [];
        dataArr.map((acValue, index) => {
            if (acValue.index !== element.index) {
                tmpVal.push(acValue);
            }
        });
        setDataArr(tmpVal);

    }

    useEffect(() => {
        if (contentType == "manual") {

            props.updateProperty({ type: "contenttype", value: dataArr }, bgPropertyName + "_manual_content");
        }
    }, [dataArr]);
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
                                    <div>Content Type</div>
                                </div>

                                <div className="flex flex-wrap">
                                    <select
                                        onChange={changeContentType}
                                        value={contentType}
                                        className="w-full grow text-sm bg-gray-100 text-gray-700 border border-gray-200 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none focus:bg-white"
                                    >
                                        <option value="">Select Content Type</option>
                                        <option value="dynamic">Dynamic Content</option>
                                        <option value="manual">Manual</option>

                                    </select>
                                </div>

                                {contentType == 'manual' && <>
                                    {dataArr.length > 0 && <>
                                        <div className="mb-4 last:mb-0">
                                            <p className="font-bold">Added Data</p>
                                            <ul className="my-2" id="htmlData">
                                                {dataArr.length > 0 && dataArr.map((acValue, index) => {
                                                    return (

                                                        <li className="p-2 border border-neutral-200 border-b-0 last:border-b flex items-center justify-between">
                                                            <img src={acValue.image} width={50} />
                                                            <div>
                                                                <a href={undefined} onClick={() => { editData(acValue); }}><span className="material-icons-outlined ml-3">mode_edit</span></a>
                                                                <a href={undefined} onClick={() => { deleteData(acValue); }}><span className="material-icons-outlined ml-3">delete_outline</span></a>
                                                            </div>
                                                        </li>
                                                    )

                                                })}

                                            </ul>
                                        </div>

                                    </>
                                    }



                                    <div className="mb-3 mt-3 last:mb-0">
                                        {!addBtn && (
                                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                                                onClick={(event) => {
                                                    setAddBtn(true);
                                                }}
                                            >
                                                + Add Image
                                            </button>
                                        )}
                                    </div>

                                    {(addBtn || editBtn) && (

                                        <>
                                            <div className="mb-3 mt-3">
                                                <label htmlFor="" className="mb-1 block text-sm">Image</label>
                                                <ImageFile
                                                    type="file"
                                                    className="sr-only"
                                                    name={'image'}
                                                    id={'image'}
                                                    buttonName="Choose Image"
                                                    folderpath={props.imagePath}
                                                    ModelOpen={true}
                                                    setOpenImageModel={setOpenImageModel}
                                                    // onChange={onElementImageChange}
                                                    edibtn={true}
                                                    url={imageURL}
                                                />
                                                {OpenImageModel && <ImageGallery
                                                    setOpenImageModel={setOpenImageModel}
                                                    onElementImageChange={onElementImageChange}
                                                    folderpath={props.imagePath}
                                                    OpenImageModel={OpenImageModel}
                                                    from={"Element Image"}
                                                    ImageUploadName={'image'}
                                                    ImageUploadId={'image'}
                                                    ImageUrl={imageURL}
                                                />}
                                            </div>

                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="">Alt Title</div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    <Input onChange={(event) => { updateAltTag(event.target.value) }} type="text" className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none" defaultValue={imageAlt} />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="">Link (optional)</div>
                                                </div>
                                                <div className="text-center relative overflow-hidden">
                                                    <Input onChange={(event) => { updateLink(event.target.value) }} type="text" className="w-full grow text-sm bg-white text-gray-700 border border-neutral-300 p-3 py-2 leading-tight focus:ring-0 focus:shadow-none focus:outline-none" defaultValue={imageLink} />
                                                </div>
                                            </div>

                                            <div className="mb-4 last:mb-0">
                                                {addBtn && <button className="w-full py-[6px] bg-indigo-500 hover:bg-indigo-600 text-white mt-2" onClick={saveData}>+ Add</button>}
                                                {editBtn && <button className="w-full py-[6px] bg-indigo-500 hover:bg-indigo-600 text-white mt-2" onClick={updateData}>+ Update</button>}
                                            </div>

                                        </>

                                    )}


                                </>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ElementDynamicContent;
