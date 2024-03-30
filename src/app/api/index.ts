import { Contributions, UserItem } from "../types";

export const getUsers = async (region: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(
        `location:${region}`
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
};

export const getUsersContributions = async (users: UserItem[], year: number) => {
  if (users.length === 0) return;

  const hash: Contributions = {};

  const promises = [];

  for (const user of users) {
    const promise = fetch(
      `https://github-contributions-api.deno.dev/${user.login}.json?from=${year}-01-01&tofrom=${year}-12-31`
    ).then((res) => res.json());

    promises.push(promise);
  }

  const results = await Promise.allSettled(promises);

  results.forEach((res: any, index) => {
    hash[users[index].login] = res.value.totalContributions;
  });

  return hash;
};
