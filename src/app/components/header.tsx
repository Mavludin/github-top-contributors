"use client";

import { Contributions, UsersResponse } from "../types";
import { Region } from "./region";
import { RegionForm } from "./regionForm";
import { YearForm } from "./yearForm";

type HeaderProps = {
  loading: boolean;
  region: string;
  setRegion: (value: string) => void;
  refetchUsersContributions: (year: number) => void;
};

export const Header = ({
  loading,
  region,
  setRegion,
  refetchUsersContributions,
}: HeaderProps) => {
  return (
    <header>
      <Region name={region} />

      <YearForm
        loading={loading}
        refetchUsersContributions={refetchUsersContributions}
      />

      <RegionForm loading={loading} setRegion={setRegion} />
    </header>
  );
};
