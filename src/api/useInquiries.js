import { useEffect, useState } from "react";
import { appsApi } from "./api";
import _ from "lodash";
import { useAlert } from "src/hooks/useNotify";

export default function useInquiries() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await appsApi.get(
        "contactus/getContactUs?sortBy=createdAt:desc&limit=1000",
      );
      setData(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    data,
    isLoading,
  };
}
