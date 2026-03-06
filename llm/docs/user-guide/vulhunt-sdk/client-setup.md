+++
title = "Client Setup"
weight = 3
+++
You can use any Jupyter client to interact with the kernel. This includes, but is not limited to, JupyterLab, Jupyter Console, Jupyter Notebook, and Visual Studio Code. We show how two of them work: JupyterLab and VulHunt Shell, our command-line based client.

### JupyterLab

JupyterLab is easily installed with Python pip:

```bash
pip install jupyter
```

For more detailed steps, refer to the official Project Jupyter documentation.

Once installed, start JupyterLab with:

```bash
jupyter lab
```

When creating a new notebook, select `VulHunt` kernel and you'll be ready to start writing rules, a topic we'll cover soon.

### VulHunt Shell

Users who prefer command-line interfaces can use our VulHunt Shell. It supports the same commands as any other Jupyter front-end, but you can use it without leaving the terminal. You should have received it as part of your package. Once started, you'll be greeted by a shell waiting for commands. We'll cover the supported commands later, but you can start exploring with the most helpful one:

```bash
vulhunt> %help
%functions              List functions in the loaded component
%vdb_licenses           Search for licenses associated with a specific product
%output                 Redirect output to a file
%binfo                  Display information about a code block
%vdb_search             Search for known CVEs related to a specific product
%load_types             Load a type library to provide type information
%vdb_template           Generate a finding template
%unload_ba2             Unload the currently loaded BA2 archive and associated data
%decompile              Decompile a function to C-like pseudocode by name or address
%info                   Display information about the loaded component
%unload_types           Unload the currently loaded type library
%unload_project         Unload the currently loaded project
%components             List all components in the loaded BA2 archive
%list_signatures        List available signature files for the loaded component
%unload_signatures      Unload the currently loaded signature file
%lint                   Check rule syntax and style
%vdb_lookup             Retrieve and display information about a specified CVE ID
%load                   Load a BA2 archive or a binary file for analysis
%list_types             List available type libraries for the loaded component
%triggers               Display all components that trigger the rule
%help                   Display help message
%load_signatures        Load a FLIRT signature file to identify functions
%finfo                  Display information about a function
%load_project           Load a project from a BA2 archive
%scan                   Run rule(s) against the loaded project/BA2 archive
```

> To improve typing speed, VulHunt Shell supports `:` as an alternative command prefix to `%`. So, you can use `:help` instead of `%help`, but remember this is only supported by VulHunt Shell. Other Jupyter clients use the `%` prefix.
