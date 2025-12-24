
export interface WasmMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export enum OutputFormat {
  JAVASCRIPT = 'js',
  TYPESCRIPT = 'ts',
  PYTHON = 'py',
  CPP = 'cpp',
  RUST = 'rs',
}

export interface ConversionResult {
  code: string;
  byteCount: number;
  metadata: WasmMetadata;
}
