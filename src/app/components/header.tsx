"use client";

import { RegionForm } from "./regionForm";
import { YearForm } from "./yearForm";

type HeaderProps = {
  year: number
  handleYearChange: (value: number) => void
  region: string
  handleRegionChange: (value: string) => void
  loading: boolean
};

export const Header = ({
  year,
  handleYearChange,
  region,
  handleRegionChange,
  loading,
}: HeaderProps) => {
  return (
    <header>
      <YearForm
        year={year}
        handleYearChange={handleYearChange}
        loading={loading}
      />

      <RegionForm
        region={region}
        handleRegionChange={handleRegionChange}
        loading={loading}
      />
    </header>
  );
};
