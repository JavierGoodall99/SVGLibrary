import { Button } from "@fluentui/react-components";
import React, { useState } from "react";

interface StylingUpdaterProps {
  selectedFileContent: Record<string, any> | null;
  size: number;
  swidth: number | "auto";
  primaryColor: string;
  secondaryColor: string;
  gradient: boolean;
  backgroundColorEnabled: boolean;
  backgroundColor: string;
  borderRadius: number;
  padding: number;
  rotation: number;
}

const StylingUpdater: React.FC<StylingUpdaterProps> = ({
  selectedFileContent,
  size,
  swidth,
  primaryColor,
  secondaryColor,
  gradient,
  backgroundColorEnabled,
  backgroundColor,
  borderRadius,
  padding,
  rotation,
}) => {
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateStyling = async () => {
    try {
      if (
        !selectedFileContent ||
        !selectedFileContent.Profile ||
        !selectedFileContent.Profile.name
      ) {
        setUpdateError("Selecteer Huurder");
        return;
      }

      setUpdating(true);
      const updatedProfile = {
        name: selectedFileContent.Profile.name,
        size,
        stroke: { width: swidth, type: gradient ? "gradient" : "solid" },
        colors: [{ hex: primaryColor }, { hex: secondaryColor }],
        background: backgroundColorEnabled
          ? { enabled: true, color: backgroundColor, radius: borderRadius }
          : { enabled: false },
        padding,
        rotation,
      };

      const response = await fetch("/api/putJsonFiles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: selectedFileContent.Profile.name,
          fileContent: { Profile: updatedProfile },
        }),
      });

      if (response.ok) {
        setUpdateError(null);
      } else {
        setUpdateError("Failed to update file");
      }
    } catch (error) {
      setUpdateError("Error updating file");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <Button size="large" onClick={updateStyling} disabled={updating}>
        {updating ? "Updaten..." : "Stijl bijwerken"}
      </Button>
        {updateError && <p className="text-red-500 text-xs">{updateError}</p>}
    </>
  );
};

export default StylingUpdater;