 import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SaltParticles from "../components/SaltParticles";
import farmerHero from "../assets/farmer-hero.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-salt-navy text-salt-sand font-body">
      <Navbar />

      <div className="relative overflow-hidden">
        <SaltParticles />

        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            

            <h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #2F6FFF 0%, #FF7A29 60%, #FF3B5C 100%)",
              }}
            >
              SaltSure AI
            </h1>

            <p className="text-salt-sand/90 text-base md:text-lg font-medium mb-4">
              Fair grading. Fair price for the small salt farmer.
            </p>

            <p className="text-salt-sand/60 text-sm md:text-base mb-8 max-w-md">
              Small salt farmers grade by guesswork and sell to whoever shows
              up. We give them a phone-camera quality check and a real
              market benchmark — before they negotiate.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/grade")}
                className="bg-salt-teal hover:bg-salt-tealDark text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors"
              >
                Grade My Salt
              </button>
              <button
                onClick={() => navigate("/roadmap")}
                className="border border-salt-sand/20 hover:border-salt-teal/50 text-salt-sand/80 font-medium px-8 py-3.5 rounded-xl text-base transition-colors"
              >
                See Our Roadmap
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-salt-teal/10 rounded-3xl blur-2xl"></div>
            <img
              src={farmerHero}
              alt="Salt farmer at work"
              className="relative rounded-2xl w-full h-72 md:h-96 object-cover border border-salt-sand/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;