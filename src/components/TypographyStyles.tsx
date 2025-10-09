import { useTemplate } from "@/contexts/TemplateContext";

const TypographyStyles = () => {
  const { config } = useTemplate();
  
  const headingFont = config.typography?.headingFont || "Inter";
  const bodyFont = config.typography?.bodyFont || "Inter";
  
  // Generate Google Fonts URL
  const fontFamilies = [headingFont, bodyFont].filter((f, i, arr) => arr.indexOf(f) === i);
  const googleFontsUrl = `https://fonts.googleapis.com/css2?${fontFamilies.map(f => `family=${f.replace(/ /g, '+')}:wght@400;700`).join('&')}&display=swap`;
  
  return (
    <>
      <link rel="stylesheet" href={googleFontsUrl} />
      <style>
        {`
          h1, h2, h3, h4, h5, h6 {
            font-family: '${headingFont}', sans-serif;
          }
          
          body, p, span, div {
            font-family: '${bodyFont}', sans-serif;
          }
        `}
      </style>
    </>
  );
};

export default TypographyStyles;
