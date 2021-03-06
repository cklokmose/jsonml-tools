/* Copyright 2015 Clemens N. Klokmose, Aarhus University

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

exports.toXML = function(obj, selfclose, replaceLessThanSigns = true) {
  if (!obj || !obj.length) {
    return '';
  }

  if (typeof obj === 'string') {
    return replaceLessThanSigns ? obj.replace(/</g,'&lt;') : obj;
  }

  const tagName = obj[0];
  if (typeof tagName !== 'string') {
    throw Error("Invalid JsonML");
  }

  if (tagName === "!" || tagName === "#comment") {
    const textOffset = typeof obj[1] === "object" ? 2 : 1;
    const text = obj.slice(textOffset).join('');
    return "<!--" + text + "-->";
  }

  let attrStr = "";
  let childIndex = 1;
  if (obj.length > 1 && typeof obj[1] !== 'string' && !Array.isArray(obj[1])) {
    const attrs = obj[1];
    for (let property in attrs) {
      if (attrs.hasOwnProperty(property)) {
        attrStr += " ";
        attrStr += property;
        // The attribute may exist, but not have a value.
        if (attrs[property]) {
          attrStr += "=";
          attrStr += '"' + attrs[property].toString().replace(/\"/g, "&quot;") + '"';
        }
      }
    }
    childIndex++;
  }

  const children = obj.slice(childIndex, obj.length);
  let childXML = ""
  // Don't replace < with &lt; in scripts or styles.
  replaceLessThanSigns = !['script', 'style'].includes(obj[0].toLowerCase());
  for (let i = 0; i<children.length; i++) {
    childXML += this.toXML(children[i], selfclose, replaceLessThanSigns);
  }

  selfclose = (selfclose === undefined) || (selfclose.map(function (x) {
    return x.toLowerCase()
  }).indexOf(tagName.toLowerCase()) !== -1);

  if (children.length === 0 && selfclose) {
    return "<" + tagName + attrStr + "/>"
  }

  return "<" + tagName + attrStr + ">" + childXML + "</" + tagName + ">";
}