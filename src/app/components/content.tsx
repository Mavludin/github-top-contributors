"use client";

import { useState } from "react";
import { Header } from "./header";
import { getUsers, getUsersContributions } from "../api";
import { Users } from "./users";
import type { Contributions, UsersResponse } from "../types";
import { PER_PAGE } from "../data";
import { Pagination } from "./pagination";

type ContentProps = {
  initialUsersData: UsersResponse
  initialContributions: Contributions
}

export const Content = ({ initialUsersData, initialContributions }: ContentProps) => {
  const [loading, setLoading] = useState(false)

  const [usersData, setUsersData] = useState<UsersResponse>(initialUsersData);

  const [contributions, setContributions] = useState<Contributions>(initialContributions);

  const [page, setPage] = useState(1)

  const refetchUsersContributions = async (year: number) => {
    const contributions = 
      await getUsersContributions({ users: usersData?.items ?? [], year })

    if (contributions === undefined) return

    setContributions(contributions)
  }

  const refetchUsersData = async (region: string, year: number) => {
    const usersData = 
      await getUsers({ region, page: 1 })

    if (usersData === undefined) return

    const contributions = 
      await getUsersContributions({ users: usersData?.items ?? [], year })

    setUsersData(usersData)

    if (contributions === undefined) return

    setContributions(contributions)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header
        loading={loading}
        refetchUsersContributions={refetchUsersContributions}
        refetchUsersData={refetchUsersData}
      />
      
      {loading && (
        <h2>Loading data...</h2>
      )}

      <main>
        {!loading && usersData?.items !== undefined && contributions !== undefined && (
          <>
            <Users contributions={contributions} users={usersData.items} />

            {/* TODO - use another Pagination element */}
            {/* <Pagination perPage={PER_PAGE} count={usersData.total_count} page={page} setPage={setPage} /> */}
          </>
        )}
      </main>

    </div>
  );
};
