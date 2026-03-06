+++
title = "CallSiteContext"
weight = 6
+++
The `CallSiteContext` object provides information about a specific function call site in the binary.
It is used to access details such as the caller function, call address, and address properties.

### Fields

| Field           | Description                                  | Type                                                     |
| :-------------- | :------------------------------------------- | :------------------------------------------------------- |
| `address`       | Address of the caller function               | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `call_address`  | Address of the call site within the function | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `name`          | Name of the caller function                  | `string`                                                 |
| `address_bits`  | Number of bits in the address                | `number`                                                 |
| `address_bytes` | Number of bytes in the address               | `number`                                                 |

### Reference

#### address

The address of the caller function.

#### call_address

The address of the call site within the caller function.

#### name

The name of the caller function.

#### address_bits

The number of bits used for addresses in the binary.

#### address_bytes

The number of bytes used for addresses in the binary.

### Example

```lua
scopes = scope:calls{
  to = "strcpy",
  with = function(project, context)
    local caller = context.caller  -- caller is a CallSiteContext

    print("Call to strcpy found in function:", caller.name)
    print("Caller function address:", caller.address)
    print("Call site address:", caller.call_address)
    print("Address bits:", caller.address_bits)
    print("Address bytes:", caller.address_bytes)
  end
}
```
