import React from "react";

const BlockPage = () => {
  return (
    <div className="h-screen flex flex-col gap-8 items-center justify-center">
      <img
        src="https://store-images.s-microsoft.com/image/apps.60371.4ade795d-2715-4b6f-b475-fba78b835f17.6dfa612f-d2d3-45fb-b3a4-34e1aa4fa810.47252780-ebdc-4cc4-8df3-89310788727e"
        alt=""
        className="w-[120px] h-[120px] object-cover"
      />
      <span>You are blocked. Please contact admin to know more.</span>
    </div>
  );
};

export default BlockPage;
