import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

import React, { useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    return useCallback((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }, [callback, delay]);
  }

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();


export function useQuery(): URLSearchParams {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}