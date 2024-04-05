import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";

const ImageSlider = ({ images }) => {
  // console.log(images);

  const [img, setImg] = useState(images[0]);

  const handleHoverImg = (image, i) => {
    setImg(image);
  };

  return (
    <div className=" flex  md:max-w-[1200px] gap-4 items-center ">
      <div className="flex gap-3 flex-row">
        <div className="flex flex-col gap-10 md:flex-none md:w-30 md:mr-4 my-4 md:my-0">
          {/* left-1 */}
          {images.map((image, i) => (
            <div
              className="w-20 h-20 border border-slate-300"
              key={i}
              onMouseOver={() => handleHoverImg(image, i)}
            >
              <img
                src={image}
                alt="This is an image"
                className="w-[75px] h-[75px] object-contain transition-all"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-52 sm:w-96">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: img,
            },
            largeImage: {
              src: img,
              width: 900,
              height: 1200,
            },
          }}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
