# How to compose React Providers with TypeScript

Hi guys 😁!
Long time no new articles!

Today, I am going to show you how to compose React providers with TypeScript.

Ready?, let's go!

## Prerequisites

- Have ReactJS projects and use React Contexts
- Have TypeScript projects to understand how typings structured and work in the development environemnt

If you don't have these two items, it may become a bit hard for you to understand what covered by this article.

## Problem statement

React is still trendy nowadays in general, and using React Context APIs has become a common pattern to share global data between components as well.

In real-life React applications, we may have a lot of React Context Providers in the root component (**App** component for example). They become deeply JSX tree, hard to read, maintain, and test.

```tsx
<Provider1>
  <Provider2>
    <Provider3>
      <Provider4 value={someValue}>
        <App />
      </Provider4>
    </Provider3>
  </Provider2>
</Provider1>
```

Is there any way to simplify the above JSX tree, just `App` and all context providers in only one Provider? 🤔

```tsx
<AllInOneProvider>
  <App />
</AllInOneProvider>
```

## Solution

There is some ways to resolve the above problem:

- Create all-in-one hardcoded Provider which contains all providers we need
- Create one Provider which receives all providers as a property
- Create one utility to compose all providers into one provider
- ... more approaches I have not figured out :\) ...

In this article, I will share about the third, the way we compose all providers into one provider.

To create a composing providers utility we have the below checklist to make sure all covered:

- [x] should compose all providers into one provider
- [x] should take into account every single provider props
- [x] should be implemented with high code quality and strong TypeScript types

### 1. Normalise nested JSX tree

```tsx
<Provider1>
  <Provider2>
    <Provider3>
      <Provider4 value={someValue}>
        <App />
      </Provider4>
    </Provider3>
  </Provider2>
</Provider1>
```

becomes

```tsx
<AllInOneProvider>
  <App />
</AllInOneProvider>
```

We can construct one array containing all provider from outside like below:

```ts
const providers = [Provider1, Provider2, Provider3, Provider4];
```

If there's a provided children (`<App />`), firstly we think about the last Provider `Provider4`

So initially we have:

```tsx
<Provider4 value={someValue}>
  <App />
</Provider4>
```

Continue the loop, we go with `Provider3`, and so on until we reach out to the first Provider `Provider1`

In JavaScript, we can use `Array.reduceRight` to loop through the items from the last to the first item (right to left)

### 2. Dead simple implementation of composing utility

```js
function composeProviders(providers) {
  const ProviderComponent = ({ children }) => {
    const initialJSX = <>{children}</>;

    return providers.reduceRight((prevJSX, CurrentProvider) => {
      return <CurrentProvider>{prevJSX}</CurrentProvider>;
    }, initialJSX);
  };

  return ProviderComponent;
}
```

### 3. Enhance with Provider props

Uplift `providers` to include `Provider` props

```js
const providers = [
  {
    Component: Provider1,
  },
  {
    Component: Provider2,
  },
  {
    Component: Provider3,
  },
  {
    Component: Provider4,
    props: { value: "someValue" },
  },
];
```

`composeProviders` will become:

```js
function composeProviders(providers) {
  const ProviderComponent = ({ children }) => {
    const initialJSX = <>{children}</>;

    return providers.reduceRight(
      (prevJSX, { Component: CurrentProvider, props = {} }) => {
        return <CurrentProvider {...props}>{prevJSX}</CurrentProvider>;
      },
      initialJSX
    );
  };

  return ProviderComponent;
}
```

### 4. Enhance with TypeScript types

- Define a Provider type including Provider `Component`, and its props (if any)

```tsx
import React from "react";

interface Provider<TProps> {
  Component: React.ComponentType<React.PropsWithChildren<TProps>>;
  props?: Omit<TProps, "children">;
}
```

- Define a Provider type including Provider `Component`, and its props (if any)

```ts
import React from "react";

interface Provider<TProps> {
  Component: React.ComponentType<React.PropsWithChildren<TProps>>;
  props?: Omit<TProps, "children">;
}
```

- Define types for `composeProviders` utility

```tsx
function composeProviders<TProviders extends Array<Provider<any>>>(
  providers: TProviders
): React.ComponentType<React.PropsWithChildren> {
  const ProviderComponent: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
  }) => {
    const initialJSX = <>{children}</>;

    return providers.reduceRight<JSX.Element>(
      (prevJSX, { Component: CurrentProvider, props = {} }) => {
        return <CurrentProvider {...props}>{prevJSX}</CurrentProvider>;
      },
      initialJSX
    );
  };

  return ProviderComponent;
}
```

At this step, we have TypeScript types for our utility but looks like it does not work well, because we may have different Context value types.

IDE should suggest us to provide the correct `props` for the given `Provider` instead of type anything as you wish

In this situation, we will create one more function to prepare `Provider` component details for every single `Provider`

```ts
export function createProvider<TProps>(
  Component: React.ComponentType<React.PropsWithChildren<TProps>>,
  props?: Omit<TProps, "children">
): Provider<TProps> {
  return { Component, props };
}
```

`providers` now can be:

```ts
const providers = [
  createProvider(Provider1),
  createProvider(Provider2),
  createProvider(Provider3),
  createProvider(Provider4, { value: "someValue" }),
];
```

Wrapping all parts together, we now have `Provider` which contains multiple `Providers` following the article goal.

```tsx
const providers = [
  createProvider(Provider1),
  createProvider(Provider2),
  createProvider(Provider3),
  createProvider(Provider4, { value: "someValue" }),
];

const AllInOneProvider = composeProviders();

// render App
return (
  <AllInOneProvider>
    <App />
  </AllInOneProvider>
);
```

Now, in the root component (App component) you can create only one Provider including all Providers.

This utility is flexible as well, so we can setup our component unit tests in case we just need some providers (not all)

```tsx
import React from 'react';
import { render } from '@testing-library/react';

const TestProvider = composeProviders([...])

const setupTest = (testProps: TestComponentProps) => {
    return render(<TestComponent />, { wrapper: TestProvider });
}
```

## Conclusion

To sum up, we have 4 steps to compose React components with TypeScript:

1. Normalise nested JSX tree
2. Dead simple implementation of composing utility
3. Enhance with Provider props
4. Enhance with TypeScript types

With these 4 steps, we can extract common logic and share it everywhere to compose React providers across React projects.

I hope you guys can find it helpful and resolve your current concern on how to compose React providers with TypeScript.

See you next time!

## References

- [React Context - React](https://react.dev/reference/react/createContext)
- [Escaping Providers Hell: Simplifying Your Typescript React Code with Provider Trees](https://blog.stackademic.com/escaping-providers-hell-simplifying-your-typescript-react-code-with-provider-trees-1422fd8da170)
- My example code repository: [phatnguyenuit/react-compose-providers: Compose React Providers without stresses](https://github.com/phatnguyenuit/react-compose-providers/)
