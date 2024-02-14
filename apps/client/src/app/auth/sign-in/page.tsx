import { SignInForm } from "./components/form";

export default function SignInPage() {
  return (
    <article className="w-full max-w-md h-full flex flex-col gap-2 items-center justify-center">
      <h1 className="text-4xl text-center w-full font-extrabold text-balance">
        Sign In
      </h1>

      <h2 className="text-2xl text-center w-full font-semibold text-balance">
        Its nice to see you back!
      </h2>
      <section className="w-full">
        <SignInForm />
      </section>
    </article>
  );
}
