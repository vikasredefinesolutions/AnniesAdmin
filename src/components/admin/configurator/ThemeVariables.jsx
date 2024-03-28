/*Component Name: ThemeVariables
Component Functional Details: User can create or update ThemeVariables details from here.
Created By: Happy
Created Date: 26/9/22
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import createShades from 'colorshades';
import { Helmet } from 'react-helmet';

import FontService from 'services/common/font/FontService';

import { storeCompanyConfigurationData } from 'redux/CompanyConfiguration/CompanyConfigurationActions';

const ThemeVariables = () => {
    const dispatch = useDispatch();

    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);
    const data = useSelector((store) => store?.ThemeConfiguration);

    const [themeSetting, setThemeSetting] = useState({
        BodyFont: data?.bFontFamily || "Raleway,sans-serif",
        TitleFont: data?.pFontFamily || "Raleway,sans-serif",
        logoImg: data?.headerLogoUrl || "",
        SmSize: data?.bFontSize || "",
        SmLetterSpacing: data?.bLetterSpacing || "",
        SmLineHeight: data?.bLineHeight || "",
        SmFontWeight: data?.bFontWeight || "",
        TitleSize: data?.pFontSize || "",
        TitleLetterSpacing: data?.pLetterSpacing || "",
        TitleLineHeight: data?.pLineHeight || "",
        TitleFontWeight: data?.pFontWeight || "",
        bfontURL: "",
        pfontURL: "",
    });

    const getBodyFontDataById = useCallback((FontFamily, firstVar, secondVar) => {
        if (FontFamily) {
            FontService.getFontById(FontFamily).then((res) => {
                var response = res.data;
                if (response.success && response?.data) {
                    setThemeSetting((prev) => {
                        return {
                            ...prev,
                            [firstVar]: response?.data?.fontUrl,
                            [secondVar]: response?.data?.googleFontName,
                        };
                    });
                }
            }).catch((err) => { });
        }
    }, []);

    useEffect(() => {
        setThemeSetting((prevState) => ({
            ...prevState,
            BodyFont: data?.bFontFamily || "Raleway,sans-serif",
            TitleFont: data?.pFontFamily || "Raleway,sans-serif",
            logoImg: data?.headerLogoUrl || "",
            SmSize: data?.bFontSize || "",
            SmLetterSpacing: data?.bLetterSpacing || "",
            SmLineHeight: data?.bLineHeight || "",
            SmFontWeight: data?.bFontWeight || "",
            TitleSize: data?.pFontSize || "",
            TitleLetterSpacing: data?.pLetterSpacing || "",
            TitleLineHeight: data?.pLineHeight || "",
            TitleFontWeight: data?.pFontWeight || "",
        }))

        if (data?.bFontFamily) {
            getBodyFontDataById(data?.bFontFamily, "bfontURL", "BodyFont")
        }

        if (data?.pFontFamily) {
            getBodyFontDataById(data?.pFontFamily, "pfontURL", "TitleFont")
        }
    }, [JSON.stringify(data)]);

    useEffect(() => {
        if (AdminAppConfigReducers["azure:BlobUrl"]) {
            if (data?.headerLogoUrl) {
                localStorage.setItem('header_logo', `"${AdminAppConfigReducers["azure:BlobUrl"]}${data?.headerLogoUrl + "?" + Math.random(5)}"`)
            }

            if (data?.faviconUrl) {
                localStorage.setItem('favicon', `${AdminAppConfigReducers["azure:BlobUrl"]}${data?.faviconUrl + "?" + Math.random(5)}`);
            }

            if (data?.headerLogoUrl) {
                dispatch(storeCompanyConfigurationData({ headerLogo: `${AdminAppConfigReducers["azure:BlobUrl"]}${data?.headerLogoUrl}` + "?" + Math.random(5) }));
            }
        }
    }, [JSON.stringify(data), JSON.stringify(AdminAppConfigReducers)]);

    useEffect(() => {
        // sbgActivecolor 
        if (data?.sbgActivecolor) {
            const RedShades = createShades(data?.sbgActivecolor);

            if (Array.isArray(RedShades?.colors) && RedShades?.colors.length) {
                RedShades?.colors.map((shade) => {
                    document.documentElement.style.setProperty(`--color-red-${shade.index}`, shade.hex || data?.sbgActivecolor);
                })
            }
        }

        // data?.sFontcolor
        if (data?.sFontcolor) {
            const PurpleShades = createShades(data?.sFontcolor);

            if (Array.isArray(PurpleShades?.colors) && PurpleShades?.colors.length) {
                PurpleShades?.colors.map((shade) => {
                    document.documentElement.style.setProperty(`--color-lightpurple-${shade.index}`, shade.hex || data?.sFontcolor);
                })
            }
        }

        // data?.cBgcolor
        if (data?.cBgcolor) {
            const IndigoShades = createShades(data?.cBgcolor);

            if (Array.isArray(IndigoShades?.colors) && IndigoShades?.colors.length) {
                IndigoShades?.colors.map((shade) => {
                    document.documentElement.style.setProperty(`--color-indigo-${shade.index}`, shade.hex || data?.cBgcolor);
                })
            }
        }

        // data?.sBgcolor
        if (data?.sBgcolor) {
            const sidebarbar = createShades(data?.sBgcolor);

            if (Array.isArray(sidebarbar?.colors) && sidebarbar?.colors.length) {
                sidebarbar?.colors.map((shade) => {
                    document.documentElement.style.setProperty(`--color-sidebarbar-${shade.index}`, shade.hex || data?.sBgcolor);
                })
            }
        }

        // data?.sActiveColor
        if (data?.sActiveColor) {
            const sidebartext = createShades(data?.sActiveColor);

            if (Array.isArray(sidebartext?.colors) && sidebartext?.colors.length !== 0) {
                sidebartext?.colors.map((shade) => {
                    document.documentElement.style.setProperty(`--color-sidebartext-${shade.index}`, shade.hex || data?.sActiveColor);
                })
            }
        }

        // data?.cFontcolor
        if (data?.cFontcolor) {
            const buttontext = createShades(data?.cFontcolor);

            if (Array.isArray(buttontext?.colors) && buttontext?.colors.length !== 0) {
                buttontext?.colors.map((shade) => {
                    document.documentElement.style.setProperty(`--color-buttontext-${shade.index}`, shade.hex || data?.cFontcolor);
                })
            }
        }

        // data?.primary
        if (data?.primary) {
            const gray = createShades(data?.primary);

            if (Array.isArray(gray?.colors) && gray?.colors.length !== 0) {
                gray?.colors.map((shade) => {
                    document.documentElement.style.setProperty(`--color-gray-${shade.index}`, shade.hex || data?.primary);
                })
            }
        }
    }, [JSON.stringify(data)]);


    useEffect(() => {
        document.documentElement.style.setProperty(`--body-font-url`, `url("${themeSetting.bfontURL}")`);
        document.documentElement.style.setProperty(`--page-font-url`, `url("${themeSetting.pfontURL}")`);
        document.documentElement.style.setProperty(`--body-font`, themeSetting.BodyFont);
        document.documentElement.style.setProperty(`--title-font`, themeSetting.TitleFont);
        document.documentElement.style.setProperty(`--sm-size`, `${themeSetting.SmSize}px`);
        document.documentElement.style.setProperty(`--logo-img`, `url("${AdminAppConfigReducers["azure:BlobUrl"]}${themeSetting.logoImg + "?" + Math.random(5)}")`);
        document.documentElement.style.setProperty(`--sm-letterSpacing`, `${themeSetting.SmLetterSpacing}px`);
        document.documentElement.style.setProperty(`--sm-lineHeight`, themeSetting.SmLineHeight);
        document.documentElement.style.setProperty(`--sm-fontWeight`, `${themeSetting.SmFontWeight}`);
        document.documentElement.style.setProperty(`--title-size`, `${themeSetting.TitleSize}px`);
        document.documentElement.style.setProperty(`--title-letterSpacing`, `${themeSetting.TitleLetterSpacing}px`);
        document.documentElement.style.setProperty(`--title-lineHeight`, themeSetting.TitleLineHeight);
        document.documentElement.style.setProperty(`--title-fontWeight`, `${themeSetting.TitleFontWeight}`);
    }, [JSON.stringify(themeSetting)]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <link rel="shortcut icon" type="image/icon type" href={`${AdminAppConfigReducers["azure:BlobUrl"]}${data.faviconUrl + "?" + Math.random(5)}`} />
            </Helmet>
        </>
    );
};

export default ThemeVariables;
