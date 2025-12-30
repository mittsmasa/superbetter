declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  // biome-ignore lint/suspicious/noExplicitAny: 公式の型定義に従っている
  const content: any;
  export default content;
}
