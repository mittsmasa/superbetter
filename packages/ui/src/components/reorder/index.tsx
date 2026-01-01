import { Reorder as _Reorder, useDragControls } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';

export const List = <T,>(props: ComponentProps<typeof _Reorder.Group<T>>) => {
  const { axis = 'y' } = props;
  return <_Reorder.Group {...{ ...props, axis }} />;
};

type RenderItemProps = {
  controls: ReturnType<typeof useDragControls>;
};

const ListItem = <T,>({
  renderItem,
  ...rest
}: ComponentProps<typeof _Reorder.Item<T>> & {
  renderItem: (props: RenderItemProps) => ReactNode;
}) => {
  const controls = useDragControls();
  return (
    <_Reorder.Item {...rest} dragListener={false} dragControls={controls}>
      {renderItem({ controls })}
    </_Reorder.Item>
  );
};

export const Reorder = {
  List,
  ListItem,
};
