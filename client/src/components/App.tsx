import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Ads from "./Ads";
import Pagination from "./Pagination";

import { Ad } from "../interfaces/clientInterfaces";

const App: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [adsPerPage, setAdsPerPage] = useState<number>(20);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Ad[]>("http://localhost:3000");
        setAds(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Apartments</h1>
      <Ads ads={currentAds} loading={loading} />
      <Pagination
        itemsPerPage={adsPerPage}
        totalItems={ads.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
