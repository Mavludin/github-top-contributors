import { Header } from "./components/header";

import { Metadata } from "next";
import { Users } from "./components/users";
import { Contributions, UserItem } from "./types";
import { YearForm } from "./components/yearForm";
import { RegionForm } from "./components/regionForm";

export const metadata: Metadata = {
  title: "Next.js",
};

async function getUsers() {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(
        `location:Dagestan`
      )}`
    );

    if (response.ok) {
      return (await response.json()) as Promise<{ items: UserItem[] }>;
    }

    throw new Error("Ошибка при получении пользователей");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}

async function getUsersContributions(users: UserItem[]) {
  if (users.length === 0) return;

  const hash: Contributions = {};

  const promises = [];

  for (const user of users) {
    const promise = fetch(
      `https://github-contributions-api.deno.dev/${user.login}.json?from=2024-01-01&tofrom=2024-12-31`
    ).then((res) => res.json());

    promises.push(promise);
  }

  const results = await Promise.allSettled(promises);

  results.forEach((res: any, index) => {
    hash[users[index].login] = res.value.totalContributions;
  });

  return hash;
}

export default async function Home() {
  const data = await getUsers();
  const contributions = await getUsersContributions(data?.items ?? []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header region="Dagestan" />

      <YearForm />
      <RegionForm />

      {data?.items !== undefined && contributions !== undefined && (
        <Users contributions={contributions} users={data.items} />
      )}
    </main>
  );
}
