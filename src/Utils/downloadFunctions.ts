export const downloadSVG = (
  iconName: string,
  icons: { [key: string]: string },
  gradient: boolean,
  primaryColor: string,
  secondaryColor: string,
  size: number,
  swidth: number | "auto",
  backgroundColor: string,
  backgroundColorEnabled: boolean,
  borderRadius: number,
  padding: number,
  rotation: number 
) => {
  const svgData = icons[iconName];
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  if (backgroundColorEnabled) {
    const rectElement = svgDoc.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rectElement.setAttribute("width", "100%");
    rectElement.setAttribute("height", "100%");
    rectElement.setAttribute("fill", backgroundColor);
    rectElement.setAttribute("stroke", "none");
    svgDoc.documentElement.insertBefore(
      rectElement,
      svgDoc.documentElement.firstChild
    );
  }

  svgElement.style.padding = `${padding}px`;
  svgElement.style.borderRadius = `${borderRadius}px`;

  if (gradient) {
    const linearGradient = svgDoc.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    linearGradient.setAttribute("id", `gradient-${iconName}`);
    linearGradient.setAttribute("gradientTransform", `rotate(${rotation})`);
    linearGradient.innerHTML = `
      <stop offset="0%" stop-color="${secondaryColor}" />
      <stop offset="100%" stop-color="${primaryColor}" />
    `;
    svgElement.appendChild(linearGradient);
    svgElement.setAttribute("stroke", `url(#gradient-${iconName})`);
  } else {
    svgElement.setAttribute("fill", backgroundColor);
    svgElement.setAttribute("stroke", primaryColor);
  }

  svgElement.setAttribute("width", `${size}px`);
  svgElement.setAttribute("height", `${size}px`);
  svgElement.setAttribute("stroke-width", `${swidth}px`);


  const modifiedSvgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([modifiedSvgData], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${iconName}.svg`;
  link.click();
  URL.revokeObjectURL(url);
};


export const downloadPNG = (
  iconName: string,
  icons: { [key: string]: string },
  gradient: boolean,
  primaryColor: string,
  secondaryColor: string,
  size: number,
  swidth: number | "auto",
  backgroundColor: string,
  backgroundColorEnabled: boolean,
  rotation: number,
  borderRadius: number,
  padding: number
) => {
  const svgData = icons[iconName];
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  if (backgroundColorEnabled) {
    const rectElement = svgDoc.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rectElement.setAttribute("width", "100%");
    rectElement.setAttribute("height", "100%");
    rectElement.setAttribute("fill", backgroundColor);
    rectElement.setAttribute("stroke", "none");
    svgDoc.documentElement.insertBefore(
      rectElement,
      svgDoc.documentElement.firstChild
    );
  }

  // svgElement.style.padding = `${padding}px`;
  svgElement.style.borderRadius = `${borderRadius}px`;

  if (gradient) {
    const linearGradient = svgDoc.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    linearGradient.setAttribute("id", `gradient-${iconName}`);
    linearGradient.setAttribute("gradientTransform", `rotate(${rotation})`);
    linearGradient.innerHTML = `
      <stop offset="0%" stop-color="${secondaryColor}" />
      <stop offset="100%" stop-color="${primaryColor}" />
    `;
    svgElement.appendChild(linearGradient);
    svgElement.setAttribute("stroke", `url(#gradient-${iconName})`);
  } else {
    svgElement.setAttribute("fill", backgroundColor);
    svgElement.setAttribute("stroke", primaryColor);
  }

  svgElement.setAttribute("width", `${size}px`);
  svgElement.setAttribute("height", `${size}px`);
  svgElement.setAttribute("stroke-width", `${swidth}px`);

  // Convert SVG to PNG
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svgImage = new Image();

  svgImage.onload = () => {
    canvas.width = svgImage.width;
    canvas.height = svgImage.height;

    if (ctx) {
      ctx.drawImage(svgImage, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${iconName}.png`;
          link.click();
          URL.revokeObjectURL(url);
        } else {
          console.error("Failed to create PNG blob.");
        }
      });
    } else {
      console.error("Failed to get canvas context.");
    }
  };

  svgImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgString
  )}`;
};
