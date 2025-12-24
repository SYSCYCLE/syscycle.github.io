
import { OutputFormat } from '../types';

export const formatBytes = (bytes: Uint8Array, format: OutputFormat): string => {
  const arrayString = Array.from(bytes).join(', ');
  
  switch (format) {
    case OutputFormat.JAVASCRIPT:
      return `const wasmCode = new Uint8Array([\n  ${arrayString}\n]);`;
    case OutputFormat.TYPESCRIPT:
      return `const wasmCode: Uint8Array = new Uint8Array([\n  ${arrayString}\n]);`;
    case OutputFormat.PYTHON:
      return `wasm_code = bytes([\n    ${arrayString}\n])`;
    case OutputFormat.CPP:
      return `unsigned char wasm_code[] = {\n    ${arrayString}\n};\nunsigned int wasm_code_len = ${bytes.length};`;
    case OutputFormat.RUST:
      return `const WASM_CODE: &[u8] = &[\n    ${arrayString}\n];`;
    default:
      return arrayString;
  }
};

export const humanFileSize = (size: number): string => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    Number((size / Math.pow(1024, i)).toFixed(2)) +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
};
