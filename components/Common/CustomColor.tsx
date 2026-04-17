'use client';

type Props = {
  r: number;
  g: number;
  b: number;
};

/**
 * CUSTOM COLOR ENGINE
 * Ubrizgava dinamičke RGB vrednosti u root.
 * Koristi se za promenu identiteta brenda u realnom vremenu.
 */
const CustomColor = ({ r, g, b }: Props) => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        :root {
          /* Čuvamo čiste vrednosti za Tailwind opacity podršku */
          --color-primary-rgb: ${r}, ${g}, ${b};
          
          /* Osnovna varijabla za klasičnu upotrebu */
          --color-primary: rgb(${r}, ${g}, ${b});
        }
      `
    }} />
  );
};

export default CustomColor;