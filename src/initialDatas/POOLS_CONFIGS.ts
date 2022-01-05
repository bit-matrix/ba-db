import { BmConfig, Pool } from "@bitmatrix/models";
import { pool0 } from "./pool0";
import { pool1 } from "./pool1";

export const POOLS_CONFIGS: { pool: Pool; config: BmConfig }[] = [pool0, pool1];
