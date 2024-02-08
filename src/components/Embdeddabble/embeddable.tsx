"use client";

import React, {ReactElement, useCallback, useEffect, useState} from "react";
import "./styles.css"
import {Button, Checkbox, FluentProvider, Slider, Text} from '@fluentui/react-components';
import {ArrowCounterclockwise24Filled, Dismiss24Filled} from "@fluentui/react-icons";
import {renderToString} from 'react-dom/server';
import dbAdminTheme from "@/theme";

type Props = {
    icons: { [key: string]: string }, theme: {
        gradientStart?: string;
        gradientEnd?: string;
        hasGradient?: boolean;
        strokeWidth?: number;
        size?: number
        gradientAngle?: number
    }
}
export const Embeddable = ({
                               icons, theme = {
        gradientStart: "#000000",
        gradientEnd: "#00A7DB",
        hasGradient: false,
        strokeWidth: 5,
        gradientAngle: 0,
        size: 40
    }
                           }: Props) => {

    const [iconTheme, setIconTheme] = useState(theme)

    const [selectedIcon, setSelectedIcon] = useState("")
    const [isPanelClosed, setIsPanelClosed] = useState(true)


    const IconItem = useCallback(
        ({ iconName }: { iconName: string }): React.ReactElement => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(icons[iconName], 'image/svg+xml');
        const iconStyle = doc.querySelector('style') as HTMLStyleElement;
        const stops = doc.querySelectorAll('stop');
        const linearGradient = doc.querySelector('linearGradient');
        if (iconTheme.hasGradient) {
            linearGradient?.setAttribute("gradientTransform", `rotate(${iconTheme.gradientAngle})`)
        }
        stops.forEach((stop) => {
            if (stop.attributes[0].value === "0") {
                stop.attributes[1].value = iconTheme.gradientEnd as string
            } else {
                stop.attributes[1].value = iconTheme.gradientStart as string
            }
        })
        console.clear()
        const linearGradient2Pattern = /stroke: url\(#linear-gradient-2\);/g;
        const linearGradient1Pattern = /stroke: url\(#linear-gradient\);/g;
        const searchPattern1 = /(stroke:) (url\(#[^)]+\))(;stroke2:url\(#linear-gradient-2);/g;
        const searchPattern = /(stroke:) (url\(#[^)]+\))(;stroke1:url\(#linear-gradient);/g;

        const strokeWidthPattern = /stroke-width:\s*([\d.]+px);/g;
        iconStyle.innerHTML = (iconStyle as HTMLStyleElement).innerHTML.replace(
            strokeWidthPattern,
            `stroke-width: ${iconTheme.strokeWidth};`
        );



        iconStyle.innerHTML = (iconStyle as HTMLStyleElement).innerHTML.replaceAll(
            linearGradient1Pattern,
            'stroke: url(#linear-gradient);stroke1:url(#linear-gradient);'
        );
        iconStyle.innerHTML = (iconStyle as HTMLStyleElement).innerHTML.replaceAll(
            linearGradient2Pattern,
            'stroke: url(#linear-gradient-2);stroke2:url(#linear-gradient-2);'
        );







        if(!(iconTheme.hasGradient)){
            iconStyle.innerHTML = (iconStyle as HTMLStyleElement).innerHTML.replaceAll(
                'stroke: aqua;',
                `stroke: ${iconTheme.gradientStart};stroke1:url(#linear-gradient);`
            );
            iconStyle.innerHTML = (iconStyle as HTMLStyleElement).innerHTML.replaceAll(
                'stroke: url(#linear-gradient);stroke1:url(#linear-gradient);',
                `stroke: ${iconTheme.gradientStart};stroke1:url(#linear-gradient);`
            );
            iconStyle.innerHTML = (iconStyle as HTMLStyleElement).innerHTML.replaceAll(
                'stroke: url(#linear-gradient-2);stroke2:url(#linear-gradient-2);',
                `stroke: ${iconTheme.gradientStart};stroke2:url(#linear-gradient-2);`
            );
        }else{
            iconStyle.innerHTML = (iconStyle as HTMLStyleElement).innerHTML.replaceAll(
                'stroke: aqua;',
                ''
            );
            iconStyle.innerHTML = iconStyle.innerHTML.replaceAll(
                searchPattern1,
                (match, group1, currentUrlValue, group3) => {
                    return `${group1}${iconTheme.hasGradient ? "stroke:url(#linear-gradient-2);" : iconTheme?.gradientStart}${group3}`;
                }
            );
            iconStyle.innerHTML = iconStyle.innerHTML.replaceAll(
                searchPattern,
                (match, group1, currentUrlValue, group3) => {
                    return `${group1}${iconTheme.hasGradient ? "stroke:url(#linear-gradient);" : iconTheme?.gradientStart}${group3}`;
                }
            );
        }

        const serializer = new XMLSerializer();
        const updatedSvg = serializer.serializeToString(doc);
        return (<div
            dangerouslySetInnerHTML={{__html: updatedSvg}}
        />)
    },   [iconTheme.gradientAngle, iconTheme.gradientEnd, iconTheme.gradientStart, iconTheme.hasGradient, iconTheme.strokeWidth, icons])


    const reset = () => {
        setIconTheme(theme)
    }

    const sendDataToParent = ({ download = false }: { download?: boolean }) => {
        const parentOrigins = [
            "http://localhost:4200/",
            "https://beheer.iris-ontwikkel.databalk.app/",
            "https://beheer.iris-zandbak.databalk.app/",
            "https://beheer.iris.databalk.app/",
        ];
    
        parentOrigins.forEach((parentOrigin) => {
            window.parent.postMessage({
                type: "ICON",
                download,
                name: selectedIcon,
                icon: <IconItem iconName={selectedIcon} />
            }, parentOrigin);
        });
    };
    


    const handleGradientEndColorChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIconTheme({...iconTheme, gradientEnd: event.target.value});
    };

    return (<FluentProvider theme={dbAdminTheme}>
        <div>
            <div className="flex justify-start hide-scrollbar flex-wrap gap-4 p-4">
                {Object.keys(icons).map((iconName: string) => {
                    return (
                        <div key={iconName}
                             title={iconName}
                             className={`w-[99px]  hover:shadow-lg duration-75 cursor-pointer shadow py-4 px-3 rounded-lg flex flex-col justify-center`}
                             onClick={() => {
                                 setSelectedIcon(iconName)
                                 setIsPanelClosed(false)
                             }}>
                            <div className="m-auto" style={{
                                width: `40px`,
                                height: `40px`,
                            }}>{IconItem({iconName})}</div>
                            <span className={"whitespace-nowrap truncate pt-2 text-xs text-center"}>{iconName}</span>
                        </div>
                    );
                })}
            </div>
            <div
                className={`fixed ${isPanelClosed ? "w-0" : "w-1/2 p-2"} right-0 top-0 duration-75 flex flex-col justify-between items-center h-screen bg-white  shadow`}>
                {!isPanelClosed &&
                    <>
                        <div className={"flex flex-row justify-between items-center w-full"}>
                            <Button appearance="subtle" icon={<Dismiss24Filled/>}
                                    onClick={() => setIsPanelClosed(!isPanelClosed)}/>
                            <Button appearance="subtle" icon={<ArrowCounterclockwise24Filled/>}
                                    onClick={() => reset()}/>
                        </div>
                        <Text weight="bold">{selectedIcon}</Text>

                        <div className={"h-[40px] w-[40px]"}>
                            {IconItem({
                                iconName: selectedIcon
                            })}
                        </div>

                        <div className={"w-full h-full flex px-4 flex-col justify-center text-center"}>
                            <div className={"flex flex-row justify-center"}>
                                {iconTheme.hasGradient && (
                                    <input
                                        className={"w-full"}
                                        type="color"
                                        value={iconTheme.gradientEnd}
                                        onChange={handleGradientEndColorChange}
                                    />
                                )}
                                <input
                                    type="color"
                                    className={"w-full"}
                                    value={iconTheme.gradientStart}
                                    onChange={(event) => setIconTheme({
                                        ...iconTheme,
                                        gradientStart: event.target.value
                                    })}
                                />


                            </div>
                            <Checkbox label="Verloop" className={"mx-auto"} checked={iconTheme.hasGradient}
                                      onChange={() => setIconTheme({
                                          ...iconTheme,
                                          hasGradient: !iconTheme.hasGradient
                                      })}/>
                            {iconTheme.hasGradient && (<Slider
                                    defaultValue={iconTheme.strokeWidth}
                                    value={iconTheme.gradientAngle}
                                    size={"medium"}
                                    max={90}
                                    min={-90}
                                    onChange={(e: { target: { value: any; }; }) => {
                                        setIconTheme({...iconTheme, gradientAngle: Number(e.target.value)})
                                    }}
                                />
                            )}

                            <Slider
                                defaultValue={iconTheme.strokeWidth}
                                value={iconTheme.strokeWidth}
                                size={"medium"}
                                max={15}
                                min={1}
                                onChange={(e: { target: { value: any; }; }) => setIconTheme({...iconTheme, strokeWidth: Number(e.target.value)})}
                            />

                        </div>
                        <div className={"flex flex-row justify-center gap-4"}>
                            <Button size={"medium"} onClick={() => sendDataToParent({download: true})}>Download
                            </Button>
                            <Button size={"medium"} appearance="primary"
                                    onClick={() => sendDataToParent({download: false})}>Select Icon
                            </Button>
                        </div>

                    </>
                }
            </div>
        </div>
    </FluentProvider>)


};
