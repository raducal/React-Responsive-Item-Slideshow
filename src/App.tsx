import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    items: [
      "hello1",
      "hello2",
      "hello3",
      "hello4",
      "hello5",
      "hello6",
      "hello7",
      "hello8",
      "hello9",
      "hello10",
      "hello11",
      "hello12",
      "hello13",
    ],
    screenWidth: 0,
    widthOfItems: -1,
    noOfItems: -1,
    currentItem: 0,
    transitionValue: 0,
  });

  const { width } = useWindowSize();

  useEffect(() => {
    let tempWidth = (width / 100) * 80;
    let temp = Math.floor(tempWidth / 200);
    let tempNoOfItems = temp * 200;
    setState((prev) => ({
      ...prev,
      screenWidth: width,
      widthOfItems: tempNoOfItems,
      currentItem: temp,
      noOfItems: temp,
    }));
  }, []);

  // 200 is width of item being used
  useEffect(() => {
    let tempWidth = (width / 100) * 80;
    let temp = Math.floor(tempWidth / 200);
    let tempNoOfItems = temp * 200;
    // let transitionVal =
    //   state.currentItem < state.noOfItems
    //     ? (state.currentItem - temp) * 200
    //     : 0;
    setState((prev) => ({
      ...prev,
      screenWidth: width,
      widthOfItems: tempNoOfItems,
      noOfItems: temp,
      transitionValue: 0,
      currentItem: temp,
    }));
  }, [width]);

  const next = () => {
    let val = state.currentItem;
    let transitionVal = state.transitionValue;
    if (val < state.items.length) {
      val = val + 1;
      transitionVal += 200;
    }
    setState((prev) => ({
      ...prev,
      currentItem: val,
      transitionValue: transitionVal,
    }));
  };

  const prev = () => {
    let val = state.currentItem;
    let transitionVal = state.transitionValue;
    if (val > state.noOfItems) {
      val = val - 1;
      transitionVal -= 200;
    }
    setState((prev) => ({
      ...prev,
      currentItem: val,
      transitionValue: transitionVal,
    }));
  };

  return (
    <div className="main">
      <button className="btn btnLeft" onClick={prev}>
        Prev
      </button>
      <div
        className="carouselSection"
        style={{ maxWidth: `${state.widthOfItems}px` }}
      >
        <div
          className="container"
          style={{
            transform: `translateX(-${state.transitionValue}px)`,
            transition:
              "transform 0.45s cubic-bezier(0.455, 0.03, 0.515, 0.955)",
          }}
        >
          <div className="carousel">
            {state.items.map((item: string, i: number) => {
              return <Item key={i} itemTitle={item} />;
            })}
          </div>
        </div>
      </div>
      <button className="btn btnRight" onClick={next}>
        Next
      </button>
    </div>
  );
};

interface IProps {
  itemTitle: string;
}

const Item: React.FC<IProps> = ({ itemTitle }) => {
  return (
    <div className="item">
      <div>{itemTitle}</div>
      <div>Heylooo</div>
    </div>
  );
};

const useWindowSize = () => {
  function getSize() {
    return {
      width:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default App;
