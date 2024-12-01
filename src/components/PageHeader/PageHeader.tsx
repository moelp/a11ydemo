'use client';

import { useRef } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { v4 as uuidv4 } from 'uuid';

import { useA11yContext } from '#/utils/a11yContext';
import { convertToSlug } from '#/utils/convertToSlug';
import Button from '#/components/Button/Button';
import Heading from '#/components/Heading/Heading';
import Link from '#/components/Link/Link';
import { List, ListItem } from '#/components/List/List';
import Toggle from '#/components/Toggle/Toggle';
import { Modal, ModalHandle } from '#/components/Modal/Modal';

interface MenuItem {
  name: string;
  href?: string;
}

interface PageHeaderProps {
  isA11y?: boolean;
  menuItems?: MenuItem[];
  className?: string;
}

export default function PageHeader({
  isA11y,
  menuItems,
  className,
}: PageHeaderProps) {
  const { state: a11yMode, setState: setA11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'header' : 'div';
  const SemanticTagLogo = isA11y ? 'p' : 'span';
  const SemanticTagNav = isA11y ? 'nav' : 'div';
  const SemanticTagList = isA11y ? 'ul' : 'div';
  const SemanticTagListItem = isA11y ? 'li' : 'div';

  const menuElements = menuItems?.map(function (item) {
    const uid = uuidv4();

    return (
      <SemanticTagListItem key={`${item.name}-${uid}`}>
        <Link
          href={item.href ? item.href : `#${convertToSlug(item.name)}`}
          hasIcon={false}
          variant="actionable"
          className="font-semibold">
          {item.name}
        </Link>
      </SemanticTagListItem>
    );
  });

  const ariaLabelNav = isA11y ? { 'aria-label': 'main navigation' } : {};

  const refModalSettings = useRef<ModalHandle>(null);

  const size = useWindowSize();

  function toggleMenu() {
    console.log('toggle menu');
  }

  return (
    <>
      <SemanticTag
        className={`header text-foreground bg-backgroundSecondary border-x-8 border-y-4 border-solid border-backgroundSecondary ${
          isA11y ? 'mt-4 py-2 rounded-3xl' : 'mt-[16px] py-[8px] rounded-[24px]'
        } ${className}`}
        data-test="page-header">
        <div
          className={`w-full flex items-center ${
            isA11y ? 'gap-4' : 'gap-[16px]'
          }`}>
          <Link href="/" className="h-fit" hasIcon={false} variant="actionable">
            <SemanticTagLogo
              className={`inline-flex flex-col leading-none ${
                isA11y ? 'text-xl' : 'text-[20px]'
              }`}>
              <span className="uppercase">A11y</span>
              <span
                className={`leading-none tracking-widest ${
                  isA11y ? 'text-[0.6em]' : 'text-[12px]'
                }`}>
                demo
              </span>
            </SemanticTagLogo>
          </Link>
          {/* <p>
            Header future flag component
            <FeatureEnabled featureFlag="IS_A11Y">
              <strong> is semantic</strong>
            </FeatureEnabled>
          </p> */}
          <div
            className={`header__col ms-auto flex items-center ${
              isA11y ? 'gap-4' : 'gap-[16px]'
            }`}>
            {size.width != null && size.width < 1025 ? (
              <Button onClick={toggleMenu} isA11y={isA11y}>
                Menu
              </Button>
            ) : (
              ''
            )}
            {menuItems && menuItems.length > 0 ? (
              <SemanticTagNav className="hidden lg:block" {...ariaLabelNav}>
                <SemanticTagList
                  className={`flex font-semibold ${
                    isA11y ? 'gap-4' : 'gap-[16px] text-[16px]'
                  }`}>
                  {menuElements}
                </SemanticTagList>
              </SemanticTagNav>
            ) : (
              <p>Please configure a menu</p>
            )}

            <Button
              onClick={() => refModalSettings?.current?.open()}
              isA11y={isA11y}>
              Settings
            </Button>
          </div>
        </div>
      </SemanticTag>
      <Modal isA11y={isA11y} ref={refModalSettings} position="right">
        <Heading as="h2" isA11y={isA11y}>
          Settings
        </Heading>
        <List isOrdered={true} className={isA11y ? 'my-4' : 'my-[16px]'}>
          <ListItem>Turn off Styles</ListItem>
          <ListItem>Turn on a11y Mode</ListItem>
          <ListItem>Turn on Styles and turn off A11y Mode</ListItem>
          <ListItem>Turn on a11y mode</ListItem>
        </List>
        <div className="flex flex-col gap-6">
          <Toggle
            label="Styles"
            isChecked={a11yMode.hasStyles}
            isFullWidth={true}
            onChange={() => {
              setA11yMode({ ...a11yMode, hasStyles: !a11yMode.hasStyles });
            }}
          />
          <Toggle
            label="A11y mode"
            isChecked={isA11y}
            isFullWidth={true}
            onChange={() =>
              setA11yMode({ ...a11yMode, isSemantic: !a11yMode.isSemantic })
            }
          />
        </div>
      </Modal>
    </>
  );
}
