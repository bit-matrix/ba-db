import { BmConfig, Pool } from "@bitmatrix/models";
import { pool3 } from "./pool3";
import { pool8 } from "./pool8";

export const POOLS_CONFIGS: { pool: Pool; config: BmConfig }[] = [pool8, pool3];
