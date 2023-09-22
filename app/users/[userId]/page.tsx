import getUser from "@/lib/getUser";
import getUserPost from "@/lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";

import { notFound } from "next/navigation";

type Param = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Param): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;
  if (!user) {
    return {
      title: "User not found",
    };
  }

  return {
    title: user.name,
    description: `Page of ${user.name}`,
  };
}

export default async function UserPage({ params: { userId } }: Param) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPost(userId);

  const user = await userData;

  if (!user) {
    return notFound();
  }

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading data...</h2>}>
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers();

  const users = await usersData;

  return users.map((user) => ({
    userId: user.id.toString(),
  }));
}
