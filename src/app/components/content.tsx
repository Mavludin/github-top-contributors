"use client";

import { useEffect, useState } from "react";
import { Header } from "./header";
import { getUsers, getUsersContributions } from "../api";
import { Users } from "./users";
import type { Contributions, UsersResponse } from "../types";
import { PER_PAGE, YEARS } from "../data";
import { Pagination } from "./pagination";

const REGION = "Dagestan";

export const Content = () => {
  const [loading, setLoading] = useState(false)

  const [region, setRegion] = useState(REGION);

  const [year, setYear] = useState(YEARS[0]);

  const [usersData, setUsersData] = useState<UsersResponse>();

  const [contributions, setContributions] = useState<Contributions>();

  const [page, setPage] = useState(1)

  useEffect(() => {
    const getData = async () => {
      const usersData = await getUsers(region, page);

      if (usersData === undefined) return

      console.log(usersData.items)
      
      const contributionsData = 
        await getUsersContributions(usersData.items, year)

      setUsersData(usersData)

      if (contributionsData === undefined) return

      setContributions(contributionsData);
    };

    (async () => {
      setLoading(true)

      await getData()

      setLoading(false)
    })();

  }, [page, region, year]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header
        loading={loading}
        year={year}
        setYear={setYear}
        region={region}
        setRegion={setRegion}
      />
      
      {loading && (
        <h2>Loading data...</h2>
      )}

      <main>
        {!loading && usersData?.items !== undefined && contributions !== undefined && (
          <>
            <Users contributions={contributions} users={usersData.items} />

            <Pagination perPage={PER_PAGE} count={usersData.total_count} page={page} setPage={setPage} />
          </>
        )}
      </main>

    </div>
  );
};
