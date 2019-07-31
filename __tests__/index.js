import React from "react";
import ImageDesigner from "../src";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { create } from "react-test-renderer";

global.Image = Image;

const mockProps = {
  src: "https://image.xyz/source",
  placeholder: "https://image.xyz/placeholder",
  style: {
    width: "100%"
  },
  className: "code",
  id: "pictureOfCode1337",
  contain: false,
  repeat: false,
  position: "top left",
  alt: "code closeup",
  srcset:
    "js-320.jpg 320w, js-480.jpg 480w, js-768.jpg 768w, js-1200.jpg 1200w, js-1900.jpg 1900w",
  sizes:
    "(max-width: 320px) 320w, (max-width: 480px) 480w, (max-width: 768px) 768w, (max-width: 1200px) 1200w, 1900px",
  noImage: false
};

let imgDesigner,
  instance,
  updatedInstance,
  imgDesignerB,
  instanceB,
  updatedInstanceB,
  imgDesignerD,
  updatedInstanceD;

beforeAll(() => {
  imgDesigner = create(<ImageDesigner {...mockProps} />);
  imgDesignerB = create(<ImageDesigner tag="div" {...mockProps} />);
  imgDesignerD = create(<ImageDesigner timeout={2000} {...mockProps} />);
  instance = imgDesigner.root;
  instanceB = imgDesignerB.root;
  updatedInstance = imgDesigner.getInstance();
  updatedInstanceB = imgDesignerB.getInstance();
  updatedInstanceD = imgDesignerD.getInstance();
});

test("exports a React component", () => {
  expect(typeof ImageDesigner).toBe("function");
});
test("defaults to img, else sets Image as background-image", () => {
  expect(imgDesigner.toJSON().type).toBe("img");
  expect(imgDesignerB.toJSON().props.style.backgroundImage).toBeTruthy();
});
test("creates an instance of Image when mounted", () => {
  expect(updatedInstance.image.toString()).toMatch("[object HTMLImageElement]");
});
test("sets the onload property on the Image instance", () => {
  updatedInstance.loadImage()
  expect(updatedInstance.image.onload.toString()).toEqual(
    updatedInstance.onLoad.toString()
  );
});
test("sets the onerror property on the Image instance", () => {
  expect(updatedInstance.image.onerror.toString()).toEqual(
    updatedInstance.onError.toString()
  );
});
test("loads placeholder image on first render", () => {
  expect(updatedInstance.state.src).toEqual(instance.props.placeholder);
});
test("updates src, or background-image (when type is not img), to full size image on load", () => {
  updatedInstance.onLoad();
  expect(updatedInstance.state.src).toEqual(instance.props.src);
  updatedInstanceB.onLoad();
  expect(updatedInstanceB.state.src).toEqual(instanceB.props.src);
});
test("does not immediately set image if timeout exists", () => {
  updatedInstanceD.onLoad();
  expect(updatedInstanceD.state.src).toEqual(instance.props.placeholder);
});
test("sets image after timeout if timeout exists", () => {
  setTimeout(() => {
    expect(updatedInstanceD.state.src).toEqual(instance.props.src);
  }, updatedInstanceD.props.timeout + 1);
});
