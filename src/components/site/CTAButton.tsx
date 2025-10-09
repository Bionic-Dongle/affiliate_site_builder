import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export interface CTAPlacement {
  id: string;
  ctaId: string;
  position: number;
}

export interface BlogCTAPlacement {
  id: string;
  ctaId: string;
  position: 'after-intro' | 'mid-content' | 'before-conclusion' | 'end-of-post';
}

export interface CTADefinition {
  id: string;
  name: string;
  text: string;
  affiliateUrl: string;
  affiliateId: string;
  trackingParams: string;
}

interface CTAButtonProps {
  cta: CTADefinition;
  className?: string;
}

export const CTAButton = ({ cta, className = "" }: CTAButtonProps) => {
  const fullUrl = `${cta.affiliateUrl}${cta.trackingParams ? `?${cta.trackingParams}` : ''}`;
  
  return (
    <Button 
      asChild 
      className={`w-full sm:w-auto ${className}`}
      size="lg"
    >
      <a 
        href={fullUrl} 
        target="_blank" 
        rel="noopener noreferrer nofollow"
        data-affiliate-id={cta.affiliateId}
      >
        {cta.text}
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
};

interface CTARendererProps {
  placements: CTAPlacement[] | BlogCTAPlacement[];
  ctaLibrary: CTADefinition[];
  position: number | string;
  className?: string;
}

export const CTARenderer = ({ placements, ctaLibrary, position, className = "" }: CTARendererProps) => {
  const ctasAtPosition = placements
    .filter(p => p.position === position)
    .map(p => ctaLibrary.find(c => c.id === p.ctaId))
    .filter((cta): cta is CTADefinition => cta !== undefined);

  if (ctasAtPosition.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {ctasAtPosition.map(cta => (
        <CTAButton key={cta.id} cta={cta} />
      ))}
    </div>
  );
};
