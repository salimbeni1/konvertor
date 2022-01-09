import Typed from "typed.js";
import { useEffect, useRef } from "react";

const SVGmain1 = () => {


    const el1 = useRef(null);
    const el2 = useRef(null);

    useEffect(() => {
      const typed1 = new Typed(el1.current, {
        strings: [".EXR", ".PNG", ".JPG"], // Strings to display
        // Speed settings, try diffrent values untill you get good results
        startDelay: 50,
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 2000,
        shuffle: true,
        loop: true,
        smartBackspace: false,
      });
      
      const typed2 = new Typed(el2.current, {
        strings: [".MP4", ".MOV"], // Strings to display
        // Speed settings, try diffrent values untill you get good results
        startDelay: 50,
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 2000,
        loop: true,
        smartBackspace: false,
      });

      // Destropying
      return () => {
        typed1.destroy();
        typed2.destroy();
      };
    }, []);


    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 594 567">
  <defs>
    <style>
      {`.cls-main1-1 {
        fill: #fff;
      }

      .cls-main1-1, .cls-main1-3 {
        stroke: #000;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2px;
      }

      .cls-main1-2 {
        font-size: 70px;
        font-family: "Poppins", sans-serif;
      }

      .cls-main1-3 {
        fill: none;
      }`}
    </style>
  </defs>


  <g id="Layer_1" data-name="Layer 1">
    <g>
      <rect className="cls-main1-1" x="159.72" y="35.62" width="221.14" height="141.26" rx="3.58"/>
      <rect className="cls-main1-1" x="168.53" y="44.54" width="221.14" height="141.26" rx="3.58"/>
      <rect className="cls-main1-1" x="179.53" y="57.54" width="221.14" height="141.26" rx="3.58"/>
      <rect className="cls-main1-1" x="192.53" y="69.54" width="221.14" height="141.26" rx="3.58"/>
      <rect className="cls-main1-1" x="205.53" y="85.54" width="221.14" height="141.26" rx="3.58"/>
      <rect className="cls-main1-1" x="220.53" y="99.54" width="221.14" height="141.26" rx="3.58"/>
      <rect className="cls-main1-1" x="233.53" y="115.54" width="221.14" height="141.26" rx="3.58"/>
      <rect className="cls-main1-1" x="235.53" y="398.54" width="221.14" height="141.26" rx="3.58"/>
      <text ref={el1} className="cls-main1-2" transform="translate(260.76 215.1)">
      </text>
      <text ref={el2} className="cls-main1-2" transform="translate(257.14 498.47)">  
      </text>
      <line className="cls-main1-1" x1="126.07" y1="284.8" x2="126.07" y2="446.46"/>
      <line className="cls-main1-1" x1="46.62" y1="355.51" x2="188.53" y2="355.51"/>
      <line className="cls-main1-1" x1="540.79" y1="51.87" x2="540.79" y2="137.21"/>
      <line className="cls-main1-1" x1="504.38" y1="94.54" x2="572.24" y2="94.54"/>
      <line className="cls-main1-1" x1="162.48" y1="289.55" x2="162.48" y2="453.26"/>
      <line className="cls-main1-1" x1="84.69" y1="289.55" x2="84.69" y2="446.46"/>
      <line className="cls-main1-1" x1="46.62" y1="398.46" x2="177.53" y2="398.46"/>
      <circle className="cls-main1-1" cx="69" cy="177" r="31"/>
      <circle className="cls-main1-3" cx="504" cy="337" r="47"/>
      <circle className="cls-main1-3" cx="525.01" cy="317" r="47"/>
      <line className="cls-main1-1" x1="343.1" y1="281.23" x2="345.1" y2="379.46"/>
      <polyline className="cls-main1-3" points="375 356 346 380 310 356"/>
    </g>
  </g>
</svg>
    )
}

export default SVGmain1