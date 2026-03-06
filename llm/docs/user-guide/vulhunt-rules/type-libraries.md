+++
title = "Type Libraries"
weight = 7
+++
Type libraries are used by VulHunt to improve the quality of decompiled code, enhancing both explainability and rule functionality (for example, when working with syntax queries).

To understand how type libraries are used, consider a simplified version of a rule to detect a vulnerability in the sudo program present in versions 1.9.14 to 1.9.17p1 (exclusive). This vulnerability allows an unprivileged user to switch the root directory to an attacker-controlled writable location. The problem is in the call to `pivot_root` from within the `set_cmnd_path` function. Finding this call is straightforward:

```lua
author = "Binarly"
name = "CVE-2025-32463"
platform = "posix-binary"
architecture = "*:*:*"
signatures = {project = "sudo", from = "1.9.14", to = "1.9.17"}
conditions = {name_with_prefix = "sudo"}

scopes = scope:functions{
  target = {matching = "set_cmnd_path", kind = "symbol"},
  with = check
}

function check(project, context)
    local pivot_addr = context:calls "pivot_root"

    if #pivot_addr == 0 then return end

    return result:critical{
        name = "CVE-2025-32463",
        description = "Privilege escalation vulnerability in sudo due to improper handling of chroot directory",
        evidence = {
            functions = {
                [context.address] = {
                    annotate:prototype "int set_cmnd_path(struct sudoers_context *ctx, const char *runchroot)",
                    annotate:at{
                        location = pivot_addr[1],
                        message = "This call to `pivot_root` enables an unprivileged user to switch the root directory to a controlled,\nwritable location. After this call, NSS lookups occur, allowing an attacker to load a malicious\nshared object from the chrooted environment, resulting in arbitrary code execution as root."
                    }
                }
            }
        }
    }
end
```

## Output without types

The above rule annotates the first call to `pivot_root`. For a vulnerable binary, its output is as following:

```c
CVE-2025-32463

  × Privilege escalation vulnerability in sudo due to improper handling of chroot directory
    ╭─[38:28]
 28 │   }
 29 │   free(*(param1 + 0xb0));
 30 │   *(param1 + 0xb0) = 0;
 31 │   free(*(param1 + 0x90));
 32 │   *(param1 + 0x90) = 0;
 33 │   canon_path_free(*(param1 + 0xa8));
 34 │   *(param1 + 0xa8) = 0;
 35 │   if ((*(var6 + 0xb88) != 0) && (var4 = user_is_exempt(param1), (var4 & 1) == 0)) {
 36 │     var8 = *(var6 + 0xb88);
 37 │   }
 38 │   if ((param2 == NULL) || (var2 = pivot_root(param2, &stack_68), (var2 & 1) != 0)) {
    ·                            ──────────────────┬─────────────────
    ·                            This call to `pivot_root` enables an unprivileged user to switch the root directory to a controlled,
    ·                            writable location. After this call, NSS lookups occur, allowing an attacker to load a malicious
    ·                            shared object from the chrooted environment, resulting in arbitrary code execution as root.
 39 │     var3 = resolve_cmnd(param1, var10, &stack_60, var8);
 40 │     var9 = stack_60;
 41 │     if ((var3 == 0) && (var5 = strrchr(stack_60, 0x2f), var5 != NULL)) {
 42 │       *var5 = '\0';
 43 │       var6 = canon_path(stack_60);
 44 │       *(param1 + 0xa8) = var6;
 45 │       if ((var6 == 0) && (var7 = __errno_location(), *var7 == 0xc)) {
 46 │         if (param2 != NULL) goto label_r0x00034118;
 47 │         goto label_r0x00034120;
 48 │       }
    ╰────

```

Although we've annotated the function prototype as `int set_cmnd_path(struct sudoers_context *ctx, const char *runchroot)`, without a type library this has little effect as VulHunt doesn't know anything about the types used by this function such as `struct sudoers_context`. As a result, we see things like `param1 + <offset>`, which is not ideal. To fix this and provide a better output, we use type libraries.

## Creating type libraries

Creating a type library involves three main steps:

1. Creating one or more C header files containing the types used by the functions of interest alongside with their prototypes.
2. Building these header files into binary format, which effectively creates the type library.
3. Loading the type library from the rule using the `types` field.

Let's say we want to create a type library to use with this CVE-2025-32463 rule. We'd need a C header file with the definition of the types used by the function alongside with its prototype. To find the right type definition, we recommend copying it from the source code from the latest vulnerable version of the target application, which in this case is sudo 1.9.17 and can be found [here](https://github.com/sudo-project/sudo/blob/a377770c6d26e0133fc6e6f893c8386fd7dd54d6/plugins/sudoers/sudoers.h#L186).

```c
// from plugins/sudoers/sudoers.h
struct sudoers_context {
    struct sudoers_parser_config parser_conf;
    struct sudoers_plugin_settings settings;
    struct sudoers_user_context user;
    struct sudoers_runas_context runas;
    struct timespec start_time;
    char *source;
    char *iolog_file;
    char *iolog_dir;
    char *iolog_path;
    int sudoedit_nfiles;
    unsigned int mode;
    char uuid_str[37];
};

// target function prototype
int set_cmnd_path(struct sudoers_context *ctx, const char *runchroot);
```

As you might suspect, this type is incomplete. We miss the definition for all structs declared within `struct sudoers_context`.

### Resolving dependencies

Luckily for us, all other types are defined in [sudoers.h](https://github.com/sudo-project/sudo/blob/v1.9.17/plugins/sudoers/sudoers.h) and we can just copy their definitions from there. Also, we provide basic types from the C Library such as `struct timespec`. To use them, you just need to `#include` our `libc.h`.

We also added a `#ifndef` directive to make sure this type library is only defined once. The final version of the C header file for this type library is as follows:

```c
#ifndef BRLY_TLIB_SUDO_V1_9_17_SUDO_H_
#define BRLY_TLIB_SUDO_V1_9_17_SUDO_H_

#include "../libc.h"

#define GETGROUPS_T gid_t

struct sudoers_parser_config {
  const char *sudoers_path;
  int strict;
  int verbose;
  bool recovery;
  bool ignore_perms;
  mode_t sudoers_mode;
  uid_t sudoers_uid;
  gid_t sudoers_gid;
};

struct sudoers_plugin_settings {
  const char *plugin_dir;
  const char *ldap_conf;
  const char *ldap_secret;
  unsigned int flags;
};

struct gid_list {
  int ngids;
  GETGROUPS_T *gids;
};

struct sudoers_user_context {
  struct passwd *pw;
  struct stat *cmnd_stat;
  char *cwd;
  char *name;
  char *path;
  char *tty;
  char *ttypath;
  char *host;
  char *shost;
  char *prompt;
  char *cmnd;
  char *cmnd_args;
  char *cmnd_base;
  char *cmnd_dir;
  char *cmnd_list;
  char *ccname;
  struct gid_list *gid_list;
  char *const *envp;
  char *const *env_add;
  int closefrom;
  int lines;
  int cols;
  int timeout;
  dev_t ttydev;
  mode_t umask;
  uid_t euid;
  uid_t uid;
  uid_t egid;
  uid_t gid;
  pid_t pid;
  pid_t ppid;
  pid_t sid;
  pid_t tcpgid;
};

struct sudoers_runas_context {
  int execfd;
  int argc;
  char **argv;
  char **argv_saved;
  struct passwd *pw;
  struct group *gr;
  struct passwd *list_pw;
  char *chroot;
  char *class;
  char *cmnd;
  char *cmnd_saved;
  char *cwd;
  char *group;
  char *host;
  char *shost;
  char *user;
  char *role;
  char *type;
  char *apparmor_profile;
  char *privs;
  char *limitprivs;
};

struct sudoers_context {
  struct sudoers_parser_config parser_conf;
  struct sudoers_plugin_settings settings;
  struct sudoers_user_context user;
  struct sudoers_runas_context runas;
  struct timespec start_time;
  char *source;
  char *iolog_file;
  char *iolog_dir;
  char *iolog_path;
  int sudoedit_nfiles;
  unsigned int mode;
  char uuid_str[37];
};

#endif
```

### Building a type library

VulHunt is shipped with a type library utility called `bias-tutil`, which is bundled with the VulHunt installation. Note that `bias-tutil` depends on Clang/LLVM, and requires it be installed and available at runtime.

To build a type library, use the `build` subcommand:

```bash
bias-tutil build sudo.h
```

The command above generates a `sudo.bin`, which is our type library. You can check if the type is correctly defined in the type library with the `query` subcommand. For example, the command

```bash
bias-tutil query --exact sudoers_context sudo.bin
```

produces a YML-based output containing information about the `sudoers_context` type:

```yml
sudoers_context (32-bit): struct<sudoers_context>
- size: 332
- fields:
  - 000 parser_conf: sudoers_parser_config
    - size: 28
    - attrs: TYPE32
  - 028 settings: sudoers_plugin_settings
    - size: 16
    - attrs: TYPE32
  - 044 user: sudoers_user_context
    - size: 132
    - attrs: TYPE32
  - 176 runas: sudoers_runas_context
    - size: 84
    - attrs: TYPE32
  - 260 start_time: timespec
    - size: 8
    - attrs: TYPE32
  - 268 source: ptr<char>
    - size: 4
  - 272 iolog_file: ptr<char>
    - size: 4
  - 276 iolog_dir: ptr<char>
    - size: 4
  - 280 iolog_path: ptr<char>
    - size: 4
  - 284 sudoedit_nfiles: int32
    - size: 4
  - 288 mode: uint32
    - size: 4
  - 292 uuid_str: array<char, 37>
    - size: 37

sudoers_context (64-bit): struct<sudoers_context>
- size: 528
- fields:
  - 000 parser_conf: sudoers_parser_config
    - size: 32
    - attrs: TYPE64
  - 032 settings: sudoers_plugin_settings
    - size: 32
    - attrs: TYPE64
  - 064 user: sudoers_user_context
    - size: 208
    - attrs: TYPE64
  - 272 runas: sudoers_runas_context
    - size: 160
    - attrs: TYPE64
  - 432 start_time: timespec
    - size: 16
    - attrs: TYPE64
  - 448 source: ptr<char>
    - size: 8
  - 456 iolog_file: ptr<char>
    - size: 8
  - 464 iolog_dir: ptr<char>
    - size: 8
  - 472 iolog_path: ptr<char>
    - size: 8
  - 480 sudoedit_nfiles: int32
    - size: 4
  - 484 mode: uint32
    - size: 4
  - 488 uuid_str: array<char, 37>
    - size: 37
```

For more information about the `query` subcommand, see `bias-tutil query --help`.

## Applying the type library

It's time to apply the type library in our rule. We just need to add the `types` field and set its value to the C header file we created earlier. VulHunt will automatically load the binary type library as long as it is in the correct directory. The final rule is as follows:

```lua
author = "Binarly"
name = "CVE-2025-32463"
platform = "posix-binary"
architecture = "*:*:*"
types = "sudo/v1.9.17/sudo.h"
signatures = {project = "sudo", from = "1.9.14", to = "1.9.17"}
conditions = {name_with_prefix = "sudo"}

scopes = scope:functions{
  target = {matching = "set_cmnd_path", kind = "symbol"},
  with = check
}

function check(project, context)
    local pivot_addr = context:calls "pivot_root"

    if #pivot_addr == 0 then return end

    return result:critical{
        name = "CVE-2025-32463",
        description = "Privilege escalation vulnerability in sudo due to improper handling of chroot directory",
        evidence = {
            functions = {
                [context.address] = {
                    annotate:prototype "int set_cmnd_path(struct sudoers_context *ctx, const char *runchroot)",
                    annotate:at{
                        location = pivot_addr[1],
                        message = "This call to `pivot_root` enables an unprivileged user to switch the root directory to a controlled,\nwritable location. After this call, NSS lookups occur, allowing an attacker to load a malicious\nshared object from the chrooted environment, resulting in arbitrary code execution as root."
                    }
                }
            }
        }
    }
end
```

> In our example rule, `types` is set to `sudo/v1.9.17/sudo.h`, meaning there must be a `$BIAS_DATA/platforms/posix/types/sudo/v1.9.17` directory containing both `sudo.h` and `sudo.bin` ready to be used by our rule.

## Output with types

After loading a type library, the output looks much better:

```c
CVE-2025-32463

  × Privilege escalation vulnerability in sudo due to improper handling of chroot directory
    ╭─[37:31]
 27 │   }
 28 │   free((ctx->user).cmnd_list);
 29 │   (ctx->user).cmnd_list = NULL;
 30 │   free((ctx->user).cmnd);
 31 │   (ctx->user).cmnd = NULL;
 32 │   canon_path_free((ctx->user).cmnd_dir);
 33 │   (ctx->user).cmnd_dir = NULL;
 34 │   if ((*(var2 + 0xb88) != 0) && (var5 = user_is_exempt(ctx), (var5 & 1) == 0)) {
 35 │     var8 = *(var2 + 0xb88);
 36 │   }
 37 │   if ((runchroot == NULL) || (var3 = pivot_root(runchroot, &stack_68), (var3 & 1) != 0)) {
    ·                               ───────────────────┬───────────────────
    ·                               This call to `pivot_root` enables an unprivileged user to switch the root directory to a controlled,
    ·                               writable location. After this call, NSS lookups occur, allowing an attacker to load a malicious
    ·                               shared object from the chrooted environment, resulting in arbitrary code execution as root.
 38 │     var4 = resolve_cmnd(ctx, var9, &stack_60, var8);
 39 │     var8 = stack_60;
 40 │     if ((var4 == 0) && (var9 = strrchr(stack_60, 0x2f), var9 != NULL)) {
 41 │       *var9 = '\0';
 42 │       var8 = canon_path(stack_60);
 43 │       (ctx->user).cmnd_dir = var8;
 44 │       if ((var8 == NULL) && (var6 = __errno_location(), *var6 == 0xc)) {
 45 │         if (runchroot != NULL) goto label_r0x00034118;
 46 │         goto label_r0x00034120;
 47 │       }
    ╰────
```

What was previously `param1` became `ctx`, which is a variable of `sudoers_context` type. Its fields are also correctly typed.

As a final note, keep in mind type libraries do not only visually improve the output. They also help when you need to perform advanced source code pattern matching over the decompiled code.
