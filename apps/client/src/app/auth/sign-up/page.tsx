import { SignUpForm } from "./components/form/";

export default function SignUpPage() {
  return (
    <article className="w-full max-w-md h-full flex flex-col gap-6 items-center justify-center">
      <section>
        <h1 className="text-4xl text-center w-full font-extrabold text-balance">
          Memoir
        </h1>
        <h2 className="text-2xl text-center w-full font-semibold text-balance">
          Make journaling a habit, enhance mental clarity, know thyself.
        </h2>
      </section>
      <section className="w-full">
        <SignUpForm />
      </section>
    </article>
  );
}
