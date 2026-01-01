import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '.';

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
];

const meta = {
  component: Select.Root,
  args: {
    options: sampleOptions,
  },
  render: (args) => (
    <Select.Root {...args}>
      <Select.Trigger label="フルーツを選択" placeholder="選択してください" />
      <Select.Content>
        {args.options.map((option) => (
          <Select.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  ),
} satisfies Meta<typeof Select.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithDefaultValue = {
  args: {
    defaultValue: 'banana',
  },
} satisfies Story;

export const WithoutLabel = {
  render: (args) => (
    <Select.Root {...args}>
      <Select.Trigger placeholder="ラベルなし" />
      <Select.Content>
        {args.options.map((option) => (
          <Select.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  ),
} satisfies Story;

export const ManyOptions = {
  args: {
    options: [
      ...sampleOptions,
      { value: 'kiwi', label: 'Kiwi' },
      { value: 'mango', label: 'Mango' },
      { value: 'pineapple', label: 'Pineapple' },
      { value: 'coconut', label: 'Coconut' },
      { value: 'avocado', label: 'Avocado' },
      { value: 'tomato', label: 'Tomato' },
      { value: 'eggplant', label: 'Eggplant' },
      { value: 'carrot', label: 'Carrot' },
      { value: 'corn', label: 'Corn' },
      { value: 'broccoli', label: 'Broccoli' },
    ],
  },
} satisfies Story;

export const WithOnValueChange = {
  args: {
    onValueChange: (value: string) => {
      console.log('Selected value:', value);
      alert(`選択されました: ${value}`);
    },
  },
} satisfies Story;
