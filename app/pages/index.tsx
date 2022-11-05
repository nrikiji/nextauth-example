import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const fetchRepos = () => {
    if (!session?.user.accessToken) {
      return;
    }
    try {
      const url = "https://api.github.com/user/repos?per_page=10";
      const headers = { Authorization: "token " + session.user.accessToken };

      fetch(url, { headers })
        .then((res) => res.json())
        .then((json) => console.log(json));
    } catch (e) {
      console.log(e);
    }
  };

  return session ? (
    <>
      {JSON.stringify(session, null, "\t")}
      <button onClick={() => fetchRepos()}>Fetch Repose</button>
      <button onClick={() => signIn()}>Link Account</button>
      <button onClick={() => signOut()}>SignOut</button>
    </>
  ) : (
    <>
      <button onClick={() => signIn()}>SignIn</button>
    </>
  );
}
