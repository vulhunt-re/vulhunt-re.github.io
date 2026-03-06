+++
title = "Auxiliary Data"
weight = 3
+++
VulHunt requires certain auxiliary data to execute correctly. The data is
available at [github.com/vulhunt-re/data](https://github.com/vulhunt-re/data)
and is downloaded automatically by the [installation
script](/docs/user-guide/vulhunt-cli/installation). It is supplied to VulHunt either
via an environment variable `BIAS_DATA`, or directly as a command line argument
`--data <PATH>`. The data has a specific layout, as shown below:

```
data
├── platforms
│   ├── posix
│   │   ├── fspecs
│   │   ├── sigs
│   │   └── types
│   └── uefi
│       ├── auxiliary
│       ├── fspecs
│       ├── sigs
│       └── types
└── processors
    ├── AARCH64
    ├── ARM
    └── x86
```

The `platforms` directory contains function signatures and type libraries for
each supported platform, while the `processors` directory contains SLEIGH
language definitions and various caches for every supported architecture. The
processor specifications can be regenerated using the bundled `bias-lutil`
tool.

Auxiliary data can be sourced from multiple directories as if those directories
were mounted in an overlay file-system, for example, `--data <PATH1>:<PATH2>`
(on Windows, use `;` as the separator: `--data <PATH1>;<PATH2>`).
The first directory specified should contain the standard data bundled with
your VulHunt distribution, while the latter directories are optional, and can
override platform data, such as types and signatures. The last directory's
content takes highest priority when resolving specific signatures or type
libraries, allowing users to test and distribute auxiliary data packages for
their rules without end-users needing to modify their standard data directory.
