+++
title = "Installation"
weight = 2
+++
## VulHunt Enterprise Edition

VulHunt Enterprise Edition (EE) is a commercial product with additional features and support beyond the Community Edition (CE). For further details, contact your Binarly customer success representative.

## VulHunt Community Edition

To install VulHunt Community Edition (CE) and start developing your own rules, or extensions, follow the instructions below.

### Installation from precompiled binaries

Installation via precompiled binaries is the recommended method for most users. By default, the installation script will install the latest stable release of VulHunt CE. To install a specific version, set the `VULHUNT_VERSION` environment variable to the desired version tag (e.g., `v1.0.0`). To set a custom installation directory, set the `VULHUNT_INSTALL_DIR` environment variable to the desired path (e.g., `/opt/vulhunt-ce`).

### Linux and macOS

```bash
curl --proto '=https' --tlsv1.2 -sSfL https://sh.vulhunt.re | sh
```

### Windows

```bash
irm https://ps.vulhunt.re | iex
```

### Installation/usage via Docker

VulHunt CE is also available as a Docker image, which can be used to run VulHunt in a containerized environment.

1. Install [Docker](https://www.docker.com/get-started).

2. Clone VulHunt Community Edition repository including its submodules:

```bash
git clone --recursive https://github.com/vulhunt-re/vulhunt
```

3. Build the Docker image:

```bash
cd vulhunt
docker build -t vulhunt-ce -f Dockerfile .
```

4. Run the Docker container:

```bash
# Run vulhunt-ce (default entrypoint)
docker run --rm vulhunt-ce <...>

# Run bias-lutil
docker run --rm --entrypoint bias-lutil vulhunt-ce <...>

# Run bias-tutil
docker run --rm --entrypoint bias-tutil vulhunt-ce <...>

# Full example with a scan
docker run --rm \
    -v /path/to/rules:/rules \
    -v /path/to/data:/data \
    -v /path/to/binaries:/binaries \
    -v /tmp:/output \
    vulhunt-ce scan \
    --rules /rules \
    --data /data \
    --pretty \
    --output /output/vh.json \
    /binaries/libssl
```

### Installation from source

1. Install [Git](https://git-scm.com).

2. Clone VulHunt Community Edition repository including its submodules:

```bash
git clone --recursive https://github.com/vulhunt-re/vulhunt
```

3. Install the [Rust toolchain](https://rustup.rs) and a recent version of CMake and Clang (20 or later).

4. Install [cargo-make](https://sagiegurari.github.io/cargo-make/):

```bash
cargo install cargo-make
```

5. Compile and install VulHunt:

```bash
cd vulhunt
cargo make --profile=release install
```

#### Auxiliary data

When installing from source, the [auxiliary data](/docs/user-guide/vulhunt-cli/auxiliary-data) must be obtained manually:

```bash
git clone https://github.com/vulhunt-re/data bias-data
```

Then set `BIAS_DATA` to point to the cloned directory, or pass it directly via the `--data` argument.

Type libraries and processor specifications must be built before first use. On Linux/macOS:

```bash
bias-tutil build "$BIAS_DATA/platforms/posix/types/libc.h"
bias-tutil build "$BIAS_DATA/platforms/uefi/types/edk.h"
bias-lutil --data "$BIAS_DATA/processors"
```

On Windows:

```powershell
bias-tutil.exe build (Join-Path $env:BIAS_DATA "platforms\posix\types\libc.h")
bias-tutil.exe build (Join-Path $env:BIAS_DATA "platforms\uefi\types\edk.h")
bias-lutil.exe --data (Join-Path $env:BIAS_DATA "processors")
```

Note that the [installer scripts](#installation-from-precompiled-binaries) perform these steps automatically.

Auxiliary data can also be sourced from multiple directories using an [overlay](/docs/user-guide/vulhunt-cli/auxiliary-data) specification, e.g., `--data <PATH1>:<PATH2>` (on Windows, use `;` as the separator).

#### Updating

To update an existing local copy of VulHunt CE to the latest version:

1. Under the `vulhunt` directory, pull the latest changes:

```bash
git pull --recurse-submodules
```

2. Update the crates:

```bash
cargo update
```

3. Compile and install the new version:

```bash
cargo make --profile=release install
```

## Integrations

### Binary Ninja

VulHunt integrates natively with Binary Ninja, where a Binary Ninja database can act as a source of truth for function starts, symbols, and other data. To enable this integration, VulHunt needs to be built with the `bndb` feature enabled. A valid headless license for Binary Ninja is required to use this integration.

```bash
cargo make --profile=release install --features bndb
```

Then run with:

```bash
vulhunt-ce scan \
    --loader bndb \
    --rules /path/to/rules \
    --data /path/to/data \
    --pretty \
    --output /path/to/output.json \
    /path/to/database.bndb
```
