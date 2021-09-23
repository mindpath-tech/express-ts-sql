#/bin/bash
rm ./dist/src/src/database/migrations/*.ts
rm ./dist/src/src/database/migrations/*.map
sequelize-cli db:migrate