'use client';

//import { FEATURE_FLAGS } from '#/app/featureFlags';
import { useA11yContext } from '#/utils/a11yContext';
import { useNotification } from '#/components/Notification/NotificationProvider';
import useMetadata from '#/utils/useMetadata';

import PageHeader from '#/components/PageHeader/PageHeader';
import PageMain from '#/components/PageMain/PageMain';
import PageFooter from '#/components/PageFooter/PageFooter';
import Section from '#/components/Section/Section';
import Heading from '#/components/Heading/Heading';
import Image from '#/components/Image/Image';
import Toggle from '#/components/Toggle/Toggle';

export default function Page() {
  //const isA11yFeatureFlag: boolean = FEATURE_FLAGS['IS_A11Y'];

  const { state: a11yMode, setState: setA11yMode } = useA11yContext();
  console.log('a11yMode', a11yMode);
  const isA11y = a11yMode.isSemantic;

  const { addNotification } = useNotification();

  useMetadata(
    isA11y ? 'a11y Example' : '',
    isA11y ? 'Checkout this a11y example.' : ''
  );

  //const [isA11yActive, setA11yActive] = useState(isA11y);

  const handleNotification = (
    message: string = 'This is a success message!',
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    addNotification(`${message}`, type);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 w-11/12 mx-auto max-w-7xl min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <PageHeader isA11y={isA11y} />
      <PageMain isA11y={isA11y}>
        <Section
          title="A11y Demo"
          isA11y={isA11y}
          asHero={true}
          className="text-center">
          <Toggle
            isA11y={true}
            label={`${isA11y ? 'Disable a11y mode' : 'Enable a11y mode'}`}
            size="huge"
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
        </Section>
        <Section
          title="We invest in the world’s potential"
          isA11y={isA11y}
          className="text-center">
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Learn more
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </Section>
        <Section title="We didn't reinvent the wheel" isA11y={isA11y}>
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="">
              <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                <p className="mb-4">
                  We are strategists, designers and developers. Innovators and
                  problem solvers. Small enough to be simple and quick, but big
                  enough to deliver the scope you want at the pace you need.
                  Small enough to be simple and quick, but big enough to deliver
                  the scope you want at the pace you need.
                </p>
                <p>
                  We are strategists, designers and developers. Innovators and
                  problem solvers. Small enough to be simple and quick.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Image
                isA11y={isA11y}
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                alt="office content 1"
                className="aspect-[3/4]"
              />
              <Image
                isA11y={isA11y}
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                alt="office content 2"
                className="aspect-[3/4] mt-4 lg:mt-10"
              />
            </div>
          </div>
        </Section>
        <Section
          title=" Designed for business teams like yours"
          isA11y={isA11y}>
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16">
              <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                Here at Flowbite we focus on markets where technology,
                innovation, and capital can unlock long-term value and drive
                economic growth.
              </p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg
                    className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
                <Heading as="h3" isA11y={isA11y}>
                  Marketing
                </Heading>
                <p className="text-gray-500 dark:text-gray-400">
                  Plan it, create it, launch it. Collaborate seamlessly with all
                  the organization and hit your marketing goals every month with
                  our marketing plan.
                </p>
              </div>
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg
                    className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                  </svg>
                </div>
                <Heading as="h3" isA11y={isA11y}>
                  Legal
                </Heading>
                <p className="text-gray-500 dark:text-gray-400">
                  Protect your organization, devices and stay compliant with our
                  structured workflows and custom permissions made for you.
                </p>
              </div>
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg
                    className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"></path>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                  </svg>
                </div>
                <Heading as="h3" isA11y={isA11y}>
                  Business Automation
                </Heading>
                <p className="text-gray-500 dark:text-gray-400">
                  Auto-assign tasks, send Slack messages, and much more. Now
                  power up with hundreds of new templates to help you get
                  started.
                </p>
              </div>
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg
                    className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
                <Heading as="h3" isA11y={isA11y}>
                  Finance
                </Heading>
                <p className="text-gray-500 dark:text-gray-400">
                  Audit-proof software built for critical financial operations
                  like month-end close and quarterly budgeting.
                </p>
              </div>
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg
                    className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                </div>
                <Heading as="h3" isA11y={isA11y}>
                  Enterprise Design
                </Heading>
                <p className="text-gray-500 dark:text-gray-400">
                  Craft beautiful, delightful experiences for both marketing and
                  product with real cross-company collaboration.
                </p>
              </div>
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg
                    className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
                <Heading as="h3" isA11y={isA11y}>
                  Operations
                </Heading>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep your company’s lights on with customizable, iterative,
                  and structured workflows built for all efficient teams and
                  individual.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </PageMain>
      <PageFooter>Footer</PageFooter>
    </div>
  );
}
