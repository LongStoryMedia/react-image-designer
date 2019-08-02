/*
react-image-designer
(c) Long Story Media
@license WTFPL
*/
import React, { PureComponent, createRef } from "react";
import inView, { throttle } from "./inView";

export default class ImageDesigner extends PureComponent {
  constructor(props) {
    super(props);
    this.image = new Image();
    this.state = {
      src: props.placeholder || "",
      ref: createRef(),
      onScreen: false,
      styles: props.noImage
        ? {}
        : {
            filter: "blur(5px)",
            transition: "filter 1.5s ease-in-out"
          }
    };
    this.tryLoad = this.shouldLoad;
    this.shouldLoad = throttle(this.shouldLoad, 500);
  }

  componentDidUpdate(prevProps) {
    const { src, placeholder } = this.props;
    const { ref } = this.state;
    if (src !== prevProps.src) {
      this.setState({ image: placeholder }, () => this.tryLoad());
    }
  }
  componentDidMount() {
    const { src, noImage, timeout } = this.props;
    const { ref } = this.state;
    this.tryLoad();
    window.addEventListener("scroll", this.shouldLoad);
  }
  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    window.removeEventListener("scroll", this.shouldLoad);
  }
  shouldLoad = () => {
    const { src, placeholder } = this.props;
    const { ref, onScreen } = this.state;
    if (ref.current && inView(ref.current) && !onScreen) {
      this.loadImage(src);
    }
    if (onScreen) window.removeEventListener("scroll", this.shouldLoad);
  };
  onLoad = () => {
    const { src, timeout } = this.props;
    if (timeout)
      setTimeout(() => this.setState({ src: src, styles: {} }), timeout);
    else this.setState({ src: src, styles: {} });
  };
  onError = e => this.props.onError && this.props.onError(e);
  loadImage = src => {
    const { srcset, sizes } = this.props;
    this.setState({ onScreen: true });
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
    const img = new Image();
    this.image = img;
    img.onload = this.onLoad;
    img.onerror = this.onError;
    img.src = src;
    if (srcset) {
      img.srcset = srcset;
      img.sizes = sizes;
    }
  };
  render() {
    const {
      style,
      className,
      contain,
      repeat,
      position,
      children,
      alt,
      tag,
      srcset,
      sizes,
      id,
      noImage
    } = this.props;
    const { src, styles, ref } = this.state;
    const t = tag ? tag : "img";
    const ImgTag = `${t}`;
    const isImg = tag === "img";
    const dynamicStyles = {
      ...styles,
      backgroundColor: (style && style.backgroundColor) || "transparent",
      backgroundImage: noImage || isImg ? "" : `url("${src}")`,
      backgroundPosition: !position ? "center" : position,
      backgroundOrigin: "initial",
      backgroundClip: "initial",
      backgroundAttachment: "initial",
      backgroundSize: !contain ? "cover" : "contain",
      backgroundRepeat: !repeat ? "no-repeat" : "repeat",
      height:
        tag === "img"
          ? (style && style.height) || ""
          : (style && style.height) || "200px",
      ...style
    };
    return (
      <ImgTag
        alt={alt ? alt : src}
        srcSet={srcset}
        sizes={sizes}
        src={src}
        style={dynamicStyles}
        className={className}
        id={id}
        ref={ref}
      >
        {children}
      </ImgTag>
    );
  }
}
