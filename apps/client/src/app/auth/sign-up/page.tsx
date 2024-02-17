import { SignUpForm } from "./components/form/";

export default function SignUpPage() {
  return (
    <article className="w-full max-w-md h-full flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl w-full font-medium text-neutral-700 text-balance">
        Create an account on Memoir
      </h1>
      <section className="w-full">
        <SignUpForm />
      </section>
    </article>
  );
}
