import { type ImagePropTypes, Image as ReactDatocmsImage } from 'react-datocms';
import { type FragmentType, getFragmentData } from '@/graphql/types';
import { DatoImage_ResponsiveImageFragmentDoc } from '@/graphql/types/graphql';

type Props =
  | ImagePropTypes
  | (Omit<ImagePropTypes, 'data'> & {
      fragment: FragmentType<typeof DatoImage_ResponsiveImageFragmentDoc>;
    });

/**
 * CORE IMAGE ENGINE
 * Optimizovan za LCP (Largest Contentful Paint) i CLS (Cumulative Layout Shift).
 * Svaka slika ovde je "sirovina" tvog brenda.
 */
export default function DatoImage(props: Props) {
  // Globalno primenjujemo oštre ivice i sistemski prelaz
  const systemClasses = "transition-opacity duration-700 ease-in-out";

  if ('fragment' in props) {
    const { fragment, className, ...rest } = props;
    const data = getFragmentData(
      DatoImage_ResponsiveImageFragmentDoc,
      fragment,
    );
    
    return (
      <ReactDatocmsImage 
        {...rest} 
        data={data} 
        className={`${systemClasses} ${className || ''}`}
        // Intersection observer se brine za lazy loading automatski
        fadeInDuration={0} // Isključujemo default fade da bismo koristili naš CSS prelaz
      />
    );
  }

  const { className, ...rest } = props;

  return (
    <ReactDatocmsImage 
      {...rest} 
      className={`${systemClasses} ${className || ''}`}
      fadeInDuration={0}
    />
  );
}