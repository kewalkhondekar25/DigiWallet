import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

const usePostRequest = <T,>(fn: (variables: T) => Promise<any>) => {
  
  const mutation = useMutation({

    mutationFn: (variables: T) => fn(variables),

    onSuccess: (response) => {
      console.log("onsuccess: ", response);
      
    },

    onError: (err: any) => {
      console.log("onError: ", err);
    }

  });

  return {
    ...mutation,
  };
};

export {
  usePostRequest
};