"use client";

import { useEffect, useState } from "react";
import { Header } from "./header";
import { getUsers, getUsersContributions } from "../api";
import { Users } from "./users";
import type { Contributions, UserItem, UsersResponse } from "../types";
import { INITIAL_REGION, PER_PAGE, YEARS } from "../data";
import { Pagination } from "./pagination";

type ContentProps = {
  initialUsersData: UsersResponse
  initialContributions: Contributions
}

export const Content = ({ initialUsersData, initialContributions }: ContentProps) => {
  const [loading, setLoading] = useState(false)

  const [region, setRegion] = useState(INITIAL_REGION);

  const [usersData, setUsersData] = useState<UsersResponse>(initialUsersData);

  const [contributions, setContributions] = useState<Contributions>(initialContributions);

  const [page, setPage] = useState(1)

  const refetchUsersContributions = async (year: number) => {
    const contributions = 
      await getUsersContributions({ users: usersData?.items ?? [], year })

    if (contributions === undefined) return

    setContributions(contributions)
  }

  // useEffect(() => {
  //   const getData = async () => {
  //     const usersData = await getUsers(region, page);

  //     if (usersData === undefined) return

  //     const contributionsData = 
  //       await getUsersContributions(usersData.items, year)

  //     setUsersData(usersData)

  //     if (contributionsData === undefined) return

  //     setContributions(contributionsData);
  //   };

  //   (async () => {
  //     setLoading(true)

  //     await getData()

  //     setLoading(false)
  //   })();

  // }, [page, region, year]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header
        loading={loading}
        region={region}
        setRegion={setRegion}
        refetchUsersContributions={refetchUsersContributions}
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
