import { Metadata } from "next";
import { Content } from "./components/content";

export const metadata: Metadata = {
  title: "Next.js",
};

export default async function Home() {
  return (
    <Content />
  );
}
