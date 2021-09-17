#/bin/bash
rm ./dist/src/src/database/seeds/*.ts
rm ./dist/src/src/database/seeds/*.map
sequelize-cli db:seed:all