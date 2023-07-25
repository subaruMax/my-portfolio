declare module '*.svg' {
  const svg: FunctionComponent<SVGAttributes<SVGElement>>;
  export default svg;
}

declare module '*.svg?url' {
  const svg: string;
  export default svg;
}

declare module 'public/icons' {
  const icons: { [key: string]: FunctionComponent<SVGAttributes<SVGElement>> };

  export default icons;
}
declare module '*.json' {
  const value: any;
  export default value;
}
