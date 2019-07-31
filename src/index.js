/*
react-image-designer
(c) Long Story Media
@license MIT
*/
import React, { PureComponent } from "react";

export default class ImageDesigner extends PureComponent {
  image = new Image();
  state = {
    src: this.props.placeholder || "",
    styles: this.props.noImage
      ? {}
      : {
          filter: "blur(5px)",
          transition: "filter 1.5s ease-in-out"
        }
  };
  componentDidUpdate(prevProps) {
    const { src, placeholder } = this.props;
    if (src !== prevProps.src) {
      this.setState({ image: placeholder }, () => {
        this.loadImage(src);
      });
    }
  }
  componentDidMount() {
    const { src, noImage, timeout } = this.props;
    !noImage && this.loadImage(src);
  }
  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }
  onLoad = () => {
    const { src, timeout } = this.props;
    if (timeout)
      setTimeout(() => this.setState({ src: src, styles: {} }), timeout);
    else this.setState({ src: src, styles: {} });
  };
  onError = e => this.props.onError && this.props.onError(e);
  loadImage = src => {
    const { srcset, sizes } = this.props;
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
    const { src, styles } = this.state;
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
      >
        {children}
      </ImgTag>
    );
  }
}
