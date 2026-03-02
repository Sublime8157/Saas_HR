const isBlank = (item) => {
    if(item === ' ' || item === '' || item === undefined || item === 0 || item === NaN || item.length === 0){
        return true
    }
    return false
}

const IDENT_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
function ident(name) {
  if (!IDENT_RE.test(name)) throw new Error(`Unsafe identifier: ${name}`);
  return `"${name}"`;
}

export default {
    isBlank, ident
}