import React from "react";
import { render } from "react-dom";
import ImageDesigner from "./";

({ src, placeholder, domId, ...props }) =>
  render(
    <ImageDesigner src={src} placeholder={placeholder} {...props} />,
    document.getElementById(domId)
  );
