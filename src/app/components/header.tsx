"use client";

import { useState } from "react";
import { RegionForm } from "./regionForm";
import { YearForm } from "./yearForm";
import { YEARS } from "../data";

type HeaderProps = {
  loading: boolean;
  refetchUsersContributions: (year: number) => void;
  refetchUsersData: (region: string, year: number) => void;
};

export const Header = ({
  loading,
  refetchUsersData,
  refetchUsersContributions,
}: HeaderProps) => {
  const [year, setYear] = useState(YEARS[0]);

  return (
    <header>
      <YearForm
        year={year}
        setYear={setYear}
        loading={loading}
        refetchUsersContributions={refetchUsersContributions}
      />

      <RegionForm
        year={year}
        loading={loading}
        refetchUsersData={refetchUsersData}
      />
    </header>
  );
};
