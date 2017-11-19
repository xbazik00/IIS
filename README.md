### API

- POST /api/signIn.php - přihlášení, body: { userName, password }, return: ok - objekt uživatele / err - { error }

- GET /api/uzivatel/read.php - vrátí všechny uživatele, return: { items: pole s objekty uživatelů, count: počet objektů }
- GET /api/uzivatel/readOne.php - vrátí uživatele podle prezdívky, body: { userName }, return: ok - objekt uživatele / err - { error }

- GET /api/hra/read.php - vrátí všechny hry, return: { items: pole s objekty her, count: počet objektů }
- POST /api/hra/deleteOne.php - odstraní hru, body: { name }, return: ok - { message: "OK" } / err - { message: "ERR" }

- GET /api/klan/readOne.php - vrátí klan podle tag, body: { tag }, return: ok - objekt klanu / err - { error }
- POST /api/klan/create.php - přidá nový klan, body: objekt klanu, return: ok - { message: "OK" } / err - { message: "ERR" }
- POST /api/klan/delete.php - odstraní klan a pozvánky do klanu, body: { tag }, return: ok - { message: "OK" } / err - { message: "ERR" }

- POST /api/uzivatele_v_klanu/deleteOne.php - odstraní uživatele z klanu, body: { tag, userName }, return: ok - { message: "OK" } / err - { message: "ERR" }

- POST /api/pozvanka_do_klanu/read.php - vrátí všechny pozvánky podle přezdívky, body: { userName }, return: { items: pole s objekty pozvánek, count: počet objektů }
- POST /api/pozvanka_do_klanu/create.php - přidá novou pozvánku do klanu, body: { tag, userName }, return: ok - { message: "OK" } / err - { message: "ERR" }