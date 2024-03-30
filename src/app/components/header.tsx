"use client";

import { Region } from "./region";
import { RegionForm } from "./regionForm";
import { YearForm } from "./yearForm";

type HeaderProps = {
  region: string
  year: number
  setRegion: (value: string) => void
  setYear: (value: number) => void
}

export const Header = ({ region, year, setRegion, setYear }: HeaderProps) => {
  return (
    <header>
      <Region name={region} />

      <YearForm year={year} setYear={setYear} />

      <RegionForm setRegion={setRegion} />
    </header>
  );
};
