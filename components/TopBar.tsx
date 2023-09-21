"use client";
import { useState } from "react";
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
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  {
    route: "/",
    label: "Play",
  },
  {
    route: "/wallet",
    label: "wallet",
  },
  {
    route: "/rooms",
    label: "Rooms",
  },
  {
    route: "/profile",
    label: "Profile",
  },
];

export default function TopBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="fixed top-0 z-30 flex w-full items-center justify-between text-black bg-gray-50 bg-opacity-10 shadow-md bg-clip-padding backdrop-blur-sm px-6 py-3 md:py-6"
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <Link href="/">
            <span className="sr-only">Your Company</span>
            <Image
              className="rounded-lg"
              src={ProfilePic}
              alt="logo"
              width={28}
              height={28}
            />
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:flex md:gap-x-12">
          {navLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            if (link.route === "/profile")
              link.route = `${link.route}/${userId}`;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={` ${isActive && "bg-primary-500 "}`}
              >
                <p className="text-light-1 ">{link.label}</p>
              </Link>
            );
          })}
        </div>
        <div className="flex md:flex-1 md:justify-end items-center gap-4">
          {/* {userId && (
            <Link
              href="/wallet"
              className="mx-3 block rounded-lg px-3 py-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 border "
            >
              0.00
            </Link>
          )} */}

          {userId ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link
              href="/signin"
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="sr-only">Your Company</span>
              <Image src={ProfilePic} alt="logo" width={28} height={28} />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.route}
                    href={link.route}
                    // onClick={() => setMobileMenuOpen(false)}
                    onClick={() => {
                      setTimeout(() => {
                        setMobileMenuOpen(false);
                      }, 200);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="py-6 items-center gap-4">
                {userId && (
                  <Link
                    href="/wallet"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 border w-16"
                  >
                    0.00
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
