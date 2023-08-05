import Form from "@/components/auth/form";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const onSubmit = async (email, password) => {
    try {
      const data = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/profile",
        email,
        password,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return <Form signin={true} onFormSubmit={onSubmit} />;
}
