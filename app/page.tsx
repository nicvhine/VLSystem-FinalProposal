import Image from "next/image";
import Navbar from "./landing/navbar";
import HeroSection from "./landing/herosection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
    <Navbar />
    <HeroSection />
    </div>
  );
}
