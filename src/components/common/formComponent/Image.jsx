import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ImageComponent = ({
    className,
    src,
    containerHeight,
    defaultImageVisibility,
    imageContainerBorderCls,
    ...rest
}) => {
    const imgRef = useRef();
    const imageContainer = useRef();
    const imageContainerBorder = useRef();
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);
    const [imageError, setImageError] = useState(false);
    useEffect(() => {
        setImageError(false);
    }, [src]);

    return (
        <>
            <div ref={imageContainerBorder} className={`h-24 w-40 border border-neutral-200 flex justify-center items-center ${imageError ? 'bg-sky-400/10' : ""} ${imageContainerBorderCls ? imageContainerBorderCls : ""}`}>
                <div ref={imageContainer} className={`flex justify-center items-center ${containerHeight} ${imageError ? `col-span-full lg:col-span-6 rounded-md  flex items-center justify-center font-normal ${className}` : ""}`}>
                    <img ref={imgRef} className={`max-${containerHeight}`} src={`${AdminAppConfigReducers["azure:BlobUrl"]}${src}`} {...rest} alt={'No Image'} onErrorCapture={() => {
                        setImageError(true);
                        imgRef.current.src = '/noImage.png';
                    }} />
                </div>
            </div>
        </>
    );
};

export default React.memo(ImageComponent);
