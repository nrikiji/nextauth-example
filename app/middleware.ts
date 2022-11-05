import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    async authorized({ token }) {
      if (token?.name && !token?.email) {
        return false;
      } else {
        return true;
      }
    },
  },
});

export const config = { matcher: ["/"] };
