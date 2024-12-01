export function toggleStyles(stylesEnabled: boolean) {
  //setA11yMode({ ...a11yMode, hasStyles: !a11yMode.hasStyles });

  const stylesheets = document.querySelectorAll<HTMLLinkElement>(
    'link[rel="stylesheet"]'
  );
  const elementsWithInlineStyles =
    document.querySelectorAll<HTMLElement>('[style]');
  const elementsWithInlineStylesDisabled =
    document.querySelectorAll('[data-style]');

  stylesheets.forEach((link) => {
    //console.log('link', link);
    if (stylesEnabled) {
      link.removeAttribute('disabled');
    } else {
      link.disabled = true;
    }
  });

  if (stylesEnabled) {
    elementsWithInlineStylesDisabled.forEach((el) => {
      const styleValue = el.getAttribute('data-style');
      if (styleValue != null) el.setAttribute('style', styleValue);
      el.removeAttribute('data-style');
    });
  } else {
    elementsWithInlineStyles.forEach((el) => {
      //el.removeAttribute('style');
      //console.log('elWithStyle', el);
      const styleValue = el.getAttribute('style');
      if (styleValue != null) el.setAttribute('data-style', styleValue);
      el.removeAttribute('style');
    });
  }
}
