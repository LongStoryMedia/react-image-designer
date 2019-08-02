const isHidden = element => element && element.offsetParent === null;

const pos = element => {
  if (element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  }
};

export function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

export default function inViewport(element) {
  if (isHidden(element)) {
    return false;
  }

  let top = window.pageYOffset;
  let left = window.pageXOffset;
  let bottom = top + window.innerHeight;
  let right = left + window.innerWidth;

  const elementPosition = pos(element) || 0;

  return (
    top <= elementPosition.top &&
    bottom >= elementPosition.top &&
    left <= elementPosition.left &&
    right >= elementPosition.left
  );
}
