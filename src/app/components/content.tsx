"use client";

import { useEffect, useState } from "react";
import { Header } from "./header";
import { getUsers, getUsersContributions } from "../api";
import { Users } from "./users";
import type { Contributions, UserItem } from "../types";
import { YEARS } from "../data";

const REGION = "Dagestan";

export const Content = () => {
  const [region, setRegion] = useState(REGION);

  const [year, setYear] = useState(YEARS[YEARS.length - 1]);

  const [users, setUsers] = useState<UserItem[]>();

  const [contributions, setContributions] = useState<Contributions>();

  useEffect(() => {
    const getData = async () => {
      const usersData = await getUsers(region);

      if (usersData === undefined) return
      
      const contributionsData = 
        await getUsersContributions(usersData.items, year)

      setUsers(usersData.items)

      if (contributionsData === undefined) return

      setContributions(contributionsData)
    }

    getData()
  }, [region, year]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header
        year={year}
        setYear={setYear}
        region={region}
        setRegion={setRegion}
      />

      <main>
        {users !== undefined && contributions !== undefined && (
          <Users contributions={contributions} users={users} />
        )}
      </main>

    </div>
  );
};
