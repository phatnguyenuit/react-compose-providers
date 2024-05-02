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

export function composeProviders<T extends Array<Provider<any>>>(
  providers: T
): React.ComponentType<React.PropsWithChildren> {
  const Provider: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
  }) =>
    providers.reduceRight<JSX.Element>(
      (prev, { Component, props }) => <Component {...props}>{prev}</Component>,
      <>{children}</>
    );

  return Provider;
}