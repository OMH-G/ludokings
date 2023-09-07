"use client";
import {
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
  useAuth,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import ProfilePic from "./profilePic.png";
// import Navlogo from "./navlogo.png";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/home.svg",
    route: "/wallet",
    label: "wallet",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between text-black bg-gray-50 bg-opacity-10 shadow-md bg-clip-padding backdrop-blur-sm px-6 py-6">
      <Link href="/" className="flex items-center gap-4">
        <Image src={ProfilePic} alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          Ludo king
        </p>
      </Link>
      <div className="flex flex-row items-center text-lg gap-6">
        {navLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={` ${isActive && "bg-primary-500 "}`}
            >
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
        <Link
          href="/wallet"
          className="border border-blue-200 px-2 py-1 m-2 rounded-md"
        >
          0.00
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src={ProfilePic} alt="logout" width={24} height={24} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div> */}
    </nav>
  );
}
