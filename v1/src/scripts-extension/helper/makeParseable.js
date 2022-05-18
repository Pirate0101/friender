/**
 * Function to make this fucking facebook response clean
 */
 const makeParsable = (html, special = false) => {
    let withoutForLoop = html.replace(/for\s*\(\s*;\s*;\s*\)\s*;\s*/, "");
    if (special) {
      withoutForLoop = withoutForLoop.replace(/for \(;;\);/g, "");
    }
  
    // (What the fuck FB, why windows style newlines?)
    // So sometimes FB will send us base multiple objects in the same response.
    // They're all valid JSON, one after the other, at the top level. We detect
    // that and make it parse-able by JSON.parse.
    //
    // It turns out that Facebook may insert random number of spaces before
    // next object begins
    let maybeMultipleObjects = special ? withoutForLoop.split(/\r\n/g) : withoutForLoop.split(/\}\r\n *\{/);
    if (maybeMultipleObjects.length === 1) return maybeMultipleObjects;
  
    return special ? maybeMultipleObjects : "[" + maybeMultipleObjects.join("},{") + "]";
  };
  
  export default makeParsable;
  