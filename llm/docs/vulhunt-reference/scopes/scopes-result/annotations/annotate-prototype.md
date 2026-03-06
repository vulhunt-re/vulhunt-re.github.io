+++
title = "AnnotatePrototype"
weight = 6
+++
The `AnnotatePrototype` object is used to create an annotation for a function prototype.

### Fields

| Field       | Description                                               | Type                                                     |
| :---------- | :-------------------------------------------------------- | :------------------------------------------------------- |
| `index`     | Index defining the order in which functions are displayed | `number`                                                 |
| `location`  | Address to annotate                                       | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `prototype` | Function prototype                                        | `string`                                                 |

### Reference

#### prototype

The function prototype signature to set on the target function. This is required.

#### location

Optional address identifying the function to annotate. If omitted, the current function is used.

#### index

Optional sort key to control display order when multiple prototypes are annotated.

### Example

```lua
evidence = {
  functions = {
    -- Shorthand: annotate current function with a prototype
    [context.address] = {
      annotate:prototype "int read_argument(char *argument)",
    },

    -- Explicit table form with optional location and index
    [some_other_function.address] = {
      annotate:prototype{
        prototype = "uint64_t hash(const uint8_t *buf, size_t len)",
        location = some_other_function.address,
        index = 1,
      }
    }
  }
}
```
