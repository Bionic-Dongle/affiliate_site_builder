interface TrustBadgesProps {
  heading: string;
  images: string[];
}

const TrustBadges = ({ heading, images }: TrustBadgesProps) => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{heading}</h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          {images.map((image, idx) => (
            <div 
              key={idx}
              className="w-40 h-40 rounded-lg border bg-card hover:shadow-md transition-shadow flex items-center justify-center p-4"
            >
              {image ? (
                <img 
                  src={image} 
                  alt={`Trust badge ${idx + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-sm text-muted-foreground">Badge {idx + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
