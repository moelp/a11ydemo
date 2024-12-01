'use client';

import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { twMerge } from 'tailwind-merge';

import { useA11yContext } from '#/utils/a11yContext';
import { convertToSlug } from '#/utils/convertToSlug';

import Link from '#/components/Link/Link';
import { List, ListItem } from '#/components/List/List';

interface NavigationItem {
  name: string;
  href?: string;
}

interface AnchorNavigationProps {
  isA11y?: boolean;
  items?: NavigationItem[];
  className?: string;
}

export default function AnchorNavigation({
  isA11y,
  items,
  className,
}: AnchorNavigationProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'nav' : 'div';
  const ariaLabelNav = isA11y ? { 'aria-label': 'table of contents' } : {};

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current = items
      ? items.map(({ name }) =>
          document.getElementById(`${convertToSlug(name)}`)
        )
      : [];

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [items]);

  const navigationElements = items?.map(function (item) {
    const uid = uuidv4();

    return (
      <ListItem key={`${item.name}-${uid}`}>
        <Link
          href={item.href ? item.href : `#${convertToSlug(item.name)}`}
          hasIcon={false}
          variant="actionable"
          className={`font-semibold text-left ${
            activeSection === convertToSlug(item.name)
              ? 'text-foregroundPrimary underline'
              : ''
          }`}>
          {item.name}
        </Link>
      </ListItem>
    );
  });

  return (
    <SemanticTag
      className={twMerge('nav flex flex-col', className)}
      {...ariaLabelNav}>
      <List
        className={`flex flex-col ${isA11y ? 'gap-4' : 'gap-[16px]'}`}
        isOrdered={true}>
        {items && items.length > 0 ? (
          <>{navigationElements}</>
        ) : (
          <ListItem>Please configure a menu</ListItem>
        )}
      </List>
    </SemanticTag>
  );
}
