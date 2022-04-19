import "./index.css";
import "./List.css";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import React from "react";
import elementArr from "./elements.js";

function App() {
  const bottomSections = useRef();
  const topSections = useRef();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [renderArr, setRenderArr] = useState(
    elementArr.slice(startIndex, endIndex - 1)
  );
  const [bottomState, setBottomState] = useState(false);
  const [topState, setTopState] = useState(false);
  useEffect(() => {
    const observerOne = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setBottomState(entry.isIntersecting);
    });
    observerOne.observe(bottomSections.current);
    const observerTwo = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setTopState(entry.isIntersecting);
    });
    observerTwo.observe(topSections.current);
  }, []);
  
  useEffect(() => {
    if (topState && startIndex > 0) {
      setStartIndex((prev) => {
        return prev - 1;
      });
      setEndIndex((prev) => {
        return prev - 1;
      });
      //console.log(startIndex);
      //console.log(endIndex);
      setRenderArr(elementArr.slice(startIndex - 1, endIndex - 1));
      if (endIndex > 10) {
        let beginIndex = startIndex + 4;
        beginIndex = beginIndex.toString();
        let elemId = "element" + beginIndex;
        let elem = document.getElementById(elemId);
        let rect = elem.getBoundingClientRect();
        elem.scrollIntoView()
      }
    }
  }, [topState]);
  useEffect(() => {
    if (bottomState && startIndex < 46) {
      setStartIndex((prev) => {
        return prev + 1;
      });
      setEndIndex((prev) => {
        return prev + 1;
      });
      //console.log(startIndex);
      //console.log(endIndex);
      setRenderArr(elementArr.slice(startIndex + 1, endIndex + 1));
      if (startIndex <= 46 && endIndex <= 50) {
        let lastIndex = endIndex - 1;
        lastIndex = lastIndex.toString();
        let elemId = "element" + lastIndex;
        let elem = document.getElementById(elemId);
        if (elem) {
          let rect = elem.getBoundingClientRect();
          window.scrollBy(0, -rect.y);
        }
      }
    }
  }, [bottomState]);
  return (
    <div>
      <div className="topDiv" ref={topSections}></div>
      {renderArr}
      <div className="bottomDiv" ref={bottomSections}></div>
    </div>
  );
}
export default App;
