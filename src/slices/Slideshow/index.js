/**
 * @typedef {import("@prismicio/client").Content.SlideshowSlice} SlideshowSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SlideshowSlice>} SlideshowProps
 * @type {import("react").FC<SlideshowProps>}
 */
const Slideshow = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for slideshow (variation: {slice.variation}) Slices
    </section>
  );
};

export default Slideshow;
