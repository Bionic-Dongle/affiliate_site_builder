interface TrustBadgesProps {
  heading: string;
  images: string[];
}

const TrustBadges = ({ heading, images }: TrustBadgesProps) => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{heading}</h2>
        
        <div className="flex flex-wrap justify-center gap-4 items-center">
          {images.map((image, idx) => (
            <div 
              key={idx}
              className="rounded-lg border bg-card hover:shadow-md transition-shadow p-3"
              style={{ width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {image ? (
                <img 
                  src={image} 
                  alt={`Trust badge ${idx + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              ) : (
                <span className="text-xs text-muted-foreground text-center">Badge {idx + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
