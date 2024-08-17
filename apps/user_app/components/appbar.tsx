"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@repo/ui/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { useRouter } from "next/navigation";

const Appbar = () => {
  const session = useSession();
  const router = useRouter();
  const onSignout = useCallback(async() => {
    await signOut();
    router.push("/api/auth/signin")
  }, [])
  return (
    <nav className="w-full bg-white fixed top-0 z-50 border-b bg-background/80 shadow-sm backdrop-blur-md">
      <div className="w-full flex justify-between items-center container h-14 px-4 md:px-16">
        <Image
          src={"/images/logo.png"}
          width={97}
          height={28}
          alt="logo"
          className="object-contain"
        />
        <div className="flex gap-8 items-center">
          {!session.data?.user ? (
            <>
              <Button
                onClick={() => signIn()}
                variant="outline"
                className="text-black shadow-md hover:border-slate-300 hover:scale-[1.02] hover:shadow-lg transition-all animate-in ease-in duration-300"
              >
                Login
              </Button>
              <Button className="bg-gray-950 shadow-md hover:bg-black/90 hover:border-b hover:border-primary hover:scale-[1.02] hover:shadow-lg transition-all animate-in ease-in duration-300">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Avatar>
                <AvatarImage src={session.data.user.image! && session.data.user.image} alt="PF" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button
                onClick={() => onSignout()}
                variant="outline"
                className="text-black shadow-md hover:border-slate-300 hover:scale-[1.02] hover:shadow-lg transition-all animate-in ease-in duration-300"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
