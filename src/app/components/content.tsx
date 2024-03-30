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
    getUsers(region).then((data) => setUsers(data?.items));
  }, [region]);

  useEffect(() => {
    if (users !== undefined && users?.length !== 0) {
      getUsersContributions(users, year).then((data) => setContributions(data));
    }
  }, [users, year]);

  return (
    <main>
      <Header
        year={year}
        setYear={setYear}
        region={region}
        setRegion={setRegion}
      />

      {users !== undefined && contributions !== undefined && (
        <Users contributions={contributions} users={users} />
      )}
    </main>
  );
};
