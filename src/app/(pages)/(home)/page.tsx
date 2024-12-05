'use client';

import { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconArrowBigUp,
  IconDownload,
  IconCornerDownLeft,
  IconPlus,
  IconCommand,
  IconMinus,
} from '@tabler/icons-react';

import type {
  TypeColorMode,
  TypeBaseFontSize,
  TypeReadingDirection,
} from '#/utils/a11yContext';

// import { FEATURE_FLAGS } from '#/app/featureFlags';
import {
  A11yProvider,
  useA11yContext,
  EnumFontSizeBase,
} from '#/utils/a11yContext';
import { useNotification } from '#/components/Notification/NotificationProvider';

import useMetadata from '#/utils/useMetadata';
import { toggleStyles } from '#/utils/toggleStyles';

import Button from '#/components/Button/Button';
import Copytext from '#/components/Copytext/Copytext';
import CustomLink from '#/components/Link/Link';
import {
  DescriptionList,
  DescriptionListTag,
  DescriptionListDescription,
} from '#/components/DescriptionList/DescriptionList';
import DisplayCode from '#/components/DisplayCode/DisplayCode';
import Figure from '#/components/Figure/Figure';
import Grid from '#/components/Grid/Grid';
import Keyboard from '#/components/KeyBoard/KeyBoard';
import PageHeader from '#/components/PageHeader/PageHeader';
import PageMain from '#/components/PageMain/PageMain';
import PageFooter from '#/components/PageFooter/PageFooter';
import Section from '#/components/Section/Section';
import Heading from '#/components/Heading/Heading';
import Image from '#/components/Image/Image';
import { List, ListItem } from '#/components/List/List';
import Toggle from '#/components/Toggle/Toggle';
import PageAside from '#/components/PageAside/PageAside';
import AnchorNavigation from '#/components/AnchorNavigation/AnchorNavigation';
import Select from '#/components/Select/Select';
import SkipToContent from '#/components/SkipToContent/SkipToContent';

import CodeExample from '#public/codeexample.mdx';

import DesignExampleLight from '#public/component-example-light.png';
import DesignExampleDark from '#public/component-example-dark.png';
import ModalExample from '#/componentsPage/ModalExample/ModalExample';

interface iOptionFontSize {
  value: TypeBaseFontSize;
  label: string;
}

const optionsFontSize: iOptionFontSize[] = [
  { value: EnumFontSizeBase.xxSmall, label: 'xxSmall – 60%' },
  { value: EnumFontSizeBase.xSmall, label: 'xSmall – 75%' },
  { value: EnumFontSizeBase.small, label: 'small – 89%' },
  {
    value: EnumFontSizeBase.default,
    label: 'default – 100% – user preference',
  },
  { value: EnumFontSizeBase.large, label: 'large – 120%' },
  { value: EnumFontSizeBase.xLarge, label: 'xLarge – 150%' },
  { value: EnumFontSizeBase.xxLarge, label: 'xxLarge – 200%' },
];

interface iOptionColorMode {
  value: TypeColorMode;
  label: string;
}

const optionsColorMode: iOptionColorMode[] = [
  { value: 'default', label: 'Default – user preference' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'contrasthigh', label: 'High Contrast' },
];

const menuItems = [
  { name: 'Menu Item 1', href: 'example' },
  { name: 'Menu Item 2' },
  { name: 'Menu Item 3' },
  { name: 'Menu Item 4' },
];

const pageItems = [
  { name: 'Keyboard Controls' },
  { name: 'Screen reader' },
  { name: 'Page Structure & Semantics' },
  { name: 'Interactive Elements' },
  { name: 'Component Usage' },
  { name: 'Responsive & Layout' },
  { name: 'Colors, Modes & Themes' },
  { name: 'Motion & Animation' },
];

export default function Home() {
  //const isA11yFeatureFlag: boolean = FEATURE_FLAGS['IS_A11Y'];

  const { state: a11yMode, setState: setA11yMode } = useA11yContext();
  console.log('a11yMode', a11yMode);
  const isA11y = a11yMode.isSemantic;

  const { addNotification } = useNotification();
  const [notificationCounter, setNotificationCounter] = useState(0);

  useMetadata(
    isA11y ? 'a11y Demo' : '',
    isA11y
      ? 'Everyone should equally perceive, understand, navigate, and interact with a website.'
      : ''
  );

  const handleNotification = (
    message: string = 'This is a success message!',
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    setNotificationCounter(notificationCounter + 1);
    addNotification(`${message} (${notificationCounter})`, type);
  };

  function changeFontSize(fontsize: EnumFontSizeBase) {
    // console.log('change font size:', value);
    if (fontsize === EnumFontSizeBase.default) {
      document.documentElement.removeAttribute('style');
    } else {
      document.documentElement.style.fontSize = `${fontsize}%`;
    }
  }

  function changeColorMode(colormode: TypeColorMode) {
    // console.log('change color mode:', value);
    if (colormode === 'default') {
      document.body.removeAttribute('data-mode');
    } else {
      document.body.setAttribute('data-mode', `${colormode}`);
    }
  }

  function changeReadingOrder(direction: TypeReadingDirection) {
    // console.log('change reading direction:', value);
    if (direction === 'rtl') {
      document.documentElement.setAttribute('dir', direction);
    } else {
      document.documentElement.removeAttribute('dir');
    }
  }

  useEffect(() => {
    // Check if URL contains a hash (#) and scroll to the target element
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const { hasStyles, baseFontSize, colorModes, readingDirection } = a11yMode;

    toggleStyles(hasStyles);
    changeReadingOrder(readingDirection);
    changeColorMode(colorModes);
    changeFontSize(baseFontSize);
  }, [a11yMode]);

  return (
    <div
      className={`grid grid-rows-[auto_1fr_auto] grid-cols-1 w-11/12 min-h-screen ms-auto me-auto font-[family-name:var(--font-geist-sans)] ${
        isA11y ? 'max-w-7xl gap-16' : 'max-w-[1280px] gap-[64px]'
      }`}>
      <SkipToContent id="main">Skip to main content</SkipToContent>
      <PageHeader menuItems={menuItems} />
      <PageMain id="main">
        <Section
          asHero={true}
          isCentered={true}
          title="A11Y Demo"
          text="Everyone should equally perceive, understand, navigate, and interact
            with a website.">
          <PageAside
            className={`inline-flex flex-col max-sm:w-full ms-auto me-auto bg-backgroundSecondary ${
              isA11y ? 'p-12 rounded-2xl' : 'p-[48px] rounded-[16px]'
            }`}
            {...(isA11y && {
              'aria-label': 'Instructions how to use this page',
            })}>
            <Heading as="h2">Instructions</Heading>
            <Copytext size="small" className="ms-auto me-auto">
              At every step inspect the document structure, use your keyboard to
              navigate the page and use your screen reader.
            </Copytext>
            <List
              isOrdered={true}
              className={`w-fit ms-auto me-auto ${
                isA11y ? 'mt-8' : 'mt-[32px]'
              }`}>
              <ListItem>Turn off Styles</ListItem>
              <ListItem>Turn on a11y Mode</ListItem>
              <ListItem>Turn on Styles and turn off a11y Mode</ListItem>
              <ListItem>Turn on a11y mode</ListItem>
            </List>
            <div
              className={`${
                isA11y ? 'gap-8 mt-10' : 'gap-[32px] mt-[40px]'
              } flex flex-wrap justify-center`}>
              <Toggle
                label="Styles"
                size="huge"
                orientation="vertical"
                isChecked={a11yMode.hasStyles}
                onChange={() => {
                  setA11yMode({
                    ...a11yMode,
                    hasStyles: !a11yMode.hasStyles,
                  });
                  handleNotification(
                    `${isA11y ? 'styles are disabled' : 'styles are enabled'}`,
                    'success'
                  );
                }}
              />
              <Toggle
                label="A11y mode"
                size="huge"
                orientation="vertical"
                isChecked={isA11y}
                onChange={() => {
                  setA11yMode({
                    ...a11yMode,
                    isSemantic: !isA11y,
                  });
                  handleNotification(
                    `${isA11y ? 'a11y mode disabled' : 'a11y mode enabled'}`,
                    'success'
                  );
                }}
              />
            </div>
          </PageAside>
        </Section>
        <div
          className={`relative flex flex-col lg:flex-row ${
            isA11y ? 'lg:gap-16' : 'lg:gap-[64px]'
          }`}>
          <PageAside
            className={`basis-3/12 lg:sticky flex-shrink-0 h-fit lg:border-e-2 lg:border-e-backgroundSecondary ${
              isA11y
                ? 'lg:top-12 mt-12 p-4 lg:pt-0 lg:pe-8'
                : 'lg:top-[48px] mt-[48px] p-[16px] lg:pt-0 lg:pe-[32px]'
            }`}
            {...(isA11y && { 'aria-labelledby': 'table-of-contents' })}>
            <Heading
              id="table-of-contents"
              as="h2"
              className={
                isA11y ? 'text-base lg:text-base' : 'text-[16px] lg:text-[16px]'
              }>
              Table of Contents
            </Heading>
            <AnchorNavigation
              items={pageItems}
              className={`flex flex-col ${isA11y ? 'pt-2' : 'pt-[8px]'}`}
            />
          </PageAside>
          <div className="@container/main basis-9/12">
            <Section
              title="Keyboard Controls"
              text="Basic keyboard controls to navigate a webpage. Depending on your OS
            this may differ or there are more shortcuts available."
              isFullHeight={true}>
              <DescriptionList>
                <DescriptionListTag>
                  <Keyboard caption="Tab Key">
                    <IconDownload
                      className={`${
                        isA11y ? 'size-5' : 'size-[20px]'
                      } -rotate-90`}
                      {...(isA11y && { 'aria-hidden': isA11y })}
                    />
                    Tab
                  </Keyboard>
                </DescriptionListTag>
                <DescriptionListDescription>
                  <Copytext size="small" as="span">
                    Move to next interactive element
                  </Copytext>
                </DescriptionListDescription>
                <DescriptionListTag>
                  <Figure
                    caption="Shift plus Tab Key"
                    isScreenReaderCaption={true}>
                    <div
                      className={`flex items-center ${
                        isA11y ? 'gap-2' : 'gap-[8px]'
                      }`}>
                      <Keyboard caption="Shift Key">
                        <IconArrowBigUp
                          className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                          {...(isA11y && { 'aria-hidden': isA11y })}
                        />
                        Shift
                      </Keyboard>
                      <IconPlus
                        className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                        {...(isA11y && { 'aria-label': 'plus' })}
                      />
                      <Keyboard caption="Tab Key">
                        <IconDownload
                          className={`${
                            isA11y ? 'size-5' : 'size-[20px]'
                          } -rotate-90`}
                          {...(isA11y && { 'aria-hidden': isA11y })}
                        />
                        Tab
                      </Keyboard>
                    </div>
                  </Figure>
                </DescriptionListTag>
                <DescriptionListDescription>
                  <Copytext size="small" as="span">
                    Move to previous interactive element
                  </Copytext>
                </DescriptionListDescription>
                <DescriptionListTag>
                  <Keyboard
                    className={`${isA11y ? 'py-6' : 'py-[24px]'}`}
                    caption="Return/Enter Key">
                    <IconCornerDownLeft
                      className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                      {...(isA11y && { 'aria-hidden': isA11y })}
                    />
                  </Keyboard>
                </DescriptionListTag>
                <DescriptionListDescription>
                  <Copytext size="small" as="span">
                    Activate element (links, buttons, select, etc)
                  </Copytext>
                </DescriptionListDescription>
                <DescriptionListTag>
                  <Keyboard
                    className={`${
                      isA11y ? 'py-3 px-16' : 'py-[12px] px-[64px]'
                    }`}
                    caption="Spacebar Key">
                    spacebar
                  </Keyboard>
                </DescriptionListTag>
                <DescriptionListDescription>
                  <Copytext size="small" as="span">
                    Trigger button (such as to pause/play videos, submit forms,
                    etc), select, etc.
                  </Copytext>
                </DescriptionListDescription>
                <DescriptionListTag>
                  <Keyboard
                    className={`${
                      isA11y ? 'pt-4 pr-8' : 'pt-[16px] pr-[32px]'
                    }`}
                    caption="Esc Key">
                    esc
                  </Keyboard>
                </DescriptionListTag>
                <DescriptionListDescription>
                  <Copytext size="small" as="span">
                    Close opened content (modals, navigation menus, etc) or
                    cancel current action
                  </Copytext>
                </DescriptionListDescription>
                <DescriptionListTag>
                  <Figure caption="arrow keys" isScreenReaderCaption={true}>
                    <div
                      className={`flex flex-col ${
                        isA11y ? 'gap-2' : 'gap-[8px]'
                      }`}>
                      <Keyboard
                        className={`${isA11y ? 'ml-12' : 'ml-[48px]'}`}
                        caption="Arrow Up Key">
                        <IconChevronUp
                          className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                          {...(isA11y && { 'aria-hidden': isA11y })}
                        />
                      </Keyboard>
                      <div className={`flex ${isA11y ? 'gap-2' : 'gap-[8px]'}`}>
                        <Keyboard caption="Arrow Left Key">
                          <IconChevronLeft
                            className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                            {...(isA11y && { 'aria-hidden': isA11y })}
                          />
                        </Keyboard>
                        <Keyboard caption="Arrow Down Key">
                          <IconChevronDown
                            className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                            {...(isA11y && { 'aria-hidden': isA11y })}
                          />
                        </Keyboard>
                        <Keyboard caption="Arrow Right Key">
                          <IconChevronRight
                            className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                            {...(isA11y && { 'aria-hidden': isA11y })}
                          />
                        </Keyboard>
                      </div>
                    </div>
                  </Figure>
                </DescriptionListTag>
                <DescriptionListDescription>
                  <Copytext size="small" as="span">
                    Use the arrow keys to navigate within widgets (e.g. select,
                    radio input, etc) and navigate around a page
                  </Copytext>
                </DescriptionListDescription>
              </DescriptionList>
              <CustomLink
                href="https://www.accessibility-developer-guide.com/knowledge/keyboard-only/browsing-websites/"
                target="_blank"
                className={isA11y ? 'mt-8 lg:mt-12' : 'mt-[32px] lg:mt-[48px]'}>
                {isA11y
                  ? 'Learn more about browsing websites with your keyboard'
                  : 'Learn more'}
              </CustomLink>
            </Section>
            <Section
              title="Screen reader"
              text="A screen reader is a software program that assists people with
            visual impairments or other disabilities by reading aloud the
            content displayed on a screen. It converts the text, images, and
            even certain interactive elements into speech or Braille, allowing
            users to understand and navigate digital content such as websites,
            applications, and documents."
              isFullHeight={true}>
              <Grid className={`${isA11y ? 'pt-4' : 'pt-[16px]'}`}>
                <div>
                  <Heading as="h3">Screen reader on mac</Heading>
                  <Copytext>
                    Learn and practice the basics for controlling your Mac using
                    VoiceOver — the screen reader built into macOS.
                  </Copytext>
                  <CustomLink
                    href="https://support.apple.com/guide/voiceover/welcome/mac"
                    target="_blank"
                    className={isA11y ? 'mt-4' : 'mt-[16px]'}>
                    {isA11y ? 'Get started with VoiceOver' : 'Get started'}
                  </CustomLink>
                </div>
                <div>
                  <Heading as="h3">Screen reader on Windows</Heading>
                  <Copytext>
                    The NVDA screen reader can be downloaded free of charge by
                    anyone.
                  </Copytext>
                  <CustomLink
                    href="https://www.nvaccess.org/download/"
                    target="_blank"
                    className={isA11y ? 'mt-4' : 'mt-[16px]'}>
                    {isA11y ? 'Get started with NVDA' : 'Get started'}
                  </CustomLink>
                </div>
              </Grid>
            </Section>
            <Section
              title="Page Structure & Semantics"
              text=" Semantic HTML improves accessibility by creating a structured, meaningful layout that assistive technologies can easily interpret, benefiting users with disabilities. It also aids search engines in accurately ranking content. Use semantic elements like <section>, <aside>, and <nav> instead of generic <div> elements, and maintain a logical content flow with correctly ordered headings (e.g., <h1>, <h2>, <h3>). This approach ensures an inclusive and universally accessible web experience."
              isFullHeight={true}>
              <Grid>
                <Figure caption="Visual appearance" className="min-w-0">
                  <div
                    className={`bg-backgroundSecondary border-2 border-foreground border-solid aspect-[5/4] overflow-y-auto ${
                      isA11y
                        ? 'px-4 py-6 rounded-2xl'
                        : 'px-[16px] py-[24px] rounded-[16px]'
                    }`}>
                    <Section
                      className="py-0 border-b-transparent"
                      title="Hello world"
                      text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, vel.">
                      <Heading
                        as="h3"
                        className={isA11y ? 'mt-6' : 'mt-[24px]'}>
                        Subsection
                      </Heading>
                      <Copytext>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ullam, vel.
                      </Copytext>
                      <div
                        className={`flex flex-wrap items-center ${
                          isA11y ? 'gap-6 mt-6' : 'gap-[24px] mt-[24px]'
                        }`}>
                        <Button onClick={() => alert('Button clicked')}>
                          Click me
                        </Button>
                        <CustomLink href="/example">Learn more</CustomLink>
                      </div>
                    </Section>
                  </div>
                </Figure>
                <Figure caption="Code example" className="min-w-0">
                  <div
                    className={`aspect-[5/4] overflow-y-auto bg-foregroundLevel1 border-2 border-foreground border-solid ${
                      isA11y
                        ? 'text-xs md:text-base rounded-2xl'
                        : 'text-[12px] md:text[16px] rounded-[16px]'
                    }`}>
                    <DisplayCode
                      component={
                        <A11yProvider>
                          <Section
                            isA11y={isA11y}
                            title="Hello World"
                            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, vel.">
                            <Heading
                              isA11y={isA11y}
                              as="h3"
                              className={isA11y ? 'mt-6' : 'mt-[24px]'}>
                              Subsection
                            </Heading>
                            <Copytext isA11y={isA11y}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Ullam, vel.
                            </Copytext>
                            <div
                              className={`flex flex-wrap items-center ${
                                isA11y ? 'gap-6 mt-6' : 'gap-[24px] mt-[24px]'
                              }`}>
                              <Button
                                isA11y={isA11y}
                                onClick={() => alert('Button clicked')}>
                                Click me
                              </Button>
                              <CustomLink isA11y={isA11y} href="/example">
                                Learn more
                              </CustomLink>
                            </div>
                          </Section>
                        </A11yProvider>
                      }
                    />
                  </div>
                </Figure>
              </Grid>
              <CustomLink
                href="https://www.w3schools.com/tags/default.asp"
                target="_blank"
                className={isA11y ? 'mt-8 lg:mt-12' : 'mt-[32px] lg:mt-[48px]'}>
                {isA11y
                  ? 'Learn more about semantic html tags on w3schools'
                  : 'Learn more'}
              </CustomLink>
            </Section>
            <Section
              title="Interactive Elements"
              text="Avoid attaching click handlers to non-interactive elements, such as <div> or <span>. For navigation, utilize <a> (anchor) elements instead of JavaScript-driven click handlers. For actions requiring click handlers, use <button> elements to ensure accessibility and semantic clarity."
              isFullHeight={true}>
              <div
                className={`flex flex-wrap ${
                  isA11y ? 'gap-4 mt-6' : 'gap-[16px] mt-[24px]'
                }`}>
                <Button
                  onClick={() =>
                    handleNotification(
                      'This is the first notification',
                      'success'
                    )
                  }>
                  Action 1
                </Button>
                {/* <Button
                  onClick={() =>
                    handleNotification(
                      'This is a second notification',
                      'success'
                    )
                  }>
                  Action 2
                </Button> */}
                <ModalExample />
                {/* <Button
                  onClick={() => {
                    console.log(
                      'ModalExample State',
                      refModalExample.current?.getState()
                    );
                    console.log('isModalExampleOpen', isModalExampleOpen);
                  }}>
                  Get Modal State
                </Button> */}
                <CustomLink href="/example" variant="primary">
                  Example link
                </CustomLink>
              </div>
              <CustomLink
                href="https://a11y-101.com/design/button-vs-link"
                target="_blank"
                className={isA11y ? 'mt-8 lg:mt-12' : 'mt-[32px] lg:mt-[48px]'}>
                {isA11y ? 'Learn more about button vs links' : 'Learn more'}
              </CustomLink>
            </Section>
            <Section
              title="Component Usage"
              text="Repeating yourself is boring and adds extra time. Use components provided by our libraries over custom components whenever
            possible. Ensure custom components meet accessibility (a11y)
            requirements."
              isFullHeight={true}>
              <Grid>
                <Figure
                  caption="Do you want to design this over and over?"
                  className="min-w-0">
                  <Image
                    src={DesignExampleLight.src}
                    alt={isA11y ? 'Design component' : ''}
                    className="aspect-[5/4] dark:hidden darkmode:hidden"
                  />
                  <Image
                    src={DesignExampleDark.src}
                    alt={isA11y ? 'Design component' : ''}
                    className="aspect-[5/4] hidden dark:block darkmode:block"
                  />
                </Figure>
                <Figure
                  caption="Do you want to write this code over and over?"
                  className="min-w-0">
                  <div
                    className={`w-full aspect-[5/4] overflow-y-auto ${
                      isA11y
                        ? 'text-xs md:text-base'
                        : 'text-[12px] md:text[16px]'
                    }`}>
                    <DisplayCode language="jsx" component={<CodeExample />} />
                  </div>
                </Figure>
              </Grid>
            </Section>
            <Section
              title="Responsive & Layout"
              text="The page works well on different screen sizes - vertical and horizontal orientation. Ensure the page works well when zoomed to at least 200%, with no content overflow issues. Be aware of the difference between 'zooming' and 'change of the default browser font size'. Use global defined variables (theme object) for sizing. Use relative units (e.g., `rem`, `em`, `%`, etc.). Use pixel values only if applicable (e.g. borders)."
              isFullHeight={true}>
              <Grid>
                <div>
                  <Heading as="h3">Respect user settings</Heading>
                  <Copytext
                    size="small"
                    className={isA11y ? 'pb-4' : 'pb-[16px]'}>
                    A site can react to a users OS or browser configuration.
                    This setting will only have an effect if you have enabled
                    the a11y mode.
                  </Copytext>
                  <Select
                    options={optionsFontSize}
                    value={a11yMode.baseFontSize}
                    onChange={(value) => {
                      setA11yMode({
                        ...a11yMode,
                        baseFontSize: value as TypeBaseFontSize,
                      });
                      //isA11y && changeFontSize(value);
                      console.log('Selected:', value);
                    }}
                    label="Select your font size:"
                  />
                </div>
                <div>
                  <Heading as="h3">Zooming</Heading>
                  <Copytext
                    size="small"
                    className={isA11y ? 'pb-4' : 'pb-[16px]'}>
                    This setting will be temporary.
                  </Copytext>
                  <DescriptionList>
                    <DescriptionListTag>
                      <Figure
                        caption="Cmd plus plus Key"
                        isScreenReaderCaption={true}>
                        <div
                          className={`flex items-center ${
                            isA11y ? 'gap-2' : 'gap-[8px]'
                          }`}>
                          <Keyboard
                            caption="Shift Key"
                            className={`flex-col leading-none ${
                              isA11y ? 'text-xs' : 'text-[12px]'
                            }`}>
                            <IconCommand
                              className={`ms-auto ${
                                isA11y ? 'size-5' : 'size-[20px]'
                              }`}
                              {...(isA11y && { 'aria-hidden': isA11y })}
                            />
                            command
                          </Keyboard>
                          <IconPlus
                            className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                            {...(isA11y && { 'aria-label': 'plus' })}
                          />
                          <Keyboard
                            caption="Plus Key"
                            className={`${isA11y ? 'p-4' : 'p-[16px]'}`}>
                            <IconPlus
                              className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                              {...(isA11y && { 'aria-hidden': isA11y })}
                            />
                          </Keyboard>
                        </div>
                      </Figure>
                    </DescriptionListTag>
                    <DescriptionListDescription>
                      <Copytext size="small" as="span">
                        Zoom In
                      </Copytext>
                    </DescriptionListDescription>
                    <DescriptionListTag>
                      <Figure
                        caption="Cmd plus plus Key"
                        isScreenReaderCaption={true}>
                        <div
                          className={`flex items-center ${
                            isA11y ? 'gap-2' : 'gap-[8px]'
                          }`}>
                          <Keyboard
                            caption="Shift Key"
                            className={`flex-col leading-none ${
                              isA11y ? 'text-xs' : 'text-[12px]'
                            }`}>
                            <IconCommand
                              className={`ms-auto ${
                                isA11y ? 'size-5' : 'size-[20px]'
                              }`}
                              {...(isA11y && { 'aria-hidden': isA11y })}
                            />
                            command
                          </Keyboard>
                          <IconPlus
                            className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                            {...(isA11y && { 'aria-label': 'plus' })}
                          />
                          <Keyboard
                            caption="Plus Key"
                            className={`${isA11y ? 'p-4' : 'p-[16px]'}`}>
                            <IconMinus
                              className={`${isA11y ? 'size-5' : 'size-[20px]'}`}
                              {...(isA11y && { 'aria-hidden': isA11y })}
                            />
                          </Keyboard>
                        </div>
                      </Figure>
                    </DescriptionListTag>
                    <DescriptionListDescription>
                      <Copytext size="small" as="span">
                        Zoom Out
                      </Copytext>
                    </DescriptionListDescription>
                  </DescriptionList>
                </div>
                <div>
                  <Heading as="h3">Reading mode</Heading>
                  <Toggle
                    label="right to left"
                    size="huge"
                    orientation="vertical"
                    isChecked={
                      a11yMode.readingDirection === 'ltr' ? false : true
                    }
                    onChange={() => {
                      setA11yMode({
                        ...a11yMode,
                        readingDirection:
                          a11yMode.readingDirection === 'ltr' ? 'rtl' : 'ltr',
                      });
                      console.log('change reading mode');
                    }}
                  />
                </div>
              </Grid>
              <CustomLink
                href="https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/"
                target="_blank"
                className={isA11y ? 'mt-8 lg:mt-12' : 'mt-[32px] lg:mt-[48px]'}>
                {isA11y
                  ? 'Learn more in the article provided by Josh'
                  : 'Learn more'}
              </CustomLink>
            </Section>
            <Section
              title="Colors, Modes & Themes"
              text="Ensure sufficient contrast between text and background colors (4.5:1 for text, 3:1 for UI elements). Use global defined variables (theme object) for colors. The page can be used in different color modes (e.g. `light`, `dark`, `high-contrast`, etc)"
              isFullHeight={true}>
              <Select
                options={optionsColorMode}
                value={a11yMode.colorModes}
                onChange={(value) => {
                  setA11yMode({
                    ...a11yMode,
                    colorModes: value as TypeColorMode,
                  });
                }}
                label="Select your color mode:"
                className={isA11y ? 'min-w-64' : 'min-w-[256px]'}
              />
            </Section>
            <Section
              title="Motion & Animation"
              text="Respect users `prefers reduced motion` settings."
              isFullHeight={true}>
              <ModalExample />
            </Section>
          </div>
        </div>
        <Section
          isCentered={true}
          className={isA11y ? 'mt-20' : 'mt-[80px]'}
          title="We invest in the world’s potential"
          text="Here we focus on markets where technology, innovation, and capital
            can unlock long-term value and drive economic growth.">
          <div
            className={`flex flex-wrap justify-center ms-auto me-auto ${
              isA11y ? 'gap-4' : 'gap-[16px]'
            }`}>
            <CustomLink isA11y={false} href="/example" variant="primary">
              Example wrong link
            </CustomLink>
            <CustomLink href="/example" variant="primary">
              Example right link
            </CustomLink>
          </div>
        </Section>
      </PageMain>
      <PageFooter>Footer</PageFooter>
      {/* {notifications.map((notification, index) => (
        <Snackbar
          role="alert"
          key={notification.id}
          id={notification.id}
          isAutoClose={true}
          message={notification.message}
          onDelete={() => deleteNotification(notification.id)}
        />
      ))} */}
    </div>
  );
}
