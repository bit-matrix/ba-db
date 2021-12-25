// dev local => yarn dev
export const DATA_DIR: string = process.env.DATA_DIR || "dist/data-dir/";
// export const DATA_DIR: string = process.env.DATA_DIR || "/datavolume1/data-dir/";
export const LISTEN_PORT: number = Number(process.env.PORT || 8899);
