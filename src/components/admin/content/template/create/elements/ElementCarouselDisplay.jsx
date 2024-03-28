import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";

const ElementCarouselDisplay = ({ bannerArr }) => {
    const showArrow =
        bannerArr.showArrow !== undefined
            ? bannerArr.showArrow === "On"
                ? true
                : false
            : false;
    const showIndicators =
        bannerArr.showIndicators !== undefined
            ? bannerArr.showIndicators === "On"
                ? true
                : false
            : false;
    const showThumb =
        bannerArr.showThumb !== undefined
            ? bannerArr.showThumb === "On"
                ? true
                : false
            : false;
    const autoPlay =
        bannerArr.autoPlay !== undefined
            ? bannerArr.autoPlay === "On"
                ? true
                : false
            : false;
    const infiniteLoop =
        bannerArr.infiniteLoop !== undefined
            ? bannerArr.infiniteLoop === "On"
                ? true
                : false
            : false;
    const stopOnHover =
        bannerArr.stopOnHover !== undefined
            ? bannerArr.stopOnHover === "On"
                ? true
                : false
            : false;
    const showStatus =
        bannerArr.showStatus !== undefined
            ? bannerArr.showStatus === "On"
                ? true
                : false
            : false;

    return (
        <>
            {Object.keys(bannerArr).length > 0 && bannerArr.images !== null && (
                <Carousel
                    showStatus={showStatus}
                    stopOnHover={stopOnHover}
                    infiniteLoop={infiniteLoop}
                    autoPlay={autoPlay}
                    showArrows={showArrow}
                    showIndicators={showIndicators}
                    showThumbs={showThumb}
                >
                    {bannerArr.images.map((image, index) => {
                        return (
                            <div key={index}>
                                {image.image_or_video === "Image" ? (
                                    <img src={image.image_url} className="slideImg" />
                                ) : (
                                    <>
                                        {image.video_type === "Youtube" ? (
                                            <iframe
                                                className="w-full aspect-video"
                                                src={`https://www.youtube.com/embed/${image.video_url}?rel=0`}
                                                allow="autoplay; encrypted-media"
                                                frameborder="0"
                                            ></iframe>
                                        ) : (
                                            <iframe
                                                className="w-full aspect-video"
                                                src={`https://player.vimeo.com/video/${image.video_url}`}
                                                allow="autoplay; encrypted-media"
                                                frameborder="0"
                                            ></iframe>
                                        )}
                                    </>
                                )}

                                <div
                                    className={`flex ${image?.image_url || image?.video_url ? "absolute " : ""
                                        }inset-0 p-1 lg:p-4 ${image.text_hpos ? image.text_hpos : ""
                                        } ${image.text_vpos ? image.text_vpos : ""
                                        } w-full text-white`}
                                >
                                    <div
                                        className={`${image.headline_width ? image.headline_width : "w-full"
                                            }`}
                                        style={{
                                            background:
                                                image.headline1_display || image.headline2_display
                                                    ? `rgb(${image.text_bg_color}, ${image.bg_opacity})`
                                                    : "none",
                                            padding: "20px",
                                        }}
                                    >
                                        {image.icon_image_url && (
                                            <div className="text-center">
                                                <img
                                                    style={{
                                                        width: "auto",
                                                    }}
                                                    src={image.icon_image_url}
                                                />
                                            </div>
                                        )}
                                        {image.headline1_display && (
                                            <>
                                                <div
                                                    className={image.headline1_class ?? ""}
                                                    style={{
                                                        color: image.font_color ?? "",
                                                        textShadow: image.headline1_box_shadow ?? "",
                                                    }}
                                                >
                                                    {image.headline}
                                                </div>
                                            </>
                                        )}
                                        {image.headline2_display && (
                                            <>
                                                <div
                                                    className={image.headline2_class ?? ""}
                                                    style={{
                                                        color: image.font_color1 ?? "",
                                                        textShadow: image.headline2_box_shadow ?? "",
                                                    }}
                                                >
                                                    {image.headline1}
                                                </div>
                                            </>
                                        )}
                                        {image.description_display && (
                                            <>
                                                <div
                                                    className={image.description_class ?? ""}
                                                    style={{ color: image.font_color2 ?? "" }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: image.description,
                                                    }}
                                                ></div>
                                            </>
                                        )}
                                        <div className="w-full">
                                            {image.button_display1 === undefined ? (
                                                image.button_display === "Yes" && (
                                                    <>
                                                        <div
                                                            className={`pt-0 lg:pt-5 ${image?.button_text_alignment}`}
                                                            title={image.button_text}
                                                        >

                                                            <a
                                                                href={image.button_link}
                                                                data-aos={image?.button_aos_effect ?? ""}
                                                                title={image.button_alt ?? image.button_text}
                                                                target={
                                                                    image.button_link_window === "_blank"
                                                                        ? "_blank"
                                                                        : ""
                                                                }
                                                                className={`${image.button_class}`}
                                                                style={{
                                                                    boxShadow: image?.button_box_shadow,
                                                                }}
                                                                rel="noreferrer"
                                                            >
                                                                {image.button_text}
                                                            </a>

                                                        </div>
                                                    </>
                                                )
                                            ) : (
                                                <>
                                                    {image.button_display1 === "Yes" &&
                                                        image.button_display === "Yes" ? (
                                                        <>
                                                            <div
                                                                className={`pt-3 lg:pt-5 flex ${image?.btn_hpos}`}
                                                            >

                                                                <a
                                                                    href={image.button_link}
                                                                    data-aos={image?.button_aos_effect ?? ""}
                                                                    title={
                                                                        image.button_alt ?? image.button_text
                                                                    }
                                                                    target={
                                                                        image.button_link_window === "_blank"
                                                                            ? "_blank"
                                                                            : ""
                                                                    }
                                                                    className={`${image.button_class}`}
                                                                    style={{
                                                                        boxShadow: image?.button_box_shadow,
                                                                    }}
                                                                    rel="noreferrer"
                                                                >
                                                                    {image.button_text}
                                                                </a>

                                                                <a
                                                                    href={image.button_link1}
                                                                    data-aos={image?.button1_aos_effect ?? ""}
                                                                    title={
                                                                        image.button_alt1 ?? image.button_text1
                                                                    }
                                                                    target={
                                                                        image.button_link_window1 === "_blank"
                                                                            ? "_blank"
                                                                            : ""
                                                                    }
                                                                    className={`${image.button_class1}`}
                                                                    style={{
                                                                        boxShadow: image?.button_box_shadow1,
                                                                    }}
                                                                    rel="noreferrer"
                                                                >
                                                                    {image.button_text1}
                                                                </a>

                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {image.button_display === "Yes" && (
                                                                <>
                                                                    <div
                                                                        className={`pt-0 lg:pt-5 ${image?.button_text_alignment}`}
                                                                        title={image.button_text}
                                                                    >

                                                                        <a
                                                                            href={image.button_link}
                                                                            data-aos={
                                                                                image?.button_aos_effect ?? ""
                                                                            }
                                                                            title={
                                                                                image.button_alt ?? image.button_text
                                                                            }
                                                                            target={
                                                                                image.button_link_window === "_blank"
                                                                                    ? "_blank"
                                                                                    : ""
                                                                            }
                                                                            className={`${image.button_class}`}
                                                                            style={{
                                                                                boxShadow: image?.button_box_shadow,
                                                                            }}
                                                                            rel="noreferrer"
                                                                        >
                                                                            {image.button_text}
                                                                        </a>

                                                                    </div>
                                                                </>
                                                            )}
                                                            {image.button_display1 === "Yes" && (
                                                                <>
                                                                    <div
                                                                        className={`pt-0 lg:pt-5 ${image?.button_text_alignment1}`}
                                                                        title={image.button_text1}
                                                                    >
                                                                        <a
                                                                            href={image.button_link1}
                                                                            data-aos={
                                                                                image?.button1_aos_effect ?? ""
                                                                            }
                                                                            title={
                                                                                image.button_alt1 ??
                                                                                image.button_text1
                                                                            }
                                                                            target={
                                                                                image.button_link_window1 === "_blank"
                                                                                    ? "_blank"
                                                                                    : ""
                                                                            }
                                                                            className={`${image.button_class1}`}
                                                                            style={{
                                                                                boxShadow: image?.button_box_shadow1,
                                                                            }}
                                                                            rel="noreferrer"
                                                                        >
                                                                            {image.button_text1}
                                                                        </a>

                                                                    </div>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            )}
        </>
    );
};

export default ElementCarouselDisplay;
