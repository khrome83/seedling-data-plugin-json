# seedling-data-plugin-json

A data plugin to read and parse JSON data.

## Usage

1. Create a new file in `/data` with the name `json.ts`.

```ts
import json from "https://raw.githubusercontent.com/use-seedling/seedling-data-plugin-json/master/mod.ts";
export default json;
```

2. Use with seedling data directive. There are three ways to use the directive.

### As raw inline JSON

```html
  <:data use="json">
    {
      "key": "value"
    }
  </:data>
```

### From a local file

```html
<:data use="json" file="path/to/json/file.json" />
```

> **Note** - This plugin requires the `--allow-read` command line parameter for Deno when using file attribute.

### From a remote url

```html
<:data use="json" url="https://example.com/path/to/file.json" />
```

> **Note** - This plugin requires the `--allow-net` command line parameter for Deno when using url attribute.
