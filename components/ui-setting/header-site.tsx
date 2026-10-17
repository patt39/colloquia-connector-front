import Head from "next/head";
import { ReactNode } from "react";
import { useCanonicalUrl } from "../util/use-canonical";

interface IProps {
  title: string;
  description?: string;
  metas?: ReactNode;
}

const HeaderSite = ({ title, metas, description }: IProps) => {
  const spacer = title ? " | " : "";
  const titleOutput = `${title}${spacer}${process.env.NEXT_PUBLIC_NAME_SITE}`;

  const canonicalUrl = useCanonicalUrl(); // Get the canonical URL using the custom hook

  return (
    <Head>
      <title>{titleOutput}</title>

      {process.env.NEXT_PUBLIC_ENV === "prod" && (
        <link rel="canonical" href={canonicalUrl} data-react-helmet="true" />
      )}

      {metas}
      <meta property="og:description" content={description} />
      <meta property="og:title" content={titleOutput} key="title" />
      <meta name="description" content={description} key="description" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export { HeaderSite };
