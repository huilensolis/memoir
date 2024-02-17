import { SignInForm } from "./components/form";

export default function SignInPage() {
  return (
    <article className="w-full max-w-md h-full flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl w-full font-medium text-neutral-700 text-balance">
        Log In to Memoir
      </h1>
      <section className="w-full">
        <SignInForm />
      </section>
    </article>
  );
}
