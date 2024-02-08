import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  Label,
  Slider,
  Switch,
} from "@fluentui/react-components";
import { Dismiss24Regular, PaintBucket24Regular } from "@fluentui/react-icons";
import React, { ChangeEvent, ReactElement, useState } from "react";
import ColorPicker from "./ColorPicker";

type DrawerInlineExampleProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  position?: "bottom" | "end" | "start";
  gradient: boolean;
  backgroundColorEnabled: boolean;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  size: number;
  swidth: number | "auto";
  setBackgroundColorEnabled: (value: boolean) => void;
  setGradient: (value: boolean) => void;
  setSize: (value: number) => void;
  setStrokeWidth: (value: number) => void;
  setPrimaryColor: (value: string) => void;
  setSecondaryColor: (value: string) => void;
  setBackgroundColor: (value: string) => void;
  rotation: number;
  setRotation: (value: number) => void;
  borderRadius: number;
  setBorderRadius: (value: number) => void;
  padding: number;
  setPadding: (value: number) => void;
};

const DrawerInlineExample: React.FC<DrawerInlineExampleProps> = ({
  open,
  setOpen,
  position,
  gradient,
  primaryColor,
  secondaryColor,
  backgroundColor,
  size,
  swidth,
  backgroundColorEnabled,
  setBackgroundColorEnabled,
  padding,
  setPadding,
  rotation,
  setRotation,
  setGradient,
  setSize,
  setStrokeWidth,
  setPrimaryColor,
  setSecondaryColor,
  setBackgroundColor,
  borderRadius,
  setBorderRadius,
}: DrawerInlineExampleProps): ReactElement => {
  const [relativeSize, setRelativeSize] = useState(false);

  const handleRotationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRotation = Number(event.target.value);
    setRotation(newRotation);
  };

  const handlePaddingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPadding = Number(event.target.value);
    setPadding(newPadding);
  };

  const handleBorderRadiusChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newBorderRadius = Number(event.target.value);
    setBorderRadius(newBorderRadius);
  };

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    setSize(newSize);

    if (relativeSize) {
      if (typeof swidth === "number") {
        const ratio = newSize / size;
        const newStrokeWidth = Math.ceil(swidth * ratio);
        setStrokeWidth(newStrokeWidth);
      }
    }
  };

  const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newStrokeWidth = Number(event.target.value);
    setStrokeWidth(newStrokeWidth);

    if (relativeSize) {
      if (typeof swidth === "number") {
        const ratio = newStrokeWidth / swidth;
        const newSize = Math.ceil(size * ratio);
        setSize(newSize);
      }
    }
  };

  const handleRelativeSizeChange = () => {
    setRelativeSize(!relativeSize);
  };

  return (
    <InlineDrawer open={open} position={position}>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => setOpen(false)}
            />
          }
        >
          Customize <PaintBucket24Regular />
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className="p-6">
        <div className="flex">
          <div className="w-64 p-4">
            <div className="mb-4">
              <div>
                <Label
                  className="inline-block text-sm font-bold mb-1"
                  htmlFor="primaryColor"
                  size="large"
                >
                  Gradient
                </Label>
                <Switch
                  id="primaryColor"
                  className="ml-2"
                  onChange={() => setGradient(!gradient)}
                  checked={gradient}
                />
              </div>

              <div className="flex items-center space-x-2">
                <ColorPicker color={primaryColor} onChange={setPrimaryColor} />

                {gradient && (
                  <div className="flex space-x-1">
                    <ColorPicker
                      color={secondaryColor}
                      onChange={setSecondaryColor}
                    />

                    <div className="flex items-center">
                      <Slider
                        type="number"
                        value={rotation}
                        step={30}
                        min={0}
                        max={90}
                        onChange={handleRotationChange}
                      />
                      <span className="ml-2">{rotation}°</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center mt-4">
                <Label
                  className="block text-sm font-bold mb-1 mr-2"
                  htmlFor="backgroundColorToggle"
                  size="large"
                >
                  Background colour
                </Label>
                <Switch
                  id="backgroundColorToggle"
                  onChange={() =>
                    setBackgroundColorEnabled(!backgroundColorEnabled)
                  }
                  checked={backgroundColorEnabled}
                />
              </div>

              {backgroundColorEnabled && (
                <div>
                  <ColorPicker
                    color={backgroundColor}
                    onChange={setBackgroundColor}
                  />
                  <div>
                    <Label
                      className="block text-sm font-bold mt-4 mb-2"
                      htmlFor="borderRadius"
                      size="large"
                    >
                      Boundary radius
                    </Label>
                    <div className="flex items-center">
                      <Slider
                        id="borderRadius"
                        className="w-full"
                        value={borderRadius}
                        step={20}
                        min={0}
                        max={100}
                        onChange={handleBorderRadiusChange}
                      />
                      <span className="ml-2">{borderRadius}</span>
                    </div>
                  </div>
                  <div>
                    <Label
                      className="block text-sm font-bold mt-4 mb-2"
                      htmlFor="padding"
                      size="large"
                    >
                      Padding
                    </Label>
                    <div className="flex items-center">
                      <Slider
                        id="padding"
                        className="w-full"
                        value={padding}
                        step={8}
                        min={0}
                        max={32}
                        onChange={handlePaddingChange}
                      />
                      <span className="ml-2">{padding}</span>
                    </div>
                  </div>
                </div>
              )}

              <Label
                className="block text-sm font-bold mt-4 mb-2"
                htmlFor="size"
                size="large"
              >
                Size
              </Label>
              <div className="flex items-center">
                <Slider
                  id="size"
                  className="w-full"
                  value={size}
                  step={32}
                  min={32}
                  max={128}
                  onChange={handleSizeChange}
                />
                <span className="ml-2">{size}</span>
              </div>

              <Label
                className="block text-sm font-bold mt-4 mb-2"
                htmlFor="strokeWidth"
                size="large"
              >
                Stroke Width
              </Label>
              <div className="flex items-center">
                <Slider
                  id="strokeWidth"
                  className="w-full"
                  value={typeof swidth === "number" ? swidth : undefined}
                  step={1}
                  min={1}
                  max={4}
                  onChange={handleStrokeWidthChange}
                  disabled={relativeSize}
                />

                <span className="ml-2">{swidth}</span>
              </div>
              <div className="flex items-center mt-4">
                <Label
                  className="block text-sm font-bold mb-2 mr-2"
                  htmlFor="relativeSize"
                  size="large"
                >
                  Relative
                </Label>
                <Switch
                  id="relativeSize"
                  checked={relativeSize}
                  onChange={handleRelativeSizeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </DrawerBody>
    </InlineDrawer>
  );
};

export default DrawerInlineExample;
