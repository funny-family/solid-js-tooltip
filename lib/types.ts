export type DeepRequired<T> = {
  [K in keyof T]: Required<DeepRequired<T[K]>>;
};

export type NonEmpty<T> = T extends Array<infer U> ? U[] & { '0': U } : never;

type DataAttributeKey = `data-${string}`;

export type DataAttribute = {
  [key: DataAttributeKey]: any;
};
