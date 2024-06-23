"use client";

import { RegionForm } from "./regionForm";
import { YearForm } from "./yearForm";

type HeaderProps = {
  year: number
  setYear: (value: number) => void
  region: string
  handleRegionChange: (value: string) => void
  loading: boolean
  refetchUsersContributions: (year: number) => void
};

export const Header = ({
  year,
  setYear,
  region,
  handleRegionChange,
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
        handleRegionChange={handleRegionChange}
        loading={loading}
      />
    </header>
  );
};
