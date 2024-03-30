import { Metadata } from "next";
import { Header } from "./components/header";
import { Content } from "./components/content";

export const metadata: Metadata = {
  title: "Next.js",
};

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Content />
    </main>
  );
}
