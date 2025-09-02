import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../test-utils/index";
import ContentCard from "./ContentCard";

const sampleContentWatched = {
  id: 1,
  release_date: "2021-03-18",
  vote_average: 8.0,
  title: "Example",
};

const sampledContentUnwatched = {
  id: 4,
  release_date: "2021-03-18",
  vote_average: 8.0,
  title: "Example4",
};

const watchListitems = [
  {
    id: 1,
    release_date: "2021-03-18",
    vote_average: 8.0,
    title: "Example",
  },
  {
    id: 2,
    release_date: "2021-03-18",
    vote_average: 8.0,
    title: "Example2",
  },
  {
    id: 3,
    release_date: "2021-03-18",
    vote_average: 8.0,
    title: "Example3",
  },
];
