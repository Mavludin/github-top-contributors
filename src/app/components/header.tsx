"use client";

import { useState } from "react";
import { RegionForm } from "./regionForm";
import { YearForm } from "./yearForm";
import { YEARS } from "../data";

type HeaderProps = {
  year: number
  setYear: (value: number) => void
  region: string
  setRegion: (value: string) => void
  loading: boolean
  refetchUsersContributions: (year: number) => void
};

export const Header = ({
  year,
  setYear,
  region,
  setRegion,
  loading,
  refetchUsersContributions,
}: HeaderProps) => {
  return (
    <header>
      <YearForm
        year={year}
        setYear={setYear}
        loading={loading}
        refetchUsersContributions={refetchUsersContributions}
      />

      <RegionForm
        region={region}
        setRegion={setRegion}
        loading={loading}
      />
    </header>
  );
};
