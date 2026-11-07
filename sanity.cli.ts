import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: {
    projectId: projectId || "2qeel1cr",
    dataset,
  },
  studioHost: "polystorex-blog",
});
