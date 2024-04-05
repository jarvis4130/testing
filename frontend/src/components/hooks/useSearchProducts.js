import { useState, useEffect } from "react";
import axios from "axios";
import { PRODUCTS_URL } from "../../constant";

import { useState, useEffect } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  

  return { movies, isLoading, error };
}
