export type SiteContent = {
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    subline: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
    backgroundImageUrl: string | null;
  };
  trustBar: {
    stat1Value: number;
    stat1Suffix: string;
    stat1Label: string;
    stat2Value: number;
    stat2Suffix: string;
    stat2Label: string;
    stat3Value: number;
    stat3Suffix: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: [ServiceItem, ServiceItem, ServiceItem, ServiceItem];
  };
  portfolio: {
    eyebrow: string;
    heading: string;
    intro: string;
    projects: [
      PortfolioProject,
      PortfolioProject,
      PortfolioProject,
      PortfolioProject,
      PortfolioProject,
      PortfolioProject,
    ];
  };
  process: {
    eyebrow: string;
    heading: string;
    phases: [
      ProcessPhase,
      ProcessPhase,
      ProcessPhase,
      ProcessPhase,
      ProcessPhase,
      ProcessPhase,
    ];
  };
  commitment: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    imageUrl: string | null;
    points: [CommitmentPoint, CommitmentPoint, CommitmentPoint, CommitmentPoint];
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    imageUrl: string | null;
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: [Testimonial, Testimonial, Testimonial];
  };
  bidCta: {
    headlineLine1: string;
    headlineLine2: string;
    paragraph: string;
    buttonLabel: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    paragraph: string;
  };
  footer: {
    description: string;
    phone: string;
    email: string;
    address: string;
    facebookUrl: string;
    instagramUrl: string;
  };
};

export type ServiceItem = { title: string; description: string };
export type PortfolioProject = {
  title: string;
  category: "Residencial" | "Remodelación" | "Comercial" | "Diseño";
  imageUrl: string | null;
};
export type ProcessPhase = { title: string; duration: string; description: string };
export type CommitmentPoint = { value: string; label: string };
export type Testimonial = { quote: string; name: string; location: string };

export type SiteContentSection = keyof SiteContent;
