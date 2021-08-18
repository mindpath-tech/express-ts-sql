#/bin/bash
# avoid a cut-and-paste of this into every `yarn` script
ts-node --files -P ./tsconfig.json -r tsconfig-paths/register "$@"
