import { SearchBar } from "./SearchBar";
import professionalTeamImage from 'figma:asset/5c21b3f63311a7a5846dc0ef02095b6718eead83.png';

export function Hero() {
  return (
    <section className="relative bg-slate-900 py-20 md:py-28 mt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={professionalTeamImage}
          alt="Professional service providers"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/90"></div>
      </div>
      
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl will-change-transform"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl will-change-transform"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Content - Centered */}
          <div className="w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Connect with trusted handymen<br />
              and professionals in your area.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Your one-stop platform for reliable home, auto, health, and business services.
            </p>
            
            {/* Professional Search Bar */}
            <div className="max-w-3xl mx-auto">
              <SearchBar variant="hero" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}