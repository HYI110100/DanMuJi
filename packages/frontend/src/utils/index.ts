export const applyCss = (cssTxt: string, cssName = "event-style") => {
  const existingStyle = document.getElementById(cssName);
  if (existingStyle) {
    document.head.removeChild(existingStyle);
  }
  const styleElement = document.createElement("style");
  styleElement.id = cssName;
  styleElement.textContent = cssTxt;
  document.head.appendChild(styleElement);
};

export function toNumber(_v: string | number | null, toFixedNum?: number): number {
  let v = _v
  if (typeof v === 'string' || (!v && typeof v !== 'number'))
    v = Number.parseFloat(v || '0')
  if (Number.isNaN(v)) {
    // console.warn(`Input value is not a valid number. ${_v} Resetting to 0.`)
    v = 0
  }
  return toFixedNum === undefined ? v : Number.parseFloat((v).toFixed(toFixedNum))
}
export function getImageUrl(url:string) {
  return`http://${window.SEVER_URL}/api/proxy/image?url=${encodeURIComponent(url)}`
}

export function onlyAllowNumber(value: string) {
  return !value || /^\d+$/.test(value);
}