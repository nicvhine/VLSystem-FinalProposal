import Head from 'next/head';
import Navbar from './landing/navbar';
import HeroSection from './landing/herosection';
import FeatureSection from './landing/featuresection';
import TestimonialSection from './landing/testimonialsection';
import TeamSection from './landing/teamsection';
import AboutSection from './landing/aboutussection';
import Footer from './landing/footer';
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Vistula Lending Corporation</title>
        <meta name="description" content="Empowering lives through better lending." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

        <HeroSection />
        <FeatureSection /> 
        <TestimonialSection />
        <TeamSection />
        <AboutSection />
        <Footer />
    </div>
  );
}
