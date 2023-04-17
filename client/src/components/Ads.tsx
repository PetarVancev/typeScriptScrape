import React from "react";

import { AdsProps } from "../interfaces/clientInterfaces";

const Ads: React.FC<AdsProps> = ({ ads, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group md-4">
      {ads.map((ad) => {
        return (
          <li key={ad.id} className="list-group-item text-center">
            <img src={String(ad.imgurl)} alt="" />
            <p>{ad.title}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Ads;
