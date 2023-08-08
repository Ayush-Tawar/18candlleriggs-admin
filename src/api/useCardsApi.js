import { useEffect, useMemo, useState } from "react";
import { appsApi } from "./api";
import _ from "lodash";
import { useAlert } from "src/hooks/useNotify";

export default function useCardsApi() {
  const [cardsList, setCardsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const notify = useAlert();
  const [isSubmittingTitle, setIsSubmittingTitle] = useState(false);
  const [isSubmittingProducts, setIsSubmittingProducts] = useState(false);

  const titleCard = useMemo(
    () => cardsList.find((c) => c.type === "main"),
    [cardsList],
  );

  const products = useMemo(
    () => cardsList.filter((c) => c.type === "sub"),
    [cardsList],
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await appsApi.get("heroSection");
      if (_.has(data, "results") && _.isArray(data.results)) {
        setCardsList(data.results);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("===>  useCardsApi  error:", error);
    }
  };

  const submitTitleSection = async (params) => {
    const id = titleCard?.id || "";
    if (!id) {
      notify.toastError("Id not found!");
    }

    try {
      setIsSubmittingTitle(true);
      const res = await appsApi.put("card/" + id, {
        ...params,
        type: "main",
      });
      if (res.data && res.data.message) {
        notify.toastSuccess("Request updated successfully!");
      }
    } catch (error) {
      console.error("===>  submitTitleSection  error:", error);
    } finally {
      setIsSubmittingTitle(false);
    }
  };

  const submitProduct = async (params) => {
    try {
      setIsSubmittingProducts(true);
      const res = await Promise.all(
        params.list.map((product) =>
          appsApi.put("card/" + product.id, {
            title: product.title,
            subTitle: product.subTitle,
            type: "sub",
          }),
        ),
      );
      const success = res.every((r) => r.status === 200);
      if (success) {
        notify.toastSuccess("Request updated successfully!");
      }
    } catch (error) {
      console.error("===>  submitTitleSection  error:", error);
    } finally {
      setIsSubmittingProducts(false);
    }
  };

  return {
    //common initial Loading
    isLoading,
    setIsLoading,
    //Hero Section
    titleCard,
    submitTitleSection,
    isSubmittingTitle,
    // Products
    products,
    submitProduct,
    isSubmittingProducts,
  };
}
