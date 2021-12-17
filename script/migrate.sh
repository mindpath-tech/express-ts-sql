#/bin/bash
rm -f ./dist/src/database/migrations/*.ts
rm -f ./dist/src/database/migrations/*.map
sequelize-cli db:migrate