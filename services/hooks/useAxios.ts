import { AxiosContext } from "@context/AxiosContext/AxiosProvider";
import { useContext } from "react";

export default function useAxios() {
  return useContext(AxiosContext)
}
