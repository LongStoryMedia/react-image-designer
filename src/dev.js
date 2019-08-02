import ImageDesigner from "./index";
import React from "react";
import { render } from "react-dom";

const rid = ({ src, placeholder, ...props }) => {
  return render(
    <>
      <div style={props.default.spacerStyle} />
      <ImageDesigner src={src} placeholder={placeholder} {...props} />
    </>,
    document.getElementById("react-image")
  );
};
import(TEST_SCRIPT)
  .then(({ src, placeholder, spacerStyle, ...props }) =>
    rid({ src, placeholder, ...props })
  )
  .catch(e => {
    throw new Error(e);
  });
