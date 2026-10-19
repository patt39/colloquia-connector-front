export const config = {
  env: process.env.NEXT_PUBLIC_NODE_ENV || "production",
  queryDevTool: process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS,
  /**
   * Url site
   */
  url: {
    public: process.env.NEXT_PUBLIC_SITE,
    api: process.env.NEXT_PUBLIC_API_SERVER || "http://localhost:6000/api/v1",
  },
  cookie: {
    nameToken: process.env.NEXT_PUBLIC_BASE_NAME_TOKEN,
  },
  company: {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME,
  },
};
