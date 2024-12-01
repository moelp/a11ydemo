'use client';

import React, { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import he from 'he';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import { html as beautifyHtml } from 'js-beautify';

import useDarkMode from '#/utils/useDarkMode';
import { useA11yContext } from '#/utils/a11yContext';

type DisplayCodeProps = {
  isA11y?: boolean;
  component: ReactNode;
  language?: 'javascript' | 'html' | 'jsx';
  isReactComponent?: boolean;
};

export default function DisplayCode({
  isA11y,
  component,
  language = 'html',
}: DisplayCodeProps) {
  const isDarkMode = useDarkMode();
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  function removeClassAttribute(htmlString: string) {
    return htmlString
      .replace(/<link\b[^>]*>/gi, '')
      .replace(/\s*class="[^"]*"/g, '')
      .replace(/>(\s*)</g, '>\n<');
  }

  function removePreCodeTags(string: string) {
    return string.replace(/<\/?(pre|code)(\s+[^>]*)?>/g, '');
  }

  const staticMarkup = renderToStaticMarkup(component);

  let markup: string = staticMarkup;

  if (language === 'html') {
    const options = { indent_size: 2, wrap_line_length: 80 };
    markup = beautifyHtml(removeClassAttribute(staticMarkup), options);
  }

  if (language === 'jsx') {
    markup = removePreCodeTags(staticMarkup);
    markup = he.decode(markup);
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={isDarkMode ? oneDark : oneLight}
      customStyle={{
        background: 'var(--background--secondary)',
        margin: 0,
        padding: isA11y ? '0.5rem' : '8px',
      }}
      codeTagProps={{
        style: {
          background: 'transparent',
        },
      }}
      useInlineStyles={a11yMode.hasStyles ? true : false}
      showLineNumbers
      // wrapLines={true}
      // wrapLongLines={true}
      PreTag={isA11y ? 'pre' : 'div'}
      CodeTag={isA11y ? 'code' : 'div'}>
      {markup}
    </SyntaxHighlighter>
  );
}
