import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

interface ProviderComponent<TProps> {
  Component: React.ComponentType<React.PropsWithChildren<TProps>>;
  props?: Omit<TProps, 'children'>;
}

function createProviderComponent<TProps>(
  Component: React.ComponentType<React.PropsWithChildren<TProps>>,
  props?: Omit<TProps, 'children'>
): ProviderComponent<TProps> {
  return { Component, props };
}

function composeProviderComponents<T extends Array<ProviderComponent<any>>>(
  componentProviders: T
): React.ComponentType<React.PropsWithChildren> {
  const Provider: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
  }) =>
    componentProviders.reduceRight<JSX.Element>(
      (prev, { Component, props }) => <Component {...props}>{prev}</Component>,
      <>{children}</>
    );

  return Provider;
}

interface ComponentAProps extends React.PropsWithChildren {
  hello: string;
}

function ComponentA({ hello, children }: ComponentAProps) {
  return (
    <div>
      <p>Welcome {hello} to ComponentA!</p>
      {children}
    </div>
  );
}

interface ComponentBProps extends React.PropsWithChildren {
  hi: string;
}

function ComponentB({ hi, children }: ComponentBProps) {
  return (
    <div>
      <p>Welcome {hi} to ComponentB!</p>
      {children}
    </div>
  );
}

const providerComponents = [
  createProviderComponent(ComponentA, { hello: 'Fast' }),
  createProviderComponent(ComponentB, { hi: 'Nguyen' }),
];

const ProviderComponent = composeProviderComponents(providerComponents);

function App() {
  const [count, setCount] = useState(0);

  return (
    <ProviderComponent>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ProviderComponent>
  );
}

export default App;
