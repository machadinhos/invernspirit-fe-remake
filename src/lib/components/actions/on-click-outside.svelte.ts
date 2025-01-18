import type { Action } from 'svelte/action';
import { on } from 'svelte/events';

interface Params {
  callback: () => void;
  enabled?: boolean | ((target: HTMLElement) => boolean);
  otherIncludedElements?: (HTMLElement | undefined)[];
}

export const onClickOutside: Action<HTMLElement, Params> = (
  node: HTMLElement,
  { callback, enabled = true, otherIncludedElements = [] }: Params,
) => {
  $effect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!enabled) return;
      if (typeof enabled === 'function' && !enabled(event.target as HTMLElement)) return;

      if (![...otherIncludedElements, node].some((el) => el?.contains(event.target as Node))) {
        callback();
      }
    };

    return on(document, 'click', handleClick);
  });
};
