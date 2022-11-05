import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const onSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.status == 200) {
      setRegistered(true);
    } else {
      alert("Error signup");
    }
  };

  return registered ? (
    <>
      <h2>Success Signup</h2>
      <button onClick={() => signIn()}>Re Signin</button>
    </>
  ) : (
    <>
      <h2>Signup</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={onSignup}>Signup</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session?.user.email != null) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return { props: {} };
};
