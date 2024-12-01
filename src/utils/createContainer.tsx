export default function createContainer(
  portalId = 'notifyContainer',
  isA11y: boolean
) {
  let element = document.getElementById(portalId);

  if (element) {
    if (!isA11y) {
      element.removeAttribute('aria-live');
      element.removeAttribute('role');
    } else {
      element.setAttribute('aria-live', 'assertive');
      element.setAttribute('role', 'status');
    }
    return element;
  }

  element = document.createElement('div');
  element.setAttribute('id', portalId);
  if (isA11y) {
    element.setAttribute('aria-live', 'assertive');
    element.setAttribute('role', 'status');
  }
  element.className = 'fixed top-24 end-8 w-11/12 max-w-96 flex flex-col gap-2';
  document.body.appendChild(element);

  return element;
}
