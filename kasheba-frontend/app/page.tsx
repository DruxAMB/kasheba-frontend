import Image from "next/image";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="bg-[#24EACC] pt-48 h-screen text-black">
      <HeroSection />
    </main>
  );
}
