const isHidden = element => element && element.offsetParent === null;

const pos = element => {
  if (element && element.getBoundingClientRect) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  }
  return false;
};

export const throttle = (fn, wait) => {
  let time = Date.now();
  return function() {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
};

export default function inViewport(element) {
  if (isHidden(element) || !element) return false;

  let top = window.pageYOffset;
  let left = window.pageXOffset;
  let bottom = top + window.innerHeight;
  let right = left + window.innerWidth;

  const elementPosition = pos(element) || { top: 0, left: 0 };

  return (
    top <= elementPosition.top &&
    bottom >= elementPosition.top &&
    left <= elementPosition.left &&
    right >= elementPosition.left
  );
}
