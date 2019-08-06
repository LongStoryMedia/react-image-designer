# React Image Designer

[![Build Status](https://travis-ci.org/LongStoryMedia/react-image-designer.svg?branch=master)](https://travis-ci.org/LongStoryMedia/react-image-designer)

[![Known Vulnerabilities](https://snyk.io//test/github/LongStoryMedia/react-image-designer/badge.svg?targetFile=package.json)](https://snyk.io//test/github/LongStoryMedia/react-image-designer?targetFile=package.json)



## Features

- ##### Can be background-image, or src. Just specify they base element tag in props.
- ##### Loads only if visible in window.
- ##### Support for srcset and sizes.
- ##### Placeholder present until src image is loaded (blank by default)
- ##### Can set custom timeout to delay src image load

### background

this project is influenced heavily by [react-progressive-image](https://www.npmjs.com/package/react-progressive-image). However, it appears they are no longer making updates to it (at least not new features), and I needed something similar that had options to generate background-images, use dynamic base element types, and handle `children`. I also prefer a simplified syntax.

### Install

#### yarn
```sh
$ yarn add react-image-designer
```

#### npm
```sh
$ npm install react-image-designer
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-image-designer/umd/react-image-designer.min.js"></script>
```

If you use the UMD build you can find the library on `window.__RID`.

### Props

| Name | Type | Required | Description | Default |
| -- | -- | -- | -- | -- |
| src | `string` | `true`   | source of main image | required - no default |
| placeholder | `string` | `false`  | source of placeholder images | "" |
| style | `obj` | `false`  | inline styles for component | {} |
| className | `string` | `false`  | class for the base element | "" |
| id | `string` | `false`  | id for the base element | "" |
| contain | `boolean` | `false`  | if background-size is 'contain' (else 'cover') | false |
| repeat | `boolean` | `false`  | if image repeats (background images only) | false |
| position | `string` | `false`  | background-position style string | browser default |
| children | [React Children](https://reactjs.org/docs/react-api.html#reactchildren) | `false`  | any string, html, or react element to embed | "" |
| alt | `string` | `false`  | string for alt attribute if img tag | src |
| tag | `string` | `false`  | html element type for img (e.g. - `img`, `div`, `figure` etc.) | "img" |
| srcset | `string` | `false`  | [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) | "" |
| sizes | `string` | `false`  | sizes for srcset | "" |
| noImage | `boolean` | `false`  | if true, no image is used (for text only) | false |
| timeout | `number` | `false`  | delay in milliseconds before src is loaded | 0 |
| lazy | `boolean` | `false`  | if img should be lazy-loaded | true |

#### Simple

```jsx
<ImageDesigner
  src={img.src}
  placeholder={img.placeholder}
  style={{
    height: "auto",
    margin: "auto"
  }}
/>
```

#### With Caption (as background-image)

```jsx
<ImageDesigner
  src={img.src}
  srcset={img.srcset}
  sizes={img.sizes}
  placeholder={img.placeholder}
  id={["img", i].join("-")}
  className={imgClass}
  tag="div"
>
  <div
    className={captionClass}
    dangerouslySetInnerHTML={{
      __html: tryDecode(img.caption)
    }}
  />
</ImageDesigner>
```

### Try Things Live
to test the options, git close this repo, put some images in the 'imgs' directory, and set-up your configuration somewhere in the 'src' directory. Then run ``yarn start ./relative/path/from/src/to/configuration`` or ``npm run start ./relative/path/from/src/to/configuration``. there is an example provided. To run it locally, execute ``yarn start ./dev-scripts/example`` or ``npm run start ./dev-scripts/example``.

### Contributing
clone, install, tinker, submit. Thanks!
