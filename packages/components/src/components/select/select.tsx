import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '../../utils/class-name';
import type { WithClassName } from '../../types/types';
import IvyIcon from '../icon/icon';
import { IvyIcons } from '@axonivy/ui-icons/src-gen';
import { content, item, itemIcon, label, scrollButton, seperator, trigger, viewport } from './select.css';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & WithClassName
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} className={cn(trigger, className)} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <IvyIcon icon={IvyIcons.Chevron} rotate={90} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & WithClassName
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} className={cn(scrollButton, className)} {...props}>
    <IvyIcon icon={IvyIcons.Chevron} rotate={270} />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & WithClassName
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} className={cn(scrollButton, className)} {...props}>
    <IvyIcon icon={IvyIcons.Chevron} rotate={90} />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & WithClassName
>(({ className, children, position = 'popper', sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref} className={cn(content, className)} position={position} sideOffset={sideOffset} {...props}>
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className={cn(viewport)}>{children}</SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & WithClassName
>(({ className, ...props }, ref) => <SelectPrimitive.Label ref={ref} className={cn(label, className)} {...props} />);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & WithClassName
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cn(item, className)} {...props}>
    <SelectPrimitive.ItemIndicator className={itemIcon}>
      <IvyIcon icon={IvyIcons.Check} />
    </SelectPrimitive.ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & WithClassName
>(({ className, ...props }, ref) => <SelectPrimitive.Separator ref={ref} className={cn(seperator, className)} {...props} />);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
};
