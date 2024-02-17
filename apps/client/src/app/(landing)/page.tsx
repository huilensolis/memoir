import { WithUserNotAuthenticated } from "@/components/wrappers/protect-from-authenticated-users";
import { ClientRoutingService } from "@/models/routing/client";
import Link from "next/link";

export default function Home() {
  return (
    <WithUserNotAuthenticated redirectUrl={ClientRoutingService.app.home}>
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <nav className="absolute top-0 l-0 py-4 flex gap-2">
          <Link
            href="/app"
            className="font-semibold bg-orange-100 px-4 py-2 rounded-full hover:bg-orange-200 ease-in-out transition-all duration-75"
          >
            Launch app
          </Link>
          <Link
            href="/auth/sign-in"
            className="font-semibold bg-orange-100 px-4 py-2 rounded-full hover:bg-orange-200 ease-in-out transition-all duration-75"
          >
            Sign In
          </Link>
        </nav>
        <div className="max-w-xl w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
              Reflections on a Summer Adventure
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              By Jane Doe
            </p>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="text-pretty text-lg text-neutral-700">
              <p>
                This summer, I embarked on an unforgettable adventure to the
                mountains. The journey was filled with breathtaking views,
                challenging hikes, and serene moments of reflection. Each day
                brought a new discovery, from hidden waterfalls to secluded
                trails. The beauty of the natural world was awe-inspiring, and I
                found myself feeling a deep connection to the environment around
                me.
              </p>
              <p>
                One of the most memorable experiences was reaching the summit of
                the highest peak. The climb was grueling and pushed me to my
                limits, but the feeling of accomplishment when I reached the top
                was unparalleled. As I looked out over the sprawling landscape,
                I felt a sense of peace and tranquility that I had never
                experienced before.
              </p>
              <p>
                This trip was more than just a summer adventure. It was a
                journey of self-discovery and personal growth. It reminded me of
                the importance of stepping outside of my comfort zone and
                embracing the unknown. I returned home with a renewed sense of
                appreciation for the world around me and a desire to continue
                exploring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </WithUserNotAuthenticated>
  );
}
