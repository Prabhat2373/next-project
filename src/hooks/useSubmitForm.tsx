import { useState } from "react";

import axios, { Method } from "axios";

interface SubmitFormResponse {
  status: number | undefined;
  data: any;
  isSuccess: boolean;
}

export const useSubmitForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (
    method: Method,
    endpoint: string,
    data: any,
    headers: any
  ): Promise<SubmitFormResponse> => {
    setLoading(true);
    try {
      const response = await axios.request({
        method,
        url: `${"https://ecommerce-api-v2-dc40.onrender.com/api/v1"}/${endpoint}`,
        data,
        headers,
      });
      setLoading(false);
      return {
        status: response.status,
        data: response.data,
        isSuccess: true,
      };
    } catch (err: any) {
      setLoading(false);
      return {
        status: err?.response?.status,
        data: err?.response?.data,
        isSuccess: false,
      };
    }
  };

  return {
    loading,
    submit,
  };
};
