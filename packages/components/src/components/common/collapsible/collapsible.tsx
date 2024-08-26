import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as React from 'react';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import {
  root,
  header,
  trigger,
  controls as controlsClass,
  state as stateClass,
  content,
  contentData,
  triggerChevron
} from './collapsible.css';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { StateDot } from '@/components/common/state/state';

/**
 * Collapsible, based on {@link https://www.radix-ui.com/docs/primitives/components/collapsible | Radix UI Collapsible}
 */
const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ className, ...props }, ref) => <CollapsiblePrimitive.Root ref={ref} className={cn(root, className, 'ui-collapsible')} {...props} />);
Collapsible.displayName = 'CollapsibleRoot';

export type CollapsibleControlProps = { className: string };

type CollapsibleTriggerProps = {
  state?: React.ReactNode;
  control?: (props: CollapsibleControlProps) => React.ReactNode;
};

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & CollapsibleTriggerProps
>(({ state, control, className, children, ...props }, ref) => (
  <div className={cn(header)}>
    <CollapsiblePrimitive.CollapsibleTrigger ref={ref} className={cn(trigger, className, 'ui-collapsible-trigger')} {...props}>
      <Flex alignItems='center' gap={2}>
        {children}
        {state}
      </Flex>
    </CollapsiblePrimitive.CollapsibleTrigger>
    {control && control({ className: controlsClass })}
    <CollapsiblePrimitive.CollapsibleTrigger asChild className={triggerChevron}>
      <IvyIcon icon={IvyIcons.Chevron} />
    </CollapsiblePrimitive.CollapsibleTrigger>
  </div>
));
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleState = React.forwardRef<React.ElementRef<typeof StateDot>, React.ComponentPropsWithoutRef<typeof StateDot>>(
  ({ className, ...props }, ref) => <StateDot ref={ref} className={cn(stateClass, className)} {...props} />
);
CollapsibleState.displayName = 'CollapsibleState';

type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;

const CollapsibleContent = React.forwardRef<React.ElementRef<typeof CollapsiblePrimitive.Content>, CollapsibleContentProps>(
  ({ className, children, style, ...props }, ref) => (
    <CollapsiblePrimitive.Content ref={ref} className={cn(content, className, 'ui-collapsible-content')} role='region' {...props}>
      <div className={contentData} style={style}>
        {children}
      </div>
    </CollapsiblePrimitive.Content>
  )
);
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName;

export type BasicCollapsibleProps = CollapsibleTriggerProps &
  CollapsibleContentProps & {
    label: string;
  };

const BasicCollapsible = ({ label, state, control, ...props }: BasicCollapsibleProps) => (
  <Collapsible>
    <CollapsibleTrigger state={state} control={control}>
      {label}
    </CollapsibleTrigger>
    <CollapsibleContent {...props} />
  </Collapsible>
);
BasicCollapsible.displayName = 'BasicCollapsible';

export { Collapsible, CollapsibleTrigger, CollapsibleState, CollapsibleContent, BasicCollapsible };
