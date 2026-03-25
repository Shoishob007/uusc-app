import Navbar from "@/app/components/sections/Navbar";
import Hero from "@/app/components/sections/Hero";
import Overview from "@/app/components/sections/Overview";
import Services from "@/app/components/sections/Services";
import AboutClub from "@/app/components/sections/AboutClub";
import WeeklySchedule from "@/app/components/sections/WeeklySchedule";
import TournamentResult from "@/app/components/sections/TournamentResult";
import TournamentOverview from "@/app/components/sections/TournamentOverview";
import TournamentGallery from "@/app/components/sections/TournamentGallery";
import Leaderboard from "@/app/components/sections/Leaderboard";
import ClubMembers from "@/app/components/sections/ClubMembers";
import Testimonials from "@/app/components/sections/Testimonials";
import TournamentUpdates from "@/app/components/sections/TournamentUpdates";
import JoinClub from "@/app/components/sections/JoinClub";
import ClubsGallery from "@/app/components/sections/ClubsGallery";
import Sponsors from "@/app/components/sections/Sponsors";
import Footer from "@/app/components/sections/Footer";

function Divider() {
  return <div className="section-divider" aria-hidden="true" />;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7FAFF] text-[#13233A]">
      <Navbar />

      <Hero />
      <Divider />

      <Overview />
      <Divider />

      <Services />
      <Divider />

      <AboutClub />
      <Divider />

      <WeeklySchedule />
      <Divider />

      <TournamentResult />
      <Divider />

      <TournamentOverview />
      <Divider />

      <TournamentGallery />
      <Divider />

      <Leaderboard />
      <Divider />

      <ClubMembers />
      <Divider />

      <Testimonials />
      <Divider />

      <TournamentUpdates />
      <Divider />

      <JoinClub />
      <Divider />

      <ClubsGallery />
      <Divider />

      <Sponsors />
      <Footer />
    </div>
  );
}
