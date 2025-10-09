interface TrustBadgesProps {
  heading: string;
  images: string[];
}

const TrustBadges = ({ heading, images }: TrustBadgesProps) => {
  // Don't filter out empty strings - render all slots
  const allImages = Array.isArray(images) ? images : [];
  
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{heading}</h2>
        
        <div className="flex flex-wrap justify-center gap-4 items-center">
          {allImages.map((image, idx) => (
            image && image.trim() ? (
              <div 
                key={idx}
                className="rounded-lg border bg-card hover:shadow-md transition-shadow p-3"
              >
                <img 
                  src={image} 
                  alt={`Trust badge ${idx + 1}`}
                  className="h-auto w-auto max-w-[150px] max-h-20 object-contain"
                  loading="eager"
                />
              </div>
            ) : null
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
