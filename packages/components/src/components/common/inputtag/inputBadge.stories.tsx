import type { Meta, StoryObj } from '@storybook/react';
import { InputBadge, InputBadgeArea } from './inputBadge';
import { IvyIcons } from '@axonivy/ui-icons';

const badgeProps = [
  {
    regex: /#{\s+data\.[^}]+}/,
    icon: IvyIcons.File,
    badgeTextGen: (text: string) => text.substring(text.lastIndexOf('.') + 1, text.length - 1)
  },
  {
    regex: /#{\s+logic\.[^}]+}/,
    icon: IvyIcons.Process,
    badgeTextGen: (text: string) => text.replace('#{', '').replace('}', '').trim()
  },
  {
    regex: /<%=[^%>]+%>/,
    icon: IvyIcons.StartProgram,
    badgeTextGen: (text: string) => text
  }
];

const meta: Meta<typeof InputBadge> = {
  title: 'Common/InputBadge',
  component: InputBadge,
  tags: ['autodocs'],
  argTypes: {
    value: { type: 'string', description: 'field input containing badges' },
    badgeProps: { description: 'object containing badge regex, icon & fuction to format badge-text' }
  },
  args: {
    value: '<%= ivy.log.info() %> noBadge1 #{ data.object.object.demoData }\nnoBadge2 #{ logic.demoLogic }',
    badgeProps: badgeProps
  }
};

type Story = StoryObj<typeof InputBadge>;

export const Default: Story = {
  render: props => <InputBadge {...props} />
};

export const BadgeArea: Story = {
  render: props => <InputBadgeArea {...props} />
};

export default meta;
