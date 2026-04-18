'use client';

type Props = {
  r: number;
  g: number;
  b: number;
};

/**
 * CUSTOM COLOR ENGINE - REFINED
 * Ubrizgava dinamičke RGB vrednosti u formatu koji podržava Tailwind opacity.
 */
const CustomColor = ({ r, g, b }: Props) => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        :root {
          /* Format sa RAZMACIMA omogućava Tailwind-u da ubaci /opacity */
          --color-primary: ${r} ${g} ${b};
          
          /* Zadržavamo varijablu sa zarezima samo ako ti treba za neki stariji CSS */
          --color-primary-legacy: rgb(${r}, ${g}, ${b});
        }
      `
    }} />
  );
};

export default CustomColor;