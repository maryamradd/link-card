import React, {useState, useEffect} from "react";
import Carousel from "../shared/Carousel";
//import screenImg from "./Screenshot_2020-10-15_011835.png";

const Home = () => {
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    //var images = [screenImg, screenImg, screenImg];
    //setImgList(images);
  }, []);

  return (
    <div>
      <h1>Carousel</h1>
      {/* {imgList.length === 0 && <div>Loading...</div>}
      {imgList.length > 0 && (
        <Carousel
          imgList={imgList}
          img_width={300}
          img_height={300}
          visibleImages={3}
          duration={750}
        />
      )} */}
    </div>
  );
};

export default Home;
