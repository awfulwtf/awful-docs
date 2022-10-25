import { useRouter } from "next/router";

const Logo = ({ height }) => (
  <svg id="awful-logo" height="28px" viewBox="0 0 512 512" fill="none">
    <path
      d="M68.94,205.64c2.27,10.12,8.66,18.32,17.14,22.77-10.76,6.31-17.61,18.18-16.75,31.1,.58,8.84,4.77,17.26,11.49,23.08,2.62,2.27,6.49,4.65,10.62,6.33-4.67,3.48-8.53,8.31-10.88,15.12-2.97,8.59-2.19,18.21,2.12,26.4,4.35,8.26,11.93,14.39,20.79,16.82,1.81,.5,3.74,.83,5.73,1,1.78,.15,3.55,.15,5.28,.07,1.54,.37,3.16,.64,4.83,.77,5.33,.44,10.52-.37,15.1-1.08,1.21-.19,2.41-.38,3.6-.54l57.16-7.71c.82-.11,1.7-.21,2.61-.31l-4.9,14.55-13.46,43.66c-6.92,22.72-13.83,64.49,7.57,75.27,9.39,4.73,21.22,4.1,24.78-7.6,1.1-3.61,15.65-74.42,78.86-126.88,15.58-12.93,20.65-28.97,25.14-38.17,3.89-7.97,10.79-14.05,19.26-16.68,2.7-.84,5.52-1.54,8.48-2.1,5.1-.81,10.18-1.61,15.28-2.42,5.11-.58,10.34-1.52,15.61-2.5,4.46-.83,7.45-5.09,6.64-9.55,0-.03-.01-.05-.02-.08-6.12-39.94-31.66-84.46-40.91-125.2-2.25-9.92-11.78-16.43-21.86-15.07l-.19,.03-10.06-1.06c-4.43-1.67-8.87-3.34-13.3-5.01-14.55-5.48-29.11-10.96-43.66-16.44-4.69-1.77-9.82-2.68-14.99-3.33-16.32-2.06-42.77-.44-58.78,3.32-3.31,.78-6.61,1.59-9.91,2.42-3.09,.54-4.91,.91-4.91,.91v.32c-2.1,.52-4.18,1.04-6.27,1.56,2.08-.28,4.16-.56,6.24-.84v.27l-47.27,6.38c-12.27,1.65-21.72,9.35-25.09,20.26-5.26,8.83,2.58,22.89,2.68,23.04,1.38,2.32,3.07,4.4,5.01,6.21-7.12,1.09-11.83,2.73-14.67,5.74-11.73,7.58-17.27,21.19-14.14,35.16Z"
      // className="light:fill-red-700 dark:fill-orange-300"
      fill="currentColor"
    />
    <path
      d="M379.37,349.06c170.88-69.73-64.61-223.79,48.03-311.74,.3-.35,.54-.68,.84-1.04-9.42,1.42-25.02,8.89-30.31,11.52-14.61,8.7-25.91,20.21-32.81,33.38-27.8,53.1,28.67,124.49,39.05,185.76,6.1,30.47,2.36,58.75-24.79,82.12Z"
      className="fill-gray-400 dark:fill-gray-400"
    />
  </svg>
);

const TITLE_WITH_TRANSLATIONS = {
  "en-US": "React Hooks for Data Fetching",
  "zh-CN": "用于数据请求的 React Hooks 库",
  "es-ES": "Biblioteca React Hooks para la obtención de datos",
  "pt-BR": " React Hooks para Data Fetching",
  ja: "データ取得のための React Hooks ライブラリ",
  ko: "데이터 가져오기를 위한 React Hooks",
  ru: "React хуки для выборки данных",
};

const FEEDBACK_LINK_WITH_TRANSLATIONS = {
  "en-US": "Question? Give us feedback →",
  "zh-CN": "有疑问？给我们反馈 →",
  "pt-BR": "Dúvidas? Nos dê feedback →",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  projectLink: "https://github.com/greenbrad/awful-docs",
  docsRepositoryBase: "https://github.com/greenbrad/awful-docs/tree/main/pages",
  nextLinks: true,
  prevLinks: true,
  titleSuffix: " – Awful",
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
  /*
  feedbackLink: () => {
    const { locale } = useRouter();
    return (
      FEEDBACK_LINK_WITH_TRANSLATIONS[locale] ||
      FEEDBACK_LINK_WITH_TRANSLATIONS["en-US"]
    );
  },
  */
  feedbackLabels: "feedback",
  logo: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { locale } = useRouter();
    return (
      <>
        <Logo height={12} />
        <span
          className="mx-2 font-extrabold hidden md:inline select-none"
          title={"Awful: " + (TITLE_WITH_TRANSLATIONS[locale] || "")}
        >
          awful
        </span>
      </>
    );
  },
  head: ({ title, meta }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { route } = useRouter();

    return (
      <>
        {/* Favicons, meta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={
            meta.description ||
            "Awful is a lightweight framework with extreme performance for creating Addons for World of Warcraft."
          }
        />
        <meta
          name="og:description"
          content={
            meta.description ||
            "Awful is a lightweight framework with extreme performance for creating Addons for World of Warcraft."
          }
        />
        {/* <meta name="twitter:site" content="@awfulwtf" /> */}
        <meta
          name="og:title"
          content={title ? title + " – Awful" : "Docs – Awful"}
        />
        <meta name="apple-mobile-web-app-title" content="Awful" />
      </>
    );
  },
  footerEditLink: ({ locale }) => {
    switch (locale) {
      case "zh-CN":
        return "在 GitHub 上编辑本页 →";
      case "es-ES":
        return "Edite esta página en GitHub →";
      case "pt-BR":
        return "Edite essa página no GitHub →";
      case "ja":
        return "Github で編集する →";
      case "ko":
        return "Github에서 이 페이지 편집하기 →";
      case "ru":
        return "Редактировать на GitHub →";
      default:
        return "Edit this page on GitHub →";
    }
  },
  footerText: ({ locale }) => {
    switch (locale) {
      case "zh-CN":
        return (
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2">由</span>
            <span className="mr-2"></span>
            驱动
          </a>
        );
      case "es-ES":
        return (
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2"></span>
            <span className="mr-2"></span>
          </a>
        );
      case "pt-BR":
        return (
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2">Desenvolvido por</span>
            <span className="mr-2"></span>
          </a>
        );
      case "ja":
        return (
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2"></span>
            <span className="mr-2"></span>
          </a>
        );
      case "ko":
        return (
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2"></span>
            <span className="mr-2"></span>
          </a>
        );
      case "ru":
        return (
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2"></span>
            <span className="mr-2"></span>
          </a>
        );
      default:
        return (
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-1"></span>
            <span></span>
          </a>
        );
    }
  },
  i18n: [
    { locale: "en-US", text: "English" },
    //{ locale: "es-ES", text: "Español" },
    //{ locale: "zh-CN", text: "简体中文" },
    //{ locale: "pt-BR", text: "Português Brasileiro" },
    //{ locale: "ja", text: "日本語" },
    //{ locale: "ko", text: "한국어" },
    //{ locale: "ru", text: "Русский" },
  ],
};
