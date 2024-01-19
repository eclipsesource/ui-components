import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/utils/class-name';
import type { WithClassName } from '@/types/types';
import { seperator } from './separator.css';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & WithClassName
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root ref={ref} decorative={decorative} orientation={orientation} className={cn(seperator, className)} {...props} />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
