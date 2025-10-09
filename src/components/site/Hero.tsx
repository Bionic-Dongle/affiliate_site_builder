interface HeroProps {
  heading: string;
  subheading: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  showCTA?: boolean;
  overlayOpacity?: number;
}

const Hero = ({ heading, subheading, buttonText, buttonLink, backgroundImage, showCTA = true, overlayOpacity = 0.5 }: HeroProps) => {
  return (
    <section 
      className="relative min-h-[500px] flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-block">
          <div 
            className="backdrop-blur-md rounded-2xl px-8 py-6 mb-8"
            style={{ backgroundColor: `hsl(var(--background) / ${overlayOpacity})` }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{heading}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">{subheading}</p>
          </div>
        </div>
        {showCTA && buttonText && buttonLink && (
          <a 
            href={buttonLink}
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
