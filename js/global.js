const createElement = (tagName, className, innerHTML, father) => {
  const element = document.createElement(tagName);
  element.innerHTML = innerHTML;
  element.className = className;

  father && father.append(element);

  return element;
};
export { createElement };
