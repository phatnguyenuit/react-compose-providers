import React from 'react';

interface Provider<TProps> {
  Component: React.ComponentType<React.PropsWithChildren<TProps>>;
  props?: Omit<TProps, 'children'>;
}

export function createProvider<TProps>(
  Component: React.ComponentType<React.PropsWithChildren<TProps>>,
  props?: Omit<TProps, 'children'>
): Provider<TProps> {
  return { Component, props };
}

export function composeProviders<TProviders extends Array<Provider<any>>>(
  providers: TProviders
): React.ComponentType<React.PropsWithChildren> {
  const Provider: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
  }) =>
    {
      const initialJSX = <>{children}</>;

      return providers.reduceRight<JSX.Element>(
        (prevJSX, { Component: CurrentProvider, props = {} }) => <CurrentProvider {...props}>{prevJSX}</CurrentProvider>,
        initialJSX
      );
    };

  return Provider;
}