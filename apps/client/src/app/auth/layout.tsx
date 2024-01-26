import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 grid-rows-1 w-full h-screen">
      <section className="flex flex-col items-center justify-center h-full w-full">
        <nav className="w-full flex justify-end items-center gap-2 px-5 py-2">
          <Link href="/auth/sign-up">SignUp</Link>
          <Link href="/auth/sign-in">Sign In</Link>
        </nav>
        {children}
      </section>
      <section className="w-full h-full">
        <Image
          src={
            "/Leonardo_Diffusion_XL_Design_an_AI_image_generator_prompt_for_2.jpg"
          }
          width={1000}
          height={1000}
          alt="journaling book"
          className="w-full h-full object-cover object-center"
        />
      </section>
    </div>
  );
}
