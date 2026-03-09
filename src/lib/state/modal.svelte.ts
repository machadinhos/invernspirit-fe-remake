import type { Component, ComponentProps } from 'svelte';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type GenericComponent = Component<any, Record<never, never>, ''>;
type ComponentFor<Params extends Record<string, unknown>> = Component<Params, Record<never, never>, ''>;

type BaseModalOptions = {
  closeOnNavigate?: boolean;
  onCloseAction?: () => void;
};

type StripModal<P> = Omit<P, 'modal'>;

type RequiredKeys<T> = {
  [K in keyof T]-?: Record<never, never> extends Pick<T, K> ? never : K;
}[keyof T];

type HasRequiredProps<C extends GenericComponent> =
  RequiredKeys<StripModal<ComponentProps<C>>> extends never ? false : true;

type HasAnyProps<C extends GenericComponent> = keyof StripModal<ComponentProps<C>> extends never ? false : true;

type OptionsFor<C extends GenericComponent> =
  HasAnyProps<C> extends false
    ? (BaseModalOptions & { extraParams?: never }) | undefined
    : HasRequiredProps<C> extends true
      ? BaseModalOptions & { extraParams: ComponentProps<C> }
      : (BaseModalOptions & { extraParams?: ComponentProps<C> }) | undefined;

class ModalInstance<Params extends Record<string, unknown> = Record<never, never>> {
  readonly element: ComponentFor<Params>;
  readonly closeOnNavigate: boolean;
  readonly extraParams: StripModal<Params>;
  readonly close: () => void;
  readonly id: symbol;

  constructor(
    element: ComponentFor<Params>,
    { onCloseAction, closeOnNavigate = true, extraParams }: NonNullable<OptionsFor<ComponentFor<Params>>>,
  ) {
    this.id = Symbol();
    this.element = element;
    this.extraParams = extraParams as StripModal<Params>;
    this.closeOnNavigate = closeOnNavigate;

    this.close = modal.generateCloseFunction(this.id, onCloseAction);
  }
}

class Modal {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  value: ModalInstance<any> | undefined = $state();

  generateCloseFunction(id: symbol, onCloseAction?: () => void): () => void {
    return (): void => {
      if (this.value?.id === id) {
        this.value = undefined;
        onCloseAction?.();
      }
    };
  }

  open<C extends GenericComponent>(
    element: C,
    ...[options]: HasAnyProps<NoInfer<C>> extends false
      ? [options?: BaseModalOptions & { extraParams?: never }]
      : HasRequiredProps<NoInfer<C>> extends true
        ? [options: BaseModalOptions & { extraParams: StripModal<ComponentProps<NoInfer<C>>> }]
        : [options?: BaseModalOptions & { extraParams?: StripModal<ComponentProps<NoInfer<C>>> }]
  ): ModalInstance<ComponentProps<NoInfer<C>>> {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const modalInstance = new ModalInstance(element as any, (options as any) ?? {});
    this.value = modalInstance;
    return modalInstance as unknown as ModalInstance<ComponentProps<C>>;
  }
}

export const modal = new Modal();
export type { ModalInstance };
