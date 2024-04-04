"use client";

import { Region } from "./region";
import { RegionForm } from "./regionForm";
import { YearForm } from "./yearForm";

type HeaderProps = {
  loading: boolean;
  region: string;
  year: number;
  setRegion: (value: string) => void;
  setYear: (value: number) => void;
};

export const Header = ({
  loading,
  region,
  year,
  setRegion,
  setYear,
}: HeaderProps) => {
  return (
    <header>
      <Region name={region} />

      <YearForm loading={loading} year={year} setYear={setYear} />

      <RegionForm loading={loading} setRegion={setRegion} />
    </header>
  );
};
