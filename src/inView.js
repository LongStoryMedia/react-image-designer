const isHidden = element => element && element.offsetParent === null;

const pos = element => {
  if (element && element.getBoundingClientRect) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      bottom: rect.bottom + window.pageYOffset,
      right: rect.right + window.pageXOffset
    };
  }
  return false;
};

export const throttle = function(func, interval) {
  let timeout;
  return function() {
    const context = this,
      args = arguments;
    const later = function() {
      timeout = false;
    };
    if (!timeout) {
      func.apply(context, args);
      timeout = true;
      setTimeout(later, interval);
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
    ((elementPosition.bottom >= top && elementPosition.bottom <= bottom) ||
      (elementPosition.top <= bottom && elementPosition.top >= top) ||
      (elementPosition.top <= top && elementPosition.bottom >= bottom)) &&
    (left <= elementPosition.left || right >= elementPosition.left)
  );
}
