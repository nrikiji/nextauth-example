namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    DATABASE_URL: string;
  }
}
