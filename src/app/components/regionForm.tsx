'use client'

import { INITIAL_REGION } from "../data";

type RegionFormProps = Readonly<{
  year: number
  loading: boolean
  refetchUsersData: (region: string, year: number) => void;
}>;

type FormData = {
  region: { value: string }
}

export const RegionForm = ({ year, loading, refetchUsersData }: RegionFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { region } = e.target as typeof e.target & FormData

    refetchUsersData(region.value, year)
  }

  return (
    <div className="flex">
      <form onSubmit={handleSubmit} className="my-2 flex gap-2">
        <input
          defaultValue={INITIAL_REGION}
          name="region"
          type="search"
          autoComplete="current-password"
          placeholder="Enter region"
          required
          className="w-full rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          disabled={loading}
          type="submit"
          className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Search
        </button>
      </form>
      
      {/* <Region name={region} /> */}
    </div>
  );
};
