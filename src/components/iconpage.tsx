"use client";

import type { DrawerProps, DropdownProps } from "@fluentui/react-components";
import {
  Button,
  Card,
  CardHeader,
  Dropdown,
  FluentProvider,
  Input,
  Option,
  Text,
  useId,
  webLightTheme,
} from "@fluentui/react-components";
import { PaintBucket20Regular } from "@fluentui/react-icons";
import React, { useEffect, useState } from "react";
import { downloadPNG, downloadSVG } from "../Utils/downloadFunctions";
import DrawerInlineExample from "./Drawer/Drawer";
import useStyles from "./IconStyles";
import FileDropdown from "./FileDropdown/FileDropdown";
import StylingUpdater from "./StylesUpdater/StylesUpdater";
import CustomSpinner from "./Spinner/Spinner";
import AppHeader from "./AppHeader/AppHeader";

const setButtonText = (open: boolean, position: DrawerProps["position"]) => {
  const openIcon = <PaintBucket20Regular />;
  const buttonText = "Aanpassen";

  const buttonContent = (
    <div>
      {position === "start" ? buttonText : "Filters drawer"}{" "}
      {open ? null : openIcon}
    </div>
  );

  return buttonContent;
};

const IconPage = (
  { icons }: { icons: { [key: string]: string } },
  props: Partial<DropdownProps>
) => {
  const [size, setSize] = useState<number>(96);
  const [swidth, setStrokeWidth] = useState<number | "auto">(2);
  const [primaryColor, setPrimaryColor] = useState<string>("#000000");
  const [secondaryColor, setSecondaryColor] = useState<string>("#FFFFFF");
  const [gradient, setGradient] = useState<boolean>(false);
  const [backgroundColorEnabled, setBackgroundColorEnabled] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("#BADAEE");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const styles = useStyles();
  const comboId = useId("combo-multi");
  const [leftOpen, setLeftOpen] = React.useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [borderRadius, setBorderRadius] = useState<number>(20);
  const [padding, setPadding] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("Alle iconen");
  const [selectedFileContent, setSelectedFileContent] = useState<Record<string, any> | null>(null);

  const options = ["Alle iconen", "Verhuren", "Huurcontract", "Inspectie"];
  const categoryFilter = (iconName: string) => {
    if (category === "Alle iconen") {
      return true;
    }
    const svgData = icons[iconName];
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
    const categoryElements = svgDoc.querySelectorAll("metadata > category");

    for (let i = 0; i < categoryElements.length; i++) {
      const iconCategory = categoryElements[i].textContent;
      if (iconCategory === category) {
        return true;
      }
    }
    return false;
  };

  const handleFileSelect = (content: Record<string, any> | null) => {
    setSelectedFileContent(content);
  };

  useEffect(() => {
    if (selectedFileContent) {
      const profile = selectedFileContent.Profile;

      setSize(profile.size || 96);
      setStrokeWidth(profile.stroke.width || 2);
      setPrimaryColor(profile.colors[0].hex);
      setSecondaryColor(profile.colors[1].hex);
      setGradient(profile.stroke.type === "gradient");

      if (
        profile.background &&
        profile.background.enabled !== undefined &&
        !profile.background.enabled
      ) {
        setBackgroundColorEnabled(false);
      } else {
        setBackgroundColorEnabled(true);
        setBackgroundColor(profile.background?.color || "#BADAEE");
        setBorderRadius(
          profile.background !== undefined ? profile.background.radius : 20
        );
      }

      setPadding(profile.padding || 0);
      setRotation(profile.rotation || 0);
    }
  }, [selectedFileContent]);
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      {loading ? (
        <CustomSpinner />
      ) : (
        <div>
          <AppHeader />
          <div className={styles.search}>
            <div className="m-3">
              {/* <Dropdown
                size="large"
                aria-labelledby={comboId}
                placeholder="Alle Categorieën"
                value={category}
                {...props}
              >
                {options.map((option) => (
                  <Option key={option} onClick={() => setCategory(option)}>
                    {option}
                  </Option>
                ))}
              </Dropdown> */}
            </div>
            <div className="m-3">
              <Input
              className="w-96"
                size="large"
                placeholder="Zoek iconen"
                value={searchQuery}
                onChange={(ev: {
                  target: { value: React.SetStateAction<string> };
                }) => setSearchQuery(ev.target.value)}
              />
            </div>
            {/* <div>
              <FileDropdown onSelectFile={handleFileSelect} />
            </div>

            <div className="m-3">
              <StylingUpdater
                selectedFileContent={selectedFileContent}
                size={size}
                swidth={swidth}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                gradient={gradient}
                backgroundColorEnabled={backgroundColorEnabled}
                backgroundColor={backgroundColor}
                borderRadius={borderRadius}
                padding={padding}
                rotation={rotation}
              />
            </div> */}
          </div>

          <div>
            <div className={styles.flexColumn}>
              <div className={styles.root}>
                <DrawerInlineExample
                  open={leftOpen}
                  setOpen={setLeftOpen}
                  position="start"
                  gradient={gradient}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  backgroundColor={backgroundColor}
                  size={size}
                  swidth={swidth}
                  setGradient={setGradient}
                  setSize={setSize}
                  setStrokeWidth={setStrokeWidth}
                  setPrimaryColor={setPrimaryColor}
                  setSecondaryColor={setSecondaryColor}
                  setBackgroundColor={setBackgroundColor}
                  setBackgroundColorEnabled={setBackgroundColorEnabled}
                  backgroundColorEnabled={backgroundColorEnabled}
                  rotation={rotation}
                  setRotation={setRotation}
                  borderRadius={borderRadius}
                  setBorderRadius={setBorderRadius}
                  padding={padding}
                  setPadding={setPadding}
                />

                <div className={styles.content}>
                  <div className="ms-5">
                    {!leftOpen && (
                      <Button
                        size="large"
                        onClick={() => setLeftOpen(!leftOpen)}
                      >
                        {setButtonText(leftOpen, "start")}
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 m-4">
                    {Object.keys(icons).map((iconName: string) => {
                      if (
                        searchQuery &&
                        iconName
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) === -1
                      ) {
                        return null;
                      }
                      if (!categoryFilter(iconName)) {
                        return null;
                      }

                      return (
                        <div className="relative group" key={iconName}>
                          <Card className={styles.card}>
                            <CardHeader
                              className="m-auto"
                              header={
                                <Text size={300} weight="semibold">
                                  {iconName}
                                </Text>
                              }
                            />
                            <div className={styles.iconContainer}>
                              <div
                                className="m-auto"
                                style={{
                                  width: `${size}px`,
                                  height: `${size}px`,
                                  borderRadius: `${borderRadius}px`,
                                  backgroundColor: backgroundColorEnabled
                                    ? backgroundColor
                                    : "transparent",
                                  padding: `${padding}px`,
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  <defs>
                                    <linearGradient
                                      id={`gradient-${iconName}`}
                                      gradientTransform={`rotate(${rotation})`}
                                    >
                                      <stop
                                        offset="0%"
                                        stopColor={
                                          gradient
                                            ? secondaryColor
                                            : primaryColor
                                        }
                                      />
                                      <stop
                                        offset="100%"
                                        stopColor={primaryColor}
                                      />
                                    </linearGradient>
                                  </defs>

                                  <g>
                                    <foreignObject width="100%" height="100%">
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: icons[iconName],
                                        }}
                                        style={{
                                          fill: primaryColor,
                                          width: "100%",
                                          height: "100%",
                                          strokeWidth: swidth,
                                          stroke: `url(#gradient-${iconName})`,
                                        }}
                                      />
                                    </foreignObject>
                                  </g>
                                </svg>
                              </div>
                            </div>
                            <div className={styles.buttonContainer}>
                              <Button
                                size="small"
                                appearance="primary"
                                className={styles.button}
                                onClick={() =>
                                  downloadSVG(
                                    iconName,
                                    icons,
                                    gradient,
                                    primaryColor,
                                    secondaryColor,
                                    size,
                                    swidth,
                                    backgroundColor,
                                    backgroundColorEnabled,
                                    borderRadius,
                                    padding,
                                    rotation
                                  )
                                }
                              >
                                SVG
                              </Button>
                              <Button
                                size="small"
                                appearance="primary"
                                className={styles.button}
                                onClick={() =>
                                  downloadPNG(
                                    iconName,
                                    icons,
                                    gradient,
                                    primaryColor,
                                    secondaryColor,
                                    size,
                                    swidth,
                                    backgroundColor,
                                    backgroundColorEnabled,
                                    rotation,
                                    borderRadius,
                                    padding
                                  )
                                }
                              >
                                PNG
                              </Button>
                            </div>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </FluentProvider>
  );
};

export default IconPage;
