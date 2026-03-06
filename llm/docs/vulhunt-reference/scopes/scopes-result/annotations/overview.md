+++
title = "Overview"
weight = 1
+++
VulHunt allows you to create annotations in the decompiled code, and attach them to specific locations, such as an address, range, variable, or function prototype.
This greatly improves the explainability of the vulnerability findings, allowing for a faster and more accurate triage of the findings.

An annotation can be created by using the methods described in the table below.

| Method                | Description                     | Parameters                                                                                      |
| :-------------------- | :------------------------------ | :---------------------------------------------------------------------------------------------- |
| `annotate:at`         | Annotate at a given address     | [`AnnotateAt`](/docs/vulhunt-reference/scopes/scopes-result/annotations/annotate-at)                 |
| `annotate:prototype`  | Annotate the function prototype | [`AnnotatePrototype`](/docs/vulhunt-reference/scopes/scopes-result/annotations/annotate-prototype)   |
| `annotate:assignment` | Annotate an assignment          | [`AnnotateAssignment`](/docs/vulhunt-reference/scopes/scopes-result/annotations/annotate-assignment) |
| `annotate:variable`   | Annotate a variable             | [`AnnotateVariable`](/docs/vulhunt-reference/scopes/scopes-result/annotations/annotate-variable)     |
| `annotate:operand`    | Annotate an operand             | [`AnnotateOperand`](/docs/vulhunt-reference/scopes/scopes-result/annotations/annotate-operand)       |
| `annotate:range`      | Annotate a code range           | [`AnnotateRange`](/docs/vulhunt-reference/scopes/scopes-result/annotations/annotate-range)           |
| `annotate:global`     | Annotate a global               | [`AnnotateGlobal`](/docs/vulhunt-reference/scopes/scopes-result/annotations/annotate-global)         |

### Reference

#### annotate:at

Creates an annotation at a specific address or code location.

#### annotate:prototype

Annotates the prototype of a function.

#### annotate:assignment

Annotates an assignment to a variable with a declaration at a specific address in the code.

#### annotate:variable

Annotates a variable usage, specifying its position (input/output), index, and declaration.

#### annotate:operand

Annotates a specific operand at a given address with a message.

#### annotate:range

Annotates a range of code, such as a block or sequence of instructions, with a message.

#### annotate:global

Annotates a global variable with a declaration.
