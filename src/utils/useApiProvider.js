import useCommonApi from "src/api/useCommonApi";
import { types } from "src/controllers";

export default function useApiProvider({ authToken: authToken }) {
  const faqApi = useCommonApi({
    authToken: authToken,
    type: types.FAQ,
  });
  const eventsApi = useCommonApi({
    authToken: authToken,
    type: types.EVENTS,
  });

  return {
    faqApi,
    eventsApi,
  };
}
