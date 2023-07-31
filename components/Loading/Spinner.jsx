import React from "react";
import '@/components/styles/spinner.css'
const Spinner = () => {
  return (
    <>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Spinner;
