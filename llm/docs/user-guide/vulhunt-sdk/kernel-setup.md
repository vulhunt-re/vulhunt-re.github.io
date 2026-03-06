+++
title = "Kernel Setup"
weight = 2
+++
Jupyter is an open-source interactive computing platform that lets you write and run code, visualize results, and document your work all in one place.

In Jupyter terminology, a kernel is the computational engine that executes the code you write in a notebook or console. We provide a VulHunt kernel to make the process of writing rules easier and more interactive. This section explains how to install the kernel, and set up a client that interacts with it.

### Requirements

We provide compiled versions of our software for Linux and macOS. We also provide ready-to-use Docker images for Windows users.

### Installation

Unpack the package you received and run:

```bash
./vulhunt-jupyter --install [--overwrite-config]
```

> The `--overwrite-config` option replaces an existing configuration file with the default one, but you won't need that if this is the first time you're installing the kernel.

This will result in a `~/.brly-vulhunt` directory containing:

- Kernel executable: `vulhunt-jupyter`
- Configuration file: `config.json`
- Log file: `kernel.log`
- _static-data_ folder: `static-data`

### Configuration

The kernel configuration is managed through `~/.brly-vulhunt/config.json`. The following settings are available:

- `log_level`: Set the logging verbosity level. Available options: `error`, `warn`, `info`, `trace`
- `log_max_file_size`: Maximum size (in bytes) of the log file before rotation occurs
- `vdb_connection`: Connection URL for the Vulnerability Database (VDB) server
- `theme`: Select the syntax highlighting theme for decompiled output. Available themes:
  - `base16-ocean.dark`, `base16-eighties.dark`, `base16-mocha.dark`, `base16-ocean.light`
  - `InspiredGitHub`
  - `Solarized (dark)`, `Solarized (light)`
- `user_data`: List of paths to platform data directories. Allows using type libraries, FLIRT signatures, and function specifications from locations outside the default _static-data_ folder
- `modules`: Path to a directory containing reusable Lua modules (`.vhm` files) that can be imported within rules using `require "module_name"`. Module names must be specified without the `.vhm` extension

The kernel should work with the default configuration without any problems. You can change the configuration at any time in the future.
