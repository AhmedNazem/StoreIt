"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.action";

interface Props {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src="/assets/icons/logo-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
        style={{ width: "auto", height: "auto" }}
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Menu"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar || avatarPlaceholderUrl}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <SheetDescription>
            <div>
              <nav className="mobile-nav" aria-label="Mobile Navigation">
                <ul className="mobile-nav-list">
                  {navItems.map(({ url, name, icon }) => (
                    <li
                      key={url}
                      className={cn(
                        "mobile-nav-item",
                        pathname === url && "shad-active"
                      )}
                    >
                      <Link href={url}>
                        <div className="flex items-center">
                          <Image
                            src={icon}
                            alt={name}
                            width={24}
                            height={24}
                            className={cn(
                              "nav-icon",
                              pathname === url && "nav-icon-active"
                            )}
                          />
                          <p>{name}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <Separator className="my-5 bg-light-200/20" />
              <div className="flex flex-col justify-between gap-5 pb-5">
                <div>
                  <FileUploader />
                </div>
                <Button
                  type="button"
                  onClick={async () => await signOutUser}
                  className="mobile-sign-out-button"
                >
                  <Image
                    src="/assets/icons/logout.svg"
                    alt="Logout"
                    width={24}
                    height={24}
                  />
                  <p>Logout</p>
                </Button>
              </div>
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
