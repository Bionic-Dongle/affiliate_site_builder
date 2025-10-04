interface NewsletterProps {
  heading: string;
  description: string;
  buttonText: string;
  backgroundImage?: string;
}

const Newsletter = ({ heading, description, buttonText, backgroundImage }: NewsletterProps) => {
  return (
    <section 
      className="py-16 bg-primary/5"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' } : {}}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{description}</p>
        
        <div className="max-w-md mx-auto flex gap-2">
          <input 
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border bg-background"
          />
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
