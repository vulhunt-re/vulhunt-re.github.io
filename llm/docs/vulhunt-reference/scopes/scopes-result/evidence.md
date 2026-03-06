+++
title = "Evidence"
weight = 4
+++
The `Evidence` object provides structured evidence supporting a vulnerability finding.
It maps code locations to annotations, allowing VulHunt rules to attach detailed context to findings.

### Fields

| Field       | Description                                                                                         | Type                                                                                                                   |
| :---------- | :-------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `functions` | Maps a function address to an array of annotation objects. The address selects the function to show | <code>\{[AddressValue]: <a href="/vulhunt-reference/scopes/scopes-result/annotations/overview">Annotation</a>\}</code> |

### Syntax

```lua
evidence = {
  functions = {
    [<AddressValue>] = <Array of Annotation>
  },
}
```

### Reference

#### functions

A table mapping a function address ([`AddressValue`](/docs/vulhunt-reference/types/address-value)) to an array of annotation objects ([`Annotation`](/docs/vulhunt-reference/scopes/scopes-result/annotations/overview)).
The address determines the function to decompile and show, while annotations like `annotate:at` and `annotate:prototype` point to locations that should be annotated in the decompiled code.

### Example

```lua
evidence = {
    functions = {
        [context.caller.address] = {
            annotate:prototype "int foo(char *arg1, struct bar* arg2);",
            annotate:at{
                location = context.caller.call_address,
                message = "The function `foo` calls `baz`..."
            }
        }
    }
}
```
