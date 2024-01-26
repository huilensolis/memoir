import { Input } from "@/components/feature/input/text";

export default function SignUpPage() {
  return (
    <article className="w-full max-w-md h-full flex flex-col gap-2 items-center justify-center">
      <h1 className="text-3xl w-full text-left font-bold">Sign Up</h1>
      <form className="w-full">
        <div className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="name">
            name
          </label>
          <Input type="text" id="name" error={false} correct={false} />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="email">
            email
          </label>
          <Input type="email" id="email" error={false} correct={false} />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="password">
            password
          </label>
          <Input type="password" id="password" error={false} correct={false} />
        </div>
      </form>
    </article>
  );
}
