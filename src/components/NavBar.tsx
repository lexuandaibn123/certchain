"use client";
import React from "react";
import Logo from "./Logo";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import Link from "next/link";
import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <nav className="flex justify-end sm:justify-between items-center border-b border-border h-[60px] px-4 py-2">
      <Logo />
      <div className="width-fit h-full flex justify-center items-stretch">
        <Button
          asChild
          className="w-fit h-auto rounded-[5px] text-xl ms-2 px-6"
          variant={"secondary"}
        >
          <Link href={"/create-certificate"} className="w-fit">
            <MdOutlineCreateNewFolder className="w-full h-full" />
          </Link>
        </Button>
        <Button
          asChild
          className="w-fit h-auto rounded-[5px] text-xl ms-2 px-6"
          variant={"secondary"}
        >
          <Link href={"/get-certificate"} className="w-fit">
            <TbCertificate className="w-full h-[90%]" />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
