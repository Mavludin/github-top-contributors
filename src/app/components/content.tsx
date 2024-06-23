"use client";

import { useState } from "react";
import { Header } from "./header";
import { getUsers, getUsersContributions } from "../api";
import { Users } from "./users";
import type { Contributions, UsersResponse } from "../types";
import { INITIAL_REGION, PER_PAGE, YEARS } from "../data";

import {Button, Pagination} from "@nextui-org/react";

type ContentProps = {
  initialUsersData: UsersResponse
  initialContributions: Contributions
}

export const Content = ({ initialUsersData, initialContributions }: ContentProps) => {
  const [loading, setLoading] = useState(false)

  const [usersData, setUsersData] = useState<UsersResponse>(initialUsersData);

  const [contributions, setContributions] = useState<Contributions>(initialContributions);

  const [year, setYear] = useState(YEARS[0]);

  const [region, setRegion] = useState(INITIAL_REGION);

  const refetchUsersContributions = async (year: number) => {
    const contributions = 
      await getUsersContributions({ users: usersData?.items ?? [], year })

    if (contributions === undefined) return

    setContributions(contributions)
  }

  const refetchUsersData = async (region: string, year: number, page: number = 1) => {
    const usersData = 
      await getUsers({ region, page })

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
        year={year}
        setYear={setYear}
        loading={loading}
        refetchUsersContributions={refetchUsersContributions}
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

            <Pagination
              isCompact
              showControls
              total={Math.ceil(usersData.total_count / PER_PAGE)}
              initialPage={1}
              onChange={(page) => {
                refetchUsersData(region, year, page)
              }}
            />
          </>
        )}
      </main>
    </div>
  );
};
