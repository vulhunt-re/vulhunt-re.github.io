+++
title = "OperandInfo"
weight = 16
+++
The `OperandInfo` object provides information about a function argument or return value at a call site, including annotations, origins, and values before and after the call.

### Fields

| Field                  | Description                         | Type                                                       |
| :--------------------- | :---------------------------------- | :--------------------------------------------------------- |
| `name`                 | Operand name                        | `string`                                                   |
| `index`                | Operand index                       | `number`                                                   |
| `pre_call_annotation`  | Annotation before the function call | `string`                                                   |
| `post_call_annotation` | Annotation after the function call  | `string`                                                   |
| `annotation`           | Same as pre_call_annotation         | `string`                                                   |
| `pre_call_origin`      | Operand origin before the call      | [`OperandOrigin`](/docs/vulhunt-reference/types/operand-origin) |
| `post_call_origin`     | Operand origin after the call       | [`OperandOrigin`](/docs/vulhunt-reference/types/operand-origin) |
| `origin`               | Same as pre_call_origin             | [`OperandOrigin`](/docs/vulhunt-reference/types/operand-origin) |
| `pre_call_string`      | String value before the call        | `string`                                                   |
| `post_call_string`     | String value after the call         | `string`                                                   |
| `string`               | Same as pre_call_string             | `string`                                                   |
| `pre_call_constant`    | Operand constant before the call    | [`BitVec`](/docs/vulhunt-reference/types/bitvec)                |
| `post_call_constant`   | Operand constant after the call     | [`BitVec`](/docs/vulhunt-reference/types/bitvec)                |
| `constant`             | Same as pre_call_constant           | [`BitVec`](/docs/vulhunt-reference/types/bitvec)                |

### Methods

| Method               | Description                                                         | Parameters | Return Type |
| :------------------- | :------------------------------------------------------------------ | :--------- | :---------- |
| `is_const_pre_call`  | Returns true if the operand yields a constant value before the call | —          | `boolean`   |
| `is_const_post_call` | Returns true if the operand yields a constant value after the call  | —          | `boolean`   |
| `is_const`           | Same as is_const_pre_call                                           | —          | `boolean`   |
| `is_unk_pre_call`    | Returns true if the operand value is unknown before the call        | —          | `boolean`   |
| `is_unk_post_call`   | Returns true if the operand value is unknown after the call         | —          | `boolean`   |
| `is_unk`             | Same as is_unk_pre_call                                             | —          | `boolean`   |
| `pre_call_bytes`     | Returns bytes at the address pointed by the operand before the call | `number`   | `number[]`  |
| `post_call_bytes`    | Returns bytes at the address pointed by the operand after the call  | `number`   | `number[]`  |
| `bytes`              | Same as pre_call_bytes                                              | `number`   | `number[]`  |

### Reference

#### name

The name of the operand.

#### index

The index of the operand in the parameter list.

#### pre_call_annotation / post_call_annotation / annotation

The annotation assigned to the operand before or after the call.  
`annotation` is equivalent to `pre_call_annotation`.

#### pre_call_origin / post_call_origin / origin

The origin of the operand before or after the call.  
`origin` is equivalent to `pre_call_origin`.

#### pre_call_string / post_call_string / string

The string value of the operand before or after the call.
`string` is equivalent to `pre_call_string`.

#### is_const_pre_call / is_const_post_call / is_const

Returns true if the operand yields a constant value before or after the call.
`is_const` is equivalent to `is_const_pre_call`.

#### is_unk_pre_call / is_unk_post_call / is_unk

Returns true if the operand value is unknown before or after the call.
`is_unk` is equivalent to `is_unk_pre_call`.

#### pre_call_constant / post_call_constant / constant

The constant value of the operand before or after the call, returned as a [`BitVec`](/docs/vulhunt-reference/types/bitvec). Returns `nil` if the operand does not resolve to a constant.
`constant` is equivalent to `pre_call_constant`.

#### pre_call_bytes / post_call_bytes / bytes

Returns bytes at the address pointed by the operand before or after the call, returned as a table of numbers.
`bytes` is equivalent to `pre_call_bytes`.

These methods accept an optional `limit` parameter (defaults to 256) to limit the number of bytes returned.

### Example

```lua
scopes = scope:calls{
  to = "strcpy",
  using = {parameters = {_, var:named "input"}},
  with = function(project, context)
    local src = context.inputs[1]  -- OperandInfo for the first argument
    if src:is_const() then
      print("Source is a constant string:", src.string)
    elseif src.annotation == "input" then
      print("Source is tainted with 'input'")
    end
  end
}
```
