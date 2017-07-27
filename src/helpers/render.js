/**
 * Aplica propriedades definidas a uma template string
 * e retorna um elemento, renderizado, com ela.
 * @param {String} template
 * @param {Object} properties
 * @returns {HTMLElement}
 */
export default function render(template, properties = {}) {
  const element = document.createElement('div');

  element.innerHTML = template.replace(/\[\w*\]/g, matched => {
    const property = matched.replace(/\[|\]/g, '');
    return properties[property] || matched;
  });

  return element.children[0] || null
}
