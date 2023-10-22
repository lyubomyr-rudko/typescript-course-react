import { UseMemoComponent} from "./homework-components/ExampleUseMemo.tsx";
import { ThemeContextProvider} from "./homework-components/ExampleUseContext.tsx";

export function HomeWork16() {
  

  return (
    <ThemeContextProvider>
      <UseMemoComponent/>
    </ThemeContextProvider>
  );
}


// Selected Hooks

// useMemo - This hook cached calculation between rerender

// useContext - This hook provide acces all child component to the one store of the data.

// useCallback - Give a posibility to cache the function definition between rerenders.

// customHooks - This is high level function that containe another hooks