'use client'

import { useState } from "react";

type RegionFormProps = Readonly<{
  setRegion: (value: string) => void;
}>;

export const RegionForm = ({ setRegion }: RegionFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRegion(e.target.region.value)
  }

  return (
    <form onSubmit={handleSubmit} className="my-2 flex gap-2">
      <input
        name="region"
        type="search"
        autoComplete="current-password"
        placeholder="Enter region"
        required
        className="w-full rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button
        type="submit"
        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Search
      </button>
    </form>
  );
};
